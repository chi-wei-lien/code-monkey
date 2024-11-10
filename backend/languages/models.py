from django.db import models

class Language(models.Model):    
    name = models.CharField(max_length=31, primary_key=True)

    def __str__(self):
        return self.name