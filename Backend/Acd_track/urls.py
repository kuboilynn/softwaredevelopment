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

from django.urls import path
from .import views

urlpatterns=[
    path('', views.api_endpoints_view, name='api-endpoints'),
    #submissions
    path('submissions', views.submission_list, name='submission-list'),
    path('submissions/<int:pk>', views.submission_detail, name='submission-detail'),

    #notifications
    path('notifications', views.notification_list, name='notification-list'),
    path('notifications/<int:pk>/', views.notification_detail, name='notification-detail'),

    #send emails
    path('send-email', views.send_out_detail, name='send_out_detail'),
]

