from rest_framework import serializers
from .models import *

class ClubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clube
        fields = ('id', 'nome', 'sigla', 'foto')

class EpocaSerializer(serializers.ModelSerializer):

    nEquipas = serializers.SerializerMethodField()
    class Meta:
        model = Epoca
        fields = ('id', 'nome', 'inicio_epoca', 'fim_epoca', 'nEquipas')

    def get_nEquipas(self, obj):
        return obj.equipa_set.count()     

class EquipaSerializer(serializers.ModelSerializer):

    epoca = EpocaSerializer()
    nElementos = serializers.SerializerMethodField()
    class Meta:
        model = Equipa
        fields = ('id', 'nome', 'categoria', 'epoca', 'nElementos', 'modalidade')

    def get_nElementos(self, obj):
        return obj.elemento_clube_set.count() 

class ModalidadeSerializer(serializers.ModelSerializer):

    epoca_set = EpocaSerializer(many=True, read_only=True)
    equipa_set = EquipaSerializer(many=True, read_only=True)

    existemJogadores = serializers.SerializerMethodField()
    
    class Meta:
        model = Modalidade
        fields = ('id', 'nome', 'estado', 'clube', 'epoca_set', 'equipa_set', 'existemJogadores')

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
    equipas = EquipaSerializer(many=True)
    class Meta:
        model = Elemento_Clube
        fields = ('id', 'nome', 'sexo', 'data_nascimento', 'nacionalidade', 'cartao_cidadao', 'data_validade_cc', 'tipo', 'posicao', 'foto', 'peso', 'altura', 'estado', 'modalidade', 'clube', 'equipas')
        
class UtilizadorInfoSerializer(serializers.ModelSerializer):

    modalidade = serializers.SerializerMethodField()

    class Meta:
        model = Elemento_Clube
        fields = ('id', 'nome', 'sexo', 'data_nascimento', 'nacionalidade', 'cartao_cidadao', 'data_validade_cc', 'tipo', 'posicao', 'foto', 'peso', 'altura', 'estado', 'modalidade')

    def get_modalidade(self, obj):
        return obj.modalidade.nome

class InscricaoGeralSerializer(serializers.ModelSerializer):

    epoca = serializers.SerializerMethodField()

    class Meta:
        model = Inscricao
        fields = ('id', 'estado', 'epoca')

    def get_epoca(self, obj):
        return obj.epoca.nome     

class ElementoClubeGeralSerializer(serializers.ModelSerializer):

    inscricao_set = InscricaoGeralSerializer(many=True, read_only=True)

    class Meta:
        model = Elemento_Clube
        fields = ('id', 'nome', 'nacionalidade', 'tipo', 'posicao', 'foto', 'inscricao_set')

class EquipaDetalhesSerializer(serializers.ModelSerializer):

    epoca = serializers.SerializerMethodField()
    modalidade = serializers.SerializerMethodField()
    elemento_clube_set = ElementoClubeGeralSerializer(many=True, read_only=True)
    class Meta:
        model = Equipa
        fields = ('id', 'nome', 'categoria', 'modalidade', 'epoca', 'elemento_clube_set')

    def get_epoca(self, obj):
        return obj.epoca.nome 
    
    def get_modalidade(self, obj):
        return obj.modalidade.nome 

class JogoSerializer(serializers.ModelSerializer):

    competicao = serializers.SerializerMethodField()

    class Meta:
        model = Jogo
        fields = ('id', 'competicao', 'data', 'hora', 'adversario', 'localizacao', 'resultado', 'resultado_final', 'estado')

    def get_competicao(self, obj):
        return obj.competicao.nome 
    
class JogoInfoSerializer(serializers.ModelSerializer):

    competicao = serializers.SerializerMethodField()
    equipa = serializers.SerializerMethodField()
    epoca = serializers.SerializerMethodField()

    class Meta:
        model = Jogo
        fields = ('id', 'competicao', 'data', 'hora', 'adversario', 'localizacao', 'resultado', 'resultado_final', 'estado', 'equipa', 'epoca')

    def get_competicao(self, obj):
        return obj.competicao.nome 
    
    def get_equipa(self, obj):
        return obj.equipa.nome 
    
    def get_epoca(self, obj):
        return obj.equipa.epoca.nome 
    
class JogoDashboardSerializer(serializers.ModelSerializer):

    modalidade = serializers.SerializerMethodField()

    class Meta:
        model = Jogo
        fields = ('id', 'data', 'hora', 'adversario', 'modalidade')

    def get_modalidade(self, obj):
        return obj.equipa.modalidade.nome

class CompeticaoSerializer(serializers.ModelSerializer):

    nJogos = serializers.SerializerMethodField()

    class Meta:
        model = Competicao
        fields = ('id', 'nome', 'nJogos')
    
    def get_nJogos(self, obj):
        return obj.jogo_set.count() 
    
class InscricaoSerializer(serializers.ModelSerializer):

    epoca = serializers.SerializerMethodField()
    exames_medico = serializers.FileField(required=False)
    cartao_cidadao = serializers.FileField(required=False)

    class Meta:
        model = Inscricao
        fields = ('id', 'exames_medico','cartao_cidadao','data_inscricao', 'estado', 'epoca')

    def get_epoca(self, obj):
        return obj.epoca.nome   

class SocioSerializer(serializers.ModelSerializer):

    utilizador = UtilizadorSerializer()
    categoria = serializers.SerializerMethodField()
    quotas_atrasadas = serializers.SerializerMethodField()

    class Meta:
        model = Socio
        fields = ('id', 'n_socio','data_adesao','estado', 'utilizador', 'categoria','quotas_atrasadas')

    def get_categoria(self, obj):
        return obj.categoria.nome
    
    def get_quotas_atrasadas(self, obj):
        return obj.quota_set.filter(estado=2).exists()

class CategoriaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categoria
        fields = ('id', 'nome','quota_mensal','quota_anual', 'inscricao', 'estado', 'clube')