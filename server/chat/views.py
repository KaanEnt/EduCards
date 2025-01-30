from rest_framework import generics
from .models import ChatSession, ChatMessage, Flashcard
from .serializers import ChatSessionSerializer, ChatMessageSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import tempfile
import shutil
from rest_framework import status
from .gemini_service import GeminiService

class ChatSessionListCreateView(generics.ListCreateAPIView):
    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer

class ChatMessageListCreateView(generics.ListCreateAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        session_id = self.kwargs['session_id']
        return ChatMessage.objects.filter(session_id=session_id)

@api_view(['POST'])
def chat_message(request):
    try:
        message = request.POST.get('message', '')
        uploaded_file = request.FILES.get('file')
        
        response_data = {
            'response': f"Received message: {message}",
            'flashcards': None
        }

        if uploaded_file:
            # Create a temporary directory
            with tempfile.TemporaryDirectory() as temp_dir:
                # Save the file temporarily
                temp_file_path = os.path.join(temp_dir, uploaded_file.name)
                with open(temp_file_path, 'wb+') as destination:
                    for chunk in uploaded_file.chunks():
                        destination.write(chunk)
                
                # Process the PDF using Gemini
                gemini_service = GeminiService()
                flashcards = gemini_service.process_pdf_to_flashcards(temp_file_path)
                
                # Save flashcards to database
                for card in flashcards:
                    Flashcard.objects.create(
                        question=card['question'],
                        answer=card['answer'],
                        course=card['course'],
                        topic=card['topic']
                    )
                
                response_data['flashcards'] = flashcards
                response_data['response'] = "Successfully processed document and created flashcards!"
                
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error in chat_message: {str(e)}")
        return Response({
            'error': 'Internal server error',
            'detail': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 