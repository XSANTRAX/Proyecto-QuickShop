let productosPorPagina = 10;
let paginaActual = 1;
let productosTotales = [];
const productos = document.getElementById("catalogo-productos");

async function obtenerProductos() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error(
        `No se pudo obtener los productos, error HTTPS: ${response.status}`
      );
    }

    const data = await response.json();
    console.log(data);
    productosTotales = data; 
    mostrarPagina(paginaActual);
    actualizarControlesPaginacion();
  } catch (error) {
    console.log("Error al obtener los productos", error);
  }
}

document.addEventListener("DOMContentLoaded", obtenerProductos);


function mostrarPagina(numeroPagina) {
  const inicio = (numeroPagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPagina = productosTotales.slice(inicio, fin);
  agregarProducto(productosPagina);
}


const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarProducto(listaProductos) {
  productos.innerHTML = "";
  listaProductos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `

      <div class="imagen">
        <img src="${producto.image}" alt="${producto.title}">
      </div>
      <div class="informacion">
        <h2>${producto.title}</h2>
        <span>$${producto.price}</span>
      </div>
      <div class="boton">
        <button>Agregar al carrito</button>
      </div>
    `;

    const boton = card.querySelector("button");
    boton.addEventListener("click", () => {
      carrito.push(producto);
      console.log("Agregado al carrito:", carrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    productos.appendChild(card);
  });
}

document.getElementById("siguiente").addEventListener("click", () => {
  const totalPaginas = Math.ceil(productosTotales.length / productosPorPagina);
  if (paginaActual < totalPaginas) {
    paginaActual++;
    mostrarPagina(paginaActual);
    document.getElementById("pagina-actual").textContent = paginaActual; 
    actualizarControlesPaginacion();
  }
});

document.getElementById("anterior").addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    mostrarPagina(paginaActual);
    document.getElementById("pagina-actual").textContent = paginaActual; 
    actualizarControlesPaginacion();
  }
});

function actualizarControlesPaginacion() {
  const totalPaginas = Math.ceil(productosTotales.length / productosPorPagina);
  document.getElementById("pagina-actual").textContent = paginaActual;

  document.getElementById("anterior").disabled = paginaActual === 1;
  document.getElementById("siguiente").disabled = paginaActual === totalPaginas;
}

