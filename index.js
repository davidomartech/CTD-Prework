const fetchBtn = document.getElementById("btn-fetch");
const destinationInput = document.getElementById("input-location");
const dateInput = document.getElementById("input-date");

fetchBtn.addEventListener("click", (e) => {});

async function getWeatherData(latitude, longitude, date) {}

async function getLocationData(destination) {
  let url = `https://geocoding-api.open-meteo.com/v1/search?name=${destination}&count=1&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something wrong with API service");
    }

    let data = await response.json();
    data = data.results[0];
    const dataObj = {
      name: data.name,
      country: data.country,
      latitude: data.latitude,
      longitude: data.longitude,
    };
    console.log(dataObj);
  } catch (error) {
    console.error(error);
  }
}

getLocationData("tokyo");
