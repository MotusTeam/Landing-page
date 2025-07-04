// Ocultar loader después de 2 segundos
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-overlay').style.display = 'none';
    }, 2000);
});

//Botón Hamburguesa

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburguer-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    hamburgerBtn.addEventListener('click', function() {
        dropdownMenu.classList.toggle('active');
        
        // Cambiar icono al abrir/cerrar
        const icon = this.querySelector('i');
        if (dropdownMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu-hamburguesa')) {
            dropdownMenu.classList.remove('active');
            const icon = hamburgerBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');

            
        }
    });
});


// Carrusel del Hero
// Asegúrate que el carrusel funcione correctamente
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    let interval;
    
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Iniciar carrusel automático
    function startAutoSlide() {
        interval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(interval);
    }
    
    // Pausar al interactuar
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', stopAutoSlide);
    hero.addEventListener('mouseleave', startAutoSlide);
    
    startAutoSlide();
    updateCarousel();
});

// funcionalidad formulario

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('formulario-overlay');
    const ctaButton = document.querySelector('.cta-hero');
    const conocenosLink = document.getElementById('conocenos-link');
    const cerrarBtn = document.getElementById('cerrar-formulario');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');

    function abrirFormulario() {
        overlay.style.display = 'flex';
    }

    function cerrarFormulario() {
        overlay.style.display = 'none';
    }

    // Evento para CTA "Descubre Motuscar"
    if (ctaButton) {
        ctaButton.addEventListener('click', abrirFormulario);
    }

    // Evento para enlace "Conócenos"
    if (conocenosLink) {
        conocenosLink.addEventListener('click', (e) => {
            e.preventDefault();
            abrirFormulario();

            // Cerrar menú hamburguesa si está abierto
            if (dropdownMenu.classList.contains('active')) {
                dropdownMenu.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Botón cerrar ✖
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', cerrarFormulario);
    }

    // Cerrar al hacer clic fuera del formulario
    overlay.addEventListener('click', (e) => {
        const form = overlay.querySelector('.formulario-registro');
        if (e.target === overlay || !form.contains(e.target)) {
            cerrarFormulario();
        }
    });
});

// Mockpage IA - Código actualizado
document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        '¿Te ayudo en algo?',
        '¿Estás buscando algo?',
        '¿Necesitas un Mecánico?',
        '¿En qué puedo asistirte?',
        '¡Estoy aquí para ayudarte!',
        '¿Tienes alguna duda?',
        '¿Te gustaría saber más sobre los servicios?',
        '¿Cómo puedo hacer tu día más fácil?',
        '¿Buscas algún repuesto?'
    ];

    const assistButtonContainer = document.querySelector('.assist-button-container');
    let tooltip = null;
    let scrollHandler = null;

    function getRandomPhrase() {
        return phrases[Math.floor(Math.random() * phrases.length)];
    }

    function adjustTooltipPosition() {
        if (!tooltip) return;
        
        const buttonRect = assistButtonContainer.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const margin = 20;

        let left = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;
        let top = buttonRect.top - tooltipRect.height - 10;

        // Ajustar si se desborda por la izquierda
        if (left < margin) left = margin;

        // Ajustar si se desborda por la derecha
        if (left + tooltipRect.width + margin > window.innerWidth) {
            left = window.innerWidth - tooltipRect.width - margin;
        }

        // Si no hay espacio arriba, mostrar debajo del botón
        if (top < margin) {
            top = buttonRect.bottom + 10;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    assistButtonContainer.addEventListener('mouseenter', () => {
        // Crear tooltip si no existe
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.classList.add('assist-tooltip');
            tooltip.textContent = getRandomPhrase();
            document.body.appendChild(tooltip);
            
            // Esperamos un frame para forzar el reflow
            requestAnimationFrame(() => {
                adjustTooltipPosition();
                tooltip.classList.add('fade-in');
            });
            
            // Añadir listener para scroll
            scrollHandler = () => adjustTooltipPosition();
            window.addEventListener('scroll', scrollHandler);
        }
    });

    assistButtonContainer.addEventListener('mouseleave', () => {
        if (tooltip) {
            tooltip.remove();
            tooltip = null;
            window.removeEventListener('scroll', scrollHandler);
            scrollHandler = null;
        }
    });
});
