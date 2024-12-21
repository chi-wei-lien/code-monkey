from rest_framework import serializers
from questions.models import Question, MarkQuestion

class QuestionSerializer(serializers.ModelSerializer):
    posted_by = serializers.StringRelatedField()
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['q_id', 'name', 'link', 'posted_by', 'posted_time', 'is_completed']
    
    def get_is_completed(self, obj):
        user = self.context.get('request').user

        if not user.is_authenticated:
            return False

        return MarkQuestion.objects.filter(
            user_id=user,
            q_id=obj,
            done=True
        ).exists()


class MarkQuestionSerializer(serializers.ModelSerializer):
    username = serializers.StringRelatedField(source='user_id')
    class Meta:
        model = MarkQuestion
        fields = ['username', 'q_id', 'difficulty', 'done']
