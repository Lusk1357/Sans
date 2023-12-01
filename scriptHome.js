let intervaloMensagem; // Variável global para armazenar a referência do intervalo

let mensagemAtual = "";
let indiceAtual = 0;
const mensagens = [
    "Podemos ajudar você ou sua empresa!",
    " Suas informações em instantes,",
    " em qualquer lugar!"
];

function exibirMensagem() {

    let elementoMensagem = document.getElementById('mensagem');
    if (!elementoMensagem) return; 

    if (indiceAtual < mensagens.length) {
        mensagemAtual = mensagens[indiceAtual];
        indiceAtual++;

        let charIndex = 0;
        //document.getElementById('mensagem').textContent = ""; // Limpar o texto atual

        const intervalo = setInterval(function() {
            if (charIndex < mensagemAtual.length) {
                document.getElementById('mensagem').textContent += mensagemAtual[charIndex];
                charIndex++;
            } else {
                clearInterval(intervalo);
                // Chama a próxima mensagem após um intervalo
                if (indiceAtual < mensagens.length) {
                    setTimeout(exibirMensagem, 200); // Aguarda 3 segundos antes de exibir a próxima mensagem
                }
            }
        }, 40); // 100 milissegundos entre cada letra, ajuste conforme desejado
        pararExibirMensagem();
    }
}

function pararExibirMensagem() {
    clearInterval(intervaloMensagem); // Para o intervalo
}

window.onload = function () {
    exibirMensagem(); // Chama a função depois que a página estiver totalmente carregada
};

document.addEventListener('DOMContentLoaded', function () {
    var inicioLink = document.getElementById('inicioLink');
    var powerBiLink = document.getElementById('powerBiLink');
    var mainContainer = document.querySelector('.container-fluid');
    var originalContent = mainContainer.innerHTML; // Armazena o conteúdo original

    function loadMedicoes() {
        var iframeHeight = window.innerHeight - document.querySelector('.navbar').offsetHeight - document.querySelector('.footer').offsetHeight;
        mainContainer.innerHTML = '<iframe id="ifmed" src="medicoes.html" style="width: 100%; height: ' + iframeHeight + 'px;" frameborder="0" title="Visualização de Medições"></iframe>';
    }

    medicoesLink.addEventListener('click', function (event) {
        event.preventDefault();
        pararExibirMensagem();
        loadMedicoes();
    });

    var cadastrosLink = document.getElementById('cadastrosLink');

    function loadCadastros() {
        var iframeHeight = window.innerHeight - document.querySelector('.navbar').offsetHeight - document.querySelector('.footer').offsetHeight;
        mainContainer.innerHTML = '<iframe id="iframex" src="clienteCad.html" style="width: 100%; height: ' + iframeHeight + 'px;" frameborder="0"></iframe>';
    }

    cadastrosLink.addEventListener('click', function (event) {
        event.preventDefault();
        pararExibirMensagem();
        loadCadastros();
    });

    function loadPowerBi() {
        var iframeHeight = window.innerHeight - document.querySelector('.navbar').offsetHeight - document.querySelector('.footer').offsetHeight;
        mainContainer.innerHTML = '<iframe id="ifbi" src="https://app.powerbi.com/view?r=eyJrIjoiOGU1YzFmMTMtYTRkMi00MjJlLWFjYTQtNzhmYWU2YzM4MDE0IiwidCI6IjkxODA4YmQwLTVjNmEtNDlkZi05M2RmLWZiNmE3NDBmNTk0ZCIsImMiOjh9&embedImagePlaceholder=true" style="width: 100%; height: ' + iframeHeight + 'px;" frameborder="0"></iframe>';
    }

    function loadInicio() {
        mainContainer.innerHTML = originalContent; // Restaura o conteúdo original
        document.getElementById('mensagem').textContent = "";
        document.getElementById('mensagem').textContent = "Podemos ajudar você ou sua empresa! Suas informações em instantes, em qualquer lugar!";
    }

    powerBiLink.addEventListener('click', function (event) {
        event.preventDefault();
        pararExibirMensagem();
        loadPowerBi();
    });

    inicioLink.addEventListener('click', function (event) {
        event.preventDefault();
        pararExibirMensagem();
        loadInicio();
    });
});

