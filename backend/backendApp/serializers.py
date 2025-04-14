from rest_framework import serializers
from .models import *

class UtilizadorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Utilizador
        fields = ('id', 'nome','email', 'estado', 'foto', 'funcao', 'data_nascimento', 'contacto')
