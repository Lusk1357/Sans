window.addEventListener('load', (e) => {

    const param = new URLSearchParams(window.location.search);
    const codlocal = parseInt(param.get('codclocal'));

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


document.getElementById('btn-buscar').addEventListener('click', (e) => {


    const param = new URLSearchParams(window.location.search);

    const codlocal = parseInt(param.get('codlocal'));

        listarMicros(codlocal);    

})

document.getElementById('btn-adicionar').addEventListener('click', (e) => {
    const param = new URLSearchParams(window.location.search);
    const codlocal = param.get('codlocal'); 
    window.location.href = `microDet.html?codlocal=${codlocal}`; 
})



function listarMicros(codlocal) {
    const myHeaders = new Headers({
        'XNodeJS': 'XNodeJS.Script' 
    });

    fetch('https://www.sens.eng.br/api/Microcontrolador/ByLocal/' + codlocal, { headers: myHeaders })
        .then(response => response.json())
        .then(data => popularMicros(data, codlocal))
        .catch(error => console.log(error));
}


function popularMicros(data, codlocal) {
    let tbody = document.getElementById('resultList');
    tbody.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_macaddress = tr.insertCell();
        let td_ipaddress = tr.insertCell();
        let td_acao = tr.insertCell();
        let td_medicoes = tr.insertCell();

        td_id.innerHTML = data[i].codigo;
        td_descricao.innerHTML = data[i].descricao;
        td_descricao.className = 'align-left'; 

        td_macaddress.innerHTML = data[i].macaddress;
        td_ipaddress.innerHTML = data[i].ipaddress;

        td_acao.innerHTML = '<a href="microDet.html?codlocal=' + codlocal + '&codigo=' + data[i].codigo + '&operacao=visualizar" class="btn -visualizar">Ver</a> <a href="microDet.html?codlocal=' + codlocal + '&codigo=' + data[i].codigo + '&operacao=editar" class="btn -editar">Editar</a> <a href="microDet.html?codlocal=' + codlocal + '&codigo=' + data[i].codigo + '&operacao=excluir" class="btn -excluir">Excluir</a>';

        td_medicoes.innerHTML = '<a href="medicoes.html?btClic=true&codmicro=' + data[i].codigo + '" class="btn -visualizar">Medições</a>';

    }
}

