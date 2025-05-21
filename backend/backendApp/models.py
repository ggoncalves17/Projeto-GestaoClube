from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UtilizadorManager(BaseUserManager):
  def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("O email é obrigatório!")
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

  def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Clube(models.Model):
    nome = models.CharField(max_length=512)
    sigla = models.CharField(max_length=512)
    data_fundacao = models.DateField()
    email = models.EmailField()
    foto = models.CharField(max_length=512)
    localizacao = models.CharField(max_length=512)
    morada = models.CharField(max_length=512)
    associacao = models.CharField(max_length=512)

class Utilizador(AbstractBaseUser):
  nome = models.CharField(max_length=512)
  email = models.EmailField(unique=True)
  password = models.CharField(max_length=512)
  data_nascimento = models.DateField()
  contacto = models.IntegerField()
  tipo = models.CharField(max_length=512)
  funcao = models.CharField(max_length=512)
  foto = models.CharField(max_length=512)
  estado = models.IntegerField()
  clube = models.ForeignKey(Clube, on_delete=models.CASCADE)

  objects = UtilizadorManager()

  USERNAME_FIELD='email'

class Modalidade(models.Model):
    nome = models.CharField(max_length=512)
    estado = models.BooleanField()
    clube = models.ForeignKey(Clube, on_delete=models.CASCADE)

class Epoca(models.Model):
    nome = models.CharField(max_length=512, null=True)
    inicio_epoca = models.DateField(null=True)
    fim_epoca = models.DateField(null=True)
    modalidade = models.ForeignKey(Modalidade, on_delete=models.CASCADE)

class Equipa(models.Model):
    nome = models.CharField(max_length=512)
    categoria = models.CharField(max_length=512)
    epoca = models.ForeignKey(Epoca, on_delete=models.CASCADE)
    clube = models.ForeignKey(Clube, on_delete=models.CASCADE)
    modalidade = models.ForeignKey(Modalidade, on_delete=models.CASCADE)

class Elemento_Clube(models.Model):
  nome = models.CharField(max_length=512)
  sexo = models.CharField(max_length=512)
  data_nascimento = models.DateField()
  nacionalidade = models.CharField(max_length=512)
  cartao_cidadao = models.CharField(max_length=512, null=True, blank=True)
  data_validade_cc = models.DateField(null=True, blank=True)
  tipo = models.CharField(max_length=512)
  posicao = models.CharField(max_length=512, null=True, blank=True)
  foto = models.CharField(max_length=512)
  peso = models.FloatField(null=True, blank=True)
  altura = models.FloatField(null=True, blank=True)
  estado = models.IntegerField()
  clube = models.ForeignKey(Clube, on_delete=models.CASCADE)
  equipas = models.ManyToManyField(Equipa)
  modalidade = models.ForeignKey(Modalidade, on_delete=models.CASCADE, null=True, blank=True)

class Competicao(models.Model):
    nome = models.CharField(max_length=255)
    equipa = models.ForeignKey(Equipa, on_delete=models.CASCADE)

class Jogo(models.Model):
    data = models.DateField()
    hora = models.TimeField()
    adversario = models.CharField(max_length=512)
    resultado_final = models.CharField(max_length=512, null=True, blank=True)
    localizacao = models.CharField(max_length=512, null=True, blank=True)
    resultado = models.CharField(max_length=512, null=True, blank=True)
    estado = models.IntegerField(null=True, blank=True)
    equipa = models.ForeignKey(Equipa, on_delete=models.CASCADE)
    competicao = models.ForeignKey(Competicao, on_delete=models.CASCADE, null=True, blank=True)

class Inscricao(models.Model):
    exames_medico = models.FileField(upload_to='documentos/exames/', null=True, blank=True)
    cartao_cidadao = models.FileField(upload_to='documentos/cartoes/', null=True, blank=True)
    data_inscricao = models.DateField(null=True, blank=True)
    estado = models.IntegerField(null=True, blank=True)
    epoca = models.ForeignKey(Epoca, on_delete=models.CASCADE)
    elemento_clube = models.ForeignKey(Elemento_Clube, on_delete=models.CASCADE)

class Categoria(models.Model):
    nome = models.CharField(max_length=512)
    quota_mensal = models.FloatField()
    quota_anual = models.FloatField()
    inscricao = models.FloatField()
    estado = models.IntegerField()

class Socio(models.Model):
    n_socio = models.IntegerField()
    data_adesao = models.DateField()
    estado = models.IntegerField()
    utilizador = models.ForeignKey(Utilizador, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

class Historico_Categoria(models.Model):
    h_quota_mensal = models.FloatField()
    h_quota_anual = models.FloatField()
    h_inscricao = models.FloatField()
    data_inicial = models.DateField()
    data_final = models.DateField(null=True, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

class Quota(models.Model):
    tipo_quota = models.CharField(max_length=512)
    mes = models.CharField(null=True, blank=True)
    ano = models.IntegerField()
    prazo_pagamento = models.DateField()
    valor = models.FloatField()
    data_pagamento = models.DateField(null=True, blank=True)
    metodo_pagamento = models.CharField(null=True, blank=True)
    estado = models.IntegerField()
    socio = models.ForeignKey(Socio, on_delete=models.CASCADE)
    h_categoria = models.ForeignKey(Historico_Categoria, on_delete=models.CASCADE)



 






