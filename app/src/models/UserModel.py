from pydantic import BaseModel, EmailStr, Field
from typing import Annotated

class User(BaseModel):
    full_name: Annotated[str, Field(min_length=3, max_length=50)]
    email: EmailStr
    password: Annotated[str, Field(min_length=8, max_length=30)]  
    