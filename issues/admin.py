from django.contrib import admin
from .models import Department, Issue, UserProfile

admin.site.register(Department)
admin.site.register(Issue)  
admin.site.register(UserProfile)
