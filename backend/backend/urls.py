from django.contrib import admin
from django.urls import path, include
from backendApp import views 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.login_view, name='login'),
    path('api/verificaAutenticacao/', views.verificaAutenticacao_view, name='verificaAutenticacao'),
    path('api/estatisticas/', views.estatisticas_view, name='estatisticas'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/info-utilizador/<int:id>/', views.info_utilizador_view, name='info-utilizador'),
    path('api/info-jogador/<int:id>/', views.info_jogador, name='info-jogador'),
    path('api/adiciona-utilizador/', views.adiciona_utilizador, name='adiciona-utilizador'),
    path('api/adiciona-jogador/', views.adiciona_jogador, name='adiciona-jogador'),
    path('api/edita-utilizador/<int:id>/', views.edita_utilizador, name='edita-utilizador'),
    path('api/edita-jogador/<int:id>/', views.edita_jogador, name='edita-jogador'),
    path('api/edita-perfil/<int:id>/', views.edita_perfil, name='/edita-perfil'),
    path('api/altera-password/<int:id>/', views.altera_password, name='/edita-password'),
    path('api/altera-estado-utilizador/<int:id>/', views.altera_estado, name='altera-estado'),
    path('api/remove-utilizador/<int:id>/', views.remove_utilizador, name='remove_utilizador'),

    # UTILIZADORES | ELEMENTOS ------------------------------------------------------------------------------------
    path('api/utilizadores/', views.listaUtilizadores, name='listaUtilizadores'),
    path('api/staff/', views.listaStaff, name='listaStaff'),
    path('api/elementos/', views.listaElementos, name='listaElementos'),
    path('api/utilizadores/pesquisa/', views.listaUtilizadoresDisponiveis, name='listaUtilizadoresDisponiveis'),


    # ELEMENTOS --> Inscrições ------------------------------------------------------------------------------------
    path('api/elementos/<int:id>/inscricoes/', views.listaInscricoesJogador, name='listaInscricoesJogador'),
    path('api/elementos/<int:id>/inscricoes/adicionar/', views.adicionaInscricaoElemento, name='adicionaInscricaoElemento'),
    path('api/inscricoes/<int:id>/remover/', views.remove_inscricao, name='remove_inscricao'),
    path('api/inscricoes/<int:id>/editar/', views.edita_inscricao, name='edita_inscricao'),
    path('api/inscricoes/<int:id>/documentos/upload/', views.upload_documentos, name='upload_documentos'),

    # MODALIDADES ------------------------------------------------------------------------------------
    path('api/listaModalidades/<int:id>/', views.listaModalidades, name='listaModalidades'),
    path('api/adiciona-modalidade/', views.adiciona_modalidade, name='adiciona-modalidade'),    
    path('api/edita-modalidade/<int:id>/', views.edita_modalidade, name='edita-modalidade'),   
    path('api/remove-modalidade/<int:id>/', views.remove_modalidade, name='remove-modalidade'), 
    path('api/info-modalidade/<int:id>/', views.info_modalidade, name='info-modalidade'),

    # MODALIDADES --> ÉPOCAS ------------------------------------------------------------------------------------
    path('api/listaEpocas/<int:id>/', views.listaEpocas, name='listaEpocas'),
    path('api/adiciona-epoca/<int:id>/', views.adiciona_epoca, name='adiciona-epoca'),    
    path('api/epocas/<int:id>/editar/', views.edita_epoca, name='edita_epoca'),    
    path('api/remove-epoca/<int:id>/', views.remove_epoca, name='remove-epoca'), 
    
    # EQUIPAS ------------------------------------------------------------------------------------
    path('api/listaEquipas/<int:id>/', views.listaEquipas, name='listaEquipas'),
    path('api/adiciona-equipa/<int:id>/', views.adiciona_equipa, name='adiciona-equipa'),    
    path('api/remove-equipa/<int:id>/', views.remove_equipa, name='remove-equipa'), 
    path('api/edita-equipa/<int:id>/', views.edita_equipa, name='edita-equipa'),   
    path('api/info-equipa/<int:id>/', views.info_equipa, name='info-equipa'),

    # EQUIPAS --> PLANTEL ------------------------------------------------------------------------------------
    path('api/listaElementosDisponiveis/<int:id>/', views.listaElementosDisponiveis, name='listaElementosDisponiveis'),
    path('api/associa-elemento/<int:id>/', views.associa_elemento, name='associa_elemento'),   

    # EQUIPAS --> JOGOS ------------------------------------------------------------------------------------
    path('api/equipas/<int:id>/jogos/', views.listaJogosEquipa, name='listaJogosEquipa'),
    path('api/equipas/<int:id>/jogos/adicionar/', views.adicionaJogosEquipa, name='adicionaJogosEquipa'),
    path('api/jogos/<int:id>/editar/', views.edita_jogo, name='edita_jogo'),
    path('api/jogos/<int:id>/remover/', views.remove_jogo, name='remove_jogo'),
    path('api/jogos/', views.listaJogosClube, name='listaJogosClube'),

    # EQUIPAS --> COMPETIÇÕES ------------------------------------------------------------------------------------
    path('api/equipas/<int:id>/competicoes/', views.listaCompeticoesEquipa, name='listaCompeticoesEquipa'),
    path('api/equipas/<int:id>/competicoes/adicionar/', views.adicionaCompeticoesEquipa, name='adicionaCompeticoesEquipa'),
    path('api/competicoes/<int:id>/editar/', views.editaCompeticao, name='editaCompeticao'),
    path('api/competicoes/<int:id>/remover/', views.remove_competicao, name='remove_competicao'),

    # SÓCIOS ------------------------------------------------------------------------------------
    path('api/socios/', views.listaSocios, name='listaSocios'),
    path('api/socios/adicionar/', views.adicionaSocio, name='adicionaSocio'),
    
    # SÓCIOS --> CATEGORIAS ------------------------------------------------------------------------------------
    path('api/categorias/', views.listaCategorias, name='listaCategorias'),
    path('api/categorias/adicionar/', views.adicionaCategoria, name='adicionaCategoria'),
    path('api/categorias/editar/', views.editaCategoria, name='editaCategoria'),
    path('api/categorias/historico/', views.listaHistoricoCategorias, name='listaHistoricoCategorias'),
    path('api/categorias/altera-estado/<int:id>/', views.alteraEstadoCategoria, name='alteraEstadoCategoria'),

    # SÓCIOS --> CATEGORIAS ------------------------------------------------------------------------------------
    path('api/quotas/', views.listaQuotas, name='listaQuotas'),
    path('api/quotas/regista/<int:id>/', views.registaPagamentoQuotas, name='registaPagamentoQuotas'),
 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
