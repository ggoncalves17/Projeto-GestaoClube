from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import login, authenticate, logout, update_session_auth_hash
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

    id_clube = request.user.clube.id

    estatisticas = {
        "Staff": Utilizador.objects.filter(tipo="Gestor", estado=1, clube=id_clube).count(),
        "Jogadores": Elemento_Clube.objects.filter(tipo="Jogador", estado=1, clube=id_clube).count(),
        "Modalidades": Modalidade.objects.filter(clube=id_clube).count(),
        "Socios": 0,
        "Eventos": 0,
        "Jogos": 0,
    }
    return Response(estatisticas)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaUtilizadores(request):

    id_clube = request.user.clube.id

    # Referência -> https://docs.djangoproject.com/en/5.2/topics/db/queries/#the-pk-lookup-shortcut
    utilizadores = Utilizador.objects.filter(tipo="Utilizador", estado__in=[0, 1], clube=id_clube).order_by('nome')

    serializer = UtilizadorSerializer(utilizadores, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaStaff(request):

    id_clube = request.user.clube.id

    utilizadores = Utilizador.objects.filter(tipo="Gestor", estado=1, clube=id_clube).order_by('nome')

    serializer = UtilizadorSerializer(utilizadores, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaElementos(request):

    id_clube = request.user.clube.id

    utilizadores = Elemento_Clube.objects.filter(estado__in=[0, 1], clube=id_clube).order_by('nome')

    serializer = UtilizadorInfoSerializer(utilizadores, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaModalidades(request, id):
    modalidades = Modalidade.objects.filter(clube_id=id).order_by('nome')

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def info_jogador(request, id):

    jogador = get_object_or_404(Elemento_Clube, id=id)
    if jogador:
        if(jogador.clube == request.user.clube):
            serializer = ElementoClubeSerializer(jogador)
            return Response(serializer.data, status=200)
        else:
            return Response({"mensagem": "Não existe o jogador pretendido."}, status=404)
    else:
        return Response({"mensagem": "Não existe o jogador pretendido."}, status=404)

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
            # pasta = "C:\\Users\\guigo\\Desktop\\Projeto\\Projeto-Site\\frontend\\public\\Fotos-Perfil"
            pasta = "..\\frontend\public\Fotos-Perfil"

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
def adiciona_jogador(request):

    tipo = request.data.get("tipo")
    sexo = request.data.get("sexo")
    nome = request.data.get("nome")
    data_nascimento = request.data.get("data")
    nacionalidade = request.data.get("nacionalidade")
    cc = request.data.get("cc")
    cc_validade = request.data.get("cc_validade")
    peso = request.data.get("peso")
    altura = request.data.get("altura")

    if cc == "":
        cc = None
    if cc_validade == "":
        cc_validade = None
    if peso == "":
        peso = None
    if altura == "":
        altura = None

    foto = request.FILES.get("foto")
    id_clube = request.data.get("id_clube")
    desporto = request.data.get("desporto")

    if desporto != "":
        id_modalidade = get_object_or_404(Modalidade, nome=desporto).id
    else:
        id_modalidade = None

    if foto is None:
        nome_foto = "foto-default.png"
    else:

        # pasta = "C:\\Users\\guigo\\Desktop\\Projeto\\Projeto-Site\\frontend\\public\\Fotos-Jogadores"
        pasta = "..\\frontend\public\Fotos-Jogadores"
        if not os.path.exists(pasta):
            os.makedirs(pasta)

        tipoCompletoFoto = foto.content_type 

        if tipoCompletoFoto == "image/jpeg":
            tipoFoto = "jpg"
        elif tipoCompletoFoto == "image/png":
            tipoFoto = "png"
        elif tipoCompletoFoto == "image/gif":
            tipoFoto = "gif"    

        nome_foto = f"{nome.replace(" ", "")}_foto-jogador.{tipoFoto}"

        fs = FileSystemStorage(location=pasta)
        fs.save(nome_foto, foto)


    utilizador = Elemento_Clube(
        nome=nome,
        sexo=sexo, 
        data_nascimento=data_nascimento,
        nacionalidade=nacionalidade,
        cartao_cidadao = cc,
        data_validade_cc = cc_validade,
        tipo=tipo,
        foto=nome_foto,
        peso = peso,
        altura = altura,
        estado=1,
        clube_id=id_clube,
        modalidade_id = id_modalidade,
    )

    utilizador.save() 

    serializer = ElementoClubeSerializer(utilizador)

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

        pasta = "..\\frontend\public\Fotos-Perfil"
        # pasta = "C:\\Users\\guigo\\Desktop\\Projeto\\Projeto-Site\\frontend\\public\\Fotos-Perfil"

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
@permission_classes([AllowAny])
def edita_jogador(request, id):

    utilizador = get_object_or_404(Elemento_Clube, id=id)

    tipo = request.data.get("tipo")
    sexo = request.data.get("sexo")
    nome = request.data.get("nome")
    data_nascimento = request.data.get("data")
    nacionalidade = request.data.get("nacionalidade")
    cc = request.data.get("cc")
    cc_validade = request.data.get("cc_validade")
    peso = request.data.get("peso")
    altura = request.data.get("altura")

    if cc == "":
        cc = None
    if cc_validade == "":
        cc_validade = None
    if peso == "":
        peso = None
    if altura == "":
        altura = None

    foto = request.FILES.get("foto")
    id_clube = request.data.get("id_clube")
    desporto = request.data.get("desporto")

    if desporto != "":
        id_modalidade = get_object_or_404(Modalidade, nome=desporto).id
    else:
        id_modalidade = None

    if foto is None:
        nome_foto = "foto-default.png"
    else:
        # pasta = "C:\\Users\\guigo\\Desktop\\Projeto\\Projeto-Site\\frontend\\public\\Fotos-Jogadores"
        pasta = "..\\frontend\public\Fotos-Jogadores"

        if not os.path.exists(pasta):
            os.makedirs(pasta)

        tipoCompletoFoto = foto.content_type 

        if tipoCompletoFoto == "image/jpeg":
            tipoFoto = "jpg"
        elif tipoCompletoFoto == "image/png":
            tipoFoto = "png"
        elif tipoCompletoFoto == "image/gif":
            tipoFoto = "gif"    

        nome_foto = f"{nome.replace(" ", "")}_foto-jogador.{tipoFoto}"

        fs = FileSystemStorage(location=pasta)
        fs.save(nome_foto, foto)

    utilizador.tipo = tipo
    utilizador.sexo = sexo
    utilizador.nome = nome
    utilizador.data_nascimento = data_nascimento
    utilizador.nacionalidade = nacionalidade
    utilizador.cc = cc
    utilizador.cc_validade = cc_validade
    utilizador.peso = peso
    utilizador.altura = altura
    utilizador.foto = nome_foto
    utilizador.clube_id = id_clube
    utilizador.modalidade_id = id_modalidade
    utilizador.save()

    serializer = ElementoClubeSerializer(utilizador)
    return Response({"mensagem": "Utilizador atualizado com sucesso!", "utilizador": serializer.data}, status=200)

@api_view(['POST'])
@permission_classes([AllowAny])
def edita_perfil(request, id):

    utilizador = get_object_or_404(Utilizador, id=id)

    nome = request.data.get("nome")
    contacto = request.data.get("contacto")
    data_nascimento = request.data.get("data")
    foto = request.FILES.get("foto")


    if foto is None:
        nome_foto = utilizador.foto
    else:

        pasta = "..\\frontend\public\Fotos-Perfil"
        # pasta = "C:\\Users\\guigo\\Desktop\\Projeto\\Projeto-Site\\frontend\\public\\Fotos-Perfil"

        if not os.path.exists(pasta):
            os.makedirs(pasta)


        tipoCompletoFoto = foto.content_type 
        if tipoCompletoFoto == "image/jpeg":
            tipoFoto = "jpg"
        elif tipoCompletoFoto == "image/png":
            tipoFoto = "png"
        elif tipoCompletoFoto == "image/gif":
            tipoFoto = "gif"    
        nome_foto = f"{utilizador.email}_foto-perfil.{tipoFoto}"
        fs = FileSystemStorage(location=pasta)


        fs.save(nome_foto, foto)

    utilizador.nome = nome
    utilizador.contacto = contacto
    utilizador.data_nascimento = data_nascimento
    utilizador.foto = nome_foto
    utilizador.save()

    serializer = UtilizadorSerializer(utilizador)
    return Response({"mensagem": "Perfil atualizado com sucesso!", "utilizador": serializer.data}, status=200) 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def altera_password(request, id):

    utilizador = get_object_or_404(Utilizador, id=id)

    password = request.data.get("password")
    novaPassword = request.data.get("novaPassword")

    print("PASSWORD: ", password, " + NOVA PASSOWORD: ", novaPassword)
    print("PASSWORD UTILIZADOR: ", utilizador.password)

    # Referência -> https://stackoverflow.com/a/62145106
    if check_password(password, utilizador.password):
        try:
            utilizador.set_password(novaPassword)
            utilizador.save()

            # Referência -> https://docs.djangoproject.com/en/dev/topics/auth/default/#django.contrib.auth.aupdate_session_auth_hash
            update_session_auth_hash(request, utilizador)

            return Response({"mensagem": "Password alterada com sucesso!"}, status=200)
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
    else:
        return Response({"mensagem": "Password Atual incorreta."}, status=400)



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


@api_view(['POST'])
@permission_classes([AllowAny])
def adiciona_modalidade(request):

    nome = request.data.get("nome")
    id_clube = request.data.get("id_clube")

    # Referência -> https://docs.djangoproject.com/en/5.2/ref/models/querysets/#iexact
    if Modalidade.objects.filter(nome__iexact=nome, clube=id_clube).exists():
        return Response({"mensagem": "Já existe uma modalidade com o mesmo nome"}, status=404)
    else:
        modalidade = Modalidade(
            nome=nome,
            estado=1,
            clube_id=id_clube
        )

        try:
            modalidade.save() 

            serializer = ModalidadeSerializer(modalidade)

            return Response({"mensagem": "Modalidade inserida com sucesso!", "modalidade": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)

@api_view(['PUT'])
@permission_classes([AllowAny])
def edita_modalidade(request, id):

    modalidade = get_object_or_404(Modalidade, id=id)

    nome = request.data.get("nome")
    id_clube = request.data.get("id_clube")

    # Referência -> https://sentry.io/answers/django-queryset-filter-not-equal/
    if Modalidade.objects.filter(nome__iexact=nome, clube=id_clube).exclude(id=id).exists():
        return Response({"mensagem": "Já existe uma modalidade com o mesmo nome"}, status=404)
    else:

        modalidade.nome = nome

        try:
            modalidade.save() 

            serializer = ModalidadeSerializer(modalidade)

            return Response({"mensagem": "Modalidade atualizada com sucesso!", "modalidade": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_modalidade(request, id):

    modalidade = get_object_or_404(Modalidade, id=id)

    try:

        modalidade.delete()

        return Response({"mensagem": "Modalidade removida com sucesso!"}, status=200)    
    
    except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def info_modalidade(request, id):

    modalidade = get_object_or_404(Modalidade, id=id)

    if modalidade:
        if(modalidade.clube == request.user.clube):
            serializer = ModalidadeSerializer(modalidade)
            return Response(serializer.data, status=200)
        else:
            return Response({"mensagem": "Não existe a modalidade pretendida."}, status=404)
    else:
        return Response({"mensagem": "Não existe a modalidade pretendida."}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaEquipas(request, id):

    id_clube = request.user.clube.id

    equipas = Equipa.objects.filter(clube=id_clube, modalidade=id).order_by('nome')

    serializer = EquipaSerializer(equipas, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaEpocas(request, id):

    epocas = Epoca.objects.filter(modalidade=id).order_by('-nome')

    serializer = EpocaSerializer(epocas, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def adiciona_equipa(request, id):

    nome = request.data.get("nome")
    epoca = request.data.get("epoca")
    categoria = request.data.get("categoria")
    id_clube = request.user.clube.id
    
    id_epoca = get_object_or_404(Epoca, nome=epoca).id

    if Equipa.objects.filter(nome__iexact=nome, epoca=id_epoca, categoria=categoria, modalidade=id, clube=id_clube).exists():
        return Response({"mensagem": "Já existe uma equipa exatamente com os mesmos atributos colocados"}, status=404)
    else:
        equipa = Equipa(
            nome=nome,
            categoria=categoria,
            clube_id=id_clube,
            modalidade_id=id,
            epoca_id=id_epoca,
        )

        try:
            equipa.save() 

            serializer = EquipaSerializer(equipa)

            return Response({"mensagem": "Equipa inserida com sucesso!", "equipa": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def adiciona_epoca(request, id):

    nome = request.data.get("nome")
    data_inicio = request.data.get("data_inicio")
    data_fim = request.data.get("data_fim")
    
    if Equipa.objects.filter(nome__iexact=nome, modalidade=id).exists():
        return Response({"mensagem": "Já existe uma época com o mesmo nome"}, status=404)
    else:
        epoca = Epoca(
            nome=nome,
            inicio_epoca=data_inicio,
            fim_epoca=data_fim,
            modalidade_id=id,
        )

        try:
            epoca.save() 

            serializer = EpocaSerializer(epoca)

            return Response({"mensagem": "Época inserida com sucesso!", "epoca": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)

@api_view(['PUT'])
@permission_classes([AllowAny])
def edita_epoca(request, id):

    epoca = get_object_or_404(Epoca, id=id)

    nome = request.data.get("nome")
    data_inicio = request.data.get("data_inicio")
    data_fim = request.data.get("data_fim")

    if Epoca.objects.filter(nome__iexact=nome, modalidade=epoca.modalidade).exclude(id=id).exists():
        return Response({"mensagem": "Já existe uma época com o mesmo nome"}, status=404)
    else:

        epoca.nome = nome
        epoca.inicio_epoca = data_inicio
        epoca.fim_epoca = data_fim

        try:
            epoca.save() 

            serializer = EpocaSerializer(epoca)

            return Response({"mensagem": "Época atualizada com sucesso!", "epoca": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_epoca(request, id):

    epoca = get_object_or_404(Epoca, id=id)

    try:

        epoca.delete()

        return Response({"mensagem": "Época removida com sucesso!"}, status=200)    
    
    except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_equipa(request, id):

    equipa = get_object_or_404(Equipa, id=id)

    try:

        equipa.delete()

        return Response({"mensagem": "Equipa removida com sucesso!"}, status=200)    
    
    except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
    
@api_view(['PUT'])
@permission_classes([AllowAny])
def edita_equipa(request, id):

    equipa = get_object_or_404(Equipa, id=id)

    nome = request.data.get("nome")
    epoca = request.data.get("epoca")
    categoria = request.data.get("categoria")

    id_epoca = get_object_or_404(Epoca, nome=epoca).id
    id_clube = request.user.clube.id

    if Equipa.objects.filter(nome__iexact=nome, epoca=id_epoca, categoria=categoria, modalidade=id, clube=id_clube).exclude(id=id).exists():
        return Response({"mensagem": "Já existe uma equipa exatamente com os mesmos atributos colocados"}, status=404)
    else:

        equipa.nome = nome
        equipa.categoria = categoria
        equipa.epoca_id = id_epoca

        try:
            equipa.save() 

            serializer = EquipaSerializer(equipa)

            return Response({"mensagem": "Equipa atualizada com sucesso!", "equipa": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def info_equipa(request, id):

    equipa = get_object_or_404(Equipa, id=id)

    if equipa:

        if(equipa.clube == request.user.clube):

            serializer = EquipaDetalhesSerializer(equipa)
            return Response(serializer.data, status=200)
        else:
            return Response({"mensagem": "Não existe a equipa pretendida."}, status=404)
    else:
        return Response({"mensagem": "Não existe a equipa pretendida."}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaElementosDisponiveis(request, id):

    id_clube = request.user.clube.id

    modalidade_equipa = get_object_or_404(Equipa, id=id)

    elementos = Elemento_Clube.objects.filter(clube=id_clube, estado=1, modalidade=modalidade_equipa.modalidade, sexo=modalidade_equipa.categoria ).exclude(equipas=id).order_by('nome')

    serializer = ElementoClubeGeralSerializer(elementos, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def associa_elemento(request, id):

    elementosGuardar = request.data.get("elementosGuardar")

    equipa = get_object_or_404(Equipa, id=id)

    # Referência -> https://docs.djangoproject.com/en/5.2/ref/models/querysets/#values-list
    elemento_ids = equipa.elemento_clube_set.values_list('id', flat=True)

    for id_elemento_equipa in list(elemento_ids):
        if not id_elemento_equipa in elementosGuardar:

            elemento = get_object_or_404(Elemento_Clube, id=id_elemento_equipa)

            elemento.equipas.remove(equipa)
            
    for id_elemento in sorted(elementosGuardar):
        print("Id Elemento Associar: ", id_elemento)

        elemento = get_object_or_404(Elemento_Clube, id=id_elemento)

        # Verifica se o elemento já está associado à equipa
        if (elemento.equipas.filter(id=id).exists()):
            print("Elemento já está associado à equipa.")
            continue;
        else:
            print("Novo Elemento associado à equipa.")
            elemento.equipas.add(equipa)
    
    elementos = equipa.elemento_clube_set.all()
    serializer = ElementoClubeGeralSerializer(elementos, many=True)

    return Response({"mensagem" : "Elementos Associados / Desassociados com sucesso!", "elementos" : serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaCompeticoesEquipa(request, id):

    competicoes = Competicao.objects.filter(equipa=id).order_by('nome')

    serializer = CompeticaoSerializer(competicoes, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def adicionaCompeticoesEquipa(request, id):

    nome = request.data.get("nome")
    
    if Competicao.objects.filter(nome__iexact=nome, equipa=id).exists():
        return Response({"mensagem": "Já existe uma competição com o mesmo nome"}, status=404)
    else:
        competicao = Competicao(
            nome=nome,
            equipa_id=id,
        )

        try:
            competicao.save() 

            serializer = CompeticaoSerializer(competicao)

            return Response({"mensagem": "Competição inserida com sucesso!", "competicao": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
        
@api_view(['PUT'])
@permission_classes([AllowAny])
def editaCompeticao(request, id):

    competicao = get_object_or_404(Competicao, id=id)

    nome = request.data.get("nome")

    if Competicao.objects.filter(nome__iexact=nome, equipa=competicao.equipa).exclude(id=id).exists():
        return Response({"mensagem": "Já existe uma competição com o mesmo nome"}, status=404)
    else:

        competicao.nome = nome

        try:
            competicao.save() 

            serializer = CompeticaoSerializer(competicao)

            return Response({"mensagem": "Competição atualizada com sucesso!", "competicao": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
        
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_competicao(request, id):

    competicao = get_object_or_404(Competicao, id=id)

    try:
        competicao.delete()

        return Response({"mensagem": "Competição removida com sucesso!"}, status=200)    
    
    except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaJogosEquipa(request, id):

    jogos = Jogo.objects.filter(equipa=id).order_by('data')

    serializer = JogoSerializer(jogos, many=True)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def adicionaJogosEquipa(request, id):

    dados = request.data

    jogo = dados.get('jogo')

    adversario = jogo.get('adversario')
    localizacao = jogo.get('local')
    competicao = jogo.get('competicao')
    data = jogo.get('data')
    hora = jogo.get('hora')
    estadoStr = jogo.get('estado')
    resultado = jogo.get('resultado')
    resultado_final = jogo.get('resultadoFinal')

    if estadoStr == "Por Acontecer":
        estado = 1
    else:
        estado = 2

    id_competicao = get_object_or_404(Competicao, nome=competicao).id

    #TODO: FAZER ESTA VERIFICAÇÃO TAMBÉM NO FRONTEND
    if Jogo.objects.filter(adversario=adversario, localizacao=localizacao, competicao=id_competicao, equipa=id).exists():
        return Response({"mensagem": "Já existe um jogo com os mesmos atributos (Adversário, Local e Competição)"}, status=404)
    else:
        jogo = Jogo(
            data=data,
            hora=hora,
            adversario=adversario,
            localizacao=localizacao,
            resultado = resultado,
            resultado_final=resultado_final,
            estado=estado,
            equipa_id = id,
            competicao_id = id_competicao,
        )

        try:
            jogo.save() 

            serializer = JogoSerializer(jogo)

            return Response({"mensagem": "Jogo inserido com sucesso!", "jogo": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_jogo(request, id):

    jogo = get_object_or_404(Jogo, id=id)

    try:
        jogo.delete()

        return Response({"mensagem": "Jogo removido com sucesso!"}, status=200)    
    
    except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
    
@api_view(['PUT'])
@permission_classes([AllowAny])
def edita_jogo(request, id):

    jogo = get_object_or_404(Jogo, id=id)

    dados = request.data

    novoJogo = dados.get('jogo')

    adversario = novoJogo.get('adversario')
    localizacao = novoJogo.get('local')
    competicao = novoJogo.get('competicao')
    data = novoJogo.get('data')
    hora = novoJogo.get('hora')
    estadoStr = novoJogo.get('estado')
    resultado = novoJogo.get('resultado')
    resultado_final = novoJogo.get('resultadoFinal')

    if estadoStr == "Por Acontecer":
        estado = 1
    else:
        estado = 2

    id_competicao = get_object_or_404(Competicao, nome=competicao).id

    if Jogo.objects.filter(adversario=adversario, localizacao=localizacao, competicao=id_competicao, equipa=jogo.equipa).exclude(id=id).exists():
        return Response({"mensagem": "Já existe um jogo com os mesmos atributos (Adversário, Local e Competição)"}, status=404)
    else:

        jogo.data=data
        jogo.hora=hora
        jogo.adversario=adversario
        jogo.localizacao=localizacao
        jogo.resultado = resultado
        jogo.resultado_final=resultado_final
        jogo.estado=estado
        jogo.competicao_id = id_competicao

        try:
            jogo.save() 

            serializer = JogoSerializer(jogo)

            return Response({"mensagem": "Jogo atualizado com sucesso!", "jogo": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaJogosClube(request):

    id_clube = request.user.clube.id

    equipas = Equipa.objects.filter(clube=id_clube)

    jogos = Jogo.objects.filter(equipa__in=equipas).order_by('data')

    serializer = JogoInfoSerializer(jogos, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listaInscricoesJogador(request, id):

    id_clube = request.user.clube.id

    jogador = get_object_or_404(Elemento_Clube, id=id)

    if jogador:
        if jogador.clube.id == id_clube:
            inscricoes = Inscricao.objects.filter(elemento_clube=id).order_by('-epoca__nome')

            serializer = InscricaoSerializer(inscricoes, many=True)

            return Response(serializer.data)
        else:
            return Response({"mensagem": "Não existe o jogador pretendido."}, status=404)
    else:
        return Response({"mensagem": "Não existe o jogador pretendido."}, status=404)

@api_view(['POST'])
@permission_classes([AllowAny])
def adicionaInscricaoElemento(request, id):

    id_epoca = request.data.get("id_epoca")
    
    if Inscricao.objects.filter(epoca=id_epoca, elemento_clube=id).exists():
        return Response({"mensagem": "Já existe uma inscrição associada a esta época para o elemento selecionado"}, status=404)
    else:
        inscricao = Inscricao(
            estado = 0,
            epoca_id=id_epoca,
            elemento_clube_id=id,
        )

        try:
            inscricao.save() 

            serializer = InscricaoSerializer(inscricao)

            return Response({"mensagem": "Inscrição inserida com sucesso!", "inscricao": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_inscricao(request, id):

    inscricao = get_object_or_404(Inscricao, id=id)

    try:
        inscricao.delete()

        return Response({"mensagem": "Inscrição removida com sucesso!"}, status=200)    
    
    except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
    
@api_view(['PUT'])
@permission_classes([AllowAny])
def edita_inscricao(request, id):

    inscricao = get_object_or_404(Inscricao, id=id)

    epoca = request.data.get("epoca")
    estadoStr = request.data.get("estado")

    if estadoStr == "Não Enviado":
        estado = 0
    elif estadoStr == "Pendente":
        estado = 1
    elif estadoStr == "Aprovado":
        estado = 2
    elif estadoStr == "Rejeitado":
        estado = 3

    id_epoca = get_object_or_404(Epoca, nome=epoca).id

    if Inscricao.objects.filter(epoca=id_epoca, elemento_clube=inscricao.elemento_clube).exclude(id=id).exists():
        return Response({"mensagem": "Já existe uma inscrição associada a esta época para o elemento selecionado"}, status=404)
    else:

        inscricao.epoca_id = id_epoca
        inscricao.estado = estado

        try:
            inscricao.save() 

            serializer = InscricaoSerializer(inscricao)

            return Response({"mensagem": "Inscrição edita com sucesso!", "inscricao": serializer.data}, status=200)
        
        except Exception as e:
            return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)

@api_view(['PUT'])
@permission_classes([AllowAny])
def upload_documentos(request, id):

    inscricao = get_object_or_404(Inscricao, id=id)

    cc = request.FILES.get("cartao_cidadao")
    exames_medicos = request.FILES.get("exames_medicos")

    print("CARTÃO CIDADAO: ", cc)
    print("EXAMES: ", exames_medicos)

    if cc:
        inscricao.cartao_cidadao = cc
    if exames_medicos:
        inscricao.exames_medico = exames_medicos

    try:
        inscricao.save() 

        serializer = InscricaoSerializer(inscricao)

        return Response({"mensagem": "Documentos inseridos com sucesso!", "inscricao": serializer.data}, status=200)
        
    except Exception as e:
        return Response({"mensagem": f"Ocorreu um erro: {str(e)}"}, status=500)
