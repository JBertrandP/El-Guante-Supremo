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

    async def start(self):
        """
        Inicia la conexión a la base de datos MongoDB.
        """
        try:
            self.client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
            self.db = self.client[os.getenv("DATABASE_NAME")]
            print(f"Conectado a MongoDB: {await self.client.server_info()}")
        except Exception as e:
            print(f" Error al conectar a MongoDB: {e}")
            raise e

    def close(self):
        """
        Cierra la conexión a la base de datos MongoDB.
        """
        try:
            if self.client:
                self.client.close()
            else:
                print("No hay conexión a cerrar.")
        except Exception as e:
            print(f"Error al cerrar la conexión a MongoDB: {e}")
        

    def get_collection(self, collection_name):
        """
        Obtiene una colección de la base de datos MongoDB.
        """
        try:
            if self.db is None:
                print("La base de datos no está conectada.")
                return None
            return self.db[collection_name]
        except Exception as e:
            print(f"Error al obtener la colección {collection_name}: {e}")
            return None
        
    def insert_one(self, collection_name, document):
        """
        Inserta un documento en una colección de la base de datos MongoDB.
        """
        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return None
            return collection.insert_one(document)
        except Exception as e:
            print(f"Error al insertar documento: {e}")
            return None

    def find_one(self, collection_name, query):
        """
        Busca un documento en una colección de la base de datos MongoDB.
        """
        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return None
            return collection.find_one(query)
        except Exception as e:
            print(f"Error al buscar documento: {e}")
            return None

    def find_all(self, collection_name, query=None):    
        """
        Busca todos los documentos en una colección de la base de datos MongoDB.
        """
        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return None
            
            return collection.find(query) if query else collection.find()
        except Exception as e:
            print(f"Error al buscar documentos: {e}")
            return None
        
    
        
    def find_all_specific(self, collection_name, query=None, projection=None):    
        """
        Busca todos los documentos en una colección de la base de datos MongoDB.
        Permite aplicar un filtro (query) y una proyección (campos a incluir o excluir).
        collection_name = "usuarios", query = {}/{"ciudad": "Madrid"}, projection = {"nombre": 1, "ciudad": 1, "_id": 0} if you want to include only specific fields select 1.
        """
        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return None
            if query and projection:
                return collection.find(query, projection)
            elif query:
                return collection.find(query)
            elif projection:
                return collection.find({}, projection)
            else:
                return collection.find()
        except Exception as e:
            print(f"Error al buscar documentos: {e}")
            return None
    
    def find_some(self, collection_name, limit=10, start=0):    
        """
        Busca algunos documentos en una colección de la base de datos MongoDB.
        Permite aplicar un límite de resultados, así como un punto de inicio.
        collection_name = "usuarios", query = {}/{"ciudad": "Madrid"}, limit = 10, start = 0
        """
        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return None
            return collection.find().limit(limit).skip(start)
        except Exception as e:
            print(f"Error al buscar documentos: {e}")
            return None
        
    def find_all(self, collection_name):    
        """
        Busca todos los documentos en una colección de la base de datos MongoDB.
        """
        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return None
            return collection.find()
        except Exception as e:
            print(f"Error al buscar documentos: {e}")
            return None


    def update_one(self, collection_name, query, update):
        """
        Actualiza un documento en una colección de la base de datos MongoDB.
        """
        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return None
            return collection.update_one(query, update)
        except Exception as e:
            print(f"Error al actualizar documento: {e}")
            return None

    def delete_one(self, collection_name, query):
        """
        Elimina un documento en una colección de la base de datos MongoDB.
        """
        try:
            collection = self.get_collection(collection_name)
            if collection is None:
                return None
            return collection.delete_one(query)
        except Exception as e:
            print(f"Error al eliminar documento: {e}")
            return None

    async def ping(self):
        """
        Verifica la conexión a la base de datos MongoDB.
        """
        try:
            return self.client.admin.command("ping")
        except Exception as e:
            print(f"Error al hacer ping a la base de datos: {e}")
            return None

