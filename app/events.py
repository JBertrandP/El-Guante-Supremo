from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
load_dotenv()

class Database:
    """
    Clase para manejar la conexión a la base de datos MongoDB.
    """
    def __init__(self):
        self.client = None
        self.db = None

    def start(self):
        """
        Inicia la conexión a la base de datos MongoDB.
        """
        try:
            self.client = AsyncIOMotorClient(os.getenv("MONGO_URL"), tls=True)
            self.db = self.client[os.getenv("DATABASE_NAME")]
            print(f"Conectado a MongoDB: {self.client.server_info}")
            print(f" MongoDB conectado {self.client} a la base de datos {os.getenv('DATABASE_NAME')}")
        except Exception as e:
            print(f" Error al conectar a MongoDB: {e}")
            raise e
    def close(self):
        """
        Cierra la conexión a la base de datos MongoDB.
        """
        if self.client:
            self.client.close()
            print("Conexión a MongoDB cerrada.")
    

async def db_client():
    try:
        if not DATABASE_NAME:
            raise ValueError("Falta la variable de entorno: DATABASE_NAME")
        client = AsyncIOMotorClient(os.getenv("MONGO_URL"), tls=True)
        print(f"Conectado a MongoDB: {client.server_info}")
        print(f"✅ MongoDB conectado {client} a la base de datos {DATABASE_NAME}")
        db = client[DATABASE_NAME]
        collection = db["users"] #AQUI SE INSERTA EL NOMBRE DE LA COLECCIÓN
        return collection
    except Exception as e:
        print(f"❌ Error al conectar a MongoDB: {e}")
        raise e
    