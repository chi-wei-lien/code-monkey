from django.db import models
from backend.constants import DIFF_CHOICES, NONE

class MarkQuestion(models.Model):
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE, blank=True, null=True)
    q_id = models.ForeignKey('questions.Question', on_delete=models.CASCADE, blank=True, null=True)
    difficulty = models.IntegerField(default=NONE, choices=DIFF_CHOICES)
    done = models.BooleanField(default=False)
    done_time = models.DateTimeField()

    def __str__(self):
        return f"{self.user_id} marked {self.q_id}"

class LikeQuestion(models.Model):
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE, blank=True, null=True)
    q_id = models.ForeignKey('questions.Question', on_delete=models.CASCADE, blank=True, null=True)
    like = models.BooleanField(default=False)
    like_time = models.DateTimeField()

    def __str__(self):
        if self.like:
            return f"{self.user_id} liked {self.q_id}"
        else:
            return f"{self.user_id} hasn't liked {self.q_id}"

class Question(models.Model):    
    q_id = models.AutoField(primary_key=True)
    number = models.IntegerField()
    name = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    posted_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True)
    posted_time = models.DateTimeField()
    likes = models.IntegerField(default=0)
    group_id = models.ForeignKey('groups.Group', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    class Meta:
        indexes = [
            models.Index(fields=['posted_by'])
        ]