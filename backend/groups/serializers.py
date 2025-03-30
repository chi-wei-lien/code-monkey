from rest_framework import serializers
from groups.models import Group, GroupInvite

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name', 'group_id', 'created_at', 'member_limit', 'member_count']

class GroupInviteSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()
    to_user = serializers.StringRelatedField()

    class Meta:
        model = GroupInvite
        fields = ['created_by', 'to_user', 'group_id', 'created_at']