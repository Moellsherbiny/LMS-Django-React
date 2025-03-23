from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

# from .attendance_view import BarcodeScannerView
from .views import *

router = DefaultRouter()

urlpatterns = [
    path('-', include(router.urls)),
    path("auth/register/", RegisterAPIView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("auth/user/", CurrentUserAPIView.as_view(), name="current_user"),

    path('courses/', AvailableCourses.as_view(), name='available-courses'),
    path("courses/<int:pk>/", CourseDetailView.as_view(), name="course-detail"),
    path('mycourses/', StudentCourses.as_view(), name='student-courses'),
    path("courses/<int:course_id>/enroll/", EnrollCourseView.as_view(), name="enroll-course"),
    path('assignments/', AvailableAssignments.as_view(), name='available-assignments'),
    path('quizzes/', AvailableQuizzes.as_view(), name='available-quizzes'),

    path('dashboard/', StudentDashboard.as_view(), name='student-dashboard'),
    path('my-assignments/', StudentAssignmentsList.as_view(), name='student-assignments'),
    path('assignments/<int:id>/', StudentAssignmentDetail.as_view(), name='student-assignment-detail'),
    path('assignments/<int:id>/submit/', StudentAssignmentSubmission.as_view(), name='student-assignment-submit'),
    path('myquizzes/', StudentQuizzesListAPIView.as_view(), name='student-quizzes'),
    path('my-quizzes-results/', QuizResultsListAPIView.as_view(), name='student-quizzes-results'),
    path('quiz/<int:id>/', StudentQuizDetailAPIView.as_view(), name='student-quiz-detail'),
    path("quiz/<int:quiz_id>/questions/", QuestionListView.as_view(), name="quiz-questions"),
    path("quiz/<int:quiz_id>/submit/", SubmitQuizView.as_view(), name="submit-quiz"),
    # path("scan/", BarcodeScannerView.as_view(), name="mark_attendance_by_image"),
]
