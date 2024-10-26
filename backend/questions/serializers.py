from rest_framework import serializers
from questions.models import Question, MarkQuestion

class QuestionSerializer(serializers.ModelSerializer):
    posted_by = serializers.StringRelatedField()

    class Meta:
        model = Question
        fields = ['q_id', 'name', 'link', 'posted_by', 'posted_time']

class MarkQuestionSerializer(serializers.ModelSerializer):
    username = serializers.StringRelatedField(source='user_id')
    class Meta:
        model = MarkQuestion
        fields = ['username', 'q_id', 'difficulty', 'done']
