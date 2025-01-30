from rest_framework import generics
from .models import ChatSession, ChatMessage
from .serializers import ChatSessionSerializer, ChatMessageSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.storage import default_storage
import os
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

@api_view(['POST'])
def chat_message(request):
    try:
        message = request.POST.get('message', '')
        uploaded_file = request.FILES.get('file')
        
        file_path = None
        if uploaded_file:
            # Save the file to media directory
            file_path = default_storage.save(
                f'chat_documents/{uploaded_file.name}', 
                uploaded_file
            )
        
        # Here you would process the message and file with your chat logic
        response_text = f"Received message: {message}"
        if file_path:
            response_text += f" with document: {uploaded_file.name}"
        
        return Response({
            'response': response_text,
            'file_path': file_path
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error in chat_message: {str(e)}")  # Server-side logging
        return Response({
            'error': 'Internal server error',
            'detail': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 