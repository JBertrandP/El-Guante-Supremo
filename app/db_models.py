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
        
    def get_collection(self, collection_name):
        """
        Obtiene una colección de la base de datos MongoDB.
        
        :param collection_name: Nombre de la colección a obtener.
        :return: Colección de la base de datos.
        """
        if not self.db:
            raise ValueError("La conexión a la base de datos no está iniciada.")
        return self.db[collection_name]
    
    def insert_one(self, collection_name, document):
        """
        Inserta un documento en una colección de la base de datos MongoDB.
        
        :param collection_name: Nombre de la colección donde se insertará el documento.
        :param document: Documento a insertar (Diccionario con los datos del usuario).
        :return: Resultado de la operación de inserción.
        """
        collection = self.get_collection(collection_name)
        return collection.insert_one(document)

    def find_one(self, collection_name, query):
        """
        Busca un documento en una colección de la base de datos MongoDB.
        
        :param collection_name: Nombre de la colección donde se realizará la búsqueda.
        :param query: Consulta para buscar el documento (Diccionario con los criterios de búsqueda).
        :return: Documento encontrado o None si no se encuentra.
        """
        collection = self.get_collection(collection_name)
        return collection.find_one(query)
    
    def find_all(self, collection_name, query=None):    
        """
        Busca todos los documentos en una colección de la base de datos MongoDB.
        
        :param collection_name: Nombre de la colección donde se realizará la búsqueda.
        :param query: Consulta para buscar los documentos (Diccionario con los criterios de búsqueda).
        :return: Cursor con los documentos encontrados.
        """
        collection = self.get_collection(collection_name)
        return collection.find(query) if query else collection.find()
    
    def update_one(self, collection_name, query, update):
        """
        Actualiza un documento en una colección de la base de datos MongoDB.
        
        :param collection_name: Nombre de la colección donde se realizará la actualización.
        :param query: Consulta para encontrar el documento a actualizar (Diccionario con los criterios de búsqueda).
        :param update: Actualización a aplicar al documento (Diccionario con los cambios).
        :return: Resultado de la operación de actualización.
        """
        collection = self.get_collection(collection_name)
        return collection.update_one(query, update)
    
    def delete_one(self, collection_name, query):
        """
        Elimina un documento en una colección de la base de datos MongoDB.
        
        :param collection_name: Nombre de la colección donde se realizará la eliminación.
        :param query: Consulta para encontrar el documento a eliminar (Diccionario con los criterios de búsqueda).
        :return: Resultado de la operación de eliminación.
        """
        collection = self.get_collection(collection_name)
        return collection.delete_one(query)
    
    def close(self):
        """
        Cierra la conexión a la base de datos MongoDB.
        """
        if self.client:
            self.client.close()
            print("Conexión a MongoDB cerrada.")
    



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

