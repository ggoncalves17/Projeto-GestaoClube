from django.contrib import admin
from django.urls import path, include
from backendApp import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login_view, name='login'),
]
