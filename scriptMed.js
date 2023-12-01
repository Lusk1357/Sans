let dataInterval;
let intervalDuration = 2000; // Inicializa com 2 segundos

document.getElementById('loadMedicoes').addEventListener('click', function () {
    if (dataInterval) {
        clearInterval(dataInterval); // Limpa qualquer intervalo existente
    }
    fetchDataAndSetInterval();
});

async function fetchDataAndSetInterval() {
    try {
        const apiKey = 'XNodeJS.Script';

        // Recuperando o código do micro da URL ou de outra fonte na página
        const urlParams = new URLSearchParams(window.location.search);
        const codmicro = urlParams.get('codmicro'); // Assumindo que o parâmetro na URL é 'codmicro'

        // Verifica se o codmicro foi obtido corretamente
        if (!codmicro) {
            throw new Error("Código do micro não foi fornecido");
        }

        const apiUrl = `https://www.sens.eng.br/api/Medicao/Micro/${codmicro}`;


        let response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'XNodeJS': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();

        // Ordenar dados em ordem decrescente de data e hora
        data.sort((a, b) => new Date(b.datah) - new Date(a.datah));

        updateTable(data);
        adjustIntervalBasedOnData(data);
        resetAndSetInterval();

    } catch (error) {
        console.error("Erro durante a requisição Fetch:", error.message);
    }

}

function updateTable(data) {
    let tableBody = document.getElementById('medicoesTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpa qualquer dado existente
    data.forEach(medicao => insertMedicaoRow(tableBody, medicao));
}

function insertMedicaoRow(tableBody, medicao) {
    let row = tableBody.insertRow();
    let cellDatah = row.insertCell(0);
    cellDatah.appendChild(document.createTextNode(new Date(medicao.datah).toLocaleString()));

    let cellTemperatura = row.insertCell(1);
    cellTemperatura.appendChild(document.createTextNode(medicao.temperatura));

    let cellPressao = row.insertCell(2);
    cellPressao.appendChild(document.createTextNode(medicao.pressao));

    let cellAltitude = row.insertCell(3);
    cellAltitude.appendChild(document.createTextNode(medicao.altitude));

    let cellDistancia = row.insertCell(4);
    let progressContainer = createProgressBar(medicao.distancia);
    cellDistancia.appendChild(progressContainer);

    // Scroll para a última linha adicionada
    //row.scrollIntoView({ behavior: "smooth", block: "end" });
}

function createProgressBar(distancia) {
    let progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';

    let progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    // Calcula a largura, mas limita a 100%
    let width = Math.min(distancia / 50 * 100, 100);
    progressBar.style.width = `${width}%`;

    let progressText = document.createElement('span');
    progressText.className = 'progress-text';
    progressText.textContent = distancia.toFixed(1) + 'cm';

    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);

    return progressContainer;
}

function adjustIntervalBasedOnData(data) {
    // Verificar se alguma medição tem temperatura acima de 30 graus
    const temperaturaAlta = data.some(medicao => medicao.temperatura > 30);

    if (temperaturaAlta) {
        // Usar texto para voz para alertar sobre a temperatura alta
        const mensagem = "Cuidado com a temperatura!";
        const fala = new SpeechSynthesisUtterance(mensagem);
        window.speechSynthesis.speak(fala);

        // Ajustar o intervalo para um valor maior
        intervalDuration = 7000;
    } else {
        // Manter o intervalo padrão se a temperatura estiver normal
        intervalDuration = 3200;
    }
}


function resetAndSetInterval() {
    clearInterval(dataInterval);
    dataInterval = setInterval(fetchDataAndSetInterval, intervalDuration);
}