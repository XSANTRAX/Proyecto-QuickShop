document.getElementById("form-login").addEventListener("submit", async (e) => {

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

  e.preventDefault();
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Datos incorrectos, error HTTPS: ${response.status}`
      );
    }

    const data = await response.json();
    console.log(data);
    sessionStorage.setItem("token", data.token);
    window.location.href = "./../configuración/configuracion.html";

  } catch (error) {
    console.log("Error al obtener los datos", error);
  }
});
