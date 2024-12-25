from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_groups, name='get_groups')
]