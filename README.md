# USEVM Pratas - Landing Page 💎

Landing page profissional e responsiva desenvolvida para a loja **USEVM Pratas**, focada na vitrine de joias em Prata 925 e conversão direta para vendas via WhatsApp.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído focando em performance e código limpo, utilizando:

- **HTML5** (Semântico)
- **Tailwind CSS** (Estilização moderna e responsiva via CDN)
- **JavaScript Vanilla** (Lógica de interação, filtros e animações)
- **Intersection Observer API** (Para efeitos de scroll reveal)

## 📱 Funcionalidades

- [x] **Responsividade Total:** Adaptado para celulares, tablets e desktops.
- [x] **Filtro de Categorias:** Navegação dinâmica entre Brincos, Colares e Coleção completa.
- [x] **Integração WhatsApp:** Botões de compra que geram mensagens automáticas com o nome do produto.
- [x] **Galeria Lightbox:** Visualização ampliada das peças para conferir detalhes e brilho.
- [x] **Scroll Suave:** Navegação fluida entre as seções da página.

## 🛠️ Como configurar para produção

### 1. Alterar o número do WhatsApp
No arquivo `main.js`, localize a variável `numeroLoja` e altere para o número oficial da loja (apenas números, incluindo o código do país e DDD):
```javascript
const numeroLoja = "5581999999999";