const apiKey = "bc26ff6f681bbbe569c5136564fd79c9";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(city) {
  const url = `${baseUrl}?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

function displayWeather(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("temperature").textContent = `${data.main.temp} C`;
  document.getElementById("humidity").textContent = `${data.main.humidity} %`;
  document.getElementById("wind").textContent = `${data.wind.speed} m/s`;
}

document.getElementById("search-btn").addEventListener("click", () => {
  const cityInput = document.getElementById("city-input").value;
  fetchWeather(cityInput);
});
