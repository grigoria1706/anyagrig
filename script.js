// Управление аудио
class AudioPlayer {
    constructor() {
        this.currentAudio = null;
        this.currentButton = null;
        this.init();
    }

    init() {
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handlePlayClick(e.target);
            });
        });

        // Останавливаем музыку при переходе на другую страницу
        window.addEventListener('beforeunload', () => {
            this.stopAll();
        });
    }

    handlePlayClick(button) {
        const audioId = button.getAttribute('data-audio');
        const audio = document.getElementById(audioId);

        if (!audio) {
            console.error('Аудио не найдено:', audioId);
            return;
        }

        // Если кликнули на уже играющее аудио - пауза
        if (this.currentAudio === audio && !audio.paused) {
            this.pauseAudio(audio, button);
            return;
        }

        // Останавливаем предыдущее аудио
        if (this.currentAudio && this.currentAudio !== audio) {
            this.stopAudio(this.currentAudio, this.currentButton);
        }

        // Запускаем новое аудио
        this.playAudio(audio, button);
    }

    playAudio(audio, button) {
        audio.play().then(() => {
            this.currentAudio = audio;
            this.currentButton = button;
            
            button.innerHTML = '⏸ Пауза';
            button.classList.add('playing');

            // Автоматическая остановка когда трек закончится
            audio.onended = () => {
                this.stopAudio(audio, button);
            };

        }).catch(error => {
            console.error('Ошибка воспроизведения:', error);
            button.innerHTML = '❌ Ошибка';
        });
    }

    pauseAudio(audio, button) {
        audio.pause();
        button.innerHTML = '▶ Продолжить';
        button.classList.remove('playing');
    }

    stopAudio(audio, button) {
        audio.pause();
        audio.currentTime = 0;
        if (button) {
            button.innerHTML = '▶ Слушать';
            button.classList.remove('playing');
        }
    }

    stopAll() {
        if (this.currentAudio) {
            this.stopAudio(this.currentAudio, this.currentButton);
        }
    }
}

// Фильтрация портфолио
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Параллакс эффект
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const background = document.querySelector('.background');
        if (background) {
            const moveX = (e.clientX / window.innerWidth) * 20 - 10;
            const moveY = (e.clientY / window.innerHeight) * 20 - 10;
            background.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        }
    });
}

// Анимация появления элементов
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .about-text, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Отправка формы (заглушка)
function initForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо! Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.');
            form.reset();
        });
    }
}

// Инициализация всего когда страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    new AudioPlayer();
    initPortfolioFilters();
    initSmoothScroll();
    initParallax();
    initAnimations();
    initForm();
});

console.log(`%c🎵 Добро пожаловать за кулисы творчества! 🎵`, 
    'background: linear-gradient(90deg, #8A2BE2, #00BFFF); color: white; font-size: 16px; font-weight: bold; padding: 10px; border-radius: 5px;');
    