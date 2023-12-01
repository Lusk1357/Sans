window.addEventListener('load', (e) => {

    const param = new URLSearchParams(window.location.search);
    const codigo = parseInt(param.get('codigo'));

    console.log("cod 1: " + codigo);
})

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const triggerButtonEvent = urlParams.get('btClic');

    if (triggerButtonEvent === 'true') {
        const button = document.getElementById('btn-buscar');
        if (button) {
            button.click(); 
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const inputTexto = document.getElementById('texto');
    const btnMostrarClientes = document.getElementById('btn-buscar');

    inputTexto.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede o comportamento padrão do Enter em um formulário
            btnMostrarClientes.click(); // Dispara o clique do botão
        }
    });
});


document.getElementById('btn-buscar').addEventListener('click', (e) => {


    let descricao = document.getElementById('texto').value;

    if (descricao == '') {
        listarClientes();
    } else {
        listarClientesporDescricao(descricao);
    }

    

})

document.getElementById('btn-adicionar').addEventListener('click', (e) => {

    window.location.href = 'clienteDet.html';


})

function listarClientesporDescricao(descricao) {
    const myHeaders = new Headers({
        'XNodeJS': 'XNodeJS.Script'
    });

    fetch('https://www.sens.eng.br/api/Cliente/Nome/' + descricao, { headers: myHeaders })
        .then(response => response.json())
        .then(data => popularClientes(data))
        .catch(error => console.log(error));
}

function listarClientes() {
    const myHeaders = new Headers({
        'XNodeJS': 'XNodeJS.Script'
    });

    fetch('https://www.sens.eng.br/api/Cliente', { headers: myHeaders })
        .then(response => response.json())
        .then(data => popularClientes(data))
        .catch(error => console.log(error));
}


function popularClientes(data) {
    let tbody = document.getElementById('resultList');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_nome = tr.insertCell();
        let td_acao = tr.insertCell();
        let td_locais = tr.insertCell();

        td_id.innerHTML = data[i].codigo;
        td_nome.innerHTML = data[i].nomeourazao;
        td_nome.className = 'align-left'; 



        td_acao.innerHTML = '<a href="clienteDet.html?codigo=' + data[i].codigo + '&operacao=visualizar" class="btn -visualizar">Ver</a> <a href="clienteDet.html?codigo=' + data[i].codigo + '&operacao=editar" class="btn -editar">Editar</a> <a href="clienteDet.html?codigo=' + data[i].codigo + '&operacao=excluir" class="btn -excluir">Excluir</a>';

        td_locais.innerHTML = '<a href="localCad.html?btClic=true&codcli=' + data[i].codigo + '" class="btn -visualizar">Locais</a>';

    }
}