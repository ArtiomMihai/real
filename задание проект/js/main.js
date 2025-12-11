// Mock products (will be replaced by backend later)
const products = [
  { id: 1, name: 'Lenovo Legion 5', price: 1200, brand: 'Lenovo', img: 'img/lenovo.svg' },
  { id: 2, name: 'Asus ROG Strix', price: 1400, brand: 'Asus', img: 'img/asus.svg' },
  { id: 3, name: 'HP Omen 16', price: 1300, brand: 'HP', img: 'img/hp.svg' },
  { id: 4, name: 'Acer Nitro 5', price: 950, brand: 'Acer', img: 'img/acer.svg' },
  { id: 5, name: 'Lenovo IdeaPad 5', price: 700, brand: 'Lenovo', img: 'img/lenovo2.svg' }
];

function renderProducts(list) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  list.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4 mb-4';
    col.innerHTML = `
      <div class="card h-100 text-center">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">${p.price} $</p>
          <div class="mt-auto">
            <button class="btn btn-add btn-sm" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-plus"></i> В корзину</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
  updateCartCount();
}

function addToCart(id){
  const product = products.find(p=>p.id===id);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(product.name + ' добавлен в корзину');
}

function updateCartCount(){
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const el = document.getElementById('cart-count');
  if(el) el.textContent = cart.length;
}

// Search and filters
document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts(products);

  const search = document.getElementById('search');
  const filterBrand = document.getElementById('filter-brand');
  const clearBtn = document.getElementById('clear-filters');

  if(search){
    search.addEventListener('input', ()=>{
      const q = search.value.trim().toLowerCase();
      const filtered = products.filter(p=>p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
      renderProducts(filtered);
    });
  }
  if(filterBrand){
    filterBrand.addEventListener('change', ()=>{
      const val = filterBrand.value;
      const filtered = val ? products.filter(p=>p.brand===val) : products.slice();
      renderProducts(filtered);
    });
  }
  if(clearBtn){
    clearBtn.addEventListener('click', ()=>{
      document.getElementById('filter-brand').value = '';
      renderProducts(products);
    });
  }
});
