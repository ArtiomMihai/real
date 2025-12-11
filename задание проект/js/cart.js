function renderCart(){
  const list = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  if(list.length===0){
    container.innerHTML = '<p>Корзина пуста.</p>';
    return;
  }
  list.forEach((p, idx)=>{
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="meta">
        <h4>${p.name}</h4>
        <p>Цена: ${p.price} $</p>
      </div>
      <div class="actions">
        <button onclick="removeFromCart(${idx})" class="btn-simple">Удалить</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function removeFromCart(index){
  let list = JSON.parse(localStorage.getItem('cart')) || [];
  list.splice(index,1);
  localStorage.setItem('cart', JSON.stringify(list));
  renderCart();
  // update counter in index page if open
  if(window.opener) window.opener.updateCartCount && window.opener.updateCartCount();
  // but update local count
  const countEl = document.getElementById('cart-count');
  if(countEl) countEl.textContent = list.length;
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderCart();
  const orderBtn = document.getElementById('orderBtn');
  orderBtn.addEventListener('click', ()=>{
    const addr = document.getElementById('address').value.trim();
    const card = document.getElementById('card').value.trim();
    if(!addr || !card){
      alert('Заполните адрес и номер карты');
      return;
    }
    // mock order submission
    alert('Заказ оформлен (mock). Спасибо!');
    localStorage.removeItem('cart');
    renderCart();
    const countEl = document.getElementById('cart-count');
    if(countEl) countEl.textContent = '0';
  });
});
