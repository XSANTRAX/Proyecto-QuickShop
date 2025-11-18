document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    window.location.href = "./../login/login.html";
    return;
  }

  const botonCerrasesion = document.getElementById("cerrarSesion");
  if (botonCerrasesion) {
    botonCerrasesion.addEventListener("click", () => {
      sessionStorage.removeItem("token");
      window.location.href = "./../index.html";
    });
  } else {
    console.warn("No se encontró el botón cerrarSesion");
  }
});
