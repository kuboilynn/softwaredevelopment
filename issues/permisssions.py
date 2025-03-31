from rest_framework import permissions

class IsStudent(permissions.BasePermission):
    """Permission for students to only create and view their own issues."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'

    def has_object_permission(self, request, view, obj):
        return obj.student == request.user  # Only the issue creator can access

class IsLecturerOrRegistrar(permissions.BasePermission):
    """Permission for lecturers and academic registrars to only manage assigned issues."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['lecturer', 'registrar']

    def has_object_permission(self, request, view, obj):
        return obj.assigned_to == request.user  # Can only manage assigned issues
