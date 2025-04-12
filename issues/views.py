from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from .models import UserProfile, Department, Issue
from .serializers import UserProfileSerializer, DepartmentSerializer, IssueSerializer
from .permisssions import IsStudent, IsLecturerOrRegistrar
from django_filters.rest_framework import DjangoFilterBackend
from django.core.mail import send_mail

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
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['status', 'department']  # Allow filtering by status & department
    search_fields = ['title', 'description']  # Allow searching in title/description
    ordering_fields = ['created_at']  # Allow ordering by date

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

    def perform_update(self, serializer):
        """Only staff can update status."""
        user = self.request.user
        old_issue = Issue.objects.get(pk=self.kwargs["pk"])  # Get the issue before updating
        updated_issue = serializer.save()

        if 'status' in serializer.validated_data and user.role not in ['lecturer', 'registrar']:
            raise permissions.PermissionDenied("Only lecturers or registrars can update issue status.")
        serializer.save()    

        # Check if the status changed
        if old_issue.status != updated_issue.status:
            self.notify_student(updated_issue)

    def notify_student(self, issue):
        """Send an email when the issue's status changes."""
        subject = f"Issue '{issue.title}' Status Update"
        message = f"Dear {issue.student.username},\n\n" \
                  f"Your issue titled '{issue.title}' has been updated to '{issue.status}'.\n" \
                  f"You can check the details in the issue tracking system.\n\n" \
                  f"Best regards,\nAcademic Issue Tracking System"

        recipient_email = issue.student.email
        send_mail(subject, message, "your_email@gmail.com", [recipient_email])
        print(f"Email sent to {recipient_email}: {message}")  # Debugging log

        