// O evento DOMContentLoaded garante que o script só execute após o HTML estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. SELEÇÃO DE ELEMENTOS ===
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    
    // Removida a variável 'searchForm' que não estava definida em seu HTML

    // Função auxiliar para fechar todos os elementos flutuantes (apenas menu)
    const closeAll = () => {
        if (navbar) navbar.classList.remove('active');
        // Não fechamos searchForm, pois ele não foi implementado/definido
    };
    
    // === 2. INICIALIZAÇÃO DO CARROSSEL (SWIPER) - AGORA DENTRO DO DOMContentLoaded ===
    
    // Verifica se o container do carrossel existe antes de inicializar
    if (document.querySelector(".review-slider")) {
        var swiper = new Swiper(".review-slider", {
            // Define quantas avaliações aparecerão por vez
            slidesPerView: 3, 
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000, // 5 segundos de espera
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            // Configurações de Responsividade:
            breakpoints: {
                0: { // Mobile (0px e acima)
                    slidesPerView: 1, 
                },
                768: { // Tablet (768px e acima)
                    slidesPerView: 2,
                },
                1024: { // Desktop (1024px e acima)
                    slidesPerView: 3,
                },
            },
        });
    }

    // === 3. DARK MODE ===

    // Localize o botão/ícone de Dark Mode
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Função para aplicar o Dark Mode
    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }

    // Função para desativar o Dark Mode
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    // 1. Verificar a preferência salva ao carregar a página
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        enableDarkMode();
    } else if (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // 2. Se não houver preferência salva, verifica a preferência do sistema operacional
        enableDarkMode();
    }

    // 3. Adicionar o Event Listener para o clique no botão
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
        closeAll(); // Fecha menu 
        
        // Sticky Header: Adiciona sombreamento ou destaque ao rolar
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
                
                closeAll(); // Fecha o menu/busca após a navegação
            }
        });
    });
});
