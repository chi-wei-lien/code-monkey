from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_solutions, name='get_solutions'),
    path('get-solution', views.get_solution, name='get_solution'),
    path('update-solution', views.update_solution, name='update_solution'),
    path('add-solution', views.add_solution, name='add_solution'),
    path('delete-solution', views.delete_solution, name='delete_solution')
]