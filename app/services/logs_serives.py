from datetime import datetime
from services.base_service import BaseService
from repositories.logs_repository import LogsRepository

class LogsService(BaseService):

    def __init__(self):
        self.logs_repo = LogsRepository()

    def get_all_logs(self):
        logs = self.logs_repo.get_all_logs()
        return logs
    
    def add_log(self, log):
        # If the log contains an array of logs, add timestamp to each entry and remove the outer timestamp.
        if "logs" in log:
            logs_list = log["logs"]
            current_timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            for entry in logs_list:
                entry["timestamp"] = current_timestamp
            # Remove the outer timestamp property, if it exists.
            log.pop("timestamp", None)
            # Pass the modified logs list to the repository.
            response = self.logs_repo.add_log(logs_list)
            return response
        else:
            response = self.logs_repo.add_log(log)
            return response