import threading
from typing import List
from app.models.report import ReportModel

_reports_lock = threading.Lock()
_reports: List[ReportModel] = []

def get_all_reports() -> List[ReportModel]:
    with _reports_lock:
        return list(_reports)

def add_report(report: ReportModel) -> None:
    with _reports_lock:
        _reports.append(report)
        print(f"Logged report: '{report.id}' (Alert: {report.alert_id})")
