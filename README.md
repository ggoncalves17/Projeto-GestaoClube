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

Para dar run ao frontend/aplicação é necessário primeiramente, no local da pasta 'frontend', instalar algumas dependências/pacotes com o comando:

`npm install`

Depois para dar o run propriamente dito à aplicação coloca-se:

`npm run dev`

Após isto, deverá aparece o URL `http://localhost:5173/` no qual será o link que se pretende para usar aplicação. 

Já na aplicação (através do localhost no caso) e para efeitos de teste, é possível utilizar a conta com as seguintes credenciais no acesso à aplicação:

`Email`: teste@gmail.com
`Password`: teste

Nota: Na aplicação, no caso da utilização de portáteis, poderá ser necessário colocar o Zoom a 80% ou 90% para não existir qualquer desformatação, visto que o foco não foi a responsividade.
