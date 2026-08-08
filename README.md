Checkpoint - Catálogo de Jogos

Este projeto foi desenvolvido como trabalho final da disciplina de Angular da Especialização em Desenvolvimento Web com Frameworks Modernos da UTFPR.

A aplicação funciona como um catálogo de jogos. Nela é possível visualizar os jogos cadastrados, consultar os detalhes de cada título, fazer login e cadastrar novos jogos. Os dados são armazenados no MongoDB.

Integrante

Lucas Vieira Garcia

GitHub: https://github.com/Lucasvieiragarcia

Tecnologias utilizadas

O projeto foi desenvolvido com Angular 17, Node.js, ExpressJS, MongoDB, RxJS e Nx. O Docker e o Dev Containers foram utilizados para preparar o ambiente de desenvolvimento.

Funcionalidades

A aplicação possui uma página com a listagem dos jogos e uma página de detalhes para cada título. Também conta com login, logout e uma tela de cadastro protegida, que só pode ser acessada por usuários autenticados.

O formulário de cadastro possui validações e os jogos adicionados são salvos no banco de dados. As capas são informadas por meio de uma URL.

Foi criado o DuracaoPipe para exibir a duração dos jogos em horas. A ImagemFallbackDirective apresenta uma capa alternativa quando a imagem cadastrada não pode ser carregada.

Como executar o projeto

Para executar o projeto é necessário ter o Git, o Docker Desktop, o Visual Studio Code e a extensão Dev Containers instalados.

Primeiro, clone o repositório e abra a pasta no Visual Studio Code.

git clone https://github.com/Lucasvieiragarcia/catalogo-jogos-angular.git

cd catalogo-jogos-angular

code .

No Visual Studio Code, abra a paleta de comandos e selecione Dev Containers: Reopen in Container.

Depois que o container terminar de carregar, abra um terminal e execute os seguintes comandos:

npm install

npm run seed

npm start

A aplicação poderá ser acessada em:

Frontend: http://localhost:4200

API: http://localhost:3333/api

MongoDB: mongodb://127.0.0.1:27017

O comando npm run seed prepara o banco com os dados usados para demonstração. Esse comando recria os dados iniciais e não deve ser executado novamente caso seja necessário manter jogos cadastrados manualmente.

Dados para acesso

Usuário: lucas

Senha: jogos

Também pode ser utilizado o usuário admin com a senha admin.

Outros comandos

O comando npm run build compila o frontend e a API.

O comando npm test executa os testes do projeto.

O comando npm run lint verifica a padronização do código.

Organização do projeto

O código do frontend está na pasta apps/front.

O código da API está na pasta apps/api.

O arquivo responsável pela criação dos dados iniciais está em tools/seed.mjs.

