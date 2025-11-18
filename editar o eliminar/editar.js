
botonEditar.addEventListener("click", async () => {
  const ID = document.getElementById("ID").value;
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const categoria = document.getElementById("categoria").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;

  const body = {};
  if (nombre) body.title = nombre;
  if (precio) body.price = precio;
  if (descripcion) body.description = descripcion;
  if (categoria) body.category = categoria;
  if (imagen) body.image = imagen;

      if (!ID || isNaN(ID) || parseInt(ID) <= 0) {
    alert("ID inválido.");
    return;
  }


  try {
    const response = await fetch(`https://fakestoreapi.com/products/${ID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Producto editado:", data);
    alert("Producto editado correctamente.");
  } catch (error) {
    console.log("Hubo error al editar el producto:", error);
  }
});

const botonEliminar = document.getElementById("eliminar");

botonEliminar.addEventListener("click", async () => {
  const ID = document.getElementById("ID").value;

  if (!ID || isNaN(ID) || parseInt(ID) <= 0) {
    alert("ID inválido.");
    return;
  }

  const confirmar = confirm("¿Estás seguro de eliminar este producto?");
  if (!confirmar) return;

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${ID}`, {
      method: "DELETE",
    });

    if (response.ok) {
    const data = await response.json();
    console.log("Producto eliminado:", data);
    alert("Producto eliminado correctamente.");
    }else{
        alert("ID del producto no encontrado.");
    }
  } catch (error) {
    console.log("Hubo error al eliminar el producto:", error);
  }
});
