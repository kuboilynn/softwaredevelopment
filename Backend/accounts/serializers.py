from rest_framework import serializers
#from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from . models import *
#User = get_user_model()


class UserSerialiser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "password", "last_name", "last_login", "date_joined"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class UserProfileSerialiser(serializers.ModelSerializer):
    user = UserSerialiser(read_only=True)

    class Meta:
        model = UserProfile
        fields = "__all__"
        #depth = 1
