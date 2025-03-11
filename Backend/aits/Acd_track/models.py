from django.db import models


class Topic (models.Model):
    text = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now_add= True)

    def _str_(self):
        return self.text
    
class Students(models.Model):  
    first_name = models.CharField(max_length=200)  
    last_name = models.CharField(max_length=200)   
    reg_no = models.CharField(max_length=10)   
    mobile_no = models.CharField(max_length=10)  
  
    def __str__(self):  
        return self.first_name + " " + self.last_name  
        

class Lecture(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

    
class Submission(models.Model):
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    submission_date = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='submissions/')
    score = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.student}'s submission for {self.assignment}"
    

class Registrar(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    department = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.first_name} {self.last_name}"    


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