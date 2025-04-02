from django.contrib import admin
from .models import Topic, Students, Lecture, Registrar, Notification, FileUpload, Comment
# Register your models here.
admin.site.register(Notification)
admin.site.register(Submission)


