from services.base_service import BaseService
from repositories.reports_repository import ReportsRepository

class ReportsService(BaseService):

    def __init__(self):
        self.reports_repo = ReportsRepository()

    def get_all_reports(self):
        reports = self.reports_repo.get_all_reports()
        return reports