from rest_framework import serializers
from groups.models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name', 'group_id', 'created_at', 'member_limit', 'member_count']
