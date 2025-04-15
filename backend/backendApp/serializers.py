from rest_framework import serializers
from .models import *

class ClubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clube
        fields = ('id', 'nome', 'sigla', 'foto')

class UtilizadorSerializer(serializers.ModelSerializer):

    clube = ClubeSerializer()

    class Meta:
        model = Utilizador
        fields = ('id', 'nome','email', 'estado', 'foto', 'funcao', 'data_nascimento', 'contacto', 'clube')
