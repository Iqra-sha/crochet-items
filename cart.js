// Function to handle adding items to the cart
function addToCart(productName, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProductIndex = cart.findIndex(item => item.name === productName);

  if (existingProductIndex >= 0) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ name: productName, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} has been added to your cart!`);
}

// Function to remove item from the cart
function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart(); // Refresh the cart display
}

// Function to display cart items in cart.html
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cartContainer');
  const totalPriceElement = document.getElementById('totalPrice');

  cartContainer.innerHTML = '';
  let totalPrice = 0;

  cart.forEach(item => {
    const itemTotal = 15 * item.quantity;
    totalPrice += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    cartItem.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p><span>Price: AED 15</span></p>
      </div>
      <div>
        <p><strong>Subtotal: AED ${itemTotal}</strong></p>
        <button onclick="removeFromCart('${item.name}')" style="background-color:#ec6e4c;color:#fff;border:none;padding:0.4rem 0.8rem;border-radius:6px;cursor:pointer;">Remove</button>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = `Total: AED ${totalPrice}`;
}

// Function to create WhatsApp checkout message
function checkoutWhatsApp() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hi! I'd like to place an order:%0A";
  cart.forEach(item => {
    message += `• ${item.name} x${item.quantity}%0A`;
  });

  const phoneNumber = "971501234567"; // Replace with your number (no + sign)
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Auto-run on cart page
if (window.location.pathname.includes('cart.html')) {
  displayCart();
}
