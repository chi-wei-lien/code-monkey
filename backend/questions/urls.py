from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_questions, name='get_questions'),
    path('mark', views.get_mark_questions, name='get_mark_questions'),
    path('mark-question', views.mark_question, name='mark_question'),
    path('add-question', views.add_question, name='add_question')
]