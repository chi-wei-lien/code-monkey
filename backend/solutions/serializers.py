from rest_framework import serializers
from .models import Solution

class SolutionSerializer(serializers.ModelSerializer):
    posted_by = serializers.StringRelatedField()
    
    class Meta:
        model = Solution
        fields = ['s_id', 'name', 'q_id', 'lang_name', 'posted_by', 'code', 'notes', 'posted_time']