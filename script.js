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
let numero = '';
let branco = false;
let votos = []

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';


    for (let i=0; i<etapa.numeros; i++) {
        if(i===0) {
            numeroHtml += '<div class="numero pisca" ></div>';
        } else {
            numeroHtml += '<div class="numero" ></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato [0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += ` <div class="d-1-image small" >
                                <img src="images/${candidato.fotos[i].url}" alt="">
                                ${candidato.fotos[i].legenda}
                            </div> `;
            } else {
                fotosHtml += ` <div class="d-1-image" >
                                    <img src="images/${candidato.fotos[i].url}" alt="">
                                    ${candidato.fotos[i].legenda}
                                </div> `;
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class = "aviso-grande pisca">
                                    VOTO NULO
                                </div>`;
    }

};

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !==null) {
        elNumero.innerHTML = n;
        // Atribui o número digitado
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        // Verifica se chegou no final da digitação
        if(elNumero.nextElementSibling !== null) {
            // Adiciona o pisca ao próximo quadrado e permite digitar
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
};

function funcBranco() {
    if(numero === '') {
        branco = true;
        numeros.innerHTML = '';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class = "aviso--grande pisca">
                                    VOTO EM BRANCO
                                </div>`;
    }
};

function corrige() {
    comecarEtapa();
};

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (branco) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log(`Confirmando como ${numero}`);
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined ) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<h1 class="aviso--gigante" >FIM</h1>';
            console.log(votos);
        }
    }
};

comecarEtapa();