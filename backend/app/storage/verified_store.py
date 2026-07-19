import threading
from typing import List

_verified_lock = threading.Lock()
_verified: List[str] = [
    "HDFCBK",
    "SBIINB",
    "AXISBK",
    "ICICIB",
    "1930",
    "112",
    "MHAIN",
    "GOVTIN",
    "HDFC-ALERT",
    "SBI-INFO",
    "8002586161" # In HDFC messages, 18002586161 is a real HDFC helpline number
]

def get_all_verified() -> List[str]:
    with _verified_lock:
        return list(_verified)

def is_verified_contact(contact: str) -> bool:
    if not contact:
        return False
    # Standardize comparison by removing spaces and dashes, making it case-insensitive
    clean_contact = contact.replace(" ", "").replace("-", "").upper()
    with _verified_lock:
        for v in _verified:
            if v.replace(" ", "").replace("-", "").upper() == clean_contact:
                return True
    return False
