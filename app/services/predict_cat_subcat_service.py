from flask import current_app
from services.base_service import BaseService

class PredictCatSubcatService(BaseService):

    def __init__(self):
        pass

    def predict_cat_subcat(self, data):
        try:
            # Predict category and subcategory
            description = data.get("description")
            prediction = current_app.infer.predict_single(description, True)
            category = prediction.get("category")
            sub_category = prediction.get("sub_category")
            return {
                "status": "success",
                "message": "Category prediction completed successfully",
                "data": {"category": category, "sub_category": sub_category}
            }

        except Exception as e:
            return {
                "status": "error",
                "message": f"Error predicting category: {str(e)}",
                "data": None
            }