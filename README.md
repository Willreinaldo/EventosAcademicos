# Persistência de Eventos por Localização
Este projeto é responsável por persistir eventos acadêmicos em um banco de dados com base na sua localização geográfica e listar esses eventos em outra página, além de editar e excluir o evento.

O projeto utiliza JavaScript, React, Bulma.css e a API do Google Maps  no frontend, Express.js, Mongoose, Axios e DayJs no backend, e MongoDB como banco de dados noSQL. O projeto não foi feito com docker. 

## Pré-requisitos
Para executar o projeto localmente, você precisará ter o seguinte software instalado:

* Node.js 
* Banco de dados MongoDB funcionando

## Configuração
### Backend
* Clone este repositório em sua máquina local.
* Instale as dependências do projeto utilizando o comando npm install dentro da pasta do projeto.
* Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
```
PG_DATABASE=<nome_do_banco_de_dados>
PG_USERNAME=<seu_nome_de_usuario_do_banco_de_dados>
PG_PASSWORD=<sua_senha_do_banco_de_dados>
PG_HOST=<endereco_do_host_do_banco_de_dados>
PG_PORT=<porta_do_banco_de_dados>
MONGO_USER=<nome_do_user_do_banco_de_dados>
MONGO_PASSWORD=<sennha_do_banco_de_dados>
ATLAS_HOST=<host_do_banco_de_dados>
``` 
* Certifique-se de que o MongoDB esteja em execução em sua máquina local.
Execute o comando npm run start para iniciar o servidor backend. O servidor será executado na porta 4000.

### Frontend</h3>
* Certifique-se de que o servidor backend esteja em execução antes de executar o frontend.
* Abra um novo terminal e navegue até a pasta <strong>Frontend</strong>.
* Instale as dependências do projeto utilizando o comando npm install.
* Execute o comando <strong>npm run start</strong> para iniciar o servidor frontend. O servidor será executado na porta 3000.
<h3>Utilização</h3>

* Após seguir os passos de configuração, abra seu navegador e acesse a URL  <a>http://localhost:3000</a> para utilizar a aplicação.

* A aplicação apresenta uma página com um mapa do Google Maps e um formulário para adicionar eventos. Ao adicionar um evento, ele será salvo no banco de dados com base na sua localização geográfica.
* Ao clicar no botão <strong>"Ver Eventos"</strong>, você será redirecionado para outra página que lista todos os eventos salvos no banco de dados.
* Além de sua funcionalidade principal, essa aplicação oferece uma funcionalidade extra aos usuários: na página de visualização de eventos, é possível localizá-los no mapa do Google Maps com base nas coordenadas armazenadas no banco de dados.
* Na página de eventos é possivel editar cada evento (nome, descrição, datas e localização) além do botão de deletar o evento que o usuário desejar.
* O projeto possui um recurso de busca textual que utiliza a busca completa (full-text search) do MongoDB. a busca tem um índice de texto com os seguintes pesos: título:2, descrição:1.

## Observações
* Este projeto não utiliza a KEY da API do Google Maps e nem o Docker Compose.
* Este projeto requer a criação de um arquivo .env para definir as variáveis de ambiente necessárias.
* O usuário pode escolher utilizar o Docker ou não para rodar o projeto.
