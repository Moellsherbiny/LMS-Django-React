import cv2
import numpy as np
from pyzbar.pyzbar import decode
from PIL import Image
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import BarcodeImageSerializer
from rest_framework.permissions import AllowAny
from .models import StudentID, Attendance
from django.shortcuts import get_object_or_404
from rest_framework import status

def extract_barcode(image):
    """ استخراج الباركود من صورة """
    
    # تحويل الصورة إلى NumPy array ثم إلى BGR (لأن OpenCV يعمل مع BGR)
    image = Image.open(image)
    image = np.array(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # تحويل الصورة إلى تدرجات الرمادي
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # تحسين التباين
    enhanced = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

    # تجربة استخراج الباركود
    barcodes = decode(enhanced)

    # إذا لم يُكتشف أي باركود، نحاول بدون تحسين
    if not barcodes:
        barcodes = decode(gray)

    # استخراج البيانات
    barcode_data = [barcode.data.decode("utf-8") for barcode in barcodes]

    return barcode_data if barcode_data else ["لم يتم العثور على باركود"]


class BarcodeScannerView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = BarcodeImageSerializer(data=request.data)        
        if serializer.is_valid():
            image = serializer.validated_data['image']
            barcode_data = extract_barcode(image)

            student_id = get_object_or_404(StudentID, barcode=barcode_data[0])
            print(student_id.student)
            attndance = Attendance.objects.create(
                student=student_id.student,
                barcode=barcode_data[0],
                method="scan"
            )
            return Response({"message": "Attendance recorded", "barcode": barcode_data}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=400)
