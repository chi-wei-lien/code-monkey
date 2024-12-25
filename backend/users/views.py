from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError
from users.serializers import UserSerializer
from users.models import User
from rest_framework.permissions import AllowAny
from groups.models import Group, PartOfGroup

def get_init_tokens(user):
    refresh = RefreshToken.for_user(user)
    refresh['username'] = user.username
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data['username']
    password = request.data['password']

    if username is None or password is None:
        raise ValidationError("username and password must be provided")

    if User.objects.filter(username=username).exists():
        raise ValidationError("username already used")

    user = User.objects.create_user(
        username=request.data['username'],
        password=request.data['password'],
    )
    user.save()
    tokens = get_init_tokens(user)
    return JsonResponse(tokens)
    
@api_view(['GET'])
def get_users(request):
    group_id = request.GET.get('group_id')
    u_ids = PartOfGroup.objects.filter(group_id=group_id).values_list('user_id', flat=True)
    users = User.objects.exclude(username='admin').filter(id__in=u_ids)
    serializer = UserSerializer(users, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
def hello_world(request):
    return JsonResponse({'data': 'hello world'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_login(request):
    return JsonResponse({'data': "logged in"})