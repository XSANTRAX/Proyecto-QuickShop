

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const contenedor = document.getElementById("catalogo-productos");

function renderCarrito() {
    console.log("Carrito actual:", carrito);
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.price;

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
        <button>Eliminar del carrito</button>
      </div>
    `;

    const boton = card.querySelector("button");
    boton.addEventListener("click", () => {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    });

    contenedor.appendChild(card);
  });

    const mainElement = document.querySelector("main");
    
    // Remove existing total price and buy button if they exist
    const existingTotalPrice = mainElement.querySelector(".total-price");
    if (existingTotalPrice) {
        existingTotalPrice.remove();
    }

    const existingBuyButtonContainer = mainElement.querySelector(".buy-button-container");
    if (existingBuyButtonContainer) {
        existingBuyButtonContainer.remove();
    }


    const totalElemento = document.createElement("p");
    totalElemento.classList.add("total-price");
    totalElemento.textContent = "Total: $" + total;
    mainElement.appendChild(totalElemento);

    const buyButtonContainer = document.createElement("div");
    buyButtonContainer.classList.add("buy-button-container");
    buyButtonContainer.innerHTML = `<button class="buy">Finalizar Compra</button>`;
    mainElement.appendChild(buyButtonContainer);
}

renderCarrito();
