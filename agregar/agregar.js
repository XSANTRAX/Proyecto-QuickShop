
const botonAgregar = document.getElementById("agregar");

botonAgregar.addEventListener("click", async (e) => {
e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const categoria = document.getElementById("categoria").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: nombre,
        price: precio,
        description: descripcion,
        category: categoria,
        image: imagen,
      }),
    });

    const data = await response.json();
    console.log("Producto agregado:", data);
    alert("Producto agregado correctamente.");
  } catch (error) {
    console.log("Hubo error al agregar el nuevo producto:", error);
  }
});
