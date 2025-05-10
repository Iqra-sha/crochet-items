// Add item to cart with an image
function addToCart(productName, quantity, imageUrl) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const index = cart.findIndex(item => item.name === productName);

  if (index >= 0) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ name: productName, quantity, image: imageUrl });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} added to cart.`);
}

// Display cart on cart.html with image previews
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cartContainer');
  const totalPriceElement = document.getElementById('totalPrice');
  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceElement.textContent = '';
    return;
  }

  cart.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; border-radius: 8px;">
        <div>
          <h3>${item.name}</h3>
          <label>Qty:
            <input type="number" min="1" value="${item.quantity}" data-index="${i}" class="qty-input">
          </label>
          <button class="remove-btn" data-index="${i}">Remove</button>
        </div>
      </div>
      <div>
        <p>AED 15 each</p>
        <p><strong>AED ${item.quantity * 15}</strong></p>
      </div>
    `;
    container.appendChild(div);
    total += item.quantity * 15;
  });

  totalPriceElement.textContent = `Total: AED ${total}`;

  // Add event listeners for quantity change
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const i = e.target.getAttribute('data-index');
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart[i].quantity = parseInt(e.target.value);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart();
    });
  });

  // Add event listeners for remove item
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const i = e.target.getAttribute('data-index');
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart();
    });
  });
}

// Run displayCart when cart.html loads
if (window.location.pathname.includes('cart.html')) {
  displayCart();
}
