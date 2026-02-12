const fetchBtn = document.getElementById("btn-fetch");
const destinationInput = document.getElementById("input-location");
const dateInput = document.getElementById("input-date");
const outputContainerEl = document.querySelector(".output-container");

const todayDate = new Date().toISOString().split("T")[0];
dateInput.setAttribute("max", todayDate);

fetchBtn.addEventListener("click", (e) => {
  startTimeTravel(destinationInput.value, dateInput.value);
});

async function startTimeTravel(destination, date) {
  const locationData = await getLocationData(destination);
  if ("error" in locationData) {
    outputContainerEl.textContent = locationData.error;
  } else {
    const weatherData = await getWeatherData(locationData, date);
    displayMainPageData(weatherData, locationData);
  }
}

function displayMainPageData(weatherData, locationData) {
  let pEl = document.createElement("p");
  pEl.textContent = `> Fetch Weather For ${locationData.name}...`;
  outputContainerEl.appendChild(pEl);
  pEl = document.createElement("p");
  pEl.textContent = `> Location: ${locationData.name}, ${locationData.country}`;
  outputContainerEl.appendChild(pEl);
  pEl = document.createElement("p");
  pEl.textContent = `> Date: ${dateInput.value}`;
  outputContainerEl.appendChild(pEl);
  pEl = document.createElement("p");
  pEl.textContent = `> Temperature: ${weatherData.tempMin} °C - ${weatherData.tempMax} °C`;
  outputContainerEl.appendChild(pEl);

  let customLink = document.createElement("a");
  customLink.textContent = "More Details...";
  customLink.href = `details.html?lat=${locationData.latitude}&long=${locationData.longitude}&date=${dateInput.value}`;
  customLink.classList.add("link");
  outputContainerEl.appendChild(customLink);
}
