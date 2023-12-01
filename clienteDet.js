var operacao = ''

document.getElementById('form-cliente').addEventListener('submit', (e) => {
    e.preventDefault();

    let codigo = document.getElementById('codigo-cliente').value;

    console.log(codigo);
    console.log(operacao);

    if (parseInt(codigo, 10) == 0) {
        adicionarCliente(codigo);
    }
    else if (operacao == 'editar') {
        atualizarCliente(codigo);
    }
    else if (operacao == 'excluir') {
        deletarCliente(codigo);
    }
    else if (operacao == 'visualizar')
        window.location.href = 'clienteCad.html?btClic=true'

})

window.addEventListener('load', (e) => {
    const param = new URLSearchParams(window.location.search);
    const codigo = parseInt(param.get('codigo'));
    operacao = param.get("operacao");

    console.log('Código: ' + codigo);
    console.log('Operação: ' + operacao);

    if (codigo > 0) {
        listarCliente(codigo);
    }
});


function deletarCliente(codigo) {
    console.log('deletar');
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('XNodeJS', 'XNodeJS.Script');

    var options = {
        method: 'DELETE',
        headers: myHeaders,
    };

    fetch('https://www.sens.eng.br/api/Cliente/' + codigo, options)
        .then(response => {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
                console.log('excluido');
                alert('Excluído');
                window.location.href = 'clienteCad.html?btClic=true';
            } else {
                alert('falha ao excluir');
            }
        })
        .catch(error => console.log(error));
}

function adicionarCliente(codigo) {
    console.log('adicionar');
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('XNodeJS', 'XNodeJS.Script');

    codigo = parseInt(codigo, 10);
    const condpagto = parseInt(document.getElementById('condpagto').value, 10);

    const data = {
        nomeourazao: document.getElementById('nomeourazao').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        cep: document.getElementById('cep').value,
        nascimento: document.getElementById('nascimento').value,
        email: document.getElementById('email').value,
        ddd: document.getElementById('ddd').value,
        telefone: document.getElementById('telefone').value,
        rg: document.getElementById('rg').value,
        cpf: document.getElementById('cpf').value,
        cnpj: document.getElementById('cnpj').value,
        inscricaoestadual: document.getElementById('inscricaoestadual').value,
        condpagto: condpagto,
    };

    var options = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    fetch('https://www.sens.eng.br/api/Cliente', options)
        .then(response => {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
                console.log('adicionado');
                window.location.href = 'clienteCad.html?btClic=true';
            } else {
                alert('falha ao adicionar');
            }
        })
        .catch(error => console.log(error));
}

function atualizarCliente(codigo) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('XNodeJS', 'XNodeJS.Script');

    // Garantindo que 'codigo' e 'condpagto' sejam números
    codigo = parseInt(codigo, 10);
    const condpagto = parseInt(document.getElementById('condpagto').value, 10);

    const data = {
        codigo: codigo,
        nomeourazao: document.getElementById('nomeourazao').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        cep: document.getElementById('cep').value,
        nascimento: document.getElementById('nascimento').value,
        email: document.getElementById('email').value,
        ddd: document.getElementById('ddd').value,
        telefone: document.getElementById('telefone').value,
        rg: document.getElementById('rg').value,
        cpf: document.getElementById('cpf').value,
        cnpj: document.getElementById('cnpj').value,
        inscricaoestadual: document.getElementById('inscricaoestadual').value,
        condpagto: condpagto,
    };

    var options = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(data)
    };

    fetch('https://www.sens.eng.br/api/Cliente/' + codigo, options)
        .then(response => {
            console.log(response.status);
            if (response.status >= 200 && response.status < 300) {
                console.log('atualizado');
                window.location.href = 'clienteCad.html?btClic=true';
            } else {
                alert('falha ao atualizar');
            }
        })
        .catch(error => console.log(error));
}



function listarCliente(codigo) {
    const myHeaders = new Headers({
        'XNodeJS': 'XNodeJS.Script'
    });

    fetch('https://www.sens.eng.br/api/Cliente/' + codigo, { headers: myHeaders })
        .then(response => response.json())
        .then(data => {
            mostrarCliente(data);                   // Chama a função para processar os dados
        })
        .catch(error => console.log(error));
}

function mostrarCliente(data) {
    document.getElementById('codigo-cliente').value = data.codigo;
    document.getElementById('nomeourazao').value = data.nomeourazao;
    document.getElementById('endereco').value = data.endereco;
    document.getElementById('uf').value = data.uf;
    document.getElementById('cidade').value = data.cidade;
    document.getElementById('cep').value = data.cep;
    document.getElementById('nascimento').value = data.nascimento;
    document.getElementById('email').value = data.email;
    document.getElementById('ddd').value = data.ddd;
    document.getElementById('telefone').value = data.telefone;
    document.getElementById('rg').value = data.rg;
    document.getElementById('cpf').value = data.cpf;
    document.getElementById('cnpj').value = data.cnpj;
    document.getElementById('inscricaoestadual').value = data.inscricaoestadual;
    document.getElementById('condpagto').value = data.condpagto;

    if (operacao == 'editar')
        document.getElementById('btn-salvar').innerHTML = "Salvar"
    else if (operacao == 'excluir')
        document.getElementById('btn-salvar').innerHTML = "Excluir"
    else if (operacao == 'visualizar')
        document.getElementById('btn-salvar').innerHTML = "Voltar"

    if (operacao != 'editar') { 
        document.getElementById('nomeourazao').disabled = true;
        document.getElementById('endereco').disabled = true;
        document.getElementById('cidade').disabled = true;
        document.getElementById('uf').disabled = true;
        document.getElementById('cep').disabled = true;
        document.getElementById('nascimento').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('ddd').disabled = true;
        document.getElementById('telefone').disabled = true;
        document.getElementById('rg').disabled = true;
        document.getElementById('cpf').disabled = true;
        document.getElementById('cnpj').disabled = true;
        document.getElementById('inscricaoestadual').disabled = true;
        document.getElementById('condpagto').disabled = true;
    }        
}


