from django.contrib import admin
from .models import Question, MarkQuestion

admin.site.register(Question)
admin.site.register(MarkQuestion)