from django.contrib import admin
from django.urls import path, include
from backendApp import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.login_view, name='login'),
    path('api/listaUtilizadores/', views.listaUtilizadores_view, name='listaUtilizadores'),
    path('api/listaStaff/', views.listaStaff_view, name='listaUtilizadores'),
    path('api/listaJogadores/', views.listaJogadores, name='listaJogadores'),
    path('api/listaModalidades/<int:id>/', views.listaModalidades, name='listaModalidades'),
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
    path('api/adiciona-modalidade/', views.adiciona_modalidade, name='adiciona-modalidade'),    
    path('api/edita-modalidade/<int:id>/', views.edita_modalidade, name='edita-modalidade'),   
    path('api/remove-modalidade/<int:id>/', views.remove_modalidade, name='remove-modalidade'), 
]
