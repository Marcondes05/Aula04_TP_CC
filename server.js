const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = {}; // socket.id -> room

io.on("connection", (socket) => {
  console.log(`🔌 Usuário conectado: ${socket.id}`);
  users[socket.id] = null; // usuário sem sala inicialmente

  // Cliente pede para entrar em uma room
  socket.on("joinRoom", (roomName) => {
    if (users[socket.id]) {
      socket.leave(users[socket.id]);
    }
    socket.join(roomName);
    users[socket.id] = roomName;
    console.log(`👥 ${socket.id} entrou na sala ${roomName}`);
  });

  // Quando desconecta
  socket.on("disconnect", () => {
    console.log(`❌ Usuário saiu: ${socket.id}`);
    delete users[socket.id];
  });
});

// Função para calcular estatísticas
function getStats() {
  const totalUsers = Object.keys(users).length;

  // Contar usuários por room
  let roomCounts = {};
  for (let id in users) {
    const room = users[id];
    if (room) {
      roomCounts[room] = (roomCounts[room] || 0) + 1;
    }
  }

  // Ordenar por popularidade
  let sortedRooms = Object.entries(roomCounts).sort((a, b) => b[1] - a[1]);

  return {
    totalUsers,
    mostPopularRoom: sortedRooms.length > 0 ? sortedRooms[0][0] : "Nenhuma",
    rooms: sortedRooms,
  };
}

// Atualiza clientes a cada 1 segundo
setInterval(() => {
  io.emit("stats", getStats());
}, 1000);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
