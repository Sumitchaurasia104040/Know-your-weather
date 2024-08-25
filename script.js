
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const image = document.querySelector(".weather-image");

async function getApi(city) {
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=acc354726535fc0380e68a61035cd2a0&units=metric`;

  let res = await fetch(URL);

  if (!res.ok) {
    // Handle error responses including 404
    document.querySelector(".invalid").style.display = "block";
    return; // Return early since there is an error
  } else {
    document.querySelector(".invalid").style.display = "none";
  }

  let data = await res.json();
  // console.log(data);
  // console.log(data.weather[0].main);

  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".cityname").innerHTML = data.name;
  document.querySelector(".humiditypercentage").innerHTML =
    Math.round(data.main.humidity) + "%";
  document.querySelector(".speedvalue").innerHTML =
    Math.round(data.wind.speed) + "Km/h";

  const weatherMain = data.weather[0].main.toLowerCase();

  if (weatherMain === "clouds") {
    image.src = "clouds.png";
  } else if (weatherMain === "rain") {
    image.src = "rain.png";
  } else if (weatherMain === "drizzle") {
    image.src = "drizzle.png";
  } else if (weatherMain === "mist") {
    image.src = "mist.png";
  } else if (weatherMain === "snow") {
    image.src = "snow.png";
  } else {
    image.src = "clouds.png"; // Default case
  }
}

searchBtn.addEventListener("click", () => {
  getApi(searchInput.value);
});
