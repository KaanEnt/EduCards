from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Flashcard
from .serializers import FlashcardSerializer

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