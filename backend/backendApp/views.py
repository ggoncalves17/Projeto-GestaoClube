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
            return Response({"mensagem": "Login bem-sucedido"}, status=200)
        else:
            return Response({"mensagem": "Acesso não Autorizado. Apenas Gestores podem entrar"}, status=401)
    else:
        return Response({"mensagem": "Credenciais Inválidas"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verificaAutenticacao_view(request):
    return Response({"mensagem": "Utilizador autenticado"}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def estatisticas_view(request):

    #TODO: Aplicar Filtro da Época Atual para ver quais são as equipas atuais

    estatisticas = {
        "Staff": Utilizador.objects.filter(tipo="Gestor", estado=1).count(),
        "Jogadores": Elemento_Clube.objects.filter(funcao="Jogador", estado=1).count(),
        "Equipas": Equipa.objects.filter().count(),
        "Socios": 0,
        "Eventos": 0,
        "Jogos": Jogo.objects.all().count(),
    }
    return Response(estatisticas)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaUtilizadores_view(request):
    utilizadores = Utilizador.objects.all().order_by('nome')

    serializer = UtilizadorSerializer(utilizadores, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({"mensagem": "Logout bem-sucedido"}, status=200)


    

    

  