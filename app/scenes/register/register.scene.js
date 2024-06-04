import { navigateTo } from "../../Router";
import { fetchApi } from "../../helpers/fetch-api";
// import { encryptData } from "../../helpers/encrypt";

import styles from "./register.styles.css";

export function RegisterScene() {
  const root = document.getElementById("root");
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

  //logic
  let role = User;
  const $nameHtml = root.querySelector('input[type="text"]');
  const $emailHtml = root.querySelector('input[type="email"]');
  const $passwordHtml = root.querySelector('input[type="password"]');
  const $dateHtml = root.querySelector('input[type="date"]');

  const $myForm = root.getElementsByTagName("form")[0];

  $myForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!$nameHtml.value || !$emailHtml.value ||!$dateHtml.value || !$passwordHtml.value){
      alert("Please fill all fields");
      return;
    }
    //fetch
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

    if (userCreated) {
      alert("User created successfully");
      navigateTo("/login");
    }
  });
  const loginButton = document.getElementById("login-button");
  loginButton.addEventListener("click", () => {
    navigateTo("/login");
  });
}
