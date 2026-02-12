const outputContainerEl = document.querySelector(".output-container");
const params = new URLSearchParams(window.location.search);
const locData = {
  latitude: params.get("lat"),
  longitude: params.get("long"),
};
const date = params.get("date");
// prettier-ignore
// This obj translates the weather code the API provides us with a human readable translation
const weatherCodes = {
    0: { condition: "Clear Sky", advice: "Sunglasses and sunscreen. Pack light." },
    1: { condition: "Mainly Clear", advice: "Comfortable clothes. A light layer for evening." },
    2: { condition: "Partly Cloudy", advice: "Standard vacation gear. No rain gear needed." },
    3: { condition: "Overcast", advice: "A light jacket or hoodie might be cozy." },
    45: { condition: "Foggy", advice: "Visibility is low. Pack a bright windbreaker." },
    48: { condition: "Depositing Rime Fog", advice: "It's damp and cold. Pack moisture-wicking layers." },
    51: { condition: "Light Drizzle", advice: "A light water-resistant shell is enough." },
    53: { condition: "Moderate Drizzle", advice: "Pack a small travel umbrella." },
    55: { condition: "Dense Drizzle", advice: "You will get damp. Pack a proper raincoat." },
    56: { condition: "Light Freezing Drizzle", advice: "Icy roads! Pack thermal layers and boots." },
    57: { condition: "Dense Freezing Drizzle", advice: "Danger: Ice. Pack heavy winter gear." },
    61: { condition: "Slight Rain", advice: "Pack a raincoat or an umbrella." },
    63: { condition: "Moderate Rain", advice: "Waterproof shoes and a sturdy umbrella required." },
    65: { condition: "Heavy Rain", advice: "Full rain gear: boots, coat, and waterproof bag." },
    66: { condition: "Light Freezing Rain", advice: "Expect ice. Pack salt-grip boots and warm layers." },
    67: { condition: "Heavy Freezing Rain", advice: "Extreme conditions. Pack your warmest winter armor." },
    71: { condition: "Slight Snowfall", advice: "Pack a warm coat and knit hat." },
    73: { condition: "Moderate Snowfall", advice: "Pack insulated boots and thick socks." },
    75: { condition: "Heavy Snowfall", advice: "Deep snow expected. Pack snow pants and heavy parka." },
    77: { condition: "Snow Grains", advice: "Cold and crunchy. Pack winter accessories." },
    80: { condition: "Slight Rain Showers", advice: "Keep a poncho handy for quick bursts." },
    81: { condition: "Moderate Rain Showers", advice: "Typical tropical/spring rain. Pack quick-dry clothes." },
    82: { condition: "Violent Rain Showers", advice: "Flash flooding possible. Pack heavy-duty waterproofs." },
    85: { condition: "Slight Snow Showers", advice: "Short bursts of cold. Pack a beanie and scarf." },
    86: { condition: "Heavy Snow Showers", advice: "Blizzard-like bursts. Pack thermal underwear." },
    95: { condition: "Thunderstorm", advice: "Stay indoors. No special gear helps with lightning!" },
    96: { condition: "Thunderstorm with Slight Hail", advice: "Hazardous. Pack a hard-shell jacket." },
    99: { condition: "Thunderstorm with Heavy Hail", advice: "Extreme weather. Pack for survival, not sightseeing." }
};

async function populateDetailsPage() {
  const data = await getWeatherData(locData, date);

  let pageTemplate = `
  <p> > Min Temperature: ${data.tempMin} °C</p>
  <p> > Max Temperature: ${data.tempMax} °C</p>
  <p> > Average Humidity: ${data.averageHumidity} %</p>
  <p> > Max Wind Speed: ${data.maxWindSpeed} km/h</p>
  <p> > Total Precipitation: ${data.totalPrecipitation} mm</p>
  <p> > Condition: ${weatherCodes[data.weatherCode].condition}</p> 
  <div class="advice-container">
    <p class="advice-text"> Packing Advice: ${weatherCodes[data.weatherCode].advice}</p>
  </div>
  
  <a class="link" href="index.html"> New Vacation</a>
`;

  outputContainerEl.innerHTML = pageTemplate;
}

populateDetailsPage();
