from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import login, authenticate, logout


@api_view()
def login_view(request):

    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        utilizador = authenticate(request, ut_mail=email, password=password)

        if utilizador is not None and utilizador.estado == 1:
            if utilizador.ut_tipo == "Gestor":
                login(request, utilizador)
                return Response(200)
            else:
                return Response(401)
        else:
            return Response(404)


    

  