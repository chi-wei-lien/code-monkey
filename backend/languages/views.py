from django.http import JsonResponse
from django.shortcuts import render
from .models import Language
from .serializers import LanguageSerializer
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_langs(request):
    langs = Language.objects.all()
    serializer = LanguageSerializer(langs, many=True)
    return JsonResponse({'data': serializer.data})