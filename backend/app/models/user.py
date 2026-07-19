from pydantic import BaseModel

class UserModel(BaseModel):
    id: str
    username: str
    password: str  # Plain for simplified demo verification
    email: str
    full_name: str
