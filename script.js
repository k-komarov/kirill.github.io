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

    // QR Code enlargement functionality
    const qrCode = document.querySelector('.qr-code');
    const qrImage = document.querySelector('.qr-image');
    let isEnlarged = false;

    function createEnlargedQR() {
        const overlay = document.createElement('div');
        overlay.className = 'qr-overlay';
        overlay.innerHTML = `
            <div class="qr-enlarged">
                <img src="${qrImage.src.replace('120x120', '300x300')}" alt="QR Code to Portfolio" class="qr-image-large">
                <div class="qr-text-large">Scan to visit komarov-tech.de</div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Close on overlay click
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
            isEnlarged = false;
        });

        // Close on touch (mobile)
        overlay.addEventListener('touchend', function() {
            document.body.removeChild(overlay);
            isEnlarged = false;
        });

        isEnlarged = true;
    }

    // Add click/tap event to QR code
    qrCode.addEventListener('click', function(e) {
        e.preventDefault();
        if (!isEnlarged) {
            createEnlargedQR();
        }
    });

    // Add touch support for mobile
    qrCode.addEventListener('touchend', function(e) {
        e.preventDefault();
        if (!isEnlarged) {
            createEnlargedQR();
        }
    });
});