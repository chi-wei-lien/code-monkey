from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_groups, name='get_groups'),
    path('get-group', views.get_group, name='get_group'),
    path('create-group', views.create_group, name='create_group'),
    path('get-group-stats', views.get_group_stats, name='get_group_stats'),
    path('invite-to-group', views.invite_to_group, name='invite_to_group')
]