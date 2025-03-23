# serializers.py
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Answer, Chapter, Question, QuizResult, Student, Parent, Enrollment, Teacher

User = get_user_model()

# --------------------------
# Authentication Serializers
# --------------------------
class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Students and parents register normally.
    Teachers are created with is_staff=False and is_active=False by default.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role', 'first_name', 'last_name')

    def create(self, validated_data):
        role = validated_data.get('role', 'student')

        # Create the user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            role=role,
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            password=validated_data['password']
        )

        # Create profile based on role
        if role == 'teacher':
            user.is_staff = False  # Teacher should not have staff privileges by default
            user.is_active = False  # Teacher should be inactive until approved
            user.save()
            Teacher.objects.create(user=user)

        elif role == 'student':
            Student.objects.create(user=user)

        elif role == 'parent':
            Parent.objects.create(user=user)

        return user

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer to represent user data.
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'first_name', 'last_name', 'is_active','date_joined','date_of_birth','phone', 'address','profile_picture')


# --------------------------
# Dashboard Serializers
# --------------------------

class EnrollmentSerializer(serializers.ModelSerializer):
    """
    Serializer for Enrollment model.
    Assumes Enrollment has fields: id, course, status, enrolled_at.
    """
    class Meta:
        model = Enrollment
        fields = ('id', 'course', 'status', 'enrolled_at')

class StudentDashboardSerializer(serializers.ModelSerializer):
    """
    Serializer for the student dashboard.
    Includes user details and a list of enrollments.
    """
    user = UserSerializer(read_only=True)
    enrollments = EnrollmentSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'user', 'grade', 'enrollment_date', 'emergency_contact', 'enrollments')

class ChildSerializer(serializers.ModelSerializer):
    """
    Serializer for a student (child) used in the parent dashboard.
    """
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = ('id', 'user', 'grade', 'enrollment_date')

class ParentDashboardSerializer(serializers.ModelSerializer):
    """
    Serializer for the parent dashboard.
    Includes user details and a list of their children.
    Note: This assumes the related name for the reverse relation from Student is 'children'.
    """
    user = UserSerializer(read_only=True)
    children = ChildSerializer(many=True, read_only=True)
    
    class Meta:
        model = Parent
        fields = ('id', 'user', 'occupation', 'relationship', 'children')

from rest_framework import serializers
from .models import Student, Course, Assignment, Submission, Quiz

class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'user', 'grade', 'enrollment_date']

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ["id", "title", "content", "video_url", "duration", "order"]
class CourseSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source="teacher.user.get_full_name", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ["id", "title", "description", "course_img", "difficulty", "created_at", "updated_at",
                "is_published", "price", "teacher_name", "category_name", "chapters"]


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'course', 'title', 'description', 'due_date', 'max_score', 'allowed_file_types']
        
class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        # Note: the student field is read-only; it’s set from the authenticated user.
        fields = ['id', 'assignment', 'student', 'file', 'feedback', 'score', 'submitted_at']
        read_only_fields = ['student', 'submitted_at', 'feedback', 'score']

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'course', 'title', 'teacher']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "text"]

# ✅ Serializer for Question Model
class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = "__all__"

# ✅ Serializer for Quiz Model
class QuizSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source="teacher.username", read_only=True)

    class Meta:
        model = Quiz
        fields = ["id", "title", "teacher_name"]

# ✅ Serializer for Quiz Result
class QuizResultSerializer(serializers.ModelSerializer):
    percentage = serializers.SerializerMethodField()
    total_questions = serializers.SerializerMethodField()
    result_message = serializers.SerializerMethodField()
    quiz_title = serializers.CharField(source='quiz.title', read_only=True)  

    class Meta:
        model = QuizResult
        fields = ['id', 'user', 'quiz','quiz_title', 'score', 'percentage', 'total_questions', 'result_message', 'completed_at']

    def get_percentage(self, obj):
        total_questions = obj.quiz.questions.count()
        return (obj.score / total_questions) * 100 if total_questions > 0 else 0
    
    def get_total_questions(self, obj):
        return obj.quiz.questions.count()  # تأكد أن QuizResult مرتبط بـ Quiz بشكل صحيح

    def get_result_message(self, obj):
        total = self.get_total_questions(obj)
        return f"لقد حصلت على {obj.score} من {total} سؤالًا صحيحًا."

class BarcodeImageSerializer(serializers.Serializer):
    image = serializers.ImageField()