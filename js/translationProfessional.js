class Translation {
    constructor() {
        this.ptBR = [
            { element: '.menu-vrapps', content: 'Apps em RV' },
            { element: '.menu-projects', content: 'Exercícios' },
            { element: '.menu-about', content: 'Mensagens' },
            { element: '.menu-contact', content: 'Paciente' },
        ];

        this.enUS = [
            { element: '.menu-vrapps', content: 'VR Apps' },
            { element: '.menu-projects', content: 'Workouts' },
            { element: '.menu-about', content: 'Messages' },
            { element: '.menu-contact', content: 'Patient' },
        ];

        this.onTranslate = null;

        this.PT_BR = 'pt-BR';
        this.EN_US = 'en-US';
        this.currentLang = this.EN_US;
    }


    add(element, enUS, ptBR) {
        if (!element) {
            console.error('No html element was passed!');
            return;
        }
        if (!enUS) {
            console.warn('No english translation was set for ' + element);
        }
        if (!ptBR) {
            console.warn('No portuguese translation was set for ' + element);
        }

        this.enUS.push({ element, content: enUS });
        this.ptBR.push({ element, content: ptBR });
    }

    translateDocument(language) {
        let textArray;
        if (language === this.PT_BR) {
            textArray = this.ptBR;
            this.currentLang = this.PT_BR
        }
        else if (language === this.EN_US) {
            textArray = this.enUS;
            this.currentLang = this.EN_US
        }
        else {
            console.error('Invalid Language!')
            return;
        }

        let elements;
        for (const txt of textArray) {
            if (txt.element) {
                elements = document.querySelectorAll(txt.element);

                if (elements) {
                    for (let e of elements) {
                        e.innerHTML = txt.content;
                    }
                }
            }
        }

        if (this.onTranslate) {
            this.onTranslate();
        }
    }

    redirect(path, hash, newTab) {
        const prevPath = window.location.origin === "https://avrgroup.github.io" ? '/FisioVR-testes/' : '/FisioVR-testes/';

        if (!hash) {
            hash = '';
        }
        const newURL = window.location.origin + prevPath + path + '?lang=' + this.currentLang + hash;
        if (newTab) window.open(newURL, '_blank');
        else window.location.href = newURL;
    }
}

const TRANSLATION = new Translation();


window.addEventListener('load', () => {
    const url = new URLSearchParams(window.location.search);
    const lang = url.get('lang');

    if (lang && lang === 'pt-BR') {
        TRANSLATION.translateDocument(TRANSLATION.PT_BR);
    }
    else {
        TRANSLATION.translateDocument(TRANSLATION.EN_US);
    }
}, { once: true })