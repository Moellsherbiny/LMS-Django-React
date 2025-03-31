from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from .models import Answer, Enrollment, Question, QuizResult, Student, Course, Assignment, Submission, Quiz, AproveUser
from .permissions import IsStudent
from .serializers import (
    QuestionSerializer,
    QuizResultSerializer,
    StudentDashboardSerializer,
    ParentDashboardSerializer,
    RegisterSerializer,
    UserSerializer,
    StudentDashboardSerializer,
    CourseSerializer,
    AssignmentSerializer,
    SubmissionSerializer,
    QuizSerializer,
)
from .permissions import IsAuthenticatedFromCookie

User = get_user_model()

def set_token_cookie(response, access_token, refresh_token):
    """
    Sets authentication tokens as HTTP-only cookies.
    """
    response.set_cookie(
        key='access_token',
        value=access_token,
        httponly=True,
        secure=False,  # Change to True in production
        samesite='Lax',
        max_age=15 * 60,  # 15 minutes
    )
    response.set_cookie(
        key='refresh_token',
        value=refresh_token,
        httponly=True,
        secure=False,  # Change to True in production
        samesite='Lax',
        max_age=24 * 60 * 60,  # 1 day
    )
    return response

# Register API
class RegisterAPIView(generics.CreateAPIView):
    """
    Allows registration for students and parents.
    Teacher registration requires a valid teacher_code (handled in the serializer).
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        }, status=status.HTTP_201_CREATED)

        set_token_cookie(response, access_token, str(refresh))
        return response

class LoginView(APIView):
    """
    Authenticates the user using username and password.
    On successful authentication, sets the token in an HTTP-only cookie.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        username = request.data.get("username")
        password = request.data.get("password")
        
        if not username or not password:
            return Response(
                {"error": "Please provide both username and password"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)
        if not user:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Generate Token
        token, _ = Token.objects.get_or_create(user=user)

        # Generate Refresh Token (if using JWT)
        refresh = RefreshToken.for_user(user)

        response = Response({
            "user": UserSerializer(user).data,
        })

        # Set authentication tokens in cookies
        response.set_cookie(
            key="token",
            value=token.key,
            httponly=True,  
            secure=False,  # Set to True in production with HTTPS
            samesite="Lax"
        )
        response.set_cookie(
            key="access_token",
            value=str(refresh.access_token),
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=15 * 60  # 15 minutes
        )
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=24 * 60 * 60  # 1 day
        )
        aproveUser = AproveUser.objects.filter(user=user).first()
        if not aproveUser or not aproveUser.active:
            response.data['message'] = "برجاء الانتظار حتي يتم التفعيل من قبل الادارة"
        return response
# Get Current User API
class CurrentUserAPIView(APIView):
    permission_classes = [IsAuthenticatedFromCookie]

    def get(self, request):
        if not isinstance(request.user, User):  # التحقق من أن request.user هو كائن User
            return Response({"error": "Authentication failed"}, status=401)

        response = Response({
            "user": UserSerializer(request.user).data,
        })
        aproveUser = AproveUser.objects.filter(user=request.user).first()
        if not aproveUser or not aproveUser.active:
            response.data['message'] = "برجاء الانتظار حتي يتم التفعيل من قبل الادارة"
        return response

