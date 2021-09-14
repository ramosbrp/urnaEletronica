// Textos da tela
let seuVotoPara = document.querySelector(".d-1-1 span");
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');

// Imagens
let lateral = document.querySelector('.d-1-right');

// Números
let numeros = document.querySelector('.d-1-3');


let etapaAtual = 0;
function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';

    for (let i=0; i<etapa.numeros; i++) {
        numeroHtml += '<div class="numero" ></div>';
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    
}

function clicou(n) {
    alert(`clicou em: ${n}`)
};

function branco() {
    alert(`clicou em: branco`)
};

function corrige() {
    alert('Clicou em: CORRIGE')
}

function confirma() {
    alert('Clicou em: CONFIRMA')
}

comecarEtapa();