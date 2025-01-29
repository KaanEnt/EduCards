from rest_framework import generics
from .models import Flashcard
from .serializers import FlashcardSerializer

class FlashcardListCreateView(generics.ListCreateAPIView):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer

class FlashcardRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Flashcard.objects.all()
    serializer_class = FlashcardSerializer 