from flask import jsonify, request
from controllers.base_controller import BaseController
from services.predict_cat_subcat_service import PredictCatSubcatService

class PredictCatSubcatController(BaseController):
    def __init__(self):
        self.predict_cat_subcat_service = PredictCatSubcatService()

    def predict_cat_subcat(self):
        try:
            # Extract form data
            description = request.form.get("description")
            pincode = request.form.get("pincode")
            state = request.form.get("state")
            mobile_no = request.form.get("mobileNo")

            uploaded_files = request.files.getlist("uploadedFiles")
            audio_file = request.files.get("audioFile")

            # Prepare data dictionary
            complain_data = {
                "description": description,
                "state": state,
                "pincode": pincode,
                "mobileNo": mobile_no,
                "uploadedFiles": uploaded_files,
                "audioFile": audio_file,
            }

            # Call service layer
            response = self.predict_cat_subcat_service.predict_cat_subcat(complain_data)
            return jsonify(response), 201 if response["status"] == "success" else 500
        
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
