// O evento DOMContentLoaded garante que o script só execute após o HTML estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. SELEÇÃO DE ELEMENTOS ===
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    
    // Função auxiliar para fechar todos os elementos flutuantes (apenas menu)
    const closeAll = () => {
        if (navbar) navbar.classList.remove('active');
    };
    
    // === 2. INICIALIZAÇÃO DO CARROSSEL (SWIPER) - MAIS INTERATIVO ===

// Verifica se o Swiper foi carregado e se o container existe
if (typeof Swiper !== 'undefined' && document.querySelector(".review-slider")) {
    var swiper = new Swiper(".review-slider", {
        
        // EFEITOS INTERATIVOS
        effect: "coverflow", // Adiciona um efeito 3D coverflow
        grabCursor: true,     // Muda o cursor para indicar que o slide pode ser arrastado
        centeredSlides: true, // Centraliza o slide ativo
        
        // CONFIGURAÇÕES DE VELOCIDADE
        speed: 800, // Transição mais rápida (800ms)
        
        // CONFIGURAÇÕES BÁSICAS (mantidas)
        slidesPerView: 1, 
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000, // Reduzido para 4 segundos
            disableOnInteraction: false,
        },
        
        // PAGINAÇÃO E NAVEGAÇÃO
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        
        // EFEITO COVERFLOW
        coverflowEffect: {
            rotate: 50,       // Rotação dos slides não ativos
            stretch: 0,
            depth: 100,       // Profundidade do efeito
            modifier: 1,
            slideShadows: false,
        },
        
        // RESPONSIVIDADE (Ajustada para a correção do loop)
        breakpoints: {
            0: {
                slidesPerView: 1, 
            },
            768: {
                // Em tablets, o Coverflow funciona melhor se mostrarmos apenas 1 slide centralizado
                slidesPerView: 1, 
            },
            1024: { 
                // No desktop, mostramos 2 (o central e um lateral)
                slidesPerView: 2, 
            },
        },
    });
}

    // === 3. DARK MODE ===

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        enableDarkMode();
    } else if (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enableDarkMode();
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }
    
    // === 4. FECHAR ELEMENTOS E STICKY HEADER AO ROLAR ===
    window.addEventListener('scroll', () => {
        closeAll(); 
        
        if (header) {
            if (window.scrollY > 80) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    });

    // === 5. ROLAGEM SUAVE (Para links de navegação) ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault(); 
                
                // Rola suavemente, ajustando pela altura do header fixo
                window.scrollTo({
                    top: targetElement.offsetTop - (header ? header.offsetHeight : 0),
                    behavior: 'smooth'
                });
                
                closeAll(); 
            }
        });
    });
});
