from django.urls import path
from .import views

urlpatterns=[
    #submissions
    path('submissions', views.submission_list, name='submission-list'),
    path('submissions/<int:pk>', views.submission_detail, name='submission-detail'),

    #notifications
    path('notifications', views.notification_list, name='notification-list'),
    path('notifications/<int:pk>/', views.notification_detail, name='notification-detail'),
]