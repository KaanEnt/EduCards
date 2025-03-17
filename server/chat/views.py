from rest_framework import generics
from .models import ChatSession, ChatMessage
from .serializers import ChatSessionSerializer, ChatMessageSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import tempfile
import shutil
from rest_framework import status

class ChatSessionListCreateView(generics.ListCreateAPIView):
    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer

class ChatMessageListCreateView(generics.ListCreateAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        session_id = self.kwargs['session_id']
        return ChatMessage.objects.filter(session_id=session_id)

def process_pdf_to_flashcards(file_path):
    """
    Process PDF file and extract flashcard content.
    This is a placeholder for your actual PDF processing logic.
    """
    # TODO: Implement your PDF processing logic here
    # For now, return dummy flashcards
    return [
        {"question": "Sample Question 1", "answer": "Sample Answer 1"},
        {"question": "Sample Question 2", "answer": "Sample Answer 2"},
    ]

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
                
                # Process the PDF and generate flashcards
                flashcards = process_pdf_to_flashcards(temp_file_path)
                
                response_data['flashcards'] = flashcards
                response_data['response'] += f"\nProcessed document: {uploaded_file.name}"
                
                # The file will be automatically deleted when the temp directory is cleaned up
        
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error in chat_message: {str(e)}")
        return Response({
            'error': 'Internal server error',
            'detail': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 