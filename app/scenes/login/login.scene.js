import { navigateTo } from "../../Router";
// import { decryptData } from "../../helpers/encrypt";
import { fetchApi } from "../../helpers/fetch-api";
import styles from "./login.styles.css";

//Create function scene
export function LoginScene() {
  const root = document.getElementById("root");
  //Pintamos en el dom con innerHTML
  root.innerHTML = `
        <div  class="${styles.container}">
            <form class=${styles.loginForm}>
                <h2>Login</h2>
                <input type="email" placeholder="email@email.com" autocomplete="email">
                <input type="password" autocomplete="current-password" placeholder="Password">
                <button type="submit">Login</button>
                <button id="register-button">Register</button>
            </form>
        </div>
    `;
  
  //Select form elements
  const $emailHTML = root.querySelector('input[type="email"]');
  const $passHTML = root.querySelector('input[type="password"]');

  const $myForm = root.getElementsByTagName("form")[0];

  //Event listener of submit
  $myForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!$emailHTML.value || !$passHTML.value) {
      alert("Rellena todos los campos");
    }

    //Fetch for extract db.json info

    const users = await fetchApi("http://localhost:3000/User");
    const user = users.find(
      (user) =>
        user.email === $emailHTML.value &&
        user.password === $passHTML.value
    );
    //Create the tolen
    if (user) {
      const token = Math.random().toString(36).substring(2);
      const role = user.role;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigateTo("/dashboard");
    } else {
      alert("Credenciales incorrectas");
    }
  });

  //Logic for register button
  const registerButton = document.getElementById("register-button");
  registerButton.addEventListener("click", () => {
    navigateTo("/register");
  });
}