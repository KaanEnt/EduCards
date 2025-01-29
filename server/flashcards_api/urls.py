from django.urls import path
from .views import FlashcardListCreateView, FlashcardRetrieveUpdateDestroyView

urlpatterns = [
    path('flashcards/', FlashcardListCreateView.as_view(), name='flashcard-list-create'),
    path('flashcards/<int:pk>/', FlashcardRetrieveUpdateDestroyView.as_view(), name='flashcard-retrieve-update-destroy'),
] 