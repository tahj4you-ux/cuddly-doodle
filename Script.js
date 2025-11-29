const apiKey = "7e53ab76cbe27c1123f607ecda8cc7f7";

document.getElementById("btn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    const result = document.getElementById("result");

    if (city.trim() === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod === "404") {
                result.innerHTML = "City not found!";
                return;
            }

            const iconCode = data.weather[0].icon;
            const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            result.innerHTML = `
                <h3>${data.name}</h3>
                <img src="${iconURL}" class="weather-icon">
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;

            // Animation
            result.classList.remove("show");
            setTimeout(() => result.classList.add("show"), 10);

            // Backgrounds
            const weather = data.weather[0].main.toLowerCase();

            if (weather.includes("cloud")) {
                document.body.style.backgroundImage = "url('https://i.imgur.com/WTY8B72.jpg')";
            } else if (weather.includes("rain")) {
                document.body.style.backgroundImage = "url('https://i.imgur.com/6JYB7Jp.jpg')";
            } else if (weather.includes("clear")) {
                document.body.style.backgroundImage = "url('https://i.imgur.com/yYqRrFf.jpg')";
            } else if (weather.includes("snow")) {
                document.body.style.backgroundImage = "url('https://i.imgur.com/XYcV6dy.jpg')";
            } else {
                document.body.style.backgroundImage = "url('https://i.imgur.com/0q7rl5L.jpg')";
            }

        })
        .catch(() => {
            result.innerHTML = "Error fetching weather data";
        });
});