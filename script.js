const STORE = 'gusttavo_corres_products_v1';
const CART = 'gusttavo_corres_cart_v1';
const ADMIN_PASS = 'Gu040310@';
const WHATSAPP = '5511913034323';
const PIX_KEY = 'ad586de2-610a-4874-bb22-ee6a8cbe68c2';

const defaultProducts = [
  {id:'1',name:'Conjunto Dri Fit',price:159.90,description:'Conjunto esportivo sob encomenda. Consulte cores e tamanhos.',image:''},
  {id:'2',name:'Camiseta Premium',price:89.90,description:'Camiseta confortável para compor o corre diário.',image:''},
  {id:'3',name:'Short Tactel',price:79.90,description:'Short leve, estiloso e vendido sob encomenda.',image:''},
  {id:'4',name:'Boné Estilo Casual',price:69.90,description:'Boné para fechar o kit da cabeça aos pés.',image:''},
  {id:'5',name:'Kit Completo GC',price:249.90,description:'Combo com peças selecionadas. Consulte disponibilidade.',image:''}
];

const money = v => Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const getProducts = () => JSON.parse(localStorage.getItem(STORE) || 'null') || defaultProducts;
const saveProducts = p => localStorage.setItem(STORE, JSON.stringify(p));
const getCart = () => JSON.parse(localStorage.getItem(CART) || '[]');
const saveCart = c => localStorage.setItem(CART, JSON.stringify(c));

function renderProducts(filter=''){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  const products = getProducts().filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  grid.innerHTML = products.map(p => `
    <article class="product">
      <div class="product-img">${p.image ? `<img src="${p.image}" alt="${p.name}">` : 'Gusttavo Corres'}</div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">${money(p.price)}</div>
        <button class="btn primary" onclick="addToCart('${p.id}')">Adicionar ao carrinho</button>
      </div>
    </article>`).join('');
}

function addToCart(id){
  const products = getProducts();
  const product = products.find(p => p.id === id);
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if(item) item.qty += 1; else cart.push({...product, qty:1});
  saveCart(cart); renderCart(); openCart();
}
function removeFromCart(id){ saveCart(getCart().filter(i => i.id !== id)); renderCart(); }
function renderCart(){
  const cart = getCart();
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const total = cart.reduce((s,i)=>s+i.qty*i.price,0);
  const countEl = document.getElementById('cartCount'); if(countEl) countEl.textContent = count;
  const totalEl = document.getElementById('cartTotal'); if(totalEl) totalEl.textContent = money(total);
  const items = document.getElementById('cartItems');
  if(items) items.innerHTML = cart.length ? cart.map(i => `<div class="cart-item"><div><strong>${i.name}</strong><br><small>${i.qty} x ${money(i.price)}</small></div><button class="icon-btn" onclick="removeFromCart('${i.id}')">×</button></div>`).join('') : '<p>Seu carrinho está vazio.</p>';
}
function openCart(){ document.getElementById('cartPanel')?.classList.add('open'); document.getElementById('overlay')?.classList.add('open'); }
function closeCart(){ document.getElementById('cartPanel')?.classList.remove('open'); document.getElementById('overlay')?.classList.remove('open'); }

function setupStore(){
  renderProducts(); renderCart();
  document.getElementById('search')?.addEventListener('input', e => renderProducts(e.target.value));
  document.getElementById('openCart')?.addEventListener('click', openCart);
  document.getElementById('closeCart')?.addEventListener('click', closeCart);
  document.getElementById('overlay')?.addEventListener('click', closeCart);
  document.getElementById('copyPix')?.addEventListener('click', async()=>{ await navigator.clipboard.writeText(PIX_KEY); alert('Chave Pix copiada!'); });
  document.getElementById('orderForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const cart = getCart();
    if(!cart.length) return alert('Adicione produtos ao carrinho.');
    const total = cart.reduce((s,i)=>s+i.qty*i.price,0);
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const lines = cart.map(i => `- ${i.name} (${i.qty}x) ${money(i.price*i.qty)}`).join('\n');
    const msg = `Olá, quero finalizar meu pedido na Gusttavo Corres.%0A%0ANome: ${name}%0AWhatsApp: ${phone}%0AEndereço: ${address}%0A%0AProdutos:%0A${encodeURIComponent(lines)}%0A%0ATotal: ${money(total)}%0AChave Pix: ${PIX_KEY}%0A%0AEstou ciente do prazo de 25 a 35 dias e da política de troca.`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  });
}

function renderAdminProducts(){
  const box = document.getElementById('adminProducts'); if(!box) return;
  box.innerHTML = getProducts().map(p => `<div class="admin-row"><div><strong>${p.name}</strong><br><small>${money(p.price)}</small></div><button class="btn ghost" onclick="deleteProduct('${p.id}')">Excluir</button></div>`).join('');
}
function deleteProduct(id){ saveProducts(getProducts().filter(p=>p.id!==id)); renderAdminProducts(); renderProducts(); }
function setupAdmin(){
  const loginBox = document.getElementById('loginBox'), adminBox = document.getElementById('adminBox');
  if(!loginBox) return;
  const showAdmin = () => { loginBox.classList.add('hidden'); adminBox.classList.remove('hidden'); renderAdminProducts(); };
  if(sessionStorage.getItem('gc_admin') === 'yes') showAdmin();
  document.getElementById('loginBtn').addEventListener('click', () => {
    if(document.getElementById('adminPassword').value === ADMIN_PASS){ sessionStorage.setItem('gc_admin','yes'); showAdmin(); }
    else alert('Senha incorreta.');
  });
  document.getElementById('logoutBtn').addEventListener('click', () => { sessionStorage.removeItem('gc_admin'); location.reload(); });
  document.getElementById('productForm').addEventListener('submit', e => {
    e.preventDefault();
    const products = getProducts();
    products.push({id:Date.now().toString(),name:pName.value,price:Number(pPrice.value),image:pImage.value,description:pDescription.value});
    saveProducts(products); e.target.reset(); renderAdminProducts(); alert('Produto salvo!');
  });
}

setupStore(); setupAdmin();
