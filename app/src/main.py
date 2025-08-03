# Importa las dependencias necesarias de fastApi
from fastapi import Depends, FastAPI, Request, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
#importa las dependencias de autenticación y autorización
from google.oauth2 import id_token
from google.auth.transport import requests
import asyncio

from contextlib import asynccontextmanager

# Importa las dependencias de la base de datos y utilidades
from database.db_models import Database
from utils.utils import hash_password, verify_password, create_access_token, get_optional_user, generar_contrasenia_aleatoria, convert_list_objectid
from models.UserModel import User, UserUpdate
from models.TokenModel import GoogleToken as TokenModel
from services.coordinates import buscar_letra_por_coordenadas, buscar_palabra_por_coordenadas
from typing import List

from bson import ObjectId

from dotenv import load_dotenv
import os
#cargamos las variables de entorno desde el archivo .env
load_dotenv()
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
ORIGINS = os.getenv("ORIGINS", "*").split(",")   
#se crea la instancia la conexión a la base de datos MongoDB
db = Database()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.start()
    print(" MongoDB conectado correctamente")
    yield  # Aquí se ejecuta la app
    await db.close()
    print(" MongoDB desconectado")

#se crea la instancia de FastAPI
app = FastAPI(lifespan=lifespan)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"] 
)

@app.get("/")
async def root(user=Depends(get_optional_user)):
    """
    Endpoint raíz que devuelve un mensaje de bienvenida.
    """
    if not user:
        return {"message": "Por favor, inicia sesión para acceder a la API."}
    return {"message": "Bienvenido a la API de FastAPI con MongoDB", "user": user}
    
@app.get("/users/me")
async def get_current_user(user=Depends(get_optional_user)):
    """Endpoint para obtener el usuario actual.
    Si no hay usuario autenticado, devuelve un error 401.
    """ 
    user = await db.find_one(os.getenv("user_collection"), {"email": user["email"]})
    if not user:
        raise HTTPException(status_code=401, detail="No autenticado")
    return {"user": user}

@app.put("/users/me/update")
async def update_user(data: UserUpdate, user=Depends(get_optional_user)):
    """Endpoint para actualizar el usuario actual.
    Si no hay usuario autenticado, devuelve un error 401.
    """
    if not user:
        raise HTTPException(status_code=401, detail="No autenticado")
    if not data.full_name:
        await db.update_one(os.getenv("user_collection"), {"email": user["sub"]}, 
                            {"$set": {"password": hash_password(data.password)}})
        return {"message": "Contraseña actualizada correctamente"}
    if not data.password:
        await db.update_one(os.getenv("user_collection"), {"email": user["sub"]}, 
                            {"$set": {"full_name": data.full_name}})
        return {"message": "Nombre actualizado correctamente"}

    await db.update_one(os.getenv("user_collection"), {"email": user["sub"]}, 
                        {"$set": {"full_name": data.full_name, 
                                  "password": hash_password(data.password)}})

    return {"message": "Información de usuario actualizada"}

