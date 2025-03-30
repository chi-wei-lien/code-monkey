from groups.models import Group, PartOfGroup, GroupInvite
from groups.serializers import GroupSerializer, GroupInviteSerializer
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.utils import timezone
from django.db import transaction
from questions.models import Question, MarkQuestion
from users.models import User
from django.db.models import Count, Q
from django.db.models.functions import TruncDate
from collections import defaultdict
from django.utils.timezone import now, timedelta
from questions.serializers import QuestionSerializer, MarkQuestionSerializer, LikeQuestionSerializer

@api_view(['GET'])
def get_groups(request):
    part_of_groups = PartOfGroup.objects.filter(user_id=request.user)
    group_ids = part_of_groups.values_list('group_id', flat=True)
    groups = Group.objects.filter(group_id__in=group_ids)
    serializer = GroupSerializer(groups, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
def get_group(request):
    group_id = request.GET.get('group_id')
    group = Group.objects.get(group_id=group_id)
    PartOfGroup.objects.get(user_id=request.user, group_id=group)
    serializer = GroupSerializer(group)
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_stats(request):
    group_id = request.GET.get('group_id')

    questions = Question.objects.filter(group_id=group_id)
    seven_days_ago = now().date() - timedelta(days=6)

    grouped_data = (
        MarkQuestion.objects.annotate(done_date=TruncDate('done_time'))
        .filter(done_date__gte=seven_days_ago, done=True)
        .values('user_id', 'done_date')
        .annotate(count=Count('q_id'))
        .order_by('done_date')
    )
    
    result = defaultdict(lambda: {
        'done_date': None
    })
    for entry in grouped_data:
        done_date = entry['done_date'].strftime('%m/%d')
        user_id = entry['user_id']
        username = User.objects.get(id=user_id).username
        user_id = entry['user_id']
        result[done_date]['done_date'] = done_date
        result[done_date][username] = entry['count']

    week_qs = Question.objects.filter(group_id=group_id, posted_time__gte=seven_days_ago)
    qs_count = week_qs.count()
    
    done_qs = MarkQuestion.objects.filter(
        q_id__in=week_qs.values_list('q_id', flat=True),
        user_id=request.user.id,
        done_time__gte=seven_days_ago,
        done=True,
    )

    done_qs_count = done_qs.count()
    done_qs_ids = done_qs.values_list('q_id', flat=True)
    not_done_qs = week_qs.exclude(q_id__in=done_qs_ids)
    qs_serializer = QuestionSerializer(not_done_qs, many=True, context={'request': request})

    return JsonResponse({
        'stack_graph_data': list(result.values()),
        'question_count': qs_count, 
        'completed_count': done_qs_count,
        'still_need': qs_serializer.data
    })



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_statistics(request):
    qs_count = Question.objects.count()
    mark_qs_count = MarkQuestion.objects.filter(user_id=request.user.id, done=True).count()
    return JsonResponse({'question_count': qs_count, 'completed_count': mark_qs_count})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def invite_to_group(request):
    group_id = request.data['group_id']
    to_user = request.data['u_id']
    
    if not User.objects.filter(id=to_user).exists():
        return JsonResponse({'error': 'user does not exist'})

    GroupInvite.objects.create(
        to_user=User.objects.get(id=to_user),
        created_by=request.user,
        created_at=timezone.now().replace(microsecond=0),
    )

    gi_serializer = GroupInviteSerializer(GroupInvite, many=True)

    return JsonResponse({'data': gi_serializer.data}, status=201)
