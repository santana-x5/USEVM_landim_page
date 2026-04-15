document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SCROLL REVEAL (Aparecer suave)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Dispara quando 10% do elemento aparece
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 2. WHATSAPP LINK GENERATOR
    // ==========================================
    // Substitua pelo número da loja. Formato: 55 DDD NUMERO (sem espaços)
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
    // 3. MENU MOBILE & 4. SMOOTH SCROLL FECHANDO MENU
    // ==========================================
    const btnMobile = document.getElementById('mobile-menu-button');
    const menuMobile = document.getElementById('mobile-menu');
    const linksMobile = document.querySelectorAll('.mobile-link');

    // Toggle do menu
    btnMobile.addEventListener('click', () => {
        menuMobile.classList.toggle('hidden');
    });

    // Fechar menu ao clicar em um link (O CSS scroll-smooth no <html> faz a rolagem suave)
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

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            // Em uma implementação com imagens reais, você pegaria o src da imagem filha:
            // const imgSrc = trigger.querySelector('img').src;
            // lightbox.querySelector('img').src = imgSrc;
            
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            // Pequeno delay para a transição de opacidade funcionar
            setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
            document.body.classList.add('modal-open');
        });
    });

    const fecharModal = () => {
        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.classList.remove('modal-open');
        }, 300); // tempo bate com o duration-300 do tailwind
    };

    closeLightbox.addEventListener('click', fecharModal);
    
    // Fechar ao clicar fora do conteúdo
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) fecharModal();
    });

    // ==========================================
    // 6. FILTRO DE CATEGORIAS (Bônus)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove estado ativo de todos os botões
            filterBtns.forEach(b => {
                b.classList.remove('bg-brand', 'text-white');
                b.classList.add('text-brand');
            });
            // Adiciona estado ativo no botão clicado
            btn.classList.remove('text-brand');
            btn.classList.add('bg-brand', 'text-white');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                // Esconde com uma animação rápida
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Retorna opacidade e escala
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300); // Tempo da animação de saída
            });
        });
    });
});