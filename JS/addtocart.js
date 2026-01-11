const cartContainer = document.getElementById("cartContainer");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cartItems);

function renderCart() {
    cartContainer.innerHTML = "";
    if (cartItems.length === 0) {
 cartContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <p>Looks like you haven't added anything yet</p>
        <a href="../HTML/shope.html" class="continue-btn">Continue Shopping</a>
      </div>
    `;       return
    }
cartItems.map((item)=>{
    cartContainer.innerHTML += ` <div class="cart-item">
  <img src="${item.image}" alt="product">

  <div class="cart-details">
    <p class="title">${item.title}</p>
    <p class="price">Rs ${item.price}</p>
  </div>

  <div class="cart-actions">
    <i class="fa-regular fa-heart love-icon"></i>
    <i class="fa-solid fa-trash delete-icon" onclick="deleteItemById(${item.id})"></i>
  </div>
</div>
`
})
}

function deleteItemById(id) {
    cartItems = cartItems.filter(item=> item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cartItems))
    renderCart()
    console.log(cartItems);
    
}

renderCart()


// let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// function renderCart() {
//   cartContainer.innerHTML = "";

//   if (cartItems.length === 0) {
//     cartContainer.innerHTML = "<p class = "cartText">Your cart is empty</p>";
//     return;
//   }

//   cartItems.forEach((item, index) => {
//     cartContainer.innerHTML += `
//       <div class="container">
//         <div class="cart-item">
//           <img src="${item.image}" alt="">
//           <p>${item.title}</p>
//           <p>${item.price}</p>
//           <button onclick="deleteItem(${index})">Delete</button>
//         </div>
//       </div>
//     `;
//   });
// }

// function deleteItem(index) {
//   cartItems.splice(index, 1);          // item remove
//   localStorage.setItem("cart", JSON.stringify(cartItems)); // update storage
//   renderCart();                         // re-render cart
// }

// renderCart();
