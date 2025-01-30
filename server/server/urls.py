from django.contrib import admin
from django.urls import path, include
from flashcards_api import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('flashcards_api.urls')),
    path('api/chat/messages/', views.chat_message, name='chat_message'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 