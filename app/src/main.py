# Importa las dependencias necesarias
from fastapi import Depends, FastAPI, Request, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager

from typing import Annotated

from pydantic import BaseModel, EmailStr, Field
# Importa las dependencias de la base de datos y utilidades
from db_models import Database
from utils import hash_password, verify_password, create_access_token, get_optional_user

from dotenv import load_dotenv
import os
load_dotenv()

#se crea la instancia la conexión a la base de datos MongoDB
db = Database()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Al iniciar la app
    await db.start()
    print(" MongoDB conectado correctamente")
    
    yield  # Aquí se ejecuta la app

    #  Al apagar la app
    await db.close()
    print(" MongoDB desconectado")

#se crea la instancia de FastAPI
app = FastAPI(lifespan=lifespan)

class User(BaseModel):
    full_name: Annotated[str, Field(min_length=3, max_length=50)]
    email: EmailStr
    password: Annotated[str, Field(min_length=8, max_length=30)]  
    
# Configuración de CORS
origins = ["*"  # Permitir todas las orígenes
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los encabezados
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
    if not user:
        raise HTTPException(status_code=401, detail="No autenticado")
    return {"user": user}

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
    print(user)
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token = create_access_token(data={"sub": user["email"]})
    return {"Response":"Has sido logueado correctamente", "access_token": token, "token_type": "bearer"}


@app.get("/dictionary")
async def dictionary():
    print("hola")






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
    return {"ip": cliente_ip, "navegador": user_agent}





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

    #En el navegador de el frontend ingresa http: 10.100.0.19:8000