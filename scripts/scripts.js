// Ocultar loader después de 2 segundos
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-overlay').style.display = 'none';
    }, 2000);
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

//funcionalidad formulario

document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-hero');
    const overlay = document.getElementById('formulario-overlay');

    ctaButton.addEventListener('click', () => {
        fetch('form.html')
            .then(response => response.text())
            .then(html => {
                overlay.innerHTML = html;
                overlay.style.display = 'flex';

                // Cierre al hacer clic en "Cerrar"
                const closeBtn = overlay.querySelector('#cerrar-formulario');
                closeBtn.addEventListener('click', cerrarFormulario);

                // Cierre al hacer clic fuera del formulario
                overlay.addEventListener('click', (event) => {
                    const form = overlay.querySelector('.formulario-registro');
                    if (event.target === overlay || !form.contains(event.target)) {
                        cerrarFormulario();
                    }
                });
            })
            .catch(err => {
                console.error('Error al cargar el formulario:', err);
            });
    });

    function cerrarFormulario() {
        overlay.style.display = 'none';
        overlay.innerHTML = '';
    }
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
