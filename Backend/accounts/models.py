from django.contrib.auth.models import User
from django.db import models
import os
from django.dispatch import receiver

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('Lecturer', 'Lecturer'),
        ('Registrar', 'Registrar'),
        ('Student', 'Student'),
    ]
    GENDER_TYPES = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Others", "Others"),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Student')
    program = models.CharField(max_length=300, default='', blank=True, null=True)
    session = models.CharField(max_length=300, default='', blank=True, null=True)
    gender = models.TextField(max_length=10, choices=GENDER_TYPES, default="Male")
    id_number = models.CharField(max_length=15, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to="profile_pics/", blank=True, null=True, default="profile_pics/default.png")

    def __str__(self):
        return self.user.get_full_name()
    

# Signal to delete image files when a BusCompany is deleted
@receiver(models.signals.post_delete, sender=UserProfile)
def delete_user_profile_image(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)


# ========== DELETE OLD IMAGE WHEN PRODUCT IMAGE IS UPDATED ==========
@receiver(models.signals.pre_save, sender=UserProfile)
def delete_old_image_on_update(sender, instance, **kwargs):
    if not instance.pk:  # If instance is new (not updating), do nothing
        return

    try:
        old_instance = UserProfile.objects.get(pk=instance.pk) 
    except UserProfile.DoesNotExist:
        return 

    # If image has changed and old image exists, delete old image
    if old_instance.image and old_instance.image != instance.image:
        if os.path.isfile(old_instance.image.path):
            os.remove(old_instance.image.path)