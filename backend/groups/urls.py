from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_groups, name='get_groups'),
    path('create-group', views.create_group, name='create_group'),
    path('get-group-stats', views.get_group_stats, name='get_group_stats')
]