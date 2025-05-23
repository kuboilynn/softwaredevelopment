from django.db import models
from django.contrib.auth.models import User

    
class Submission(models.Model):
    STATUS = (("pending", "Pending"), ("resolved", "Resolved"), ("rejected", "Rejected"))
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course_unit = models.CharField(max_length=100, default="")
    file = models.FileField(upload_to='submissions/', blank=True, null=True, default="submissions/default.png")
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=100, choices=STATUS, default="pending")
    submission_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student}'s submission for {self.student.get_full_name()}"
      

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300,  default="")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)