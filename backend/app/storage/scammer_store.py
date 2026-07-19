import threading
from typing import List

_scammers_lock = threading.Lock()
_scammers: List[str] = [
    "+91 99988 87776",
    "+91 88877 66655",
    "AD-HDFCBK",
    "verify@oksbi",
    "SBI-KYC-WARN",
    "CBIPOLICE-MUM",
    "18002586161" # Seed a toll free number used by scammers to impersonate customer support line
]

def get_all_scammers() -> List[str]:
    with _scammers_lock:
        return list(_scammers)

def add_scammer(contact: str) -> None:
    with _scammers_lock:
        contact_clean = contact.strip()
        if contact_clean and contact_clean not in _scammers:
            _scammers.append(contact_clean)

def is_scammer_contact(contact: str) -> bool:
    if not contact:
        return False
    # Standardize comparison by removing spaces and dashes
    clean_contact = contact.replace(" ", "").replace("-", "").upper()
    with _scammers_lock:
        for s in _scammers:
            if s.replace(" ", "").replace("-", "").upper() == clean_contact:
                return True
    return False
