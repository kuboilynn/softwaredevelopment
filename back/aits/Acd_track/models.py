from django.db import models

# Create your models here.
class Topic (models.Model):
    text = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now_add= True)

    def _str_(self):
        return self.text
    
class Students(models.Model):  
    first_name = models.CharField(max_length=200)  
    last_name = models.CharField(max_length=200)  
    address = models.CharField(max_length=200)  
    roll_number = models.IntegerField()  
    mobile = models.CharField(max_length=10)  
  
    def __str__(self):  
        return self.first_name + " " + self.last_name  