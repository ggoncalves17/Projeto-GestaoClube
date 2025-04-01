from django.contrib import admin
from django.urls import path, include
from backendApp import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.login_view, name='login'),
    path('api/listaUtilizadores/', views.listaUtilizadores_view, name='listaUtilizadores'),
    path('api/listaStaff/', views.listaStaff_view, name='listaUtilizadores'),
    path('api/verificaAutenticacao/', views.verificaAutenticacao_view, name='verificaAutenticacao'),
    path('api/estatisticas/', views.estatisticas_view, name='estatisticas'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/adiciona-utilizador/', views.adiciona_utilizador, name='adiciona-utilizador'),
]
