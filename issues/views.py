from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import UserProfile, Department, Issue
from .serializers import UserProfileSerializer, DepartmentSerializer, IssueSerializer
from .permisssions import IsStudent, IsLecturerOrRegistrar
# User API View
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

# Department API View
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]

# Issue API View
class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        """Apply different permissions based on user role."""
        if self.action in ['create', 'list']:
            return [IsStudent()]  # Students can create and view their own issues
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsLecturerOrRegistrar()]  # Only lecturers/registrars can update issues
        return [permissions.IsAuthenticated()]  # Default: any logged-in user
    
    def get_queryset(self):
        """Filter issues based on user role."""
        user = self.request.user
        if user.role == 'student':
            return Issue.objects.filter(student=user)  # Students only see their own issues
        elif user.role in ['lecturer', 'registrar']:
            return Issue.objects.filter(assigned_to=user)  # Staff see assigned issues
        return Issue.objects.none()
    
    def perform_create(self, serializer):
        """Ensure only students can create issues."""
        if self.request.user.role != 'student':
            raise permissions.PermissionDenied("Only students can submit issues.")
        serializer.save(student=self.request.user)

    
