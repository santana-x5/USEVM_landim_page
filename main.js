// ==========================================
// CONFIGURAÇÃO DO SANITY
// Preencha com os dados do seu projeto em sanity.io
// ==========================================
const SANITY_PROJECT_ID = '4jrhj4c6'; // ← substitua
const SANITY_DATASET    = 'production';
const SANITY_API_VER    = '2024-01-01';

// URL da API pública do Sanity (sem token — leitura pública)
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VER}/data/query/${SANITY_DATASET}`;

// Query GROQ: busca todos os produtos ordenados por categoria e nome
const QUERY = encodeURIComponent(`
  *[_type == "produto"] | order(categoria asc, nome asc) {
    _id,
    nome,
    preco,
    categoria,
    disponivel,
    mensagemWhatsapp,
    "imagemUrl": imagem.asset->url
  }
`);

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SCROLL REVEAL (Aparecer suave)
    // ==========================================
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Observa elementos .reveal já existentes no HTML (seções estáticas)
    function observarReveal() {
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }
    observarReveal();

    // ==========================================
    // 2. WHATSAPP LINK GENERATOR
    // ==========================================
    const numeroLoja = "5581996940742";

    function bindWhatsapp() {
        document.querySelectorAll('.whatsapp-link').forEach(btn => {
            // Evita duplicar listeners
            if (btn.dataset.waBound) return;
            btn.dataset.waBound = '1';
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const msg = btn.getAttribute('data-msg') || 'Olá! Gostaria de ver o catálogo da USEVM.';
                const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(msg)}`;
                window.open(url, '_blank');
            });
        });
    }
    bindWhatsapp(); // Botões estáticos do header/footer

    // ==========================================
    // 3. MENU MOBILE & 4. SMOOTH SCROLL
    // ==========================================
    const btnMobile  = document.getElementById('mobile-menu-button');
    const menuMobile = document.getElementById('mobile-menu');

    if (btnMobile) {
        btnMobile.addEventListener('click', () => {
            menuMobile.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => menuMobile.classList.add('hidden'));
    });

    // ==========================================
    // 5. LIGHTBOX (Galeria)
    // ==========================================
    const lightbox      = document.getElementById('lightbox');
    const closeLightbox = document.getElementById('close-lightbox');
    const lightboxImg   = lightbox ? lightbox.querySelector('img') : null;

    function bindLightbox() {
        document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
            if (trigger.dataset.lbBound) return;
            trigger.dataset.lbBound = '1';
            trigger.addEventListener('click', () => {
                const img = trigger.querySelector('img');
                if (lightboxImg && img) lightboxImg.src = img.src;
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex');
                setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
                document.body.classList.add('modal-open');
            });
        });
    }

    const fecharModal = () => {
        if (!lightbox) return;
        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.classList.remove('modal-open');
        }, 300);
    };

    if (closeLightbox) closeLightbox.addEventListener('click', fecharModal);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) fecharModal();
        });
    }

    // ==========================================
    // 6. FILTRO + VER MAIS
    // ==========================================
    const filterBtns  = document.querySelectorAll('.filter-btn');
    const btnVerMais   = document.getElementById('btn-ver-mais');
    const productGrid  = document.getElementById('product-grid');

    let currentFilter  = 'all';
    let isShowingAll   = false;
    const limitInitial = 3;

    function updateGallery() {
        const cards = document.querySelectorAll('.product-card');
        let matchCount  = 0;
        let visibleCount = 0;

        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const isMatch  = currentFilter === 'all' || category === currentFilter;

            if (isMatch) {
                matchCount++;
                if (isShowingAll || visibleCount < limitInitial) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = card.classList.contains('opacity-60') ? '0.6' : '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                    visibleCount++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });

        if (btnVerMais) {
            if (matchCount > limitInitial && !isShowingAll) {
                const restantes = matchCount - limitInitial;
                btnVerMais.textContent = `Ver mais produtos (${restantes} restantes)`;
                btnVerMais.classList.remove('hidden');
            } else {
                btnVerMais.classList.add('hidden');
            }
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-brand', 'text-white');
                b.classList.add('text-brand');
            });
            btn.classList.remove('text-brand');
            btn.classList.add('bg-brand', 'text-white');

            currentFilter = btn.getAttribute('data-filter');
            isShowingAll  = false;
            updateGallery();
        });
    });

    if (btnVerMais) {
        btnVerMais.addEventListener('click', () => {
            isShowingAll = true;
            updateGallery();
        });
    }

    // ==========================================
    // 7. BUSCA DE PRODUTOS NO SANITY + RENDER
    // ==========================================

    // Gera o HTML de um card a partir de um objeto produto do Sanity
    function criarCardHTML(produto) {
        const esgotado     = !produto.disponivel;
        const precoFormatado = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
        const msg          = produto.mensagemWhatsapp || `Olá! Gostaria de adquirir: ${produto.nome}`;
        const imgSrc       = produto.imagemUrl || '';

        const classesEsgotado = esgotado
            ? 'opacity-60 grayscale pointer-events-none'
            : '';

        const botao = esgotado
            ? `<button class="w-full bg-gray-200 text-gray-400 py-2 rounded-lg cursor-not-allowed" disabled>
                   Esgotado
               </button>`
            : `<button class="w-full bg-white border border-brand text-brand hover:bg-brand hover:text-white py-2 rounded-lg transition duration-300 whatsapp-link"
                       data-msg="${msg}">
                   Quero este
               </button>`;

        return `
          <div class="product-card bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 reveal ${classesEsgotado}"
               data-category="${produto.categoria?.toLowerCase()}"
               style="opacity:0; transform:scale(0.9); transition: opacity 0.3s ease, transform 0.3s ease;">
            <div class="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden cursor-pointer lightbox-trigger">
              <div class="w-full h-full flex items-center justify-center">
                <img src="${imgSrc}"
                     alt="${produto.nome}"
                     class="w-full h-full object-cover"
                     loading="lazy">
              </div>
            </div>
            <h3 class="text-lg font-semibold text-dark">${produto.nome}</h3>
            <p class="text-brand font-medium mb-4">${precoFormatado}</p>
            ${botao}
          </div>
        `;
    }

    // Estado de loading
    function mostrarLoading() {
        if (!productGrid) return;
        productGrid.innerHTML = `
          <div class="col-span-2 md:col-span-3 flex flex-col items-center justify-center py-20 text-gray-400">
            <svg class="animate-spin w-8 h-8 mb-4 text-brand" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <p class="text-sm">Carregando produtos...</p>
          </div>
        `;
    }

    // Estado de erro
    function mostrarErro() {
        if (!productGrid) return;
        productGrid.innerHTML = `
          <div class="col-span-2 md:col-span-3 text-center py-20 text-gray-400">
            <p class="text-2xl mb-2">😕</p>
            <p>Não foi possível carregar os produtos agora.</p>
            <p class="text-sm mt-2">Tente recarregar a página.</p>
          </div>
        `;
    }

    // Busca os produtos na API do Sanity e renderiza
    async function carregarProdutos() {
        mostrarLoading();
        try {
            const res = await fetch(`${SANITY_URL}?query=${QUERY}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const { result } = await res.json();

            if (!result || result.length === 0) {
                productGrid.innerHTML = `
                  <div class="col-span-2 md:col-span-3 text-center py-20 text-gray-400">
                    <p>Nenhum produto encontrado.</p>
                  </div>`;
                return;
            }

            // Renderiza todos os cards
            productGrid.innerHTML = result.map(criarCardHTML).join('');

            // Re-bind de interações nos novos elementos
            bindWhatsapp();
            bindLightbox();
            observarReveal();

            // Inicializa a galeria com filtro e ver mais
            isShowingAll  = false;
            currentFilter = 'all';
            updateGallery();

        } catch (err) {
            console.error('[USEVM] Erro ao carregar produtos do Sanity:', err);
            mostrarErro();
        }
    }

    carregarProdutos();

})