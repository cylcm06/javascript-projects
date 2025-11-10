const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

async function fetchCryptoData() {
  const response = await fetch(apiUrl);
  const cryptos = await response.json();
  console.log(cryptos);
  createChart(cryptos);
  updateUI(cryptos);
}

function createChart(cryptos) {
  const ctx = document.getElementById("crypto-chart").getContext("2d");
  const prices = cryptos.map((crypto) => crypto.current_price);
  const labels = cryptos.map((crypto) => crypto.name);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Current Price",
          data: prices,
          borderColor: "#8ec7ea",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

function updateUI(cryptos) {
  const container = document.getElementById("crypto-container");

  cryptos.forEach((crypto) => {
    const div = document.createElement("div");
    div.className = "crypto-item";
    div.textContent = `${crypto.name} - ${crypto.current_price.toFixed(2)}`;
    container.appendChild(div);
  });
}

window.onload = fetchCryptoData;
