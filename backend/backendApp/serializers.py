from rest_framework import serializers
from .models import *

class ClubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clube
        fields = ('id', 'nome', 'sigla', 'foto')

class EpocaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Epoca
        fields = ('id', 'inicio_epoca', 'fim_epoca')


class EquipaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipa
        fields = ('id', 'escalao', 'categoria')

class ModalidadeSerializer(serializers.ModelSerializer):

    epoca_set = EpocaSerializer(many=True, read_only=True)
    equipa_set = EquipaSerializer(many=True, read_only=True)

    existemJogadores = serializers.SerializerMethodField()
    
    class Meta:
        model = Modalidade
        fields = ('id', 'nome', 'estado', 'epoca_set', 'equipa_set', 'existemJogadores')

    def get_existemJogadores(self, obj):

        return obj.elemento_clube_set.exists()    

class UtilizadorSerializer(serializers.ModelSerializer):

    clube = ClubeSerializer()

    class Meta:
        model = Utilizador
        fields = ('id', 'nome','email', 'estado', 'foto', 'tipo', 'funcao', 'data_nascimento', 'contacto', 'clube')

class ElementoClubeSerializer(serializers.ModelSerializer):

    modalidade = ModalidadeSerializer()
    clube = ClubeSerializer()
    class Meta:
        model = Elemento_Clube
        fields = ('id', 'nome', 'sexo', 'data_nascimento', 'nacionalidade', 'cartao_cidadao', 'data_validade_cc', 'tipo', 'posicao', 'foto', 'peso', 'altura', 'estado', 'modalidade', 'clube')
