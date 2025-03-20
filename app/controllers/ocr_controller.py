from controllers.base_controller import BaseController
from services.ocr_service import OcrService

class OcrController(BaseController):
    def __init__(self):
        self.ocr_service = OcrService()

    def extract_text(self, data):
        try:
            # Extract text from image
            image_path = data.get("imagePath")
            text = self.ocr_service.extract_text(image_path)
            return {
                "status": "success",
                "message": "Text extracted successfully",
                "data": {"text": text}
            }

        except Exception as e:
            return {
                "status": "error",
                "message": f"Error extracting text: {str(e)}",
                "data": None
            }