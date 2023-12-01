var operacao = ''

document.getElementById('form-local').addEventListener('submit', (e) => {
    e.preventDefault();

    let codigo = document.getElementById('codigo-local').value;
    let codcli = document.getElementById('codcli').value;

    if (parseInt(codigo, 10) == 0) {
        adicionarLocal();
    }
    else if (operacao == 'editar') {
        atualizarLocal(codigo);
    }
    else if (operacao == 'excluir') {
        deletarLocal(codigo, codcli);
    }
    else if (operacao == 'visualizar')
        window.location.href = 'localCad.html?btClic=true&codcli=' + codcli;

})

window.addEventListener('load', (e) => {
    const param = new URLSearchParams(window.location.search);
    const codigo = parseInt(param.get('codigo'));
    const codcli = parseInt(param.get('codcli'));
    operacao = param.get("operacao");

    if (parseInt(codcli, 10) > 0) {
        console.log('Codcli > 0: ' + codcli);
        document.getElementById('codcli').value = codcli;
    }

    console.log('Código: ' + codigo);
    console.log('Operação: ' + operacao);
    console.log('Codcli load: ' + codcli);

    if (codigo > 0) {
        listarLocal(codigo, operacao, codcli);
    }
});


function deletarLocal(codigo, codcli) {
    console.log('deletar');
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('XNodeJS', 'XNodeJS.Script');

    codcli = parseInt(codcli, 10);

    var options = {
        method: 'DELETE',
        headers: myHeaders,
    };

    fetch('https://www.sens.eng.br/api/Local/' + codigo, options)
        .then(response => {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
                console.log('excluido');
                window.location.href = 'localCad.html?btClic=true&codcli=' + codcli;
            } else {
                console.log('falha ao excluir');
            }
        })
        .catch(error => console.log(error));
}

function adicionarLocal() {

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('XNodeJS', 'XNodeJS.Script');

    const codcli = parseInt(document.getElementById('codcli').value, 10);

    const data = {
        descricao: document.getElementById('descricao').value,
        endereco: document.getElementById('endereco').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        ddd: document.getElementById('ddd').value,
        telefone: document.getElementById('telefone').value,
        codcli: codcli,
    };

    var options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    console.log('dados: ' + JSON.stringify(options, null, 2));


    fetch('https://www.sens.eng.br/api/Local', options)
        .then(response => {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
                console.log('adicionado');
                window.location.href = 'localCad.html?btClic=true&codcli=' + codcli;
            } else {
                console.log('falha ao adicionar');;
            }
        })
        .catch(error => console.log(error));
}

function atualizarLocal(codigo) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('XNodeJS', 'XNodeJS.Script');

    codigo = parseInt(codigo, 10);

    const codcli = parseInt(document.getElementById('codcli').value, 10);

    const data = {
        codigo: codigo,
        descricao: document.getElementById('descricao').value,
        endereco: document.getElementById('endereco').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        ddd: document.getElementById('ddd').value,
        telefone: document.getElementById('telefone').value,
        codcli: codcli,
    };

    var options = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(data)
    };
    console.log('atualizar: ' + codigo);

    fetch('https://www.sens.eng.br/api/Local/' + codigo, options)
        .then(response => {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
                console.log('atualizado');
                window.location.href = 'localCad.html?btClic=true&codcli=' + codcli;
            } else {
                console.log('falha ao atualizar');
            }
        })
        .catch(error => console.log(error));
}



function listarLocal(codigo, operacao, codcli) {
    const myHeaders = new Headers({
        'XNodeJS': 'XNodeJS.Script'
    });

    fetch('https://www.sens.eng.br/api/Local/' + codigo, { headers: myHeaders })
        .then(response => response.json())
        .then(data => {
            mostrarLocal(data, operacao);   // Chama a função para processar os dados
        })
        .catch(error => console.log(error));
}

function mostrarLocal(data, operacao) {
    document.getElementById('codigo-local').value = data.codigo;
    document.getElementById('descricao').value = data.descricao;
    document.getElementById('endereco').value = data.endereco;
    document.getElementById('uf').value = data.uf;
    document.getElementById('cidade').value = data.cidade;
    document.getElementById('cep').value = data.cep;
    document.getElementById('ddd').value = data.ddd;
    document.getElementById('telefone').value = data.telefone;
    document.getElementById('codcli').value = data.codcli;

    if (operacao == 'editar')
        document.getElementById('btn-salvar').innerHTML = "Salvar"
    else if (operacao == 'excluir')
        document.getElementById('btn-salvar').innerHTML = "Excluir"
    else if (operacao == 'visualizar')
        document.getElementById('btn-salvar').innerHTML = "Voltar"

    if (operacao != 'editar') { 
        document.getElementById('descricao').disabled = true;
        document.getElementById('endereco').disabled = true;
        document.getElementById('cidade').disabled = true;
        document.getElementById('uf').disabled = true;
        document.getElementById('cep').disabled = true;
        document.getElementById('ddd').disabled = true;
        document.getElementById('telefone').disabled = true;
    }        
}

document.addEventListener('DOMContentLoaded', function () {
    var botaoCancelar = document.getElementById('btn-cancelar');
    botaoCancelar.addEventListener('click', function () {
        var codcli = document.getElementById('codcli').value;
        window.location.href = 'localCad.html?btClic=true&codcli=' + codcli;
    });

    if (operacao == 'visualizar') {
        var botaoVoltar = document.getElementById('btn-salvar');
        botaoVoltar.addEventListener('click', function () {
            var codcli = document.getElementById('codcli').value;
            window.location.href = 'localCad.html?btClic=true&codcli=' + codcli;
        });
    }

});


