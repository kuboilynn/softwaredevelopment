from rest_framework import serializers
from .models import UserProfile, Department, Issue

# User Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'role']

# Department Serializer
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

# Issue Serializer
class IssueSerializer(serializers.ModelSerializer):
    student = serializers.HiddenField(default=serializers.CurrentUserDefault())  # Automatically set student
    assigned_to = UserProfileSerializer(read_only=True)

    class Meta:
        model = Issue
        fields = ['id', 'title', 'description', 'department', 'issue_type', 'status', 'created_at', 'student']
        read_only_fields = ['status', 'created_at']  # Status should only be updated by staff

    def validate_status(self, value):
        """Ensure only staff can update status."""
        request = self.context['request']
        if request.method in ['PUT', 'PATCH'] and request.user.role == 'student':
            raise serializers.ValidationError("Students cannot update issue status.")
        return value
