document.addEventListener('DOMContentLoaded', () => {
    const tipoCheckbox = document.getElementById('tipo');
    const clienteGroup = document.getElementById('cliente-group');
    const clienteSelect = document.getElementById('cliente');

    const loadClientes = () => {
        fetch('https://localhost:7196/api/Cliente')
            .then(response => response.json())
            .then(data => {
                // Limpa opções anteriores
                cliente

                    .innerHTML = '';

                const defaultOption = document.createElement('option');
                defaultOption.value = "";
                defaultOption.textContent = "Selecione um cliente";
                clienteSelect.appendChild(defaultOption);

                data.forEach(cliente => {
                    const option = document.createElement('option');
                    option.value = cliente.codigo;
                    option.textContent = cliente.nomeourazao;
                    clienteSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar clientes:', error));
    };

    tipoCheckbox.addEventListener('change', () => {
        if (tipoCheckbox.checked) {
            clienteGroup.style.display = 'block';
            loadClientes();
        } else {
            clienteGroup.style.display = 'none';
        }
    });

    // Enviar formulário
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Verificando se o tipo é selecionado e a opção do cliente é válida
        if (tipoCheckbox.checked && (!clienteSelect.selectedOptions.length || clienteSelect.selectedOptions[0].value === "")) {
            alert('Selecione um cliente.');
            return;
        }

        let codcliValue = null;

        if (tipoCheckbox.checked) {
            codcliValue = clienteSelect.value && clienteSelect.value !== "undefined" ? parseInt(clienteSelect.value, 10) : null;
        }

        console.log("Valor selecionado:", clienteSelect.value);

        const data = {
            Username: document.getElementById('username').value,
            Hashpw: document.getElementById('password').value,
            Tipo: tipoCheckbox.checked ? 1 : 0,
            Codcli: codcliValue
        };

        // Logar o JSON que será enviado para o backend
        console.log("JSON enviado:", JSON.stringify(data));

        fetch('https://www.sens.eng.br/api/Tlogins/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                // Resetar o formulário ou redirecionar se necessário
            })
            .catch(error => console.error('Erro ao registrar:', error));
    });
});
