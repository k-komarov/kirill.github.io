document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elements = document.querySelectorAll('[data-en][data-de]');

    let currentLang = 'en';

    function switchLanguage(lang) {
        currentLang = lang;

        langButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        document.getElementById(`lang-${lang}`).classList.add('active');

        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'UL') {
                    element.innerHTML = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.id.split('-')[1];
            switchLanguage(lang);
        });
    });
});