from django.db import models


class Group(models.Model):
    group_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=31)
    created_at = models.DateTimeField()
    created_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True)
    member_limit = models.IntegerField(default=20)
    member_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class PartOfGroup(models.Model):
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE, blank=True, null=True)
    group_id = models.ForeignKey('groups.Group', on_delete=models.CASCADE, blank=True, null=True)
    joined_at = models.DateTimeField()

    def __str__(self):
        return f"{self.user_id} is part of group {self.group_id}"