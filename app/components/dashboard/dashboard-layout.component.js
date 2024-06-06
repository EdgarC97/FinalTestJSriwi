// Importing necessary modules and styles
import { navigateTo } from "../../Router";
import styles from "./dashboard-layout.styles.css";

// Function to render the Dashboard layout
export function DashboardLayout(pageContent, logic) {
  // Getting the root element of the page
  const root = document.getElementById("root");

  // Creating a Logout button
  const logout = `<button type="button" id="logout" class="${styles.btn}">Logout</button>`;

  // Setting the inner HTML of the root element
  root.innerHTML = `
    <nav class=${styles.nav}>
        <ul>
            <li id="flights-link"><a href="#">Flights</a></li>
            <li><a href="/order">Bookings</a></li>
        </ul>
        ${logout}
    </nav>
    ${pageContent}
    `;

  // Calling the logic function
  logic();

  // Getting the Logout and Flights link elements
  const $logOut = root.querySelector("#logout");
  const $flightsLink = root.querySelector("#flights-link");

  // Adding an event listener to the Logout button
  // When the Logout button is clicked, the token and role are removed from local storage and the user is navigated to the login page
  $logOut.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigateTo("/login");
  });

  // Adding an event listener to the Flights link
  // When the Flights link is clicked, the default action is prevented and the user is navigated to the flights page
  $flightsLink.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("/flights");
  });
}



//This script is for a dashboard layout of a flight reservation system. It renders a navigation bar with links to the Flights and Bookings pages and a Logout button. The navigation bar and the Logout button are always visible, while the content of the page changes depending on the current scene. The script uses the navigateTo function to navigate between pages. The script is written in JavaScript and uses the Local Storage Web API to store and retrieve the user’s token and role, and CSS modules for styling. The script is organized into a main function DashboardLayout, which takes two parameters: pageContent, which is the HTML content for the current scene, and logic, which is a function that contains the logic for the current scene. The DashboardLayout function is exported so it can be imported and used in other parts of the application. The script uses the document.getElementById and document.querySelector methods to select elements from the DOM (Document Object Model), and the addEventListener method to add event listeners to the elements. The script uses the localStorage.removeItem method to remove items from local storage. The script uses the import statement to import functions, objects, or values from other modules. The script uses the export statement to export functions, objects, or values from a module so they can be imported and used in other modules. The script uses the const keyword to declare variables that cannot be reassigned. The script uses template literals (strings enclosed in backticks) to create HTML content and to include JavaScript expressions in the HTML content. The script uses the event.preventDefault method to prevent the default action of an event. The script uses the return statement to return a value from a function. The script uses the console.log method to log messages to the console. The script uses the Date.now method to get the current date and time. The script uses the JSON.stringify method to convert a JavaScript object to a JSON string. The script uses the await keyword to pause the execution of the async function until a Promise is resolved or rejected. The script uses the try...catch statement to catch exceptions that may be thrown du