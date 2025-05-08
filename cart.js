const cart = [];

function addToCart(productName, quantity) {
  const item = cart.find(i => i.name === productName);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ name: productName, quantity });
  }
  alert(`${productName} added to cart!`);
}

function showCart() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Your Cart:\n\n";
  cart.forEach(item => {
    message += `${item.name} — Quantity: ${item.quantity}\n`;
  });

  alert(message);
}
