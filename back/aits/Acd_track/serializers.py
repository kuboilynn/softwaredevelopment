
from django.contrib.auth.models import User
from rest_framework import  serializers
from .models import *

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']
        
class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students 
        fields = '__all__'
        
class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        models = Lecture
        fields = '__all__'
        
class SubmissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'