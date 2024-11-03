from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from django.db import connection
from django.http import JsonResponse
from .models import Solution
from django.utils import timezone
from languages.models import Language
from solutions.serializers import SolutionSerializer
from rest_framework.permissions import IsAuthenticated
from questions.models import Question

@api_view(['GET'])
def get_solutions(request):
    sql = """
        SELECT s.s_id, s.name, s.q_id_id AS q_id, q.name AS q_name, s.lang_name_id AS lang_name, 
        s.code, s.posted_time, s.posted_by_id AS posted_by_id, u.username AS posted_by 
        FROM solutions_solution s JOIN questions_question q ON s.q_id_id = q.q_id
            JOIN users_user u ON s.posted_by_id = u.id
        WHERE q_id_id = %s
        ORDER BY s.posted_time DESC
    """
    q_id = request.GET.get('q_id')
    result = []
    with connection.cursor() as cursor:
        cursor.execute(sql, [q_id])
        columns = [col[0] for col in cursor.description]
        results = cursor.fetchall()
        rows = [dict(zip(columns, row)) for row in results]
        for row in rows:
            result.append(row)

    return JsonResponse({'data': result})


@api_view(['GET'])
def get_solution(request):
    sql = """
        SELECT s.s_id, s.name, s.q_id_id AS q_id, q.name AS q_name, s.lang_name_id AS lang_name, 
        s.code, s.posted_time, s.posted_by_id AS posted_by_id, u.username AS posted_by, s.tc, s.sc,
        s.notes 
        FROM solutions_solution s JOIN questions_question q ON s.q_id_id = q.q_id
            JOIN users_user u ON s.posted_by_id = u.id
        WHERE s_id = %s
        ORDER BY s.posted_time DESC
    """
    s_id = request.GET.get('s_id')
    result = []
    with connection.cursor() as cursor:
        cursor.execute(sql, [s_id])
        columns = [col[0] for col in cursor.description]
        results = cursor.fetchall()
        rows = [dict(zip(columns, row)) for row in results]
        for row in rows:
            result.append(row)

    return JsonResponse({'data': result[0]})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_solution(request):
    q_id = request.data['q_id']
    title = request.data['title']
    language = request.data['language']
    tc = request.data['tc']
    sc = request.data['sc']
    code = request.data['code']
    notes = request.data['notes']

    lang, created = Language.objects.get_or_create(
        name=language
    )

    question = Question.objects.get(q_id = q_id)

    solution = Solution.objects.create(
        q_id = question,
        name = title,
        lang_name = lang,
        tc = tc,
        sc = sc,
        code = code,
        notes = notes,
        posted_by = request.user,
        posted_time=timezone.now()
    )
    solution.save()
    serializer = SolutionSerializer(solution)
    return JsonResponse({'data': serializer.data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_solution(request):
    s_id = request.data['s_id']
    title = request.data['title']
    language = request.data['language']
    tc = request.data['tc']
    sc = request.data['sc']
    code = request.data['code']
    notes = request.data['notes']

    lang, created = Language.objects.get_or_create(
        name=language
    )

    solution = Solution.objects.get(s_id=s_id)
    solution.name = title
    solution.lang_name = lang
    solution.tc = tc
    solution.sc = sc
    solution.code = code
    solution.notes = notes
    solution.save()

    serializer = SolutionSerializer(solution)
    return JsonResponse({'data': serializer.data})

@api_view(['DELETE'])
def delete_solution(request):
    s_id = request.GET.get('s_id')
    Solution.objects.get(s_id=s_id).delete()
    return JsonResponse({'data': f"solution {s_id} deleted"})