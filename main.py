from typing import Annotated
from fastapi import FastAPI, Form, Request, status

from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.db_models import Database
from app.utils import render
from pydantic import BaseModel

from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

static = StaticFiles(directory="app/src/static")

# Se variablizan las rutas de las plantillas y archivos estáticos

#se crea la instancia la conexión a la base de datos MongoDB y de FastAPI
db = Database()
app = FastAPI()

class User(BaseModel):
    full_name: str
    email: str
    password: str

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los encabezados
)

# ⏱️ Evento: Se ejecuta al arrancar la app
@app.on_event("startup")
async def startup_db_client():
    """
    Evento que se ejecuta al iniciar la aplicación.
    Establece la conexión a la base de datos MongoDB.
    """
    db.start()
    print("🚀 MongoDB conectado")

@app.get("/")
async def root(request: Request):
    """
    Endpoint raíz que devuelve un mensaje de bienvenida.
    """
    return render(request, "hedionodo.html", {"message": "Bienvenido a la API de FastAPI con MongoDB"})

@app.post("/signup")
async def signup(
                request: Request,
                full_name: Annotated[str, Form()],
                email: Annotated[str, Form()],
                password: Annotated[str, Form()]):
    """
    Endpoint para registrar un nuevo usuario.
    """
    response = RedirectResponse(url="/login", status_code=303)
    response.set_cookie(key="mensaje", value="Has+sido+registrado+correctamente")
    # Validación de los campos obligatorios
    if not full_name or not email or not password:
        return render(
            "signup.html",
            {
                "request": request,
                "mensaje": "Todos los campos son obligatorios"
            },
            status_code=status.HTTP_400_BAD_REQUEST
        )
    
    database_response = db.insert_one(
        "users",
        {
            "full_name": full_name,
            "email": email,
            "password": password
        }
    )
    if not database_response:
        return render(
            "signup.html",
            {
                "request": request,
                "mensaje": "Error al registrar el usuario. Inténtalo de nuevo."
            },
            status_code=status.HTTP_500_BAD_REQUEST
        )
    return response

@app.post("/login")
async def login(
    request: Request,
    email: Annotated[str, Form()],
    password: Annotated[str, Form()]
):
    """
    Endpoint para iniciar sesión.
    """
    mensaje = request.cookies.get("mensaje")
    if mensaje:
        response = render(
            "login.html",
            {
                "request": request,
                "mensaje": mensaje
            },
            status_code=status.HTTP_200_OK
        )
        response.delete_cookie("mensaje")
        return response 
    user = db.find_one("users", {"email": email, "password": password})
    if not user:
        return render(
            "login.html",
            {
                "request": request,
                "mensaje": "Credenciales inválidas"
            },
            status_code=status.HTTP_401_UNAUTHORIZED
        )
    response = RedirectResponse(url="/", status_code=303)
    response.set_cookie(key="user_id", value=str(user["_id"]))
    return response

@app.get("/ping")
async def ping():
    """
    Endpoint para verificar la conexión a la base de datos.
    """
    try:
        await app.mongodb.command("ping")
        return {"message": "Pong! Conexión a la base de datos exitosa"}
    except Exception as e:
        return {"message": f"Error al conectar a la base de datos: {e}"}

@app.get("/info")
def info(request: Request):
    cliente_ip = request.client.host
    user_agent = request.headers.get("user-agent")
    return {"ip": cliente_ip, "navegador": user_agent}


# ⏹️ Evento: Se ejecuta al apagar la app
@app.on_event("shutdown")
async def shutdown_db_client():
    db.close()
    print("🛑 MongoDB desconectado")



if __name__ == "__main__":
    import uvicorn 
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    # Para ejecutar el servidor, usa el comando: uvicorn main:app --reload en caso que no se ejecute automáticamente
