from django.db import models
from django.contrib.auth.models import User

    
class Submission(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    submission_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='submissions/')
    score = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.student}'s submission for {self.student.get_full_name()}"
      

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)