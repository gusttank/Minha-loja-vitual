const WHATSAPP = "5511913034323";
const PIX = "ad586de2-610a-4874-bb22-ee6a8cbe68c2";

const produtos = [
  { id: 1, nome: "Conjunto masculino", preco: 189.90, desc: "Produto sob encomenda. Tamanhos P ao GG." },
  { id: 2, nome: "Camiseta premium", preco: 89.90, desc: "Produto sob encomenda. Consulte cores disponíveis." },
  { id: 3, nome: "Short masculino", preco: 99.90, desc: "Produto sob encomenda. Estilo autêntico." },
  { id: 4, nome: "Calça masculina", preco: 149.90, desc: "Produto sob encomenda. Envio para todo Brasil." },
  { id: 5, nome: "Kit completo", preco: 249.90, desc: "Monte seu traje da cabeça aos pés." }
];

let carrinho = [];

function dinheiro(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderProdutos() {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = produtos.map(p => `
    <article class="card">
      <div class="img">GC</div>
      <div class="card-content">
        <h3>${p.nome}</h3>
        <p class="small">${p.desc}</p>
        <div class="price">${dinheiro(p.preco)}</div>
        <button class="btn primary" onclick="addCarrinho(${p.id})">Adicionar ao carrinho</button>
      </div>
    </article>
  `).join("");
}

function addCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  renderCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  renderCarrinho();
}

function renderCarrinho() {
  const box = document.getElementById("carrinho");
  const total = carrinho.reduce((s, p) => s + p.preco, 0);
  document.getElementById("total").textContent = dinheiro(total);

  if (!carrinho.length) {
    box.innerHTML = "<p class='muted'>Seu carrinho está vazio.</p>";
    return;
  }

  box.innerHTML = carrinho.map((p, i) => `
    <div class="cart-item">
      <span>${p.nome} — ${dinheiro(p.preco)}</span>
      <button onclick="removerItem(${i})">Remover</button>
    </div>
  `).join("");
}

function copiarPix() {
  navigator.clipboard.writeText(PIX);
  alert("Chave Pix copiada!");
}

document.getElementById("form-pedido").addEventListener("submit", function(e) {
  e.preventDefault();

  if (!carrinho.length) {
    alert("Adicione pelo menos um produto ao carrinho.");
    return;
  }

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;
  const obs = document.getElementById("observacao").value;
  const total = carrinho.reduce((s, p) => s + p.preco, 0);

  const itens = carrinho.map(p => `- ${p.nome}: ${dinheiro(p.preco)}`).join("\n");

  const msg = `Olá, quero fazer um pedido na Gusttavo Corres.%0A%0A` +
    `Nome: ${nome}%0A` +
    `Telefone: ${telefone}%0A` +
    `Endereço: ${endereco}%0A%0A` +
    `Produtos:%0A${encodeURIComponent(itens)}%0A%0A` +
    `Total: ${dinheiro(total)}%0A` +
    `Pix: ${PIX}%0A` +
    `Observação: ${obs}%0A%0A` +
    `Estou ciente que é sob encomenda, prazo 25 a 35 dias, Pix manual.`;

  window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
});

renderProdutos();
renderCarrinho();
