const serviceUrl = "https://landltest.edgecompute.app";

async function updateWeather(lat = '', lon = '', city = '') {
  const query = lat ? `?lat=${lat}&lon=${lon}&city=${city}` : '';
  const response = await fetch(`${serviceUrl}${query}`);
  const data = await response.json();

  // Display message and temp
  document.getElementById('welcome-msg').innerText = `${data.welcomeMessage} (${data.city})`;
  document.getElementById('temp-value').innerText = `${data.temperature}${data.unit}`;

  // Logic for Emojis
  let emoji = "😎"; 
  const temp = data.temperature;
  const isF = data.isFahrenheit;

  // Convert logic to a single standard (Fahrenheit) for the emoji check
  const checkTemp = isF ? temp : (temp * 9/5) + 32;

  if (checkTemp > 85) emoji = "🔥";      // Hot
  else if (checkTemp < 50) emoji = "❄️"; // Cold
  else emoji = "🌤️";                    // Comfortable

  document.getElementById('emoji').innerText = emoji;
}

// Initial load
updateWeather();

// Dropdown listener
document.getElementById('city-selector').addEventListener('change', (e) => {
  if (e.target.value) {
    const [lat, lon, city] = e.target.value.split(',');
    updateWeather(lat, lon, city);
  }
});