# Projeto_GestaoClube

## *Requisitos*

A primeira coisa a ser feita é o clone do repositório, utilizando, num local à escolha, o comando:

`git clone https://github.com/ggoncalves17/Projeto-GestaoClube.git` 

# *Backend*

Para dar run à API, aconselha-se a criação de um ambiente virtual para se poder isolar as dependências do mesmo recorrendo ao comando:

`python -m venv venv`

Depois, para se ativar o mesmo coloca-se `venv\Scripts\activate` e para se instalar as dependências necessárias coloca-se:

`pip install -r requirements.txt`

Por fim, para darmos o run da API em si, faz-se no local da pasta 'backend':

`python manage.py runserver`

# *Frontend*

Para dar run ao frontend/aplicação é necessário primeiramente no local da pasta 'frontend' é necessário instalar algumas dependências/pacotes:

`npm install`

E depois para dar o run propriamente dito à aplicação coloca-se:

`npm run dev`

Após isto, deverá aparece o URL `http://localhost:5173/` no qual será o link da aplicação. 

Já na aplicação (através do localhost no caso) e para efeitos de teste, é possível utilizar a conta com as seguintes credenciais no acesso à aplicação (Login Gestor):

`Email`: teste@gmail.com
`Password`: teste
