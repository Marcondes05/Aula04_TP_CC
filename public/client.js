const socket = io();

// Gráfico de rooms (barras)
const ctxRoom = document.getElementById("roomChart").getContext("2d");
let roomChart = new Chart(ctxRoom, {
  type: "bar",
  data: {
    labels: [],
    datasets: [{
      label: "Usuários por Room",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(153, 102, 255, 0.7)"
      ],
      borderRadius: 8
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

// Gráfico de evolução de usuários (linha)
const ctxUsers = document.getElementById("usersChart").getContext("2d");
let usersChart = new Chart(ctxUsers, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Total de Usuários Conectados",
      data: [],
      borderColor: "rgba(255, 215, 54, 1)",
      backgroundColor: "rgba(255, 215, 54, 0.2)",
      tension: 0.3,
      fill: true,
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
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

  // Atualizar gráfico de rooms
  roomChart.data.labels = data.rooms.map(([room]) => room);
  roomChart.data.datasets[0].data = data.rooms.map(([, count]) => count);
  roomChart.update();

  // Atualizar gráfico de evolução de usuários
  let now = new Date().toLocaleTimeString();
  usersChart.data.labels.push(now);
  usersChart.data.datasets[0].data.push(data.totalUsers);

  // Mantém no máximo 10 pontos no gráfico
  if (usersChart.data.labels.length > 10) {
    usersChart.data.labels.shift();
    usersChart.data.datasets[0].data.shift();
  }

  usersChart.update();

  // Mostrar alerta se alguma room tiver mais de 5 usuários
  const alertBox = document.getElementById("alert");
  const roomLotada = data.rooms.find(([room, count]) => count > 5);

  if (roomLotada) {
    alertBox.innerText = `⚠️ Atenção: a room "${roomLotada[0]}" ultrapassou ${roomLotada[1]} usuários!`;
    alertBox.classList.add("active");
  } else {
    alertBox.classList.remove("active");
  }
});

// Aviso estilizado quando a room já estiver cheia
socket.on("roomFull", (roomName) => {
  const roomFullAlert = document.getElementById("roomFullAlert");
  roomFullAlert.innerText = `⚠️ A room "${roomName}" já atingiu o máximo de 5 usuários!`;
  roomFullAlert.classList.add("active");

  // Some sozinho após 4 segundos
  setTimeout(() => {
    roomFullAlert.classList.remove("active");
  }, 4000);
});

// Função para entrar em uma sala
function joinRoom(roomName) {
  socket.emit("joinRoom", roomName);
}
