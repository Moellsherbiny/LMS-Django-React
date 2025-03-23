from rest_framework.permissions import BasePermission
from rest_framework.authtoken.models import Token

class IsAuthenticatedFromCookie(BasePermission):
    """
    Custom permission to authenticate users via token stored in cookies.
    """
    def has_permission(self, request, view):
        token = request.COOKIES.get("token")  # Retrieve token from cookies
        if not token:
            return False

        try:
            user = Token.objects.get(key=token).user  # Get user linked to token
            request.user = user  # Assign the user to request
            return True
        except Token.DoesNotExist:
            return False

class IsStudent(BasePermission):
    """
    Allows access only to users with a student role.
    """
    def has_permission(self, request, view):
        # Ensure the user is authenticated and has the role 'student'
        return bool(request.user and request.user.is_authenticated and request.user.role == 'student')