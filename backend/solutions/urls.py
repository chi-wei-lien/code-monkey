from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_solutions, name='get_solutions'),
    path('add-solution', views.add_solution, name='add_solution'),
]