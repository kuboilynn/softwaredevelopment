
from django.contrib.auth.models import User
from rest_framework import  serializers
from .models import Students

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']
        
class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students 
        fields = '__all__'