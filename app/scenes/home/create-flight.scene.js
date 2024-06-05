// Import necessary functions
import { navigateTo } from "../../Router";
import { fetchApi } from "../../helpers/fetch-api";

export function CreateNewFLightScene() {
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
    // Get a reference to the form
    const $form = document.querySelector("form");

    // Add an event listener to the form submit event
    $form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const $inputNumber = document.getElementById("flight-number").value;
      const $inputOrigin = document.querySelector('[name="origin"]').value;
      const $inputDestination = document.querySelector(
        '[name="destination"]'
      ).value;
      const $inputDeparture = document.getElementById("departure-date").value;
      const $inputArrival = document.getElementById("arrival-date").value;
      const $inputCapacity = document.getElementById("capacity-number").value;

      // Send a request to the API to update the task
      const response = await fetchApi(`http://localhost:3000/Flight`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          number: $inputNumber,
          origin: $inputOrigin,
          destination: $inputDestination,
          departure: $inputDeparture,
          arrival: $inputArrival,
          capacity: $inputCapacity,
        }),
      });

      // Check the response and show a message to the user
      if (response) {
        alert("Vuelo actualizado con éxito");
        navigateTo("/dashboard");
      } else {
        console.log("Error al crear el vuelo");
      }
    });
  };

  // Return the page content and logic
  return {
    pageContent,
    logic,
  };
}
