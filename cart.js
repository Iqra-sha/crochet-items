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

// Function to display cart items in cart.html
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cartContainer');
  const totalPriceElement = document.getElementById('totalPrice');
  
  cartContainer.innerHTML = '';
  let totalPrice = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    cartItemElement.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: AED 15</p>
      </div>
    `;

    cartContainer.appendChild(cartItemElement);

    totalPrice += 15 * item.quantity;
  });

  totalPriceElement.innerHTML = `Total: AED ${totalPrice}`;
}

// Run displayCart when cart.html loads
if (window.location.pathname.includes('cart.html')) {
  displayCart();
}
