// O evento DOMContentLoaded garante que o script só execute após o HTML estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // === 1. SELEÇÃO DE ELEMENTOS (Usando const para melhor prática) ===
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header'); 

    // Função auxiliar para fechar todos os elementos flutuantes (menu e busca)
    const closeAll = () => {
        if (navbar) navbar.classList.remove('active');
        if (searchForm) searchForm.classList.remove('active');
    };

   
    
    // === 4. FECHAR ELEMENTOS E STICKY HEADER AO ROLAR ===
    window.addEventListener('scroll', () => {
        closeAll(); // Fecha menu e busca
        
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