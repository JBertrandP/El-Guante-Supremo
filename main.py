from typing import Annotated
from fastapi import FastAPI, Form
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from app.db_models import *
from pydantic import BaseModel


app = FastAPI()

class User(BaseModel):
    full_name: str
    email: str
    password: str

# ⏱️ Evento: Se ejecuta al arrancar la app
@app.on_event("startup")


@app.get("/")
async def root():
    """
    Endpoint raíz que devuelve un mensaje de bienvenida.
    """
    return {"message": "Bienvenido a la API de FastAPI con MongoDB"}

@app.post("/signup")
async def signup(full_name: Annotated[str, Form()],
                email: Annotated[str, Form()],
                password: Annotated[str, Form()]):
    """
    Endpoint para registrar un nuevo usuario.
    """
    # Will return true or false
    if not full_name or not email or not password:
        return {"message": "Todos los campos son obligatorios"}
    Response = user_signup(
        full_name=full_name,
        email=email,
        password=password)

    if Response is False:
        return {"message": "Error al registrar el usuario"}
    return {"message": "Usuario registrado exitosamente"}


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
    
# ⏹️ Evento: Se ejecuta al apagar la app
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    print("🛑 MongoDB desconectado")

if __name__ == "__main__":
    import uvicorn 
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    # Para ejecutar el servidor, usa el comando: uvicorn main:app --reload en caso que no se ejecute automáticamente
