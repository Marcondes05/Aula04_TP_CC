const socket = io();

const ctx = document.getElementById("roomChart").getContext("2d");
let roomChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [{
      label: "Usuários por Room",
      data: [],
      backgroundColor: "rgba(78, 115, 223, 0.7)"
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Atualizar dashboard em tempo real
socket.on("stats", (data) => {
  document.getElementById("totalUsers").innerText = data.totalUsers;
  document.getElementById("popularRoom").innerText = data.mostPopularRoom;

  // Atualizar ranking
  let roomList = document.getElementById("roomList");
  roomList.innerHTML = "";
  data.rooms.forEach(([room, count]) => {
    let li = document.createElement("li");
    li.innerText = `${room}: ${count} usuário(s)`;
    roomList.appendChild(li);
  });

  // Atualizar gráfico
  roomChart.data.labels = data.rooms.map(([room]) => room);
  roomChart.data.datasets[0].data = data.rooms.map(([, count]) => count);
  roomChart.update();

  // Mostrar alerta se alguma room tiver mais de 5 usuários
  const alertBox = document.getElementById("alert");
  const roomLotada = data.rooms.find(([, count]) => count > 5);
  if (roomLotada) {
    alertBox.style.display = "block";
  } else {
    alertBox.style.display = "none";
  }
});

// Função para entrar em uma sala
function joinRoom(roomName) {
  socket.emit("joinRoom", roomName);
}
