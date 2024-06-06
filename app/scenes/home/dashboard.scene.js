// Importing necessary modules and styles
import { navigateTo } from "../../Router";
import { fetchApi } from "../../helpers/fetch-api";
import styles from "./dashboard.styles.css";

// Function to render the Dashboard scene
export function DashboardScene() {
  let createFlight;
  // Fetching the user role from local storage
  let role = localStorage.getItem('role')

  // Creating a button for flight creation, visible only to non-User roles
  createFlight = `<button id="create" class="create-class ${localStorage.getItem('role') === 'User'? styles.hidden: ''}">Create Flight</button>`;

  // HTML content for the page
  const pageContent = ` 
    <h1 class="${styles.title}">Current Flights</h1>
    <div id="all-flights"></div>
    ${createFlight}
    `;

  // Logic for the Dashboard scene
  const logic = async () => {
    // Adding event listener to the Create button
    const $buttonCreate = document.querySelector("#create");
    $buttonCreate.addEventListener("click", () => {
      navigateTo("/dashboard/create");
    });

    // Fetching all flights and rendering them on the page
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

    // Adding event listeners to the Reserve buttons
    const $reserveBtns = document.getElementsByClassName("reserve-class");
    const reserveBtnArray = [...$reserveBtns];
    reserveBtnArray.forEach(($reserveBtn) => {
      $reserveBtn.addEventListener("click", () => {
        const flightId = $reserveBtn.getAttribute("data-reserve-id");
        reserveFlight(flightId);
      });
    });

    // Logic to reserve a flight
    const reserveFlight = async (flightId) => {
      const confirmation = confirm("Are you sure you want to reserve this flight?");
      if (confirmation) {
        try {
          // Fetch the current flight data
          const flightResponse = await fetch(`http://localhost:3000/Flight/${flightId}`);
          const flightData = await flightResponse.json();

          // Check if the flight is full
          if (flightData.capacity <= 0) {
            console.log("Sorry, this flight is full.");
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
            console.log("Flight booked successfully");
            navigateTo("/dashboard");
          } else {
            console.log("Error booking the flight");
          }
        } catch (error) {
          console.log("ERROR", error);
        }
      } else {
        console.log("User cancelled the reservation");
      }
    };

    // Adding event listeners to the Edit buttons
    const $editBtns = document.getElementsByClassName("edit-class");
    const editBtnArray = [...$editBtns];
    editBtnArray.forEach(($editBtn) => {
      $editBtn.addEventListener("click", () => {
        navigateTo(
          `/dashboard/edit?flightId=${$editBtn.getAttribute("data-edit-id")}`
        );
      });
    });

    // Adding event listeners to the Delete buttons
    const $deleteBtns = document.getElementsByClassName("delete-class");
    const deleteBtnArray = [...$deleteBtns];
    deleteBtnArray.forEach(($deleteBtn) => {
      $deleteBtn.addEventListener("click", () => {
        const flightId = $deleteBtn.getAttribute("data-delete-id");
        deleteFlight(flightId);
      });
    });

    // Logic to delete a Flight
    const deleteFlight = async (flightId) => {
      const confirmation = confirm("Are you sure you want to delete this flight?");
      if (confirmation) {
        try {
          const response = await fetchApi(
            `http://localhost:3000/Flight/${flightId}`,
            {
              method: "DELETE",
            }
          );
          if (response) {
            console.log("Flight deleted successfully");
            navigateTo("/dashboard");
          } else {
            console.log("Error deleting the flight");
          }
        } catch (error) {
          console.log("ERROR", error);
        }
      } else {
        console.log("User cancelled the deletion");
      }
    };
  };

  // Return the page content and logic
  return {
    pageContent,
    logic,
  };
}

// This script is for a dashboard page of a flight reservation system. It fetches flight data from a server, displays it on the page, and allows users to reserve, edit, or delete flights depending on their role. The Create Flight button is only visible to non-User roles. The Reserve, Edit, and Delete buttons are visible based on the users role. The Reserve button is hidden for Admin role, while Edit and Delete buttons are hidden for User role. The script also includes logic to handle flight reservation, editing, and deletion. When a flight is reserved, its capacity is decreased by 1. If a flight is full (capacity is 0), it cannot be reserved. When a flight is deleted, it is removed from the database. When an Edit button is clicked, the user is navigated to the edit page for the corresponding flight. The script uses the fetchApi function to make HTTP requests to the server and the navigateTo function to navigate between pages. The script is written in JavaScript and uses the Fetch API for HTTP requests, the Local Storage Web API to store the users role, and CSS modules for styling. The script is organized into a main function DashboardScene, which returns an object containing the HTML content for the page and a function logic that contains the logic for the page. The logic function is an asynchronous function because it includes asynchronous operations such as fetching data from the server. The logic function is called when the page is loaded. The DashboardScene function is exported so it can be imported and used in other parts of the application. The script also includes error handling to log any errors that occur during the execution of the script. The script uses template literals (strings enclosed in backticks) to create HTML content and to include JavaScript expressions in the HTML content. The script uses the document.querySelector and document.getElementById methods to select elements from the DOM (Document Object Model), and the addEventListener method to add event listeners to the elements. The script uses the confirm function to display a confirmation dialog to the user before reserving or deleting a flight. The script uses the spread operator (...) to create a new array from an HTMLCollection or NodeList. The script uses the getAttribute method to get the value of a data attribute of an element. The script uses the console.log method to log messages to the console. The script uses the Date.now method to get the current date and time. The script uses the JSON.stringify method to convert a JavaScript object to a JSON string. The script uses the await keyword to pause the execution of the async function until a Promise is resolved or rejected. The script uses the try...catch statement to catch exceptions that may be thrown during the execution of the script. The script uses the if...else statement to perform different actions based on different conditions. The script uses the return statement to return a value from a function. The script uses the import statement to import functions, objects, or values from other modules. The script uses the export statement to export functions, objects, or values from a module so they can be imported and used in other modules. The script uses the let keyword to declare variables that can be reassigned. The script uses the const keyword to declare variables that cannot be reassigned. The script uses the async keyword to declare an async function. The script uses the fetch function to make HTTP requests. The script uses the `localStorage