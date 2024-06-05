import styles from "./not-found.styles.css";

//Export  function scene
export function NotFoundScene() {
  const root = document.getElementById("root");
  //Pintamos en el dom con innerHTML
  root.innerHTML = `
    <div class="${styles.container}">
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  `;
}
