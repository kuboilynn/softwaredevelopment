from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Issue, Department

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','usernae','email','password']
        extra_kwargs = {'password': {'write only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fiels = ['id', 'student', 'lecturer', 'department', 'issue_type', 'description', 'status', 'created_at', 'updated_at']


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']
        

