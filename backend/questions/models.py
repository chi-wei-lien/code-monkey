from django.db import models
from backend.constants import DIFF_CHOICES, MEDIUM

class MarkQuestion(models.Model):
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE)
    q_id = models.ForeignKey('questions.Question', on_delete=models.CASCADE)
    difficulty = models.IntegerField(default=MEDIUM, choices=DIFF_CHOICES)
    done = models.BooleanField(default=False)

class Question(models.Model):    
    q_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    posted_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
    posted_time = models.DateTimeField()