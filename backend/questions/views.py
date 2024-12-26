from django.http import JsonResponse
from django.shortcuts import render
from questions.models import Question, MarkQuestion
from groups.models import Group
from users.models import User
from questions.serializers import QuestionSerializer, MarkQuestionSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.forms.models import model_to_dict
from django.db import connection
from django.utils import timezone
from itertools import product
from django.db.models import Q
from rest_framework.permissions import AllowAny
from django.utils.timezone import now
from datetime import datetime
import sys
from django.utils.dateparse import parse_datetime
from django.db.models.functions import TruncSecond

@api_view(['GET'])
@permission_classes([AllowAny])
def get_question_by_name(request):
    q_name = request.GET.get('q_name')
    questions = Question.objects.filter(name=q_name)
    if questions:
        serializer = QuestionSerializer(questions[0], context={'request': request})
        return JsonResponse({'data': serializer.data})
    else:
        return JsonResponse({'data': []})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_questions(request):
    # filter params
    group_id = request.GET.get('group_id')
    q_id = request.GET.get('q_id')
    q_name = request.GET.get('q_name')
    u_id = request.GET.get('u_id')
    completed = request.GET.get('completed')
    user = request.user if request.user.is_authenticated else None

    # pagination params
    page_size = int(request.GET.get('page_size', 10))
    last_q_id = int(request.GET.get('last_q_id', -1))
    first_q_id = int(request.GET.get('first_q_id', sys.maxsize))
    last_posted_time = request.GET.get('last_posted_time')
    first_posted_time = request.GET.get('first_posted_time')
    take_lower = False
    if request.GET.get('take_lower'):
        take_lower = True

    if last_posted_time:
        last_posted_time = parse_datetime(last_posted_time)
        if not last_posted_time:
            return JsonResponse({'error': 'Invalid last_posted_time format (use ISO format)'}, status=400)

    if first_posted_time:
        first_posted_time = parse_datetime(first_posted_time)
        if not first_posted_time:
            return JsonResponse({'error': 'Invalid first_posted_time format (use ISO format)'}, status=400)


    query = Q(group_id=group_id)
    if not take_lower:
        query &= (Q(posted_time__lt=last_posted_time) | 
                    (Q(posted_time=last_posted_time) & Q(q_id__gt=last_q_id)))
    else:
        query &= (Q(posted_time__gt=first_posted_time) | 
                    (Q(posted_time=first_posted_time) & Q(q_id__lt=first_q_id)))

    if q_id:
        query &= Q(q_id=q_id)
    if u_id:
        query &= Q(posted_by=u_id)
    if q_name:
        query &= Q(name__icontains=q_name)
    if completed and user:
        if completed.lower() == 'false':
            completed_questions = MarkQuestion.objects.filter(user_id=user, done=True).values_list('q_id', flat=True)
            query &= ~Q(q_id__in=completed_questions)

    questions = Question.objects.filter(query).order_by('-posted_time', 'q_id')
    for index, question in enumerate(questions, start=1):
        question.number = len(questions) - index + 1

    questions_result_len = len(questions)
    questions_len = min(questions_result_len, page_size)

    if take_lower:
        serializer = QuestionSerializer(questions[questions_result_len-questions_len:], many=True, context={'request': request})
        first_q_id_response = questions[questions_result_len-questions_len].q_id if questions else None
        first_posted_time_response = questions[questions_result_len-questions_len].posted_time if questions else None
        last_q_id_response = questions[questions_result_len-1].q_id if questions else None
        last_posted_time_response = questions[questions_result_len-1].posted_time if questions else None
    else:
        serializer = QuestionSerializer(questions[:questions_len], many=True, context={'request': request})
        first_q_id_response = questions[0].q_id if questions else None
        first_posted_time_response = questions[0].posted_time if questions else None
        last_q_id_response = questions[questions_len-1].q_id if questions else None
        last_posted_time_response = questions[questions_len-1].posted_time if questions else None

    return JsonResponse({
        'data': serializer.data, 
        'last_q_id': last_q_id_response, 
        'first_q_id': first_q_id_response, 
        'last_posted_time': last_posted_time_response,
        'first_posted_time': first_posted_time_response
    })

@api_view(['GET'])
def get_mark_questions(request):
    mark_qs = MarkQuestion.objects.all()
    serializer = MarkQuestionSerializer(mark_qs, many=True)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_statistics(request):
    qs_count = Question.objects.count()
    mark_qs_count = MarkQuestion.objects.filter(user_id=request.user.id, done=True).count()
    return JsonResponse({'question_count': qs_count, 'completed_count': mark_qs_count})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_question(request):
    name = request.data['name']
    link = request.data['link']
    group_id = request.data['group_id']

    question = Question.objects.create(
        name=name,
        link=link,
        group_id=Group.objects.get(group_id=group_id),
        posted_time=timezone.now().replace(microsecond=0),
        posted_by=request.user
    )
    question.save()
    serializer = QuestionSerializer(question, context={'request': request})
    return JsonResponse({'data': serializer.data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_question(request):

    done = request.data['done']
    q_id = request.data['q_id']
    difficulty = request.data['difficulty']

    m_q = MarkQuestion.objects.filter(q_id=Question.objects.get(q_id=q_id), user_id=request.user).first()
    now = timezone.now().replace(microsecond=0)
    if m_q:
        m_q.done = done
        m_q.difficulty = difficulty
        m_q.done_time=now
        m_q.save()
    else:
        m_q = MarkQuestion.objects.create(
            q_id=Question.objects.get(q_id=q_id),
            user_id=request.user,
            done=done,
            difficulty=difficulty,
            done_time=now
        )
        m_q.save()

    serializer = MarkQuestionSerializer(m_q)
    return JsonResponse({'data': serializer.data})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_question(request):

    q_id = request.data['q_id']
    name = request.data['name']
    link = request.data['link']

    question = Question.objects.get(q_id=q_id)
    question.name = name
    question.link = link
    question.save()

    serializer = QuestionSerializer(question)
    return JsonResponse({'data': serializer.data})

@api_view(['DELETE'])
def delete_question(request):
    q_id = request.GET.get('q_id')
    Question.objects.get(q_id=q_id).delete()
    return JsonResponse({'data': f"question {q_id} deleted"})

