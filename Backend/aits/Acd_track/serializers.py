
from django.contrib.auth.models import User
from rest_framework import  serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff']
        

class SubmissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model =Submission
        fields = "__all__"
        depth = 1


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        depth = 1