from django.contrib.auth import login,authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def homeview(request):
    data = {}
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def loginview(request):
    if request.method == 'POST':
        data = request.POST
        name =data=['Username']
        password =data['Password']
        user =authenticate(username = name, password =password)
        if user is not None:
            login(request, user)
            next = request.GET.get('next')
            if next:
                return (next)
            return Response(data, status=status.HTTP_202_ACCEPTED)
        data ={}
        return Response(data, status=status.HTTP_202_ACCEPTED)
    
