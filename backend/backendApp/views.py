from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import login, authenticate, logout
from .models import *
from .serializers import *
from django.contrib.auth.hashers import make_password, check_password
import os
from django.core.files.storage import FileSystemStorage

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

    utilizador = request.user

    serializer = UtilizadorSerializer(utilizador)

    return Response({"mensagem": "Utilizador autenticado", "utilizador": serializer.data}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def estatisticas_view(request):

    #TODO: Aplicar Filtro da Época Atual para ver quais são as equipas atuais

    estatisticas = {
        "Staff": Utilizador.objects.filter(tipo="Gestor", estado=1).count(),
        "Jogadores": Elemento_Clube.objects.filter(tipo="Jogador", estado=1).count(),
        "Equipas": Equipa.objects.filter().count(),
        "Socios": 0,
        "Eventos": 0,
        "Jogos": Jogo.objects.all().count(),
    }
    return Response(estatisticas)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaUtilizadores_view(request):
    # Referência -> https://docs.djangoproject.com/en/5.2/topics/db/queries/#the-pk-lookup-shortcut
    utilizadores = Utilizador.objects.filter(tipo="Utilizador", estado__in=[0, 1]).order_by('nome')

    serializer = UtilizadorSerializer(utilizadores, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaStaff_view(request):
    utilizadores = Utilizador.objects.filter(tipo="Gestor", estado=1).order_by('nome')

    serializer = UtilizadorSerializer(utilizadores, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaJogadores(request):
    utilizadores = Elemento_Clube.objects.filter(estado__in=[0, 1]).order_by('nome')

    serializer = ElementoClubeSerializer(utilizadores, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaModalidades(request):
    modalidades = Modalidade.objects.order_by('nome')

    serializer = ModalidadeSerializer(modalidades, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def info_utilizador_view(request, id):
    utilizador = get_object_or_404(Utilizador, id=id)
    if utilizador:
        serializer = UtilizadorSerializer(utilizador)
        return Response(serializer.data)
    else:
        return Response({"mensagem": "Não existe o utilizador pretendido."}, status=404)


@api_view(['POST'])
@permission_classes([AllowAny])
def adiciona_utilizador(request):

    tipo = request.data.get("tipo")
    nome = request.data.get("nome")
    email = request.data.get("email")
    contacto = request.data.get("telefone")
    data_nascimento = request.data.get("data")
    funcao = request.data.get("funcao")
    foto = request.FILES.get("foto")
    id_clube = request.data.get("id_clube")

    if Utilizador.objects.filter(email=email).exists():
        return Response({"mensagem": "Já existe um utilizador com o email inserido. Por favor, tente outro email."}, status=404)
    else:

        if foto is None:
            nome_foto = "foto-default.png"
        else:
            pasta = "C:\\Users\\guigo\\Desktop\\Projeto\\Projeto-Site\\frontend\\public\\Fotos-Perfil"
            if not os.path.exists(pasta):
                os.makedirs(pasta)

            tipoCompletoFoto = foto.content_type 

            if tipoCompletoFoto == "image/jpeg":
                tipoFoto = "jpg"
            elif tipoCompletoFoto == "image/png":
                tipoFoto = "png"
            elif tipoCompletoFoto == "image/gif":
                tipoFoto = "gif"    

            nome_foto = f"{email}_foto-perfil.{tipoFoto}"

            fs = FileSystemStorage(location=pasta)
            fs.save(nome_foto, foto)

        utilizador = Utilizador(
            nome=nome,
            email=email, 
            data_nascimento=data_nascimento,
            contacto=contacto,
            tipo=tipo,
            funcao=funcao,
            foto=nome_foto,
            estado=1,
            clube_id=id_clube
        )

        utilizador.set_password("teste123")
        utilizador.save() 

        serializer = UtilizadorSerializer(utilizador)

        return Response({"mensagem": "Utilizador inserido com sucesso!", "utilizador": serializer.data}, status=200)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def edita_utilizador(request, id):

    utilizador = get_object_or_404(Utilizador, id=id)

    nome = request.data.get("nome")
    email = request.data.get("email")
    contacto = request.data.get("telefone")
    data_nascimento = request.data.get("data")
    funcao = request.data.get("funcao")
    foto = request.FILES.get("foto")


    if foto is None:
        nome_foto = utilizador.foto
    else:
        pasta = "C:\\Users\\guigo\\Desktop\\Projeto\\Projeto-Site\\frontend\\public\\Fotos-Perfil"
        if not os.path.exists(pasta):
            os.makedirs(pasta)
        tipoCompletoFoto = foto.content_type 
        if tipoCompletoFoto == "image/jpeg":
            tipoFoto = "jpg"
        elif tipoCompletoFoto == "image/png":
            tipoFoto = "png"
        elif tipoCompletoFoto == "image/gif":
            tipoFoto = "gif"    
        nome_foto = f"{email}_foto-perfil.{tipoFoto}"
        fs = FileSystemStorage(location=pasta)
        fs.save(nome_foto, foto)

    utilizador.nome = nome
    utilizador.email = email
    utilizador.contacto = contacto
    utilizador.data_nascimento = data_nascimento
    utilizador.funcao = funcao
    utilizador.foto = nome_foto
    utilizador.save()

    serializer = UtilizadorSerializer(utilizador)
    return Response({"mensagem": "Utilizador atualizado com sucesso!", "utilizador": serializer.data}, status=200)    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def altera_estado(request, id):

    tipo = request.data.get("tipo")

    if(tipo =="Gestor" or tipo =="Utilizador"):
        modelo = Utilizador
    else:
        modelo = Elemento_Clube

    utilizador = get_object_or_404(modelo, id=id)
    
    estado = utilizador.estado

    if(estado == 1):
        novoEstado = 0
    else:
        novoEstado = 1  

    utilizador.estado = novoEstado

    try:
        utilizador.save()
        return Response({"mensagem": "Estado alterado com sucesso!"}, status=200)
    except Exception as e:
        return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_utilizador(request, id):

    tipo = request.data.get("tipo")

    if(tipo =="Gestor" or tipo =="Utilizador"):
        modelo = Utilizador
    else:
        modelo = Elemento_Clube

    utilizador = get_object_or_404(modelo, id=id)
    utilizador.estado = 2
    utilizador.save()
    return Response({"mensagem": "Utilizador removido com sucesso!"}, status=200)    

    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({"mensagem": "Logout bem-sucedido"}, status=200)


    

    

  