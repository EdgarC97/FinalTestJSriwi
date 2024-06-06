// FlightsScene.js
import { fetchApi } from "../../helpers/fetch-api";
import styles from "./flights.styles.css";

export function FlightsScene() {
  const pageContent = `
    <h1 class="${styles.title}">All Flights</h1>
    <div id="all-flights"></div>
  `;

  const logic = async () => {
    const $flightsContainer = document.getElementById("all-flights");

    // Fetch all flights
    const flightsJson = await fetchApi("http://localhost:3000/Flight");

    // Display each flight
    flightsJson.forEach((flight) => {
      $flightsContainer.innerHTML += `
        <div class="${styles.card}">
          <p>Number: ${flight.number}</p>
          <p>Origin: ${flight.origin}</p>
          <p>Destination: ${flight.destination}</p>
          <p>Departure: ${flight.departure}</p>
          <p>Arrival: ${flight.arrival}</p>
          <p>Capacity: ${flight.capacity}</p>
        </div>
      `;
    });
  };

  return {
    pageContent,
    logic,
  };
}
