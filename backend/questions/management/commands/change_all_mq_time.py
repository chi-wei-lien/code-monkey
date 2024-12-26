from django.core.management.base import BaseCommand
from questions.models import MarkQuestion
from datetime import timedelta
from django.utils import timezone

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        mqs = MarkQuestion.objects.all()
        for mq in mqs:
            mq.done_time = timezone.now() - timedelta(days=7)
            mq.save()
