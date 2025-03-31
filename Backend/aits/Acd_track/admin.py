from django.contrib import admin
from .models import Topic, Students, Lecture, Registrar, Notification, FileUpload, Comment
# Register your models here.
admin.site.register(Topic)
admin.site.register(Students)
admin.site.register(Lecture)
admin.site.register(Registrar)
admin.site.register(Notification)
admin.site.register(FileUpload)
admin.site.register(Comment)


