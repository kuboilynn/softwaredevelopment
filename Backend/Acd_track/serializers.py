
from django.contrib.auth.models import User
from rest_framework import  serializers
from django.utils.timesince import timesince
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff']
        

class SubmissionsSerializer(serializers.ModelSerializer):
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='student'
    )

    class Meta:
        model =Submission
        fields = "__all__"
        depth = 1


class NotificationSerializer(serializers.ModelSerializer):
    #created_at = serializers.DateTimeField(format="%B %d, %Y %I:%M %p")
    created_at = serializers.SerializerMethodField()
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user'
    )


    def get_created_at(self, obj):
        return timesince(obj.created_at) + " ago"
    
    class Meta:
        model = Notification
        fields = '__all__'
        depth = 1