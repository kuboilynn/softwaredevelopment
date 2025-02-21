from rest_framework import serializers
from . models import *


class ProductSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = "__all__"