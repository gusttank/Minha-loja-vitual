# Gusttavo Corres - versão online com Firebase preparado

Incluído nesta versão:
- Banner oficial dentro da pasta assets
- Imagens base de produtos
- Loja responsiva
- Carrinho e checkout com Pix manual
- WhatsApp integrado
- Login/cadastro com Firebase Auth preparado
- Login Google real preparado
- Minha conta e histórico de pedidos
- Firestore preparado para produtos, pedidos, usuários, avaliações e newsletter
- Painel admin conectado ao Firestore quando configurado
- Upload de imagem de produto pelo Firebase Storage
- Estoque online sincronizado quando Firebase estiver ativo
- Cupons GC10 e FRETE15
- Frete estimado por CEP
- Favoritos
- Produtos vistos recentemente
- Rastreio por número do pedido
- Políticas da loja

## Para ativar 100% online
1. Crie um projeto no Firebase.
2. Ative Authentication > Email/senha e Google.
3. Ative Firestore Database.
4. Ative Storage.
5. Copie a configuração Web do Firebase.
6. Cole os dados no arquivo `firebase-config.js`.
7. Troque `window.GC_ADMIN_EMAIL` para seu e-mail admin.
8. Suba todos os arquivos no GitHub Pages.

Sem Firebase configurado, o site continua funcionando em modo local, mas produtos e pedidos ficam apenas no aparelho de quem usou.

## Admin
Abra `admin.html` e use a senha: `Gu040310@`
