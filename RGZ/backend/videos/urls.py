from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from videos import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('videos/upload/', views.upload_video, name='upload_video'),
    path('videos/<int:video_id>/stream/', views.stream_video, name='stream_video'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)