@app.post("/signup")
async def signup(data: User):
    # Verifica si ya existe un usuario con ese correo
    existing_user = await db.find_one(os.getenv("user_collection"), {"email": data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado.")
    # Hashea la contraseña
    hashed_pw = hash_password(data.password)
    # Inserta el nuevo usuario
    result = await db.insert_one(os.getenv("user_collection"), {    
        "full_name": data.full_name,
        "email": data.email,
        "password": hashed_pw,
    })
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Error al registrar el usuario.")
    return {"mensaje": "Usuario registrado correctamente"}

@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.find_one(os.getenv("user_collection"), {"email": form_data.username})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = create_access_token(data={"sub": user["email"]})
    return {"Response":"Has sido logueado correctamente", "access_token": token, "token_type": "bearer"}

@app.post("/auth/google")
async def login_google(google_token: TokenModel):
    try:
        idinfo = id_token.verify_oauth2_token(
            google_token.token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        user_data = {"sub": idinfo["email"]}
        await db.insert_one(os.getenv("user_collection"), 
                            {"full_name": idinfo["name"], 
                             "email": user_data["sub"], 
                             "password": hash_password(generar_contrasenia_aleatoria())})

        token = create_access_token(user_data)
        return {"access_token": token}
    except ValueError as e:
        print("Error de verificación:", e)
        raise HTTPException(status_code=401, detail="Invalid Google token")

@app.get("/alphabet_ids")
async def alphabet():
    cursor = db.find_all_specific(os.getenv("alphabet_collection"), query={}, 
                                  projection={"_id": 1, "letter": 1})
    results = await cursor.to_list(length=None)
    alphabet = convert_list_objectid(results)

    if not alphabet:
        raise HTTPException(status_code=404, detail="No se encontraron letras en la base de datos.")
    return {"alphabet": alphabet}

@app.get("/alphabet/{letter_id}")
async def alphabet(letter_id: str):
    try:
        obj_id = ObjectId(letter_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID inválido")

    letter_info = await db.find_one(os.getenv("alphabet_collection"), {"_id": obj_id}, 
                                    projection={"_id": 0, "coordinates": 0})
    if not letter_info:
        raise HTTPException(status_code=404, detail="No se encontraron letras en la base de datos.")
    print(letter_info)
    return {"letter_info": letter_info}

@app.get("/dictionary/{page}")
async def dictionary(page: int):
    cursor = db.find_some(os.getenv("dictionary_collection"), 10, (page - 1) * 10, 
                          projection={"_id": 1, "word": 1})
    results = await cursor.to_list(length=None)
    dictionary = convert_list_objectid(results)
    if not dictionary:
        raise HTTPException(status_code=404, detail="No se encontraron palabras en la base de datos.")
    return {"dictionary": dictionary}

@app.get("/dictionary/word/{word_id}")
async def dictionary_word(word_id: str):
    try:
        obj_id = ObjectId(word_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID inválido")

    word_info = await db.find_one(os.getenv("dictionary_collection"), {"_id": obj_id}, 
                                  projection={"_id": 0, "coordinates": 0})
    if not word_info:
        raise HTTPException(status_code=404, detail="No se encontraron palabras en la base de datos.")
    print(word_info)
    return {"word_info": word_info}


frontend_clients: List[WebSocket] = []

async def broadcast_message(message: dict):
    disconnected = []
    for cliente in frontend_clients:
        try:
            await cliente.send_json(message)
        except Exception:
            disconnected.append(cliente)
    for cliente in disconnected:
        frontend_clients.remove(cliente)

@app.websocket("/ws/glove")
async def ws_glove(websocket: WebSocket):
    await websocket.accept()
    buffer = ""
    try:
        data_db_alphabet = await db.find_all_specific(os.getenv("alphabet_collection"), projection={"letter": 1, "coordinates": 1})
        data_alpha = await data_db_alphabet.to_list()
        data_db_dictionary = await db.find_all_specific(os.getenv("dictionary_collection"), projection={"word": 1, "coordinates": 1})
        data_dict = await data_db_dictionary.to_list()

        while True:
            data_glove = await websocket.receive_json()
            sign = buscar_palabra_por_coordenadas(data_dict, data_glove)

            if sign == "alto" or sign == "parar":
                await broadcast_message({"mensaje_final": buffer})
                buffer = ""
                continue
            elif sign == "borrar":
                buffer = buffer[:-1]  # Elimina el último carácter
                await broadcast_message({"info": "Último carácter eliminado"})
            elif sign == "espacio":
                buffer += " "
                await broadcast_message({"info": "Espacio agregado"})
            elif sign == "limpiar":
                buffer = ""
                await broadcast_message({"info": "Buffer limpiado"})
                continue
            if sign:
                await broadcast_message({"data": sign})
                continue
            
            # Si no se encuentra una palabra, buscar letra por coordenadas
            letter = buscar_letra_por_coordenadas(data_alpha, data_glove)
            if letter:
                buffer += letter
                await broadcast_message({"data": letter})
            else:
                await broadcast_message({"data": None})

    except WebSocketDisconnect:
        print("Conexión cerrada")


@app.websocket("/ws/front")
async def ws_frontend(websocket: WebSocket):
    await websocket.accept()
    frontend_clients.append(websocket)
    try:
        while True:
            await websocket.receive_text()  # Escuchar pings 
    except WebSocketDisconnect:
        frontend_clients.remove(websocket)
        print(f"Cliente desconectado: {websocket.client.host}")



#esta parte son pruebas
@app.get("/ping")
async def ping():
    """
    Endpoint para verificar la conexión a la base de datos.
    """
    try:
        await db.ping()
        print(db.client.server_info())
        return {"message": "Conexión a la base de datos exitosa", "status": "ok"}

    except Exception as e:
        return {"message": f"Error al conectar a la base de datos: {e}"}

@app.get("/info")
def info(request: Request):
    cliente_ip = request.client.host
    user_agent = request.headers.get("user-agent")
    port = request.client.port
    return {"ip": cliente_ip, "navegador": user_agent, "puerto": port}


if __name__ == "__main__":
    import uvicorn 
    import subprocess
    import re
    # Ejecutar 'ipconfig' en Windows
    resultado = subprocess.run("ipconfig", shell=True, capture_output=True, text=True, encoding="cp850")
    # Buscar IP usando 'Direcci' + cualquier caracter (como ¢ o ó)
    ips = re.findall(r"Direcci.{0,3}n IPv4[^\d]*(\d+\.\d+\.\d+\.\d+)", resultado.stdout)

    for ip in ips:
        print("Tu IP local es:", ip)

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    # Para ejecutar el servidor, usa el comando: uvicorn main:app --reload en caso que no se ejecute automáticamente


    #En el navegador de el frontend ingresa http: 10.100.x.x:8000
    
    #para utilizarlo mediante la web usar ngrok y el puerto una vez se haya ejecutado el servidor