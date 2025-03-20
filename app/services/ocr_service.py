import os
from services.base_service import BaseService
from OCR.ocr_engine import OCREngine
from PIL import Image

class OcrService(BaseService):

    def __init__(self):
        self.ocr_engine = OCREngine()
        

    def extract_text(self, image_path):
        try:
            image = Image.open(image_path)
            ocr_text = self.ocr_engine.image_to_text(image, lang='eng')
            return {
                'File': os.path.basename(image_path),
                'Original Text': ocr_text,
                'Status': 'Success'
            }
        except Exception as e:
            return {
                'File': os.path.basename(image_path),
                'Original Text': str(e),
                'Status': 'Error'
            }