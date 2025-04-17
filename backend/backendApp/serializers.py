from rest_framework import serializers
from .models import *

class ClubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clube
        fields = ('id', 'nome', 'sigla', 'foto')

class ModalidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modalidade
        fields = ('id', 'nome', 'estado')

class UtilizadorSerializer(serializers.ModelSerializer):

    clube = ClubeSerializer()

    class Meta:
        model = Utilizador
        fields = ('id', 'nome','email', 'estado', 'foto', 'tipo', 'funcao', 'data_nascimento', 'contacto', 'clube')

class ElementoClubeSerializer(serializers.ModelSerializer):

    modalidade = ModalidadeSerializer()

    class Meta:
        model = Elemento_Clube
        fields = ('id', 'nome', 'sexo', 'data_nascimento', 'nacionalidade', 'cartao_cidadao', 'data_validade_cc', 'tipo', 'posicao', 'foto', 'peso', 'altura', 'estado', 'modalidade')
