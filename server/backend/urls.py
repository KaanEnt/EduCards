from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('flashcards_api.urls')), # Include flashcards_api URLs under /api/
    path('api/chat/', include('chat.urls')),
] 