async function getLocationData(destination) {
  let url = `https://geocoding-api.open-meteo.com/v1/search?name=${destination}&count=1&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something wrong with API service");
    }

    let data = await response.json();

    if ("results" in data) {
      data = data.results[0];
      const dataObj = {
        name: data.name,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
      };
      return dataObj;
    } else {
      throw new Error(`Could not find destination: ${destination}`);
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

async function getWeatherData(locData, date) {
  let url = `https://archive-api.open-meteo.com/v1/archive?latitude=${locData.latitude}&longitude=${locData.longitude}&start_date=${date}&end_date=${date}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,temperature_2m_mean,relative_humidity_2m_mean`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something wrong with API service");
    }

    let data = await response.json();
    data = data.daily;
    console.log(data);
    return {
      totalPrecipitation: data.precipitation_sum[0],
      averageHumidity: data.relative_humidity_2m_mean[0],
      tempMax: data.temperature_2m_max[0],
      tempMin: data.temperature_2m_min[0],
      weatherCode: data.weather_code[0],
      dominantWindDirection: data.wind_direction_10m_dominant[0],
      maxWindSpeed: data.wind_speed_10m_max[0],
    };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}
