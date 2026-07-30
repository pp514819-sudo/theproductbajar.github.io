// ==========================
// PRODUCT BAJAR V2
// Google Sheets Version
// ==========================

const API_URL =
"https://script.google.com/macros/s/AKfycbz106yQRkbIuLBF9lR--uL4iKvrJLLuhlUDW-c7RN7hIg1a2WUX6f4RR3DGDuW3d_kd/exec";

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const loading = document.getElementById("loading");

let products = [];
let currentCategory = "All";

async function loadProducts(){

loading.style.display="block";

try{

const response = await fetch(API_URL);

products = await response.json();

displayProducts(products);

}catch(error){

console.log(error);

productsContainer.innerHTML=`
<h2 style="text-align:center;">
Unable to load products.
</h2>
`;

}

loading.style.display="none";

}

loadProducts();


// =======================
// Display Products
// =======================

function displayProducts(data){

productsContainer.innerHTML="";

if(data.length===0){

productsContainer.innerHTML=`
<h2 style="text-align:center;">
No Products Found
</h2>
`;

return;

}

data.forEach(product=>{

productsContainer.innerHTML+=`

<div class="card">

<img
src="${product.image}"
alt="${product.name}"
loading="lazy"
onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">

<div class="card-content">

<h3>${product.name}</h3>

<div class="category">

${product.category}

</div>

<a

href="${product.link}"

target="_blank"

class="buy-btn">

🛒 View Product

</a>

</div>

</div>

`;

});

}



// =======================
// Search
// =======================

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

const filtered=products.filter(product=>{

return(

product.name.toLowerCase().includes(value)

&&

(currentCategory==="All"

||

product.category===currentCategory)

);

});

displayProducts(filtered);

});




// =======================
// Category Filter
// =======================

document.querySelectorAll(".categories button")

.forEach(button=>{

button.addEventListener("click",()=>{

document.querySelectorAll(".categories button")

.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

currentCategory=button.dataset.category;

let filtered;

if(currentCategory==="All"){

filtered=products;

}else{

filtered=products.filter(product=>

product.category===currentCategory

);

}

const value=searchInput.value.toLowerCase();

filtered=filtered.filter(product=>

product.name.toLowerCase().includes(value)

);

displayProducts(filtered);

});

});




// =======================
// Back To Top
// =======================

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});
