from django.urls import path
from . import views

urlpatterns = [
    path('sessions/', views.ChatSessionListCreateView.as_view()),
    path('sessions/<int:session_id>/messages/', views.ChatMessageListCreateView.as_view()),
    path('message/', views.chat_message, name='chat_message'),
] 