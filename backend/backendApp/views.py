from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import login, authenticate, logout
from .models import *
from .serializers import *

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):

    email = request.data['email']
    password = request.data['password']

    # user = Utilizador.objects.create_user(
    #             nome="Teste",
    #             email="teste@gmail.com", 
    #             password="teste",
    #             data_nascimento="2025-03-15",
    #             contacto=910222333,
    #             tipo="Gestor",
    #             funcao="Gestor",
    #             foto="teste",
    #             estado=1,
    #             clube_id=1
    #         )

    utilizador = authenticate(request, email=email, password=password)

    if utilizador is not None and utilizador.estado == 1:
        if utilizador.tipo == "Gestor":
            login(request, utilizador)
            return Response({"message": "Login bem-sucedido"}, status=200)
        else:
            return Response({"message": "Acesso não Autorizado. Apenas Gestores podem entrar"}, status=401)
    else:
        return Response({"message": "Credenciais Inválidas"}, status=404)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaUtilizadores_view(request):
    utilizadores = Utilizador.objects.all()

    serializer = UtilizadorSerializer(utilizadores, many=True)

    return Response(serializer.data)



    

  