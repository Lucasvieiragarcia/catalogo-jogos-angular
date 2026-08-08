# Checkpoint - Catálogo de Jogos

Aplicação Web desenvolvida como trabalho final da disciplina WEB15 - Framework Front End Angular, da Especialização em Desenvolvimento Web com Frameworks Modernos da UTFPR.

O sistema permite consultar jogos, abrir seus detalhes, autenticar um usuário e cadastrar novos títulos com persistência no MongoDB.

## Integrante

- Lucas Vieira Garcia - [@Lucasvieiragarcia](https://github.com/Lucasvieiragarcia)

## Tecnologias

- Angular 17.2
- RxJS 7.8
- Node.js 20
- ExpressJS 4.18
- MongoDB
- Nx 18
- Docker e Dev Containers

Todas as tecnologias utilizadas são gratuitas. As capas cadastradas inicialmente são carregadas por URLs públicas da Steam. Caso uma imagem esteja indisponível, a aplicação exibe uma capa alternativa.

## Funcionalidades

- Listagem de jogos recuperados da API
- Página de detalhes por rota dinâmica
- Login e logout
- Proteção da rota de cadastro
- Formulário reativo com validações
- Cadastro autenticado e persistência no MongoDB
- Exibição de capas por URL
- Layout responsivo

## Critérios da atividade

| Critério             | Implementação                                                           |
| -------------------- | ----------------------------------------------------------------------- |
| Pipe customizado     | `DuracaoPipe`, usado para formatar a duração dos jogos                  |
| Diretiva customizada | `ImagemFallbackDirective`, usada quando uma capa não pode ser carregada |
| Rotas                | Catálogo, login, cadastro protegido e detalhes por identificador        |
| Entidades            | `Jogo`, `NovoJogo`, `Usuario` e `UsuarioLogado`                         |
| Formulários          | Login e cadastro de jogo com Reactive Forms                             |
| Persistência         | Coleções `jogos` e `usuarios` no MongoDB                                |

## Pré-requisitos

Forma recomendada:

- Git
- Docker Desktop ou Docker Engine com Compose
- Visual Studio Code
- Extensão Dev Containers do VS Code

O Dev Container já contém Node.js 20 e utiliza uma imagem MongoDB. Não é necessário instalar essas tecnologias diretamente no sistema operacional.

## Instalação e execução

Clone o repositório:

```bash
git clone https://github.com/Lucasvieiragarcia/catalogo-jogos-angular.git
cd catalogo-jogos-angular
code .
```

No VS Code, execute o comando `Dev Containers: Reopen in Container`. Depois que o container estiver pronto, abra um terminal e execute:

```bash
npm install
npm run seed
npm start
```

A aplicação ficará disponível nos endereços:

- Frontend: http://localhost:4200
- API: http://localhost:3333/api
- MongoDB: mongodb://127.0.0.1:27017

O comando `npm run seed` recria os dados de demonstração. Para preservar novos cadastros, não o execute novamente depois de iniciar o uso do sistema.

## Usuários de demonstração

| Usuário | Senha   |
| ------- | ------- |
| `lucas` | `jogos` |
| `admin` | `admin` |

As sessões são mantidas na memória da API. Depois de reiniciar o servidor, basta sair e entrar novamente.

## Comandos

```bash
npm start       # inicia o frontend e a API
npm run seed    # recria os dados de demonstração
npm run build   # compila frontend e API
npm test        # executa os testes unitários
npm run lint    # verifica a padronização do código
```

## Estrutura principal

```text
apps/
├── api/        # API ExpressJS e acesso ao MongoDB
└── front/      # aplicação Angular
tools/
└── seed.mjs    # carga inicial do banco de dados
```
