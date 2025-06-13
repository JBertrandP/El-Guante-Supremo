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
            self.client = AsyncIOMotorClient(os.getenv("MONGO_URL"), tls=True)
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
            if not self.db:
                raise ValueError("La conexión a la base de datos no está iniciada.")
            return self.db[collection_name]
        except Exception as e:
            print(f"Error al obtener la colección: {e}")
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
    



def user_signup(**kwargs):
    """
    Function to handle user signup.
    :param user: User object containing user details.
    :return: None
    """
    if kwargs.get('full_name') is None or kwargs.get('email') is None or kwargs.get('password') is None:
        raise ValueError("Full name, email, and password are required for signup.")
    

    #Will insert the user into the database (not implemented here)
    # Assuming the user is successfully created in the database
    if (True):
        return True
    else: 
        return False

    print(f"User {kwargs['full_name']} signed up with email {kwargs['email']}.")
    

def user_login(**kwargs):
    """
    Function to handle user login.
    :param user: User object containing user details.
    :return: None
    """
    if kwargs.get('email') is None or kwargs.get('password') is None:
        raise ValueError("Email and password are required for login.")
    
    #compare with the database (not implemented here)
    # Assuming the user exists and credentials are correct

    print(f"User with email {kwargs['email']} logged in.")

