from groups.models import Group, PartOfGroup
from groups.serializers import GroupSerializer
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.utils import timezone
from django.db import transaction

@api_view(['GET'])
def get_groups(request):
    part_of_groups = PartOfGroup.objects.filter(user_id=request.user)
    group_ids = part_of_groups.values_list('group_id', flat=True)
    groups = Group.objects.filter(group_id__in=group_ids)
    serializer = GroupSerializer(groups, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_group(request):
    name = request.data['name']

    with transaction.atomic():
        group = Group.objects.create(
            name=name,
            created_by=request.user,
            created_at=timezone.now().replace(microsecond=0),
        )

        PartOfGroup.objects.create(
            user_id=request.user,
            group_id=group,
            joined_at=timezone.now().replace(microsecond=0)
        )

    serializer = GroupSerializer(group, context={'request': request})
    return JsonResponse({'data': serializer.data}, status=201)