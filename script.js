// Variables globales
let isScrolling = false;
let lastScrollTop = 0;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    // ... mode sombre ...

    // Diplômes par langue
    const diplomaMap = {
        fr: 'MEDIENE Manil - 2542065 (1) (1).pdf',
        ar: '',
        ang: 'DZ01524504750-17-01-2025-ETRF (1).pdf'
    };
    let currentLang = null;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            const viewer = document.getElementById('diploma-viewer');
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            if (currentLang === lang) {
                viewer.innerHTML = '';
                currentLang = null;
            } else {
                this.classList.add('active');
                if (diplomaMap[lang]) {
                    viewer.innerHTML = `<embed src='${diplomaMap[lang]}' type='application/pdf' width='80%' height='600px' style='border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.15);background:#fff;' />`;
                } else {
                    viewer.innerHTML = '';
                }
                currentLang = lang;
            }
        });
    });
});

// Fonction d'initialisation principale
function initializePortfolio() {
    setupNavigation();
    setupScrollEffects();
    setupGallery();
    setupAnimations();
    setupContactForm();
    console.log('Portfolio de Manil Mediene chargé avec succès! 🎬📸');
}

// Configuration de la navigation
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Menu hamburger
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fermer le menu mobile quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Configuration des effets de scroll
function setupScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                handleScroll(header);
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

// Gestion du scroll
function handleScroll(header) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Masquer/afficher le header
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
    
    // Effet parallaxe léger sur le hero
    const hero = document.querySelector('.hero');
    if (hero && scrollTop < window.innerHeight) {
        const rate = scrollTop * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Configuration de la galerie
function setupGallery() {
    // Données des images avec les vraies images et leurs titres descriptifs
    const galleryImages = {
        1: {
            url: '475234a4-408a-4e1f-bdcb-eb4695016e3a.jpg',
            title: 'Portrait Artistique'
        },
        2: {
            url: '7815196e-a2b2-45fe-bae8-9d24ffa69ca6.jpg',
            title: 'Nature Urbaine'
        },
        3: {
            url: 'protfoli2.jpg',
            title: 'Perspective Urbaine'
        },
        4: {
            url: 'DSC_0037(1) 11.jpg',
            title: 'Moment Capturé'
        },
        5: {
            url: 'DSC00303.JPG',
            title: 'Composition Urbaine'
        },
        6: {
            url: 'DSC00175.JPG',
            title: 'Scène Urbaine'
        }
    };

    // Fonction pour ouvrir le modal
    window.openModal = function(imageNumber) {
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modal-image');
        
        const imageData = galleryImages[imageNumber];
        modalImage.src = imageData.url;
        modalImage.alt = imageData.title;
        modal.style.display = 'block';
        
        // Empêcher le scroll du body
        document.body.style.overflow = 'hidden';
    };

    // Fonction pour fermer le modal
    window.closeModal = function() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Fermer le modal en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            window.closeModal();
        }
    });

    // Fermer le modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closeModal();
        }
    });

    // Navigation dans la galerie avec les flèches
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('modal');
        if (modal.style.display === 'block') {
            const currentImage = parseInt(modalImage.src.split('/').pop().match(/\d+/)[0]);
            
            if (e.key === 'ArrowLeft' && currentImage > 1) {
                window.openModal(currentImage - 1);
            } else if (e.key === 'ArrowRight' && currentImage < 6) {
                window.openModal(currentImage + 1);
            }
        }
    });
}

// Configuration des animations
function setupAnimations() {
    // Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                // Ajouter un délai pour les éléments multiples
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec animation
    document.querySelectorAll('.card, .education-item, .gallery-item, .language-item').forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // Animation de typing pour le titre
    animateTitle();
}

// Animation de typing pour le titre
function animateTitle() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            if (i >= originalText.length) {
                clearInterval(typeInterval);
            }
        }, 100);
    }
}

// Configuration du formulaire de contact
function setupContactForm() {
    // Gestion des erreurs d'images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x400/e2e8f0/64748b?text=Image+non+disponible';
        });
    });

    // Validation des liens email et téléphone
    document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Ajouter une animation de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Fonctions utilitaires pour personnaliser la galerie
function updateGalleryImage(index, newImageUrl, newTitle, newDescription) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems[index - 1]) {
        const img = galleryItems[index - 1].querySelector('img');
        const title = galleryItems[index - 1].querySelector('.gallery-info h3');
        const description = galleryItems[index - 1].querySelector('.gallery-info p');
        
        if (img) img.src = newImageUrl;
        if (title) title.textContent = newTitle;
        if (description) description.textContent = newDescription;
        
        // Mettre à jour aussi les données du modal
        const galleryImages = window.galleryImages || {};
        galleryImages[index] = {
            url: newImageUrl.replace('400x400', '800x800'),
            title: newTitle,
            description: newDescription
        };
        window.galleryImages = galleryImages;
    }
}

// Fonction pour ajouter une nouvelle photo à la galerie
function addGalleryPhoto(imageUrl, title, description) {
    const galleryGrid = document.querySelector('.gallery-grid');
    const photoCount = galleryGrid.children.length + 1;
    
    const newItem = document.createElement('div');
    newItem.className = 'gallery-item loading';
    newItem.onclick = () => window.openModal(photoCount);
    
    newItem.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <div class="gallery-overlay">
            <i class="fas fa-camera"></i>
        </div>
        <div class="gallery-info">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
    
    galleryGrid.appendChild(newItem);
    
    // Ajouter l'animation
    setTimeout(() => {
        newItem.classList.add('loaded');
    }, 100);
}

// Fonction pour changer les couleurs du thème
function changeTheme(primaryColor, secondaryColor, accentColor) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--secondary-color', secondaryColor);
    root.style.setProperty('--accent-color', accentColor);
}

// Fonction pour obtenir des statistiques de visite
function updateViewCounter() {
    const counter = localStorage.getItem('portfolioViews') || 0;
    const newCount = parseInt(counter) + 1;
    localStorage.setItem('portfolioViews', newCount);
    
    // Enregistrer la date de dernière visite
    localStorage.setItem('lastVisit', new Date().toISOString());
    
    console.log(`Portfolio vu ${newCount} fois`);
    return newCount;
}

// Fonction pour exporter les données du portfolio
function exportPortfolioData() {
    const data = {
        name: 'Manil Mediene',
        email: 'medienemanil@gmail.com',
        phone: '+213549030931',
        address: '4 rue Tipaza, 31000 Oran, Algérie',
        views: localStorage.getItem('portfolioViews') || 0,
        lastVisit: localStorage.getItem('lastVisit') || 'Jamais',
        exportDate: new Date().toISOString()
    };
    
    console.log('Données du portfolio:', data);
    return data;
}

// Fonction pour détecter le navigateur et optimiser en conséquence
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    // Optimisations spécifiques au navigateur
    if (browser === 'Safari') {
        // Désactiver certaines animations pour Safari
        document.body.classList.add('safari-browser');
    }
    
    return browser;
}

// Fonction pour gérer la performance
function optimizePerformance() {
    // Lazy loading pour les images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialiser les optimisations
window.addEventListener('load', function() {
    updateViewCounter();
    detectBrowser();
    optimizePerformance();
});

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur dans le portfolio:', e.error);
});

// Fonction pour le mode sombre (bonus)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Restaurer le mode sombre si activé
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

