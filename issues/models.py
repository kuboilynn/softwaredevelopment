from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Department(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Issue(models.Model):
    ISSUE_TYPES = [
        ('MISSING_MARKS', 'Missing Marks'),
        ('APPEAL', 'Appeal'),
        ('CORRECTION', 'Correction'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_issues')
    lecturer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='lecturer_issues')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    issue_type = models.CharField(max_length=50, choices=ISSUE_TYPES)
    description = models.TextField()
    status = models.CharField(max_length=50, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.issue_type} - {self.student.username}'
    