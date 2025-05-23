
from django.contrib.auth import login,authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes,parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import *
from . models import*
from .serializers import SubmissionsSerializer,NotificationSerializer
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.mail import EmailMessage
from django.conf import settings

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def api_endpoints_view(request):
    endpoints = {
        "register": "/accounts/register",
        "login": "/accounts/login",
        "activate account": "/accounts/activate/<str:uidb64>/<str:token>",
        "token refresh": "/accounts/token/refresh",
        "profile": "/accounts/profile",
        "request password reset": "/accounts/request-password-reset",
        "reset password": "/accounts/reset-password/<str:uidb64>/<str:token>",
        "submissions": "/submissions",
        "submission detail": "/submissions/<int:pk>",
        "notifications": "/notifications",
        "notification detail": "/notifications/<int:pk>"
    }
    return Response(endpoints)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def submission_list(request):
    if request.method == 'GET':
        submissions = Submission.objects.all()
        serializer = SubmissionsSerializer(submissions, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        print(request.data)
        serializer = SubmissionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def submission_detail(request, pk):
    try:
        submission = Submission.objects.get(pk=pk)
    except Submission.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SubmissionsSerializer(submission)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = SubmissionsSerializer(submission, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        submission.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def notification_list(request):
    if request.method == 'GET':
        notifications = Notification.objects.all().order_by('-created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def notification_detail(request, pk):
    try:
        notification = Notification.objects.get(pk=pk)
    except Notification.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NotificationSerializer(notification)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = NotificationSerializer(notification, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        notification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def send_custom_email(subject, body, to_email, from_email=None, attachments=None, html=False):
    from_email = from_email or settings.DEFAULT_FROM_EMAIL
    if isinstance(to_email, str):
        to_email = [to_email]

    email = EmailMessage(
        subject=subject,
        body=body,
        from_email=from_email,
        to=to_email,  
    )

    if html:
        email.content_subtype = "html"

    if attachments:
        for attachment in attachments:
            email.attach(*attachment)

    email.send(fail_silently=False)


@api_view(['POST'])
def send_out_detail(request):
    data = request.data
    print(data)
    if data['recipient'] == "all":
        #process sending out emails to all students
        pass
    else:
        fullNames = data['recipient'].split("-")
        sender_id = data['sender']


        from_email = User.objects.get(id=sender_id).email

        print(fullNames)
        to_email = User.objects.get(first_name = fullNames[0].strip(), last_name = fullNames[1].strip()).email
        subject = "NOTIFICATION"
        body = data['message'] 
        send_custom_email(subject, body, to_email,from_email=from_email, attachments=None, html=True)
    return Response({"message":"Email Send Successfully!"})

