let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, quantity) {
  const item = cart.find(i => i.name === productName);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ name: productName, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} added to cart!`);
}

function showCart() {
  window.location.href = "cart.html";
}
