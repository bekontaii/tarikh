// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Автоматическое определение активной ссылки в навигации
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
            link.classList.add('active');
        }
    });

    // Система переводов
    let currentLang = localStorage.getItem('language') || 'kk';
    
    // Функция перевода
    function translatePage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Обновляем заголовок страницы
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            const currentPath = window.location.pathname;
            let titleKey = 'page.title';
            if (currentPath === '/database') titleKey = 'page.database';
            else if (currentPath === '/eras') titleKey = 'page.eras';
            else if (currentPath === '/archaeologists') titleKey = 'page.archaeologists';
            else if (currentPath === '/students') titleKey = 'page.students';
            else if (currentPath === '/about') titleKey = 'page.about';
            else if (currentPath === '/contact') titleKey = 'page.contact';
            
            if (translations[lang] && translations[lang][titleKey]) {
                pageTitle.textContent = translations[lang][titleKey];
            }
        }
        
        // Обновляем все элементы с data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                const translation = translations[lang][key];
                // Если это ссылка с иконкой, сохраняем HTML
                if (element.tagName === 'A' && translation.includes('<i')) {
                    element.innerHTML = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        
        // Обновляем placeholder'ы
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
        
        // Обновляем атрибут lang у html
        document.documentElement.lang = lang === 'kk' ? 'kk' : lang === 'ru' ? 'ru' : 'en';
        
        // Обновляем активную кнопку языка
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
    }
    
    // Переключение языков
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            translatePage(lang);
        });
    });
    
    // Загружаем сохраненный язык при загрузке страницы
    translatePage(currentLang);


    // Форма обратной связи
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (name && email && message) {
                try {
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email, message })
                    });

                    const data = await response.json();
                    if (data.success) {
                        const message = translations[currentLang] && translations[currentLang]['form.success'] 
                            ? translations[currentLang]['form.success'] 
                            : 'Рахмет! Хабарламаңыз сәтті жіберілді. Жауабын 24 сағат ішінде күтіңіз.';
                        alert(message);
                        this.reset();
                    }
                } catch (error) {
                    console.error('Ошибка отправки формы:', error);
                    const message = translations[currentLang] && translations[currentLang]['form.success'] 
                        ? translations[currentLang]['form.success'] 
                        : 'Рахмет! Хабарламаңыз сәтті жіберілді. Жауабын 24 сағат ішінде күтіңіз.';
                    alert(message);
                    this.reset();
                }
            } else {
                const message = translations[currentLang] && translations[currentLang]['form.error'] 
                    ? translations[currentLang]['form.error'] 
                    : 'Барлық өрістерді толтырыңыз.';
                alert(message);
            }
        });
    }



    // Добавление класса при скролле для анимации
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми карточками
    document.querySelectorAll('.goal-card, .era-card, .test-card, .database-item').forEach(card => {
        observer.observe(card);
    });

});