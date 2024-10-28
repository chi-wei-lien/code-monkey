from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('register', views.register, name='register'),
    path("", views.hello_world, name='return_hello_world'),
    path("get-users", views.get_users, name='get_users'),
    path("check_login", views.check_login, name='check_login'),
]