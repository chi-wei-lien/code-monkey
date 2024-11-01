from django.core.management.base import BaseCommand
from languages.models import Language

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        cpp = Language.objects.create(name="C++")
        cpp.save()
        python = Language.objects.create(name="Python")
        python.save()
        java = Language.objects.create(name="Java")
        java.save()
        javascrip = Language.objects.create(name="Javascript")
        javascrip.save()
