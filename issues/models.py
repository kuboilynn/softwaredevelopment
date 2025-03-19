from django.db import models
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings

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

    class Meta:
        permissions = [
            ("can_view_issues", "Can view issues"),
            ("can_resolve_issues", "Can resolve issues"),
            ("can_assign_issues", "Can assign issues"),
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
    
    def save(self, *args, **kwargs):
        if self.pk: #check if the isuue is being updated
            old_issue = Issue.objects.get(pk=self.pk)
            if old_issue.status != self.status:
                send_mail(
                    f'Issue Status Update: {self.issue_type}',
                    f'Your issue status has been updated to {self.status}',
                    settings.EMAIL_HOST_USER,
                    [self.student.email],
                    fail_silently=False,
                )
        super().save(*args, **kwargs)
        