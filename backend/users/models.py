from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):    
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
