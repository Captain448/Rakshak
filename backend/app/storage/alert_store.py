import threading
from datetime import datetime
from typing import List, Optional
from app.models.alert import AlertModel

_alerts_lock = threading.Lock()
_alerts: List[AlertModel] = [
    AlertModel(
        id="alt-001",
        title="Critical Surge in CBI Mumbai Impersonation Campaign",
        category="Digital Arrest Scam",
        risk_level="CRITICAL",
        timestamp="19-07-2026 10:45 AM",
        location="New Delhi, Delhi",
        summary="Scammers claiming to be CBI or Mumbai Police officers are serving fake arrest warrant PDFs on WhatsApp to extort large sums.",
        advisory="Government police forces will never conduct online judicial arrests or demand deposits. Block such numbers instantly.",
        source_message="I got a WhatsApp video call from a person in a police uniform claiming my Aadhaar number was linked to money laundering in Mumbai and I was under digital arrest.",
        incident_count=14,
        recommended_action=[
            "Do not transfer money.",
            "Disconnect the call immediately.",
            "Report to the cybercrime helpline (call 1930)."
        ],
        status="ACTIVE",
        updated_at="19-07-2026 10:45 AM",
        status_changed_by="System",
        history=[
            {"event": "Alert created", "time": "19-07-2026 10:45 AM"},
            {"event": "Incident count increased (Total: 14)", "time": "19-07-2026 11:30 AM"}
        ]
    ),
    AlertModel(
        id="alt-002",
        title="Urgent: SBI KYC Verification Phishing Spike",
        category="Fake KYC Scam",
        risk_level="HIGH",
        timestamp="19-07-2026 09:15 AM",
        location="Jamtara, Jharkhand",
        summary="SMS campaign wave sending links claiming SBI accounts will be blocked unless PAN card credentials are submitted.",
        advisory="Banks never request PAN card details or password update links via private non-https domains. Always use the official bank portal.",
        source_message="Dear SBI Customer, your YONO account block today. Please update PAN immediately by clicking link http://sbi-kyc-verify.in",
        incident_count=32,
        recommended_action=[
            "Ignore suspicious KYC update links.",
            "Visit the official bank website directly.",
            "Report phishing attempts to the bank's security cell."
        ],
        status="ACTIVE",
        updated_at="19-07-2026 09:15 AM",
        status_changed_by="System",
        history=[
            {"event": "Alert created", "time": "19-07-2026 09:15 AM"},
            {"event": "Incident count increased (Total: 32)", "time": "19-07-2026 10:00 AM"}
        ]
    ),
    AlertModel(
        id="alt-003",
        title="Verification Code Hijacking Warning",
        category="OTP Scam",
        risk_level="HIGH",
        timestamp="18-07-2026 04:30 PM",
        location="Gurugram, Haryana",
        summary="Phishing wave of calls impersonating utility providers requesting electricity bill payment OTP codes to avoid cut-offs.",
        advisory="Utility providers never request payment confirmation OTPs over voice calls. Discard private text requests.",
        source_message="Your power connection will be cut off tonight at 9:30 PM due to unpaid bills. Share the OTP sent to your phone to update your bill payment status.",
        incident_count=18,
        recommended_action=[
            "Never share OTPs with anyone.",
            "Block the suspect sender number.",
            "Contact your utility provider's official customer care."
        ],
        status="ACTIVE",
        updated_at="18-07-2026 04:30 PM",
        status_changed_by="System",
        history=[
            {"event": "Alert created", "time": "18-07-2026 04:30 PM"},
            {"event": "Incident count increased (Total: 18)", "time": "18-07-2026 05:00 PM"}
        ]
    ),
    AlertModel(
        id="alt-004",
        title="Automated UPI Cash Request Scam Alert",
        category="UPI Fraud",
        risk_level="HIGH",
        timestamp="17-07-2026 11:20 AM",
        location="Noida, Uttar Pradesh",
        summary="Fraudulent payment confirmation screens and collect requests sent to users claiming to verify cash back wins.",
        advisory="UPI PINs are only required to send money, never to receive. Do not enter your PIN for cashback.",
        source_message="Congratulations, you have won a cash back of Rs 2000! Scan this QR code and verify your UPI PIN to claim your refund in your bank account.",
        incident_count=25,
        recommended_action=[
            "Verify payment requests before proceeding.",
            "Do not scan unknown QR codes.",
            "Freeze transactions and report to your bank if scammed."
        ],
        status="ACTIVE",
        updated_at="17-07-2026 11:20 AM",
        status_changed_by="System",
        history=[
            {"event": "Alert created", "time": "17-07-2026 11:20 AM"},
            {"event": "Incident count increased (Total: 25)", "time": "17-07-2026 12:00 PM"}
        ]
    )
]

def get_all_alerts() -> List[AlertModel]:
    with _alerts_lock:
        return list(_alerts)

def add_alert(alert: AlertModel) -> None:
    with _alerts_lock:
        _alerts.append(alert)

def find_recent_alert_by_category(category: str) -> Optional[AlertModel]:
    """
    Search for a recent alert belonging to the specified category.
    """
    with _alerts_lock:
        for alert in reversed(_alerts):
            if alert.category == category:
                return alert
    return None

def increment_incident_count_in_store(alert_id: str) -> None:
    with _alerts_lock:
        for alert in _alerts:
            if alert.id == alert_id:
                alert.incident_count += 1
                current_time_str = datetime.now().strftime("%d-%m-%Y %I:%M %p")
                alert.updated_at = current_time_str
                alert.status_changed_by = "System"
                alert.history.append({
                    "event": f"Incident count increased (Total: {alert.incident_count})",
                    "time": current_time_str
                })
                break
