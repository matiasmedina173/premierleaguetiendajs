let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Abrir el Carrito
cartIcon.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

// Cerrar el Carrito
closeCart.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

// Funcion para el Carrito
document.addEventListener("DOMContentLoaded", ready);

function ready() {
  // Borrar items del carrito
  const removeCartButtons = document.querySelectorAll(".cart-remove");
  removeCartButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  // Quantity changes
  const quantityInputs = document.querySelectorAll(".cart-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", quantityChanged);
  });
}

// Añadir al Carrito
const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach((button) => {
  button.addEventListener("click", addCartClicked);
});

// Borrar items del carrito
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Quantity changes
function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Añadir al Carrito
function addCartClicked(event) {
  const button = event.target;
  const shopProduct = button.parentElement;
  const title = shopProduct.querySelector(".product-title").innerText;
  const price = shopProduct.querySelector(".price").innerText;
  const productImg = shopProduct.querySelector(".product-img").src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  const cartItems = document.querySelector(".cart-content");
  const cartItemsNames = cartItems.querySelectorAll(".cart-product-title");

  for (const cartItem of cartItemsNames) {
    if (cartItem.innerText === title) {
      // Ya agregaste este producto al Carrito
      return;
    }
  }

  const cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");

  const cartBoxContent = `<img src="${productImg}" alt="" class="cart-img" />
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity" />
    </div>
    <!--Remove Cart-->
    <i class="bx bxs-trash-alt cart-remove"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.appendChild(cartShopBox);

  cartShopBox
    .querySelector(".cart-remove")
    .addEventListener("click", removeCartItem);
  cartShopBox
    .querySelector(".cart-quantity")
    .addEventListener("change", quantityChanged);
}

// Actualizar el Total
function updateTotal() {
  const cartContent = document.querySelector(".cart-content");
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;

  for (const cartBox of cartBoxes) {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".cart-quantity");
    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = quantityElement.value;

    total += price * quantity;
    total = Math.round(total * 100) / 100;

    document.querySelector(".total-price").innerText = "$" + total;
  }
}
// Obtener el botón de comprar
const buyButton = document.querySelector(".btn-buy");

// Añadir un evento de clic al botón de comprar
buyButton.addEventListener("click", () => {
  // Redirigir a la página de agradecimiento
  window.location.href = "HTML/paginadeagradecimiento.html";
});
