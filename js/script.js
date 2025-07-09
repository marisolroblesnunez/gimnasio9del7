document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuItems = document.querySelectorAll('.menu-item');
    const submenus = document.querySelectorAll('.submenu');
    const welcomeMessage = document.querySelector('.welcome-message');
    const backButton = document.getElementById('back-button');
    const circleItems = document.querySelectorAll('.circle-item');

    // Estado actual
    let currentSubmenu = null;

    // Función para ocultar todos los submenús
    function hideAllSubmenus() {
        submenus.forEach(submenu => {
            submenu.classList.add('hidden');
        });
        welcomeMessage.classList.remove('hidden');
        backButton.classList.add('hidden');
        currentSubmenu = null;
    }

    // Función para mostrar un submenú específico
    function showSubmenu(submenuId) {
        hideAllSubmenus();
        const submenu = document.getElementById(submenuId);
        if (submenu) {
            submenu.classList.remove('hidden');
            welcomeMessage.classList.add('hidden');
            backButton.classList.remove('hidden');
            currentSubmenu = submenuId;
        }
    }

    // Función para agregar efectos de sonido (simulado con vibración en móviles)
    function playClickEffect() {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    // Event listeners para los elementos del menú principal
    document.getElementById('mi-fitness').addEventListener('click', function() {
        playClickEffect();
        showSubmenu('fitness-submenu');
    });

    document.getElementById('mi-actividad').addEventListener('click', function() {
        playClickEffect();
        showSubmenu('actividad-submenu');
    });

    document.getElementById('mas').addEventListener('click', function() {
        playClickEffect();
        showSubmenu('mas-submenu');
    });

    // Event listener para el botón de volver
    backButton.addEventListener('click', function() {
        playClickEffect();
        hideAllSubmenus();
    });

    // Event listeners para los círculos de opciones
    circleItems.forEach(item => {
        item.addEventListener('click', function() {
            playClickEffect();
            const option = this.getAttribute('data-option');
            handleCircleClick(option);
        });

        // Agregar efecto de hover con animación
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Función para manejar clics en círculos
    function handleCircleClick(option) {
        // Crear un efecto de notificación
        showNotification(`Has seleccionado: ${getOptionText(option)}`);
        
        // Agregar animación de selección
        const clickedItem = document.querySelector(`[data-option="${option}"]`);
        if (clickedItem) {
            clickedItem.style.animation = 'none';
            setTimeout(() => {
                clickedItem.style.animation = 'pulse 0.5s ease-in-out';
            }, 10);
        }
    }

    // Función para obtener texto de la opción
    function getOptionText(option) {
        const texts = {
            'clases': 'Clases',
            'entrenadores': 'Entrenadores',
            'dieta': 'Dieta',
            'reservas': 'Reserva tus Clases',
            'reseñas': 'Reseñas',
            'mensaje': 'Deja tu Mensaje',
            'notificaciones': 'Notificaciones'
        };
        return texts[option] || option;
    }

    // Función para mostrar notificaciones
    function showNotification(message) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #8a2be2, #4b0082);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 600;
        `;

        // Agregar al DOM
        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Agregar animaciones CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(300px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(300px);
            }
        }
        
        .notification {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Función para manejar el teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentSubmenu) {
            hideAllSubmenus();
        }
    });

    // Agregar efecto de partículas en el fondo (opcional)
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(138, 43, 226, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: particleFloat 3s linear infinite;
        `;
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        
        document.body.appendChild(particle);
        
        // Remover después de la animación
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 3000);
    }

    // Agregar animación de partículas
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Crear partículas periódicamente
    setInterval(createParticle, 2000);

    // Inicialización
    console.log('PowerGym App inicializada correctamente');
    
    // Agregar efectos de hover adicionales a los elementos del menú
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});


