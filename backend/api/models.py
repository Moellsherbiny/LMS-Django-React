from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
from django.contrib.auth.models import Group, Permission

def current_time():
    return timezone.now()

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('parent', 'Parent'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    date_of_birth = models.DateField(null=True, blank=True)
    phone = PhoneNumberField(region='EG', null=True, blank=True)  
    address = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['role']),
            models.Index(fields=['last_name', 'first_name']),
        ]

    def __str__(self):
        return f"{self.get_full_name()} ({self.role})"

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile', limit_choices_to={'role': 'student'})
    parent = models.ForeignKey('Parent', on_delete=models.SET_NULL, null=True, blank=True, related_name='children')
    grade = models.CharField(max_length=50, blank=True, null=True)
    emergency_contact = PhoneNumberField(region='EG', null=True, blank=True)
    enrollment_date = models.DateField(default=current_time)

    class Meta:
        verbose_name_plural = "الطلاب"
        ordering = ['-enrollment_date']

    def __str__(self):
        return f"{self.user.get_full_name()} الطالب"

    def save(self, *args, **kwargs):
        if self.user.role != 'student':
            raise ValueError("User must have 'student' role")
        super().save(*args, **kwargs)

class Parent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='parent_profile', limit_choices_to={'role': 'parent'})
    occupation = models.CharField(max_length=100, null=True, blank=True)
    relationship = models.CharField(max_length=50, choices=[
        ('father', 'Father'),
        ('mother', 'Mother'),
        ('guardian', 'Guardian'),
    ] , default='father')

    class Meta:
        verbose_name_plural = "أولياء الأمور"

    def __str__(self):
        return f"{self.user.get_full_name()} ولي الأمر"

    def save(self, *args, **kwargs):
        if self.user.role != 'parent':
            raise ValueError("User must have 'parent' role")
        super().save(*args, **kwargs)

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile', null=True)
    qualifications = models.TextField(blank=True, null=True)
    subjects = models.CharField(max_length=200, null=True, blank=True)
    hire_date = models.DateField(default=current_time)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "المدرسين"
        ordering = ['-hire_date']

    def __str__(self):
        return self.user.get_full_name()

    def save(self, *args, **kwargs):
        if self.user.role != 'teacher':
            raise ValueError("User must have 'teacher' role")
        self.user.is_staff = True
        self.user.save()

        # إضافة المستخدم إلى مجموعة المدرسين
        teacher_group, created = Group.objects.get_or_create(name="Teachers")
        self.user.groups.add(teacher_group)
        super().save(*args, **kwargs)

        super().save(*args, **kwargs)
    def total_teacher_courses(self):
        return Course.objects.filter(teacher=self).count()

    def total_teacher_chapters(self):
        return Chapter.objects.filter(course__teacher=self).count()

    def total_teacher_students(self):
        return Enrollment.objects.filter(course__teacher=self).count()

class StudentID(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE)
    id_card = models.ImageField(upload_to='student_ids/')
    barcode = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"ID for {self.student.user.get_full_name()}"

class CourseCategory(models.Model):  
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        verbose_name_plural = "المجالات"
        ordering = ['title']

    def __str__(self):
        return self.title

class Course(models.Model):
    DIFFICULTY_LEVELS = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    category = models.ForeignKey(CourseCategory, on_delete=models.SET_NULL, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="courses")
    title = models.CharField(max_length=150)
    description = models.TextField(default='Course Description')
    course_img = models.ImageField(upload_to="course_imgs/" ,blank=True, null=True)
    difficulty = models.CharField(max_length=12, choices=DIFFICULTY_LEVELS, default='beginner')
    created_at = models.DateTimeField(default=current_time)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)

    class Meta:
        verbose_name_plural = "المواد التعليمية"
        ordering = ['-created_at']
        unique_together = ['title', 'teacher']

    def __str__(self):
        return f"{self.title} by {self.teacher.user.get_full_name()}"

class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="chapters")
    title = models.CharField(max_length=150)
    content = models.TextField(default="")
    video_url = models.URLField(null=True, blank=True)
    assignment = models.TextField(null=True, blank=True, max_length=255)
    duration = models.PositiveIntegerField(help_text="Duration in minutes", default=0)
    order = models.PositiveIntegerField(default=1)
    resources = models.FileField(upload_to='chapter_resources/', null=True, blank=True)

    class Meta:
        verbose_name_plural = "فصول الدورات"
        

    def __str__(self):
        return f"{self.order}. {self.title} - {self.course.title}"

class Enrollment(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('dropped', 'Dropped'),
    ]

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrollments")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="enrollments")
    enrolled_at = models.DateTimeField(default=current_time)
    status = models.CharField(max_length=9, choices=STATUS_CHOICES, default='active')
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name_plural = "تسجيل المادة"
        unique_together = ['course', 'student']

    def __str__(self):
        return f"{self.student} in {self.course} ({self.status})"

class Quiz(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=255)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})

    class Meta:
        verbose_name_plural = "الاختبارات"
    def __str__(self):
        return self.title


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()

    def __str__(self):
        return self.text[:50]

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

class QuizResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_results')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='results')
    score = models.FloatField()
    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} - {self.score}"
class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=255)
    description = models.TextField()
    due_date = models.DateTimeField()
    max_score = models.PositiveIntegerField(default=10)
    allowed_file_types = models.CharField(
        blank=True, null=True,
        max_length=100,
        default='pdf,doc,docx,txt',
        help_text="Comma-separated list of allowed file extensions"
    )

    class Meta:
        verbose_name_plural = "التكليفات"
        ordering = ['due_date']

    def __str__(self):
        return f"{self.title} - {self.course.title}"

class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    file = models.FileField(upload_to='submissions/')
    feedback = models.TextField(null=True, blank=True)
    score = models.PositiveIntegerField(default=0)
    submitted_at = models.DateTimeField(default=current_time)

    class Meta:
        verbose_name_plural = "حل الطلاب للتكليفات"

    def __str__(self):
        return f"Submission by {self.student.username} for {self.assignment.title}"

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True , blank=True)
    scan_time = models.DateTimeField(default=current_time)
    barcode = models.CharField(max_length=100 , default="")
    method = models.CharField(max_length=20, default="scan", choices=[('manual', 'Manual'), ('scan', 'Barcode Scan')])

    def __str__(self):
        return f"{self.student} attendance at {self.scan_time}"

class Feedback(models.Model):
    FEEDBACK_TYPES = [
        ('academic', 'Academic Performance'),
        ('behavior', 'Behavior'),
        ('attendance', 'Attendance'),
    ]
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    parent = models.ForeignKey(Parent, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE , null=True, blank=True)
    feedback_type = models.CharField(max_length=20, choices=FEEDBACK_TYPES , default='academic')
    message = models.TextField()
    created_at = models.DateTimeField(default=current_time)
    read = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "تعليقات المدرسين"

    def __str__(self):
        return f"Feedback for {self.student.user.get_full_name()}"