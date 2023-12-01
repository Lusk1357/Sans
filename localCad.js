window.addEventListener('load', (e) => {

    const param = new URLSearchParams(window.location.search);
    const codcli = parseInt(param.get('codcli'));

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
    const btnMostrarLocais = document.getElementById('btn-buscar');

    inputTexto.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede o comportamento padrão do Enter em um formulário
            btnMostrarLocais.click(); // Dispara o clique do botão
        }
    });
});


document.getElementById('btn-buscar').addEventListener('click', (e) => {


    let endereco = document.getElementById('texto').value;

    const param = new URLSearchParams(window.location.search);

    const codcli = parseInt(param.get('codcli'));

    if (endereco == '') {
        listarLocais(codcli);
    } else {
        listarLocaisporEndereco(endereco);
    }

    

})

document.getElementById('btn-adicionar').addEventListener('click', (e) => {
    const param = new URLSearchParams(window.location.search);
    const codcli = param.get('codcli'); 
    window.location.href = `localDet.html?codcli=${codcli}`; 
})


function listarLocaisporEndereco(endereco) {
    const myHeaders = new Headers({
        'XNodeJS': 'XNodeJS.Script' 
    });

    fetch('https://www.sens.eng.br/api/Local/Nome/' + endereco, { headers: myHeaders })
        .then(response => response.json())
        .then(data => popularLocais(data))
        .catch(error => console.log(error))
}

function listarLocais(codcli) {
    const myHeaders = new Headers({
        'XNodeJS': 'XNodeJS.Script' 
    });

    fetch('https://www.sens.eng.br/api/Local/ByCliente/' + codcli, { headers: myHeaders })
        .then(response => response.json())
        .then(data => popularLocais(data, codcli))
        .catch(error => console.log(error));
}


function popularLocais(data, codcli) {
    let tbody = document.getElementById('resultList');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_endereco = tr.insertCell();
        let td_cidade = tr.insertCell();
        let td_acao = tr.insertCell();
        let td_micros = tr.insertCell();

        td_id.innerHTML = data[i].codigo;
        td_descricao.innerHTML = data[i].descricao;
        td_descricao.className = 'align-left'; 

        td_endereco.innerHTML = data[i].endereco;
        td_cidade.innerHTML = data[i].cidade;

        td_acao.innerHTML = '<a href="localDet.html?codcli=' + codcli + '&codigo=' + data[i].codigo + '&operacao=visualizar" class="btn -visualizar">Ver</a> <a href="localDet.html?codcli=' + codcli + '&codigo=' + data[i].codigo + '&operacao=editar" class="btn -editar">Editar</a> <a href="localDet.html?codcli=' + codcli + '&codigo=' + data[i].codigo + '&operacao=excluir" class="btn -excluir">Excluir</a>';

        td_micros.innerHTML = '<a href="microCad.html?btClic=true&codlocal=' + data[i].codigo + '" class="btn -visualizar">Micros</a>';

    }
}

