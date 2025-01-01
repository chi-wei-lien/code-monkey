from django.core.management.base import BaseCommand
from questions.models import Question
from datetime import timedelta
from django.utils import timezone

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        questions = Question.objects.all().order_by('-posted_time', 'q_id')

        for index, question in enumerate(questions, start=1):
            question.number = len(questions) - index + 1
            question.save()
