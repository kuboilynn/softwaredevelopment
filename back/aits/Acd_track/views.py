from django.contrib.auth import login,authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import *
from . models import*
from .serializers import LectureSerializer,StudentsSerializer,SubmissionsSerializer


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
    
@api_view(['GET','POST'])
def student_login(request):
    if request.method  == 'GET':
        result = Students.objects.all()
        serializers =StudentsSerializer(result, many=True)
        return Response({'status':'success','students':serializers.data},status=status.HTTP_202_ACCEPTED)
    elif request.method == 'POST':
        serializer =StudentsSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({'status':'sucesss','data':serializer.data},status=status.HTTP_201_CREATED)
    else:
        return Response({'status':'error','data':serializer.errors})
    



@api_view(['GET', 'POST'])
def lecture_list(request):
    if request.method == 'GET':
        lectures = Lecture.objects.all()
        serializer = LectureSerializer(lectures, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = LectureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def lecture_detail(request, pk):
    try:
        lecture = Lecture.objects.get(pk=pk)
    except Lecture.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LectureSerializer(lecture)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = LectureSerializer(lecture, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        lecture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Lecture, Submission
from .serializers import LectureSerializer, SubmissionsSerializer

@api_view(['GET', 'POST'])
def lecture_list(request):
    if request.method == 'GET':
        lectures = Lecture.objects.all()
        serializer = LectureSerializer(lectures, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = LectureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def lecture_detail(request, pk):
    try:
        lecture = Lecture.objects.get(pk=pk)
    except Lecture.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LectureSerializer(lecture)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = LectureSerializer(lecture, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        lecture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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





       