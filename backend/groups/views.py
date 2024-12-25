from groups.models import Group, PartOfGroup
from groups.serializers import GroupSerializer
from rest_framework.decorators import api_view
from django.http import JsonResponse


@api_view(['GET'])
def get_groups(request):
    part_of_groups = PartOfGroup.objects.filter(user_id=request.user)
    group_ids = part_of_groups.values_list('group_id', flat=True)
    groups = Group.objects.filter(group_id__in=group_ids)
    serializer = GroupSerializer(groups, many=True)
    return JsonResponse({'data': serializer.data})