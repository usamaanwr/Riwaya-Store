const fakeStoreApiUrl = `https://fakestoreapi.com/products`;
const allRenderPost = document.getElementById("allRenderProducts");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const apiProduct = await fetch(`${fakeStoreApiUrl}`);
    const product_data = await apiProduct.json();
    // console.log(product_data);

    product_data.map((value) => {
      allRenderPost.innerHTML += `<div class="card_item" data-id="${value.id}">
     <div class="cardsBody">
     <img src="${value.image}" alt="">
   <p>$ ${value.price}</p>
   <p>${value.category}</p>
   <div class ="rating">
   <p>Rating ${value.rating.rate}</p>
   <p>Order ${value.rating.count}</p>
   </div>
     </div>
   </div>`;
   const cartClick = document.querySelectorAll(".card_item");
   cartClick.forEach((carts)=>{
     carts.addEventListener("click", ()=>{
         const cartsId = carts.getAttribute("data-id");
        //  console.log(cartsId);
        window.location.href =`/HTML/singalProductpage.html?id=${cartsId}`
     })
   })

});
  } catch (error) {
    console.error(error);
    return;
  }
});

