import { navigateTo } from "../../Router";
import { fetchApi } from "../../helpers/fetch-api";
// import { encryptData } from "../../helpers/encrypt";

import styles from "./register.styles.css";

//Create function scene
export function RegisterScene() {
  //Extract the role of localstorage
  let role = localStorage.getItem("role");

  const root = document.getElementById("root");
  //Pintamos en el dom con innerHTML
  root.innerHTML = `
        <div class="${styles.container}">
            <form class="${styles.form}">
                <h2>Register</h2>
                <input type="text" placeholder="Nombre" autocomplete="name"/>
                <input type="email" placeholder="nombre@email.com" autocomplete="email"/>
                <input type="date" placeholder="Born date"/>
                <input type="password" placeholder="Contraseña" autocomplete="new-password"/>
                <button type="submit">Register</button>
                <button id="login-button">Login</button>
            </form>
        </div>
    `;

  // Extract every element in form
  const $nameHtml = root.querySelector('input[type="text"]');
  const $emailHtml = root.querySelector('input[type="email"]');
  const $passwordHtml = root.querySelector('input[type="password"]');
  const $dateHtml = root.querySelector('input[type="date"]');

  const $myForm = root.getElementsByTagName("form")[0];

  //Event listener of submit button
  $myForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (
      !$nameHtml.value ||
      !$emailHtml.value ||
      !$dateHtml.value ||
      !$passwordHtml.value
    ) {
      alert("Please fill all fields");
      return;
    }
    //fetch for post in db.json
    const userCreated = await fetchApi("http://localhost:3000/User", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: $nameHtml.value,
        email: $emailHtml.value,
        birthdate: $dateHtml.value,
        password: $passwordHtml.value,
        roleId: role,
      }),
    });
    //Logic if user is created
    if (userCreated) {
      alert("User created successfully");
      navigateTo("/login");
    }
  });
  //Login button logic
  const loginButton = document.getElementById("login-button");
  loginButton.addEventListener("click", () => {
    navigateTo("/login");
  });
}
