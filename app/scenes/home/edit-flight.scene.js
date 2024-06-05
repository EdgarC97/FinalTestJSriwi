// Import necessary functions
import { navigateTo } from "../../Router";
import { fetchApi } from "../../helpers/fetch-api";

export function FlightEditScene() {
  // Define the HTML content for the page
  const pageContent = `
    <form>
        <input type= "number" placeholder= "Flight number..." id="flight-number"/>
        <select name="origin">
            <option value= "" disabled selected>--Origin airport--</option>
            <option value= "MEDELLIN">Medellin</option>
            <option value= "BARRANQUILLA">Barranquilla</option>
            <option value= "CARTAGENA">Cartagena</option>
        </select>
        <select name="destination">
            <option value= "" disabled selected>--Destination airport --</option>
            <option value= "MEDELLIN">Medellin</option>
            <option value= "BARRANQUILLA">Barranquilla</option>
            <option value= "CARTAGENA">Cartagena</option>
        </select>
        <label>Departure
        <input type= "date" id="departure-date"/>
        <label>Arrival
        <input type= "date" id="arrival-date"/>
        <input type= "number" placeholder= "Capacity..." id="capacity-number"/>
        <input type= "submit" />
    </form>
    `;

  // Define the logic for the page
  const logic = async () => {
    // Get the flightId from the URL
    const searchParams = window.location.search;
    const paramsTransformed = new URLSearchParams(searchParams);
    const flightId = paramsTransformed.get("flightId");

    // Fetch the flight data from the API
    const fetchedFlightId = await fetch(
      `http://localhost:3000/Flight/${flightId}`
    );
    const responseJson = await fetchedFlightId.json();

    // Store the original values of the flight fields
    const originalNumber = responseJson.number;
    const originalOrigin = responseJson.origin;
    const originalDestination = responseJson.destination;
    const originalDeparture = responseJson.departure;
    const originalArrival = responseJson.arrival;
    const originalCapacity = responseJson.capacity;

    // Get references to the form fields
    const $inputNumber = document.getElementById("flight-number");
    const $inputOrigin = document.querySelector('[name="origin"]');
    const $inputDestination = document.querySelector('[name="destination"]');
    const $inputDeparture = document.getElementById("departure-date");
    const $inputArrival = document.getElementById("arrival-date");
    const $inputCapacity = document.getElementById("capacity-number");

    // Populate the form fields with the original values
    $inputNumber.value = responseJson.number;
    $inputOrigin.value = responseJson.origin;
    $inputDestination.value = responseJson.destination;
    $inputDeparture.value = responseJson.departure;
    $inputArrival.value = responseJson.arrival;
    $inputCapacity.value = responseJson.capacity;

    // Get a reference to the form
    const $form = document.querySelector("form");

    // Add an event listener to the form submit event
    $form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get the updated values from the form fields
      const updatedNumber = $inputNumber.value;
      const updatedOrigin = $inputOrigin.value;
      const updatedDestination = $inputDestination.value;
      const updatedDeparture = $inputDeparture.value;
      const updatedArrival = $inputArrival.value;
      const updatedCapacity = $inputCapacity.value;

      // Check if each field has been modified
      const isNumberModified = updatedNumber !== originalNumber;
      const isOriginModified = updatedOrigin !== originalOrigin;
      const isDestinationModified = updatedDestination !== originalDestination;
      const isDepartureModified = updatedDeparture !== originalDeparture;
      const isArrivalModified = updatedArrival !== originalArrival;
      const isCapacityModified = updatedCapacity !== originalCapacity;

      // Check if all fields have been modified
      const isAllModified =
        isNumberModified &&
        isOriginModified &&
        isDestinationModified &&
        isDepartureModified &&
        isArrivalModified &&
        isCapacityModified;
      // Determine the method to use based on whether all fields have been modified
      const method = isAllModified ? "PUT" : "PATCH";

      // Log the method used
      console.log(`Método utilizado: ${method}`);

      // Send a request to the API to update the flight
      const response = await fetchApi(
        `http://localhost:3000/Flight/${flightId}`,
        {
          method: method,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            number: updatedNumber,
            origin: updatedOrigin,
            destination: updatedDestination,
            departure: updatedDeparture,
            arrival: updatedArrival,
            capacity: updatedCapacity,
          }),
        }
      );

      // Check the response and show a message to the user
      if (response) {
        alert("Vuelo actualizado con éxito");
        navigateTo("/dashboard");
      } else {
        console.log("Error al actualizar el vuelo");
      }
    });
  };

  // Return the page content and logic
  return {
    pageContent,
    logic,
  };
}
