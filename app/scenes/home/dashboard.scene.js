import { navigateTo } from "../../Router";
import { fetchApi } from "../../helpers/fetch-api";
import styles from "./dashboard.styles.css";

export function DashboardScene() {
  let createFlight;
  let role = localStorage.getItem('role')

  createFlight = `<button id="create" class="create-class ${localStorage.getItem('role') === 'User'? styles.hidden: ''}">Create Flight</button>`;

  const pageContent = ` 
    <h1 class="${styles.title}">Vuelos actuales</h1>
    <div id="all-flights"></div>
    ${createFlight}
    `;

  const logic = async () => {
    const $buttonCreate = document.querySelector("#create");
    $buttonCreate.addEventListener("click", () => {
      navigateTo("/dashboard/create");
    });

    const $flightsContainer = document.getElementById("all-flights");

    const allFlights = await fetch("http://localhost:3000/Flight");
    const responseJson = await allFlights.json();
    responseJson.forEach((flight) => {
      $flightsContainer.innerHTML += `
            <div class="${styles.card}">
                <p>Number: ${flight.number}</p>
                <p>Origin: ${flight.origin}</p>
                <p>Destination: ${flight.destination}</p>
                <p>Departure: ${flight.departure}</p>
                <p>Arrival: ${flight.arrival}</p>
                <p>Capacity: ${flight.capacity}</p>
                <button class="edit-class ${localStorage.getItem('role') === 'User'? styles.hidden: ''}" data-edit-id="${flight.id}">Edit</button>
                <button class="delete-class ${localStorage.getItem('role') === 'User'? styles.hidden: ''}" data-delete-id="${flight.id}">Delete</button>
                <button class="reserve-class ${localStorage.getItem('role') === 'Admin'? styles.hidden: ''}" data-reserve-id="${flight.id}">Reserve</button>
                
            </div>
            `;
    });
    

    //Logic to add event listener to reserve buttons
    const $reserveBtns = document.getElementsByClassName("reserve-class");
    const reserveBtnArray = [...$reserveBtns];
    reserveBtnArray.forEach(($reserveBtn) => {
      $reserveBtn.addEventListener("click", () => {
        const flightId = $reserveBtn.getAttribute("data-reserve-id");
        reserveFlight(flightId);
      });
    });

//Logic to reserve a flight
const reserveFlight = async (flightId) => {
  const confirmation = confirm("¿Estás seguro que deseas reservar este vuelo?");
  if (confirmation) {
    try {
      // Fetch the current flight data
      const flightResponse = await fetch(`http://localhost:3000/Flight/${flightId}`);
      const flightData = await flightResponse.json();

      // Check if the flight is full
      if (flightData.capacity <= 0) {
        console.log("Lo sentimos, este vuelo está lleno.");
        return;
      }

      // Decrease the flight capacity by 1
      const updatedFlightData = {
        ...flightData,
        capacity: flightData.capacity - 1,
      };

      // Update the flight data in the database
      await fetchApi(`http://localhost:3000/Flight/${flightId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedFlightData),
      });

      // Create the booking
      const response = await fetchApi(`http://localhost:3000/Booking`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          flightId: flightId,
          userId: role,
          bookingDate: Date.now(),
        }),
      });

      if (response) {
        console.log("Se reservó el vuelo correctamente");
        navigateTo("/dashboard");
      } else {
        console.log("Error al reservar el vuelo");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  } else {
    console.log("El usuario canceló la reservación");
  }
};

    //Logic to edit a flight
    const $editBtns = document.getElementsByClassName("edit-class");
    const editBtnArray = [...$editBtns];
    editBtnArray.forEach(($editBtn) => {
      $editBtn.addEventListener("click", () => {
        navigateTo(
          `/dashboard/edit?flightId=${$editBtn.getAttribute("data-edit-id")}`
        );
      });
    });

    //Logic to add event listener to delete buttons
    const $deleteBtns = document.getElementsByClassName("delete-class");
    const deleteBtnArray = [...$deleteBtns];
    deleteBtnArray.forEach(($deleteBtn) => {
      $deleteBtn.addEventListener("click", () => {
        const flightId = $deleteBtn.getAttribute("data-delete-id");
        deleteFlight(flightId);
      });
    });

    //Logic to eliminate a Flight
    const deleteFlight = async (flightId) => {
      const confirmation = confirm("¿Estás seguro de eliminar este vuelo?");
      if (confirmation) {
        try {
          const response = await fetchApi(
            `http://localhost:3000/Flight/${flightId}`,
            {
              method: "DELETE",
            }
          );
          if (response) {
            console.log("Se eliminó el vuelo correctamente");
            navigateTo("/dashboard");
          } else {
            console.log("Error al eliminar el vuelo");
          }
        } catch (error) {
          console.log("ERROR", error);
        }
      } else {
        console.log("El usuario canceló la eliminación");
      }
    };
  };

  return {
    pageContent,
    logic,
  };
}
