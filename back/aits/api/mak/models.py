from django.db import models

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=300, default="")
    price = models.FloatField(default=0.0)
    image = models.ImageField(upload_to="products/", default="products/item.png")
    
    def __str__(self):
        return self.name