# Logout API
class LogoutView(APIView):
    """
    Logs out the user by deleting authentication tokens and removing cookies.
    """
    permission_classes = (IsAuthenticatedFromCookie,)

    def post(self, request, format=None):
        try:
            # Invalidate the JWT refresh token (if using JWT)
            refresh_token = request.COOKIES.get("refresh_token")
            if refresh_token:
                RefreshToken(refresh_token).blacklist()

            # Remove the token authentication (if using TokenAuthentication)
            request.user.auth_token.delete()

        except (AttributeError, Token.DoesNotExist):
            pass  # Token may not exist, just continue

        response = Response({"success": "Logged out successfully."}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response

class AvailableCourses(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CourseSerializer

    def get_queryset(self):
        # Assumes that a published course is marked with is_published=True.
        return Course.objects.filter(is_published=True)

class AvailableAssignments(generics.ListAPIView):
    """
    Lists all assignments associated with available (published) courses.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        # Only include assignments from published courses.
        return Assignment.objects.filter(course__is_published=True)

class AvailableQuizzes(generics.ListAPIView):
    """
    Lists all quizzes associated with available (published) courses.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = QuizSerializer

    def get_queryset(self):
        # Only include quizzes from published courses.
        return Quiz.objects.filter(course__is_published=True)
    
class StudentDashboard(APIView):
    """
    Returns a dashboard with user profile, enrolled courses, assignments, and quizzes.
    Uses the User table (custom User model) directly.
    """
    permission_classes = [IsAuthenticatedFromCookie, IsStudent]

    def get(self, request):
        # Use the authenticated user object directly.
        user = request.user

        # Access the related student profile (if needed for enrollment queries).
        # This assumes that your custom User model has a reverse relation named "student_profile".
        student_profile = getattr(user, 'student_profile', None)
        if not student_profile:
            return Response({"error": "Student profile not found."}, status=status.HTTP_404_NOT_FOUND)

        dashboard_data = {
            "user": UserSerializer(user).data,
            "courses": CourseSerializer(
                Course.objects.filter(enrollments__student=student_profile),
                many=True
            ).data,
            "assignments": AssignmentSerializer(
                Assignment.objects.filter(course__enrollments__student=student_profile),
                many=True
            ).data,
            "quizzes": QuizSerializer(
                Quiz.objects.filter(course__enrollments__student=student_profile),
                many=True
            ).data,
        }
        return Response(dashboard_data, status=status.HTTP_200_OK)

class StudentCourses(generics.ListAPIView):
    """
    Lists all courses in which the student (user) is enrolled.
    """
    permission_classes = [IsAuthenticatedFromCookie, IsStudent]
    serializer_class = CourseSerializer

    def get_queryset(self):
        user = self.request.user
        student_profile = getattr(user, 'student_profile', None)
        if not student_profile:
            return Course.objects.none()
        return Course.objects.filter(enrollments__student=student_profile)

class StudentAssignmentsList(generics.ListAPIView):
    """
    Lists all assignments for courses the student (user) is enrolled in.
    """
    permission_classes = [IsAuthenticatedFromCookie, IsStudent]
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        user = self.request.user
        student_profile = getattr(user, 'student_profile', None)

        if not student_profile:
            return Assignment.objects.none()
        return Assignment.objects.filter(course__enrollments__student=student_profile)

class StudentAssignmentDetail(generics.RetrieveAPIView):
    """
    Retrieves details of a specific assignment.
    """
    permission_classes = [IsAuthenticatedFromCookie, IsStudent]
    serializer_class = AssignmentSerializer
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        student_profile = getattr(user, 'student_profile', None)
        if not student_profile:
            return Assignment.objects.none()
        return Assignment.objects.filter(course__enrollments__student=student_profile)

class StudentAssignmentSubmission(generics.CreateAPIView):
    """
    Endpoint for a student to submit an assignment.
    """
    permission_classes = [IsAuthenticatedFromCookie, IsStudent]
    serializer_class = SubmissionSerializer

    def perform_create(self, serializer):
        # We use the user object directly. If the Submission model still expects a Student,
        # pass in the related student profile (if available) or update the model accordingly.
        user = self.request.user
        student_profile = getattr(user, 'student_profile', None)
        if not student_profile:
            return
            # raise serializers.ValidationError("Student profile not found.")
        serializer.save(student=user)  # Or serializer.save(student=student_profile) if the field expects a Student instance

# ✅ قائمة جميع الاختبارات المتاحة للطالب
class StudentQuizzesListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticatedFromCookie, IsStudent]
    serializer_class = QuizSerializer

    def get_queryset(self):
        user = self.request.user
        student_profile = getattr(user, 'student_profile', None)
        if not student_profile:
            return Quiz.objects.none()
        return Quiz.objects.filter(course__enrollments__student=student_profile)


# ✅ تفاصيل اختبار معين للطالب
class StudentQuizDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticatedFromCookie, IsStudent]
    serializer_class = QuizSerializer
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        student_profile = getattr(user, 'student_profile', None)
        if not student_profile:
            return Quiz.objects.none()
        return Quiz.objects.filter(course__enrollments__student=student_profile)


# ✅ عرض جميع الاختبارات الخاصة بدورة معينة
class QuizListView(generics.ListAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticatedFromCookie]

    def get_queryset(self):
        course_id = self.kwargs["course_id"]
        return Quiz.objects.filter(course_id=course_id)


# ✅ عرض جميع الأسئلة الخاصة باختبار معين
class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticatedFromCookie]

    def get_queryset(self):
        quiz_id = self.kwargs["quiz_id"]
        return Question.objects.filter(quiz_id=quiz_id)


# ✅ إرسال إجابات الطالب وحساب النتيجة
class SubmitQuizView(generics.CreateAPIView):
    serializer_class = QuizResultSerializer
    permission_classes = [IsAuthenticatedFromCookie]

    def create(self, request, *args, **kwargs):
        user = request.user
        quiz_id = self.kwargs["quiz_id"]
        answers_data = request.data.get("answers", [])

        # 🔹 التحقق من وجود الاختبار وصحة بيانات المستخدم
        quiz = get_object_or_404(Quiz, id=quiz_id)

        # 🔹 التأكد من أن الطالب مسجل في الدورة
        if not quiz.course.enrollments.filter(student=user.student_profile).exists():
            return Response({"error": "أنت غير مسجل في هذه الدورة."}, status=status.HTTP_403_FORBIDDEN)

        total_questions = Question.objects.filter(quiz=quiz).count()
        if total_questions == 0:
            return Response({"error": "لا توجد أسئلة في هذا الاختبار."}, status=status.HTTP_400_BAD_REQUEST)

        score = 0

        for answer in answers_data:
            question_id = answer.get("question_id")
            selected_answer_id = answer.get("answer_id")

            # 🔹 التحقق من صحة السؤال والإجابة
            question = get_object_or_404(Question, id=question_id, quiz=quiz)
            correct_answer = Answer.objects.filter(question=question, is_correct=True).first()

            if correct_answer and selected_answer_id == correct_answer.id:
                score += 1

        # 🔹 حساب النسبة النهائية
        percentage = (score / total_questions) * 100

        # 🔹 تخزين النتيجة
        quiz_result = QuizResult.objects.create(
            user=user,
            quiz=quiz,
            score=score
        )

        return Response(QuizResultSerializer(quiz_result).data, status=status.HTTP_201_CREATED)

class QuizResultsListAPIView(generics.ListAPIView):
    """
    Lists all assignments for courses the student (user) is enrolled in.
    """
    permission_classes = [IsAuthenticatedFromCookie, IsStudent]
    serializer_class = QuizResultSerializer

    def get_queryset(self):
        user = self.request.user
        student_profile = getattr(user, 'student_profile', None)

        if not student_profile:
            return QuizResult.objects.none()
        return QuizResult.objects.filter(user=self.request.user)    

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.filter(is_published=True)  # جلب الدورات المنشورة فقط
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]  # يمكن لأي شخص رؤية تفاصيل الدورة

    def get(self, request, *args, **kwargs):
        course = self.get_object()
        user = request.user if request.user.is_authenticated else None
        
        # تحقق مما إذا كان المستخدم مسجلاً في الدورة
        enrolled = False
        if user and hasattr(user, "student"):  # التحقق من كون المستخدم طالبًا
            enrolled = Enrollment.objects.filter(course=course, student=user.student, status="active").exists()

        return Response({
            "course": CourseSerializer(course, context={"request": request}).data,
            "enrolled": enrolled
        })


class EnrollCourseView(APIView):
    permission_classes = [IsAuthenticatedFromCookie]

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        student = Student.objects.filter(user=self.request.user.id).first()
        # تأكد أن المستخدم لديه حساب طالب
        if not student:
            return Response({"error": "You must be a student to enroll in courses."}, status=status.HTTP_400_BAD_REQUEST)

        # تحقق مما إذا كان الطالب مسجلاً بالفعل
        enrollment, created = Enrollment.objects.get_or_create(course=course, student=student)

        if not created:
            return Response({"message": "You are already enrolled in this course."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Successfully enrolled!", "enrolled": True})