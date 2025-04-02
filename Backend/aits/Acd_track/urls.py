from django.urls import path
from .import views

urlpatterns=[
    path('',views.homeview, name='homeview'),
    path('students',views.student_login, name='student_login'),
    path('lectures/',views. lecture_detail, name='lecture-list'),
    path('lectures/<int:pk>/', views.lecture_detail, name='lecture-detail'),
    path('submissions/', views.submission_list, name='submission-list'),
    path('submissions/<int:pk>/', views.submission_detail, name='submission-detail'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('notifications/', views.create_notification, name='notification-create'),
    path('uploads/', views.upload_file, name='file-upload'),
    path('comments/', views.add_comment, name='comment-create'),
    path('approve-changes/<int:complaint_id>/', views.approve_changes, name='approve_changes'),


]