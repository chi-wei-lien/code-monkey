from django.db import models

class Solution(models.Model):    
    name = models.CharField(max_length=255)
    q_id = models.ForeignKey('questions.Question', on_delete=models.CASCADE, blank=True, null=True)
    lang_name = models.ForeignKey('languages.Language', on_delete=models.SET_NULL, null=True)
    code = models.TextField()