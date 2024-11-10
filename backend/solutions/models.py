from django.db import models

class Solution(models.Model):
    s_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    q_id = models.ForeignKey('questions.Question', on_delete=models.CASCADE, blank=True, null=True)
    lang_name = models.ForeignKey('languages.Language', on_delete=models.SET_NULL, null=True)
    posted_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True)
    code = models.TextField()
    notes = models.TextField()
    posted_time = models.DateTimeField()
    tc = models.CharField(max_length=255)
    sc = models.CharField(max_length=255)

    def __str__(self):
        return self.name