from django.contrib import admin
from .models import Question, MarkQuestion, LikeQuestion

admin.site.register(Question)
admin.site.register(MarkQuestion)
admin.site.register(LikeQuestion)