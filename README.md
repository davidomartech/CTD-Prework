# 🕰️ Vacation Time Travel Machine

A minimalist, terminal-style web application that allows users to "time travel" to a specific date and location to retrieve historical weather data and receive packing advice.

## 🚀 How to Run

1. Open <https://davidomartech.github.io/CTD-Prework/> in any modern web browser.
2. No API keys are required as this project utilizes the Open-Meteo Public API.

### Page 1: Search (`index.html`)

- **Endpoint 1:** Uses the **Open-Meteo Geocoding API** to convert a string (city name) into geographic coordinates.
- **Endpoint 2:** Uses the **Open-Meteo Archive API** to retrieve various weather data for the selected date.
- **Navigation:** Passes coordinates and date variables to the next page via URL Search Parameters.

### Page 2: Packing Manifest (`details.html`)

- **Dynamic Logic:** Upon loading, this page parses the URL parameters to identify the destination.
- **New GET Request:** As per project requirements, this page issues a **fresh fetch request** to the Archive API to retrieve the `weathercode` and other weather data.
- **Data Transformation:** Maps WMO Weather Codes to human-readable conditions and context-specific packing advice.

## 🧩 Handling Error Cases

- **Invalid Locations:** Uses `.textContent` to safely display a "Destination Not Found" message if the Geocoding API returns no results.
- **Future Dates:** Sets the max attribute via Javascript to today's date since traveling to the future is forbidden!/
