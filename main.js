document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SCROLL REVEAL (Aparecer suave)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
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

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 2. WHATSAPP LINK GENERATOR
    // ==========================================
    const numeroLoja = "5581996940742"; 
    const btnsWhatsapp = document.querySelectorAll('.whatsapp-link');

    btnsWhatsapp.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const msg = btn.getAttribute('data-msg');
            const textoCodificado = encodeURIComponent(msg);
            const url = `https://wa.me/${numeroLoja}?text=${textoCodificado}`;
            window.open(url, '_blank');
        });
    });

    // ==========================================
    // 3. MENU MOBILE & 4. SMOOTH SCROLL
    // ==========================================
    const btnMobile = document.getElementById('mobile-menu-button');
    const menuMobile = document.getElementById('mobile-menu');
    const linksMobile = document.querySelectorAll('.mobile-link');

    if (btnMobile) {
        btnMobile.addEventListener('click', () => {
            menuMobile.classList.toggle('hidden');
        });
    }

    linksMobile.forEach(link => {
        link.addEventListener('click', () => {
            menuMobile.classList.add('hidden');
        });
    });

    // ==========================================
    // 5. LIGHTBOX (Galeria)
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.getElementById('close-lightbox');
    const triggers = document.querySelectorAll('.lightbox-trigger');
    const lightboxImg = lightbox.querySelector('img');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {

            const imgSrc = trigger.querySelector('img').src;

            if (lightboxImg){
                lightboxImg.src = imgSrc;
            }
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
            document.body.classList.add('modal-open');
        });
    });

    const fecharModal = () => {
        if (lightbox) {
            lightbox.classList.add('opacity-0');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
                document.body.classList.remove('modal-open');
            }, 300);
        }
    };

    if (closeLightbox) closeLightbox.addEventListener('click', fecharModal);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) fecharModal();
        });
    }

    // ==========================================
    // 6. FILTRO (FEMININO/MASCULINO) E VER MAIS
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.product-card');
    const btnVerMais = document.getElementById('btn-ver-mais');
    
    let currentFilter = 'all'; 
    let isShowingAll = false;  
    const limitInitial = 3;    

    function updateGallery() {
        let matchCount = 0;   
        let visibleCount = 0; 

        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const isMatch = currentFilter === 'all' || category === currentFilter;

            if (isMatch) {
                matchCount++;
                if (isShowingAll || visibleCount < limitInitial) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        // Respeita a opacidade do item esgotado
                        if(card.classList.contains('opacity-60')) {
                            card.style.opacity = '0.6';
                        } else {
                            card.style.opacity = '1';
                        }
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
            isShowingAll = false; 
            updateGallery();
        });
    });

    if (btnVerMais) {
        btnVerMais.addEventListener('click', () => {
            isShowingAll = true;
            updateGallery();
        });
    }

    // Inicialização da galeria
    updateGallery();
});