from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
import pickle
import numpy as np
import os

# Load ML model
model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'})

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        return Response({'message': 'Login successful'})
    return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict(request):
    math = float(request.data.get('math_score'))
    reading = float(request.data.get('reading_score'))
    writing = float(request.data.get('writing_score'))
    prediction = model.predict([[0, 0, 0, 1, 1, math, reading, writing]])
    result = prediction[0]
    from .models import Prediction
    Prediction.objects.create(
        user=request.user,
        math_score=math,
        reading_score=reading,
        writing_score=writing,
        result=result
    )
    return Response({'result': result})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def history(request):
    from .models import Prediction
    predictions = Prediction.objects.filter(user=request.user).order_by('-created_at')
    data = [{'math_score': p.math_score, 'reading_score': p.reading_score, 
              'writing_score': p.writing_score, 'result': p.result, 
              'created_at': p.created_at} for p in predictions]
    return Response(data)