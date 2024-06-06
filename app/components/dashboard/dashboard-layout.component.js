import { navigateTo } from "../../Router";
import styles from "./dashboard-layout.styles.css";

export function DashboardLayout(pageContent, logic) {
  const root = document.getElementById("root");

  const logout = `<button type="button" id="logout" class="${styles.btn}">Logout</button>`;

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

  logic();

  const $logOut = root.querySelector("#logout");
  const $flightsLink = root.querySelector("#flights-link");

  $logOut.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigateTo("/login");
  });

  $flightsLink.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("/flights");
  });
}