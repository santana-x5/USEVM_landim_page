# SANITY_SETUP.md — Guia de Integração USEVM Pratas

Siga os passos na ordem. Tempo estimado: 1h30.

---

## PASSO 1 — Criar conta e projeto no Sanity

1. Acesse https://sanity.io e crie conta (pode usar Google)
2. Clique em "Create new project"
3. Nome: `usevm-pratas` | Dataset: `production` (público)
4. Anote o **Project ID** (aparece no painel — parece: `abc12def`)

---

## PASSO 2 — Criar o Sanity Studio (painel admin)

No terminal, dentro da pasta do projeto:

```bash
npm create sanity@latest -- --project SEU_PROJECT_ID --dataset production --template clean --output-path usevm-studio
cd usevm-studio
```

Quando perguntar sobre TypeScript: escolha **No (JavaScript)**.

---

## PASSO 3 — Instalar o schema do produto

1. Copie o arquivo `produto.js` para dentro de `usevm-studio/schemas/`
2. Abra `usevm-studio/schemas/index.js` e adicione:

```js
import produto from './produto'

export const schemaTypes = [produto]
```

---

## PASSO 4 — Rodar o Studio localmente e subir as fotos

```bash
cd usevm-studio
npm run dev
```

Acesse http://localhost:3333 — esse é o painel admin.

**Importante:** Use o script de importação (Passo 5) para criar os produtos sem foto,
depois adicione as fotos manualmente pelo painel arrastando da pasta `assets/images/`.

---

## PASSO 5 — Importar os 53 produtos (texto e preço)

Na raiz do projeto (fora do usevm-studio):

```bash
npm install @sanity/client
```

1. Abra `importar-produtos.js`
2. Preencha `SEU_PROJECT_ID` com o ID do Passo 1
3. Vá em sanity.io → seu projeto → API → Tokens → Add API token
   - Nome: `importacao` | Permissão: **Editor**
4. Cole o token gerado no campo `SEU_TOKEN_AQUI`
5. Execute:

```bash
node importar-produtos.js
```

Os 53 produtos aparecem no painel. **Adicione as fotos manualmente** pelo Studio.

---

## PASSO 6 — Configurar o main.js do site

Abra `main.js` e preencha no topo:

```js
const SANITY_PROJECT_ID = 'abc12def'; // seu Project ID real
const SANITY_DATASET    = 'production';
```

---

## PASSO 7 — Liberar acesso público à API (CORS)

No painel do Sanity:
- Vá em **API → CORS Origins**
- Adicione a URL da sua loja: `https://usevmpratas.com.br`
- Adicione também `http://localhost` para testar localmente
- **Não marque** "Allow credentials" (não precisa)

---

## PASSO 8 — Deploy do Studio na Vercel (painel online)

Para o dono da loja acessar o painel de qualquer lugar:

```bash
cd usevm-studio
npx sanity deploy
```

Escolha um nome: `usevm-studio` → fica em `https://usevm-studio.sanity.studio`

Compartilhe esse link com o dono. Ele cria conta no Sanity e você o adiciona
como membro do projeto em: sanity.io → projeto → Members → Invite.

---

## ESTRUTURA FINAL DE ARQUIVOS

```
usevm-pratas/
├── index.html              (sem alteração — não tem mais HTML de produto)
├── main.js                 ← SUBSTITUÍDO (busca do Sanity)
├── manifest.json
├── sw.js
├── importar-produtos.js    ← rodar uma vez e deletar depois
├── assets/
│   └── images/             (imagens locais — depois migram pro Sanity)
└── usevm-studio/           ← painel admin
    ├── schemas/
    │   ├── index.js
    │   └── produto.js      ← NOVO
    └── ...
```

---

## O QUE O DONO DA LOJA PODE FAZER NO PAINEL

| Ação                    | Como fazer no Studio                              |
|-------------------------|---------------------------------------------------|
| Adicionar produto       | Clicar em "Produto" → "+" → preencher e publicar  |
| Remover produto         | Abrir o produto → menu "..." → Delete             |
| Marcar como esgotado    | Abrir produto → desmarcar "Disponível para venda" |
| Alterar preço           | Abrir produto → editar campo Preço → Publish      |
| Trocar foto             | Abrir produto → clicar na imagem → Upload         |

Todas as alterações aparecem no site em **menos de 1 minuto** automaticamente.

---

## DÚVIDAS FREQUENTES

**O site fica offline se o Sanity cair?**
Não. O Service Worker (sw.js) mantém a última versão em cache no celular do cliente.

**O dono precisa saber programar?**
Não. O painel é visual, igual um Google Forms mais sofisticado.

**As imagens antigas da pasta assets/ somem?**
Não. Enquanto não migrar as fotos pro Sanity, o site usa as locais normalmente.
Após o upload no Studio, o Sanity passa a servir as imagens pela CDN deles (mais rápido).
