from flask import jsonify
from controllers.base_controller import BaseController
from services.reports_service import ReportsService
import os

class ReportsController(BaseController):
    def __init__(self):
        self.reports_service = ReportsService()

    def get_all_reports(self):
        try:
            reports = self.reports_service.get_all_reports()
            return jsonify(reports)
        except Exception as e:
            return jsonify({"error": str(e)})