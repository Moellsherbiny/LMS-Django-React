from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from .models import Teacher, Course, Chapter, Quiz, Assignment

@receiver(post_migrate)
def create_teacher_group_permissions(sender, **kwargs):
    if sender.name != "api":  # استبدل `your_app_name` باسم التطبيق لديك
        return

    # إنشاء مجموعة المدرسين
    teacher_group, created = Group.objects.get_or_create(name="Teachers")

    # تعيين صلاحيات للمدرسين
    teacher_permissions = [
        "add_course", "change_course", "delete_course", "view_course",
        "add_chapter", "change_chapter", "delete_chapter", "view_chapter",
        "add_quiz", "change_quiz", "delete_quiz", "view_quiz",
        "add_assignment", "change_assignment", "delete_assignment", "view_assignment",
    ]

    for perm_code in teacher_permissions:
        try:
            model_name = perm_code.split("_")[-1]
            content_type = ContentType.objects.get(model=model_name)
            permission = Permission.objects.get(codename=perm_code, content_type=content_type)
            teacher_group.permissions.add(permission)
        except Permission.DoesNotExist:
            print(f"Permission {perm_code} not found")
