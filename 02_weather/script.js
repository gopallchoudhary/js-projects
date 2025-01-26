document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "32315c2afef301a4625e15776815e47c"

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim("")
        if(!city) return;

        try {
            const data = await fetchWeatherData(city)
            displayWeatherData(data)
        } catch (error) {
            showError()
        }
    })

    //. fetch data 
    async function fetchWeatherData(city) {
        //? get the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url)
        const data = await response.json()
        return data
        


        if(!response.ok) {
            throw new Error("City not found");
        }
    }

    //.display the data 
    function displayWeatherData(data) {
        //? display the data
        const {name, weather, main} = data

        cityNameDisplay.textContent = name
        temperatureDisplay.textContent = `Temperature: ${main.temp}`
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`



        //? unlocks the weather info
        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")
        
    }

    //. error message
    function showError() {
        weatherInfo.classList.add("hidden")
        errorMessage.classList.remove("hidden")
    }
});
