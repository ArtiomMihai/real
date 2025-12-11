document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('registerBtn');
  btn.addEventListener('click', ()=>{
    const first = document.getElementById('firstName').value.trim();
    const last = document.getElementById('lastName').value.trim();
    const pass = document.getElementById('password').value.trim();
    if(!first || !last || !pass){
      alert('Заполните все поля');
      return;
    }
    // mock save locally
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({first, last, password: pass, id: Date.now()});
    localStorage.setItem('users', JSON.stringify(users));
    alert('Пользователь зарегистрирован (mock).');
    window.location.href = 'index.html';
  });
});
