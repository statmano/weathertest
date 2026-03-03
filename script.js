const serviceUrl = "https://mistakenly-optimal-macaque.edgecompute.app";

async function updateWeather(lat = '', lon = '', city = '') {
    const welcomeEl = document.getElementById('welcome-msg');
    const tempEl = document.getElementById('temp-value');
    const emojiEl = document.getElementById('emoji');

    welcomeEl.innerText = "Loading...";

    try {
        const query = lat ? `?lat=${lat}&lon=${lon}&city=${city}` : '';
        const response = await fetch(`${serviceUrl}${query}`);
        const data = await response.json();

        // 1. Update Text
        welcomeEl.innerText = `${data.welcomeMessage} ${data.city}`;
        tempEl.innerText = `${data.temperature}${data.unit}`;

        // 2. Emoji Logic
        let emoji = "🌤️"; 
        const temp = data.temperature;
        
        // Normalize to Fahrenheit for the emoji calculation logic
        const checkTemp = data.isFahrenheit ? temp : (temp * 9/5) + 32;

        if (checkTemp > 85) emoji = "🔥";      // Hot
        else if (checkTemp < 50) emoji = "❄️"; // Cold
        else emoji = "🌤️";                    // Comfortable

        emojiEl.innerText = emoji;

    } catch (error) {
        welcomeEl.innerText = "Error loading weather data.";
        console.error(error);
    }
}

// Initial Auto-Detect Load
updateWeather();

// Listener for Dropdown
document.getElementById('city-selector').addEventListener('change', (e) => {
    if (e.target.value) {
        const [lat, lon, city] = e.target.value.split(',');
        updateWeather(lat, lon, city);
    }
});