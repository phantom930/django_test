from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework import status

# Create your views here.
@api_view(['POST'])
def login(request):
  username = request.data.get("username")
  password = request.data.get("password")
  user = authenticate(username=username, password=password)
  if user is not None:
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key})
  return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def logout(request):
    return Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)