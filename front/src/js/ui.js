import '../css/ui.css';

customElements.define('user-interface', class extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('oi')
        this.innerHTML = `
            <div class="canvas-container">
                <div id="cnv">
                    <canvas id="output"></canvas>
                    <div id="msg" class="hide">Série completada!</div>
                </div>
            
                <div id="bar">
                    <h1 id="exercise-name" class="bar-header"><b> - </b></h1>
            
                    <div class="bar-header" style="background-color: #008CBA;">
                        <h1>Repetições</h1>
                        <hr>
            
                        <h1 id="header-left">Esquerda:</h1>
                        <h1 id="counter-left"><span id="reps-left">0</span> / <span id="reps-left-max">12</span></h1>
            
                        <h1 id="header-right">Direita:</h1>
                        <h1 id="counter-right"><span id="reps-right">0</span> / <span id="reps-right-max">12</span></h1>
                    </div>
            
                    <div class="bar-header" style="background-color: #006587;">
                        <h1> Séries:</h1>
                        <h1><span id="sets">0</span> / <span id="sets-max">3</span></h1>
                    </div>
            
                    <div id="rest-wrapper" class="bar-header" style="background-color: #002C3B;">
                        <h1> Descanso:</h1>
                        <h1><span id="rest">30</span> s</h1>
                    </div>
                </div>
            
            </div>
            
            <span id="start">
                <div class="center-vertically">
                    <button id="btn">Start</button>
                    <p id="counter">5</p>
                    <div id="loader"></div>
                </div>
            </span>
            
            <video id="video" playsinline
                style="-webkit-transform: scaleX(-1); transform: scaleX(-1); display: none; width: auto; height: auto;">
            </video>
        `;
    }
});

