from django.urls import path
from .import views

urlpatterns=[
    path('',views.homeview, name='homeview'),
    path('login',views.login, name='login'),
     path('students',views.student_login, name='student_login'),
    path('lectures/',views. lecture_detail, name='lecture-list'),
    path('lectures/<int:pk>/', views.lecture_detail, name='lecture-detail'),
    path('submissions/', views.submission_list, name='submission-list'),
    path('submissions/<int:pk>/', views.submission_detail, name='submission-detail'),
]