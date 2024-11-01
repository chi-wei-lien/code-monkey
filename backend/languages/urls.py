from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_langs, name='get_langs')
]