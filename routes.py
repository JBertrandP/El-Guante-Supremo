from fastapi import FastAPI, APIRouter
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
load_dotenv()

app = FastAPI()


# ⏱️ Evento: Se ejecuta al arrancar la app
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
    DATABASE_NAME = os.getenv("DATABASE_NAME")
    if not DATABASE_NAME:
        raise ValueError("Falta la variable de entorno: DATABASE_NAME")
    app.mongodb = app.mongodb_client[DATABASE_NAME]
    print("✅ MongoDB conectado")

# ⏹️ Evento: Se ejecuta al apagar la app
@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
    print("🛑 MongoDB desconectado")