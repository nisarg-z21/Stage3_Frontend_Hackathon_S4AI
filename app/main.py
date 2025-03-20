from flask import Flask
from flask_cors import CORS
from controllers.predict_cat_subcat_controller import PredictCatSubcatController
from controllers.complain_controller import ComplainController
from controllers.reports_controller import ReportsController
from controllers.logs_controller import LogsController
import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from inference.inference import CyberClusterInference

def startup_task():
    print("Application is starting...")
    infer = CyberClusterInference(f"model", "TFIDF_vectorizer", 
                                  "KMeans_cluster_100", "clusters_to_category_mapping")
    print("Server is up and running with infer...")
    return infer

def create_app():
    app = Flask(__name__)
    CORS(app, 
         supports_credentials=True, 
         resources={
             r"/api/*": {
                 "origins": [
                     "http://localhost:3000", # for User panel
                     "http://192.168.1.16:3000", # for User panel
                     "http://localhost:8000", # for Admin panel
                     "http://192.168.1.16:8000", # for Admin panel
                     "http://127.0.0.1:3000",
                 ]
             }
         })
    # Initialize controllers
    predict_cat_subcat_controller = PredictCatSubcatController()
    complain_controller = ComplainController()
    reports_controller = ReportsController()
    logs_controller = LogsController()

    # Complain routes
    app.add_url_rule('/api/complains/get_all_complains', 'get_all_complains', complain_controller.get_all_complains, methods=['GET'])
    app.add_url_rule('/api/complains/get_complain_by_id', 'get_complain_by_id', complain_controller.get_complain_by_id, methods=['GET'])
    app.add_url_rule('/api/complains/get_uploaded_file', 'get_uploaded_file', complain_controller.get_uploaded_file, methods=['GET'])
    app.add_url_rule('/api/complains/save_complain', 'save_complain', complain_controller.save_complain, methods=['POST'])

    # Predict category and subcategory routes
    app.add_url_rule('/api/predicttion/predict_cat_subcat', 'predict_cat_subcat', predict_cat_subcat_controller.predict_cat_subcat, methods=['POST'])
    # Report routes
    app.add_url_rule('/api/reports/get_all_reports', 'get_all_reports', reports_controller.get_all_reports, methods=['GET'])

    # Logs routes
    app.add_url_rule('/api/logs/get_all_logs', 'get_all_logs', logs_controller.get_all_logs, methods=['GET'])
    app.add_url_rule('/api/logs/add_log', 'add_log', logs_controller.add_log, methods=['POST'])

    return app

if __name__ == "__main__":
    app = create_app()
    # app.run(host='0.0.0.0', port= 5000)
    app.infer = startup_task()  # Save the inference instance on the app
    app.run(debug=True, use_reloader=False)