from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from . models import *
from . serialisers import *

# Create your views here.
@api_view(['GET'])
def home_view(request):
    msg = {
        "message":"Welcome to my api"
    }
    return Response(msg, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def products_view(request):
    if request.method == 'GET':
        products = Products.objects.all()
        serialiser = ProductSerialiser(products, many = True)
        return Response(serialiser.data, status=status.HTTP_200_OK)
    else:
        serialiser = ProductSerialiser(data = request.data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
def product_detail_view(request, id):
    try:
        product = Products.objects.get(pk = id)
    except Products.DoesNotExist as e:
        return Response({"err":f"{e}"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serialiser = ProductSerialiser(product)
        return Response(serialiser.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        data = request.data
        serialiser = ProductSerialiser(product, data, partial = True)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        product.delete()
        return Response({"message":"delete successful"}, status=status.HTTP_204_NO_CONTENT)    