const socket = io();

// Atualizar dashboard em tempo real
socket.on("stats", (data) => {
  document.getElementById("totalUsers").innerText = data.totalUsers;
  document.getElementById("popularRoom").innerText = data.mostPopularRoom;

  let roomList = document.getElementById("roomList");
  roomList.innerHTML = "";
  data.rooms.forEach(([room, count]) => {
    let li = document.createElement("li");
    li.innerText = `${room}: ${count} usuário(s)`;
    roomList.appendChild(li);
  });
});

// Função para entrar em uma sala
function joinRoom(roomName) {
  socket.emit("joinRoom", roomName);
}
