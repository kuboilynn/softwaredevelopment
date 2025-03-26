from django.contrib.auth import login,authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes,parser_classes
from .serializers import *
from . models import*
from .serializers import LectureSerializer,SubmissionsSerializer,StudentsSerializer,RegistrarSerializer,NotificationSerializer, FileUploadSerializer, CommentSerializer
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
@api_view(['GET'])
def homeview(request):
    data = {}
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user_type = request.data.get('user_type')
        user = serializer.save()

        if user_type == 'lecturer':
            Lecture.objects.create(user=user)
        elif user_type == 'student':
            Students.objects.create(user=user)
        elif user_type == 'registrar':
            Registrar.objects.create(user=user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def submission_list(request):
    if request.method == 'GET':
        submissions = Submission.objects.all()
        serializer = SubmissionsSerializer(submissions, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
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
        serializer = SubmissionsSerializer(submission, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        submission.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([permissions.IsAuthenticated])
def upload_file(request):
    serializer = FileUploadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_comment(request):
    file_upload_id = request.data.get('file_upload')
    try:
        file_upload = FileUpload.objects.get(id=file_upload_id)
    except FileUpload.DoesNotExist:
        return Response({'error': 'File upload not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user, file_upload=file_upload)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_notification(request):
    serializer = NotificationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def approve_changes(request, complaint_id):
    try:
        complaint = Complaint.objects.get(id=complaint_id)
    except Complaint.DoesNotExist:
        return Response({'error': 'Complaint not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.user.registrar:
        complaint.approved = True
        complaint.save()
       
        Notification.objects.create(
            user=complaint.student.user,
            message="Your complaint has been approved."
        )
        return Response({'message': 'Changes approved'}, status=status.HTTP_200_OK)