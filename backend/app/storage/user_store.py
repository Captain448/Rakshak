import threading
from typing import List, Optional
from app.models.user import UserModel

_users_lock = threading.Lock()
_users: List[UserModel] = [
    UserModel(
        id="usr-001",
        username="citizen",
        password="citizen123",
        email="citizen@safety.gov.in",
        full_name="Rajesh Kumar"
    ),
    UserModel(
        id="usr-002",
        username="officer",
        password="officer123",
        email="officer@cybercell.gov.in",
        full_name="Inspector Amit Sinha"
    )
]

def get_all_users() -> List[UserModel]:
    with _users_lock:
        return list(_users)

def add_user(user: UserModel) -> None:
    with _users_lock:
        _users.append(user)

def find_user_by_username(username: str) -> Optional[UserModel]:
    with _users_lock:
        for user in _users:
            if user.username == username:
                return user
    return None

def find_user_by_id(user_id: str) -> Optional[UserModel]:
    with _users_lock:
        for user in _users:
            if user.id == user_id:
                return user
    return None
