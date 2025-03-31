from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# تسجيل نموذج المستخدم مع عرض مخصص
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'role')
    list_filter = ('role', 'is_staff', 'is_superuser')

# إدارة الطلاب
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'grade', 'enrollment_date')
    search_fields = ('user__username', 'user__email', 'grade')
    list_filter = ('grade', 'enrollment_date')


# إدارة أولياء الأمور
@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    list_display = ('user', 'relationship', 'occupation')
    search_fields = ('user__username', 'user__email')
    list_filter = ('relationship',)
@admin.register(AproveUser)
class ParentAdmin(admin.ModelAdmin):
    list_display = ('user',  'active')
    search_fields = ('user__username', 'user__email')
    list_filter = ('active',)

# إدارة المدرسين
@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('user', 'subjects', 'hire_date', 'is_active')
    search_fields = ('user__username', 'user__email', 'subjects')
    list_filter = ('is_active', 'hire_date')

# إدارة بطاقات الهوية للطلاب
@admin.register(StudentID)
class StudentIDAdmin(admin.ModelAdmin):
    list_display = ('student', 'barcode', 'is_active')
    search_fields = ('student__user__username', 'barcode')
    list_filter = ('is_active',)

# إدارة الفئات الدراسية
@admin.register(CourseCategory)
class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)

# إدارة الدورات
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'teacher', 'category', 'difficulty', 'created_at', 'is_published')
    search_fields = ('title', 'teacher__user__username', 'category__title')
    list_filter = ('difficulty', 'is_published', 'created_at')

# إدارة الفصول
@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'order')
    search_fields = ('title', 'course__title')
    list_filter = ('course',)

# إدارة التسجيلات في الدورات
@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'status', 'enrolled_at')
    search_fields = ('student__user__username', 'course__title')
    list_filter = ('status',)

# إدارة الاختبارات
@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'teacher')
    search_fields = ('title', 'course__title', 'teacher__username')

@admin.register(Question)
class QuessionAdmin(admin.ModelAdmin):
    list_display = ('quiz', 'text')
    search_fields = ('text', 'quiz')

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('question', 'text', 'is_correct')
    search_fields = ('text', 'question')

@admin.register(QuizResult)
class QuizResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'score', 'completed_at')
    search_fields = ('user', 'question')
# إدارة التكليفات
@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'due_date', 'max_score')
    search_fields = ('title', 'course__title')
    list_filter = ('due_date',)

# إدارة تسليمات الطلاب
@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('student', 'assignment', 'submitted_at', 'score')
    search_fields = ('student__username', 'assignment__title')
    list_filter = ('submitted_at',)

# إدارة الحضور
@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'scan_time', 'method')
    search_fields = ('student__user__username', 'course__title')
    list_filter = ('scan_time', 'method')

# إدارة التعليقات
@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('teacher', 'parent', 'student', 'course', 'feedback_type', 'created_at', 'read')
    search_fields = ('teacher__user__username', 'parent__user__username', 'student__user__username')
    list_filter = ('feedback_type', 'created_at', 'read')

# تخصيص واجهة لوحة التحكم
admin.site.site_header = "لوحة تحكم النظام التعليمي"
admin.site.site_title = "إدارة LMS"
admin.site.index_title = "مرحبًا بك في لوحة تحكم LMS"
