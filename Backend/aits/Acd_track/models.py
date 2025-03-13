from django.db import models
from django.contrib.auth.models import User

class Students(models.Model):  
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):  
        return self.user.first_name + " " + self.user.last_name  
         
        
class Lecture(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"
    

    
class Submission(models.Model):
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    submission_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='submissions/')
    score = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.student}'s submission for {self.assignment}"
    

class Registrar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"    


class Notification(models.Model):
    user = models.ForeignKey(Lecture, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class FileUpload(models.Model):
    user = models.ForeignKey(Students, on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    user = models.ForeignKey(Students, on_delete=models.CASCADE)
    file_upload = models.ForeignKey(FileUpload, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Complaint(models.Model):
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    description = models.TextField()