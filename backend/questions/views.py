from django.http import JsonResponse
from django.shortcuts import render
from questions.models import Question, MarkQuestion
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


@api_view(['GET'])
@permission_classes([AllowAny])
def get_questions(request):
    q_id = request.GET.get('q_id')
    q_name = request.GET.get('q_name')
    u_id = request.GET.get('u_id')
    completed = request.GET.get('completed')
    user = request.user if request.user.is_authenticated else None

    query = Q()
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

    questions = Question.objects.filter(query)
    serializer = QuestionSerializer(questions, many=True, context={'request': request})
    return JsonResponse({'data': serializer.data})

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

    question = Question.objects.create(
        name=name,
        link=link,
        posted_time=timezone.now(),
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

    m_q, created = MarkQuestion.objects.get_or_create(
        q_id=Question.objects.get(q_id=q_id),
        user_id=request.user,
        defaults={'done': done, 'difficulty': difficulty}
    )

    if not created:
        m_q.done = done
        m_q.difficulty = difficulty
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

