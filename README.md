# 📊 Painel em Tempo Real com Socket.IO

## 🎯 Objetivo

Este projeto é um **painel em tempo real (dashboard)** que exibe
informações sobre usuários conectados e rooms ativas, utilizando
**Node.js, Express e Socket.IO**.

------------------------------------------------------------------------

## 🚀 Funcionalidades

-   Contagem do **número total de usuários conectados**.
-   Identificação da **room mais popular**.
-   Atualização automática a cada **1 segundo**.
-   Possibilidade de o usuário **entrar em diferentes rooms**.
-   Ranking de rooms (da mais cheia para a menos cheia).

------------------------------------------------------------------------

## 🛠 Tecnologias

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [Socket.IO](https://socket.io/)
-   HTML / CSS / JavaScript (frontend)

------------------------------------------------------------------------

## 📦 Instalação e Execução

### 1. Clone o repositório

``` bash
git clone https://github.com/Marcondes05/Aula04_TP_CC.git
cd Aula04_TP_CC
```

### 2. Instale as dependências

``` bash
npm install
```

### 3. Execute o servidor

``` bash
node server.js
```

Ou, se tiver o **nodemon**:

``` bash
npx nodemon server.js
```

### 4. Acesse no navegador

    http://localhost:3000

------------------------------------------------------------------------

## 📂 Estrutura de Pastas

    /projeto
     ├── server.js          # Servidor Node.js + Express + Socket.IO
     ├── package.json       # Dependências e scripts
     ├── .gitignore         # Arquivos ignorados pelo Git
     ├── public/
     │    ├── index.html    # Interface do dashboard
     │    └── client.js     # Lógica do frontend

------------------------------------------------------------------------

## 🌟 Extra

-   Mostrar ranking completo das rooms ✅\
-   Fácil de estender para usar **Chart.js** e gerar gráficos em tempo
    real 📊\
-   Pode ser adaptado para sistemas de **chat em tempo real**,
    **monitoramento de usuários** ou **jogos multiplayer**.

------------------------------------------------------------------------

## 👨‍💻 Autor

Desenvolvido por
**[Marcondes05](https://github.com/Marcondes05/Aula04_TP_CC)**
