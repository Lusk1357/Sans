var operacao = ''

document.getElementById('form-micro').addEventListener('submit', (e) => {
    e.preventDefault();

    let codigo = document.getElementById('codigo-micro').value;
    let codlocal = document.getElementById('codlocal').value;

    if (parseInt(codigo, 10) == 0) {
        adicionarMicro();
    }
    else if (operacao == 'editar') {
        atualizarMicro(codigo);
    }
    else if (operacao == 'excluir') {
        deletarMicro(codigo, codlocal);
    }
    else if (operacao == 'visualizar')
        window.location.href = 'microCad.html?btClic=true&codlocal=' + codlocal;

})

window.addEventListener('load', (e) => {
    const param = new URLSearchParams(window.location.search);
    const codigo = parseInt(param.get('codigo'));
    const codlocal = parseInt(param.get('codlocal'));
    operacao = param.get("operacao");

    if (parseInt(codlocal, 10) > 0) {
        console.log('codlocal > 0: ' + codlocal);
        document.getElementById('codlocal').value = codlocal;
    }

    console.log('Código: ' + codigo);
    console.log('Operação: ' + operacao);
    console.log('codlocal load: ' + codlocal);

    if (codigo > 0) {
        listarMicro(codigo, operacao, codlocal);
    }
});


function deletarMicro(codigo, codlocal) {
    console.log('deletar');
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('XNodeJS', 'XNodeJS.Script');

    codlocal = parseInt(codlocal, 10);

    var options = {
        method: 'DELETE',
        headers: myHeaders,
    };

    fetch('https://www.sens.eng.br/api/Microcontrolador/' + codigo, options)
        .then(response => {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
                console.log('excluido');
                window.location.href = 'microCad.html?btClic=true&codlocal=' + codlocal;
            } else {
                console.log('falha ao excluir');
            }
        })
        .catch(error => console.log(error));
}

function adicionarMicro() {

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('XNodeJS', 'XNodeJS.Script');

    const codlocal = parseInt(document.getElementById('codlocal').value, 10);

    const data = {
        descricao: document.getElementById('descricao').value,
        macaddress: document.getElementById('macaddress').value,
        ipaddress: document.getElementById('ipaddress').value,
        codlocal: codlocal,
    };

    var options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    console.log('dados: ' + JSON.stringify(options, null, 2));


    fetch('https://www.sens.eng.br/api/Microcontrolador', options)
        .then(response => {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
                console.log('adicionado');
                window.location.href = 'microCad.html?btClic=true&codlocal=' + codlocal;
            } else {
                console.log('falha ao adicionar');;
            }
        })
        .catch(error => console.log(error));
}

function atualizarMicro(codigo) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('XNodeJS', 'XNodeJS.Script');

    codigo = parseInt(codigo, 10);

    const codlocal = parseInt(document.getElementById('codlocal').value, 10);

    const data = {
        codigo: codigo,
        descricao: document.getElementById('descricao').value,
        macaddress: document.getElementById('macaddress').value,
        ipaddress: document.getElementById('ipaddress').value,
        codlocal: codlocal,
    };

    var options = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(data)
    };
    console.log('atualizar: ' + codigo);

    fetch('https://www.sens.eng.br/api/Microcontrolador/' + codigo, options)
        .then(response => {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
                console.log('atualizado');
                window.location.href = 'microCad.html?btClic=true&codlocal=' + codlocal;
            } else {
                console.log('falha ao atualizar');
            }
        })
        .catch(error => console.log(error));
}



function listarMicro(codigo, operacao, codlocal) {
    const myHeaders = new Headers({
        'XNodeJS': 'XNodeJS.Script'
    });

    fetch('https://www.sens.eng.br/api/Microcontrolador/' + codigo, { headers: myHeaders })
        .then(response => response.json())
        .then(data => {
            mostrarMicro(data, operacao);   // Chama a função para processar os dados
        })
        .catch(error => console.log(error));
}

function mostrarMicro(data, operacao) {
    document.getElementById('codigo-micro').value = data.codigo;
    document.getElementById('descricao').value = data.descricao;
    document.getElementById('macaddress').value = data.macaddress;
    document.getElementById('ipaddress').value = data.ipaddress;
    document.getElementById('codlocal').value = data.codlocal;

    if (operacao == 'editar')
        document.getElementById('btn-salvar').innerHTML = "Salvar"
    else if (operacao == 'excluir')
        document.getElementById('btn-salvar').innerHTML = "Excluir"
    else if (operacao == 'visualizar')
        document.getElementById('btn-salvar').innerHTML = "Voltar"

    if (operacao != 'editar') { 
        document.getElementById('descricao').disabled = true;
        document.getElementById('macaddress').disabled = true;
        document.getElementById('ipaddress').disabled = true;
    }        
}

document.addEventListener('DOMContentLoaded', function () {
    var botaoCancelar = document.getElementById('btn-cancelar');
    botaoCancelar.addEventListener('click', function () {
        var codlocal = document.getElementById('codlocal').value;
        window.location.href = 'microCad.html?btClic=true&codlocal=' + codlocal;
    });

    if (operacao == 'visualizar') {
        var botaoVoltar = document.getElementById('btn-salvar');
        botaoVoltar.addEventListener('click', function () {
            var codlocal = document.getElementById('codlocal').value;
            window.location.href = 'microCad.html?btClic=true&codlocal=' + codlocal;
        });
    }

});


