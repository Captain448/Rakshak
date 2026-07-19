import threading
from datetime import datetime
from typing import List, Optional
from app.models.entity import TrustEntityModel, EntityType, EntityStatus

_entities_lock = threading.Lock()
_entities: List[TrustEntityModel] = [
    # Government verified channels
    TrustEntityModel(
        id="ent-govt-01",
        value="1930",
        type=EntityType.PHONE,
        status=EntityStatus.VERIFIED,
        organization="National Cyber Crime Helpline",
        report_count=0,
        confidence_score=0.0,
        gemini_risk_average=0.0,
        officer_verified=True,
        verified_source="MHA Cyber Cell Portal",
        first_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        last_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        created_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        updated_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        history=[{"event": "Marked VERIFIED by system startup seeding", "time": datetime.now().strftime("%d-%m-%Y %I:%M %p")}]
    ),
    TrustEntityModel(
        id="ent-govt-02",
        value="112",
        type=EntityType.PHONE,
        status=EntityStatus.VERIFIED,
        organization="National Emergency Response System (ERS)",
        officer_verified=True,
        verified_source="National Emergency Portal",
        first_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        last_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        created_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        updated_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        history=[{"event": "Marked VERIFIED by system startup seeding", "time": datetime.now().strftime("%d-%m-%Y %I:%M %p")}]
    ),
    # Banks official SMS sender headers
    TrustEntityModel(
        id="ent-bank-01",
        value="HDFCBK",
        type=EntityType.SMS_SENDER,
        status=EntityStatus.VERIFIED,
        organization="HDFC Bank Limited",
        officer_verified=True,
        verified_source="Reserve Bank of India (RBI)",
        first_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        last_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        created_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        updated_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        history=[{"event": "Marked VERIFIED by system startup seeding", "time": datetime.now().strftime("%d-%m-%Y %I:%M %p")}]
    ),
    TrustEntityModel(
        id="ent-bank-02",
        value="SBIINB",
        type=EntityType.SMS_SENDER,
        status=EntityStatus.VERIFIED,
        organization="State Bank of India",
        officer_verified=True,
        verified_source="Reserve Bank of India (RBI)",
        first_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        last_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        created_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        updated_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        history=[{"event": "Marked VERIFIED by system startup seeding", "time": datetime.now().strftime("%d-%m-%Y %I:%M %p")}]
    ),
    TrustEntityModel(
        id="ent-bank-03",
        value="ICICIB",
        type=EntityType.SMS_SENDER,
        status=EntityStatus.VERIFIED,
        organization="ICICI Bank Limited",
        officer_verified=True,
        verified_source="Reserve Bank of India (RBI)",
        first_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        last_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        created_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        updated_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        history=[{"event": "Marked VERIFIED by system startup seeding", "time": datetime.now().strftime("%d-%m-%Y %I:%M %p")}]
    ),
    # Banks official Domains
    TrustEntityModel(
        id="ent-dom-01",
        value="hdfcbank.com",
        type=EntityType.DOMAIN,
        status=EntityStatus.VERIFIED,
        organization="HDFC Bank Limited Web Domain",
        officer_verified=True,
        verified_source="ICANN Registry / RBI registrar",
        first_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        last_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        created_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        updated_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        history=[{"event": "Marked VERIFIED by system startup seeding", "time": datetime.now().strftime("%d-%m-%Y %I:%M %p")}]
    ),
    TrustEntityModel(
        id="ent-dom-02",
        value="sbi.co.in",
        type=EntityType.DOMAIN,
        status=EntityStatus.VERIFIED,
        organization="State Bank of India Web Domain",
        officer_verified=True,
        verified_source="ICANN Registry / RBI registrar",
        first_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        last_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        created_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        updated_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        history=[{"event": "Marked VERIFIED by system startup seeding", "time": datetime.now().strftime("%d-%m-%Y %I:%M %p")}]
    ),
    # Organizations official domains
    TrustEntityModel(
        id="ent-dom-03",
        value="rbi.org.in",
        type=EntityType.DOMAIN,
        status=EntityStatus.VERIFIED,
        organization="Reserve Bank of India Portal",
        officer_verified=True,
        verified_source="Government of India Domain Registry",
        first_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        last_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        created_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        updated_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        history=[{"event": "Marked VERIFIED by system startup seeding", "time": datetime.now().strftime("%d-%m-%Y %I:%M %p")}]
    ),
    TrustEntityModel(
        id="ent-dom-04",
        value="npci.org.in",
        type=EntityType.DOMAIN,
        status=EntityStatus.VERIFIED,
        organization="National Payments Corporation of India Portal",
        officer_verified=True,
        verified_source="Government of India Domain Registry",
        first_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        last_reported_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        created_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        updated_at=datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        history=[{"event": "Marked VERIFIED by system startup seeding", "time": datetime.now().strftime("%d-%m-%Y %I:%M %p")}]
    )
]

def get_all_entities() -> List[TrustEntityModel]:
    with _entities_lock:
        return list(_entities)

def add_entity(entity: TrustEntityModel) -> None:
    with _entities_lock:
        _entities.append(entity)

def find_entity_by_value(value: str) -> Optional[TrustEntityModel]:
    if not value:
        return None
    clean_val = value.replace(" ", "").replace("-", "").upper()
    with _entities_lock:
        for ent in _entities:
            # Check normalized values to support clean comparisons
            if ent.value.replace(" ", "").replace("-", "").upper() == clean_val:
                return ent
    return None

def find_entity_by_id(ent_id: str) -> Optional[TrustEntityModel]:
    with _entities_lock:
        for ent in _entities:
            if ent.id == ent_id:
                return ent
    return None
