document.addEventListener('DOMContentLoaded', () => {
    // Weather API Integration
    const fetchWeatherData = async () => {
        try {
            const apiKey = 'YOUR_API_KEY'; // Replace with actual OpenWeatherMap API key
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Sao Paulo&appid=${apiKey}&lang=pt_br`);
            const data = await response.json();
            
            if (data.rain) {
                const weatherAlert = document.getElementById('weather-alert');
                weatherAlert.innerHTML = `⚠️ Alerta de Chuva: Previsão de ${data.rain['1h']}mm nas próximas horas`;
                document.getElementById('clima-alerta').style.display = 'block';
            }
        } catch (error) {
            console.error('Erro ao buscar dados de clima:', error);
        }
    };

    // Juros Abusivos Modal Trigger
    const jurosModalTrigger = document.querySelector('[data-bs-target="#jurosModal"]');
    if (jurosModalTrigger) {
        jurosModalTrigger.addEventListener('click', () => {
            new bootstrap.Modal(document.getElementById('jurosModal')).show();
        });
    }

    fetchWeatherData();
});