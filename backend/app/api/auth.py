from fastapi import APIRouter, HTTPException
import uuid
from pydantic import BaseModel
from typing import Optional
from app.models.user import UserModel
from app.storage.user_store import find_user_by_username, add_user, find_user_by_id
from app.storage.report_store import get_all_reports

router = APIRouter()

class SignupRequest(BaseModel):
    username: str
    password: str
    email: str
    full_name: str

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/signup")
def signup(req: SignupRequest):
    """
    Registers a new user account if username is unique.
    """
    existing_user = find_user_by_username(req.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username is already taken.")
        
    user_id = f"usr-{uuid.uuid4().hex[:6]}"
    new_user = UserModel(
        id=user_id,
        username=req.username,
        password=req.password,
        email=req.email,
        full_name=req.full_name
    )
    add_user(new_user)
    return {"message": "Signup successful.", "user": new_user}

@router.post("/login")
def login(req: LoginRequest):
    """
    Validates user credentials and initiates session.
    """
    user = find_user_by_username(req.username)
    if not user or user.password != req.password:
        raise HTTPException(status_code=401, detail="Invalid username or password.")
        
    return {"message": "Login successful.", "user": user}

@router.get("/profile/{user_id}/reports")
def get_user_reports(user_id: str):
    """
    Retrieves the history of reported scams associated with the user profile.
    """
    reports = get_all_reports()
    user_reports = [r for r in reports if r.user_id == user_id]
    return user_reports
