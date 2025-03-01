from django.contrib import admin
from .models import Topic
from .models import Students
from .models import Lecture
from .models import Submission

# Register your models here.
admin.site.register(Topic)
admin.site.register(Students)
admin.site.register(Lecture)
admin.site.register(Submission)
