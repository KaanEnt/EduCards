from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Flashcard
from .serializers import FlashcardSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        course = self.request.query_params.get('course')
        topic = self.request.query_params.get('topic')
        
        if course:
            queryset = queryset.filter(course=course)
        if topic:
            queryset = queryset.filter(topic=topic)
        
        return queryset 

@csrf_exempt
def chat_message(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        file = request.FILES.get('file')
        
        # Process the message and file here
        # For example, save the file and generate a response
        
        response = {
            'response': f"Received message: {message} and file: {file.name if file else 'No file'}"
        }
        return JsonResponse(response)
    return JsonResponse({'error': 'Invalid request method'}, status=400) 