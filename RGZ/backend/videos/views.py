import os
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.http import FileResponse, Http404
from .models import Video
from django.http import FileResponse, Http404
from .models import Video
from .serializers import RegisterSerializer

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def upload_video(request):
    title = request.data.get('title', 'Без названия')
    file = request.FILES.get('file')
    
    if file:
        default_user = User.objects.first() 

        video = Video.objects.create(
            title=title, 
            file=file, 
            user=default_user
        )
        return Response({"message": "Загружено", "id": video.id}, status=201)
    
    return Response({"error": "Файл не получен"}, status=400)
@api_view(['GET'])
def get_video_list(request):
    videos = Video.objects.all()
    data = [{"id": v.id, "title": v.title} for v in videos]
    return Response(data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)   
        return Response({
            "message": "Пользователь создан!",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def stream_video(request, video_id):
    video = get_object_or_404(Video, id=video_id)

    if not video.file or not os.path.exists(video.file.path):
        raise Http404("Файл физически отсутствует в папке media!")
    file_handle = open(video.file.path, 'rb')
    response = FileResponse(file_handle, content_type='video/mp4')
    response['Access-Ranges'] = 'bytes'
    response['Content-Disposition'] = 'inline'
    return response
