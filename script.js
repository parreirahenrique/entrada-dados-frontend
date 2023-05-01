// FUNÇÕES GERAIS PARA TODAS AS PÁGINAS
function apenas_numeros(input) {
    let valor_numerico = input.value.toString()
    
    for (i = (valor_numerico.length - 1); i >= 0; i--) {
        if (isNaN(valor_numerico[i]) == true || valor_numerico[i] == ' ') {
            valor_numerico = valor_numerico.replace(valor_numerico[i], '')
        }
    }
    
    input.value = valor_numerico
}

function apenas_letras(input) {
    let valor = input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
    
    for (i = (valor.length - 1); i >= 0; i--) {
        if (isNaN(valor[i]) == false & valor[i] != ' ') {
            valor = valor.replace(valor[i], '')
        }
    }

    input.value = valor.toUpperCase()
}

function remover_caracteres_especiais(input) {
    let valor = input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
    
    input.value = valor.toUpperCase()
}

function cpf_cnpj(input) {
    let valor_numerico = input.value.toString()
    
    for (i = (valor_numerico.length - 1); i >= 0; i--) {
        if (isNaN(valor_numerico[i]) == true || valor_numerico[i] == ' ') {
            valor_numerico = valor_numerico.replace(valor_numerico[i], '')
        }
    }

    if (valor_numerico.length < 11) {
        input.value = valor_numerico
    }

    else if (valor_numerico.length == 11) {
        valor_numerico = valor_numerico.slice(0, 3) + '.' + valor_numerico.slice(3, 6) + '.' + valor_numerico.slice(6, 9) + '-' + valor_numerico.slice(9, 11)
        input.value = valor_numerico
    }
    
    else {
        input.value = valor_numerico

        if (valor_numerico.length == 14) {
            valor_numerico = valor_numerico.slice(0, 2) + '.' + valor_numerico.slice(2, 5) + '.' + valor_numerico.slice(5, 8) + '/' + valor_numerico.slice(8, 12) + '-' +  valor_numerico.slice(12, 14)
            input.value = valor_numerico
        }
    }
}

function cep(input) {
    let valor_numerico = input.value.toString()
    
    for (i = (valor_numerico.length - 1); i >= 0; i--) {
        if (isNaN(valor_numerico[i]) == true || valor_numerico[i] == ' ') {
            valor_numerico = valor_numerico.replace(valor_numerico[i], '')
        }
    }

    if (valor_numerico.length < 8) {
        input.value = valor_numerico
    }

    if (valor_numerico.length == 8) {
        valor_numerico = valor_numerico.slice(0, 5) + '-' + valor_numerico.slice(5, 8)
        input.value = valor_numerico
    }
}

function numero_decimal(input) {
    let valor_numerico = input.value.toString()
    let digitos = []

    for (i = (valor_numerico.length - 1); i >= 0; i--) {
        if (isNaN(valor_numerico[i]) == true || valor_numerico[i] == ' ') {
            valor_numerico = valor_numerico.replace(valor_numerico[i], '')
        }
    }

    for (i = 0; i < valor_numerico.length; i++) {
        digitos[i] = valor_numerico[i]
    }
    
    let expoente = -2
    let valor = 0

    for (i = (digitos.length - 1); i >= 0; i--) {
        valor += parseFloat(parseInt(digitos[i]) * (10 ** expoente))
        expoente += 1
    }

    if (valor == 0) {
        input.value = ''
    }

    else {
        input.value = parseFloat(valor).toFixed(2).toString().replace('.', ',')
    }
}

function temperatura_nominal(input) {
    let valor_numerico = input.value.toString()
    
    for (i = (valor_numerico.length - 1); i >= 0; i--) {
        if (isNaN(valor_numerico[i]) == true || valor_numerico[i] == ' ') {
            valor_numerico = valor_numerico.replace(valor_numerico[i], '')
        }
    }

    if (valor_numerico.length < 3) {
        input.value = valor_numerico
    }

    if (valor_numerico.length >= 3) {
        valor_numerico = valor_numerico.slice(0, 2) + '±' + valor_numerico.slice(2, 3)
        input.value = valor_numerico
    }
}

function coeficiente_temperatura(input) {
    let valor_numerico = input.value.toString()
    let digitos = []

    for (i = (valor_numerico.length - 1); i >= 0; i--) {
        if (isNaN(valor_numerico[i]) == true || valor_numerico[i] == ' ') {
            valor_numerico = valor_numerico.replace(valor_numerico[i], '')
        }
    }

    for (i = 0; i < valor_numerico.length; i++) {
        digitos[i] = valor_numerico[i]
    }
    
    let expoente = -2
    let valor = 0

    for (i = (digitos.length - 1); i >= 0; i--) {
        valor += parseFloat(parseInt(digitos[i]) * (10 ** expoente))
        expoente += 1
    }

    if (valor == 0) {
        input.value = ''
    }

    else {
        input.value = parseFloat(valor * (-1)).toFixed(2).toString().replace('.', ',')
    }
}

// FUNÇÃO PARA MOSTRAR CONTEÚDO PARA USUÁRIOS AUTORIZADOS
function checar_autorizacao() {
    access_token = localStorage.getItem('access_token');
    
    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        let nomePagina = String(location.pathname.split("/").slice(-1));
        
        if (nomePagina != 'index.html') {
            iconeHome = document.getElementsByClassName('uil uil-home');
            iconeHome[0].style.visibility = 'visible';
            iconeHome[0].style.display = 'grid';
        }

        containerUsuario = document.getElementsByClassName('container-user');
        containerUsuario[0].style.visibility = 'visible';
        containerUsuario[0].style.display = 'grid';

        autorizado = document.getElementsByClassName('container-usuario-autorizado');
        autorizado[0].style.visibility = 'visible';
        autorizado[0].style.display = 'grid';
        
        naoAutorizado = document.getElementsByClassName('container-usuario-nao-autorizado');
        naoAutorizado[0].style.visibility = 'hidden';
        naoAutorizado[0].style.display = 'none';
    }

    else {
        let nomePagina = String(location.pathname.split("/").slice(-1));
        
        if (nomePagina != 'index.html') {
            iconeHome = document.getElementsByClassName('uil uil-home');
            iconeHome[0].style.visibility = 'hidden';
            iconeHome[0].style.display = 'none';
        }

        containerUsuario = document.getElementsByClassName('container-user');
        containerUsuario[0].style.visibility = 'hidden';
        containerUsuario[0].style.display = 'none';

        autorizado = document.getElementsByClassName('container-usuario-autorizado');
        autorizado[0].style.visibility = 'hidden';
        autorizado[0].style.display = 'none';

        naoAutorizado = document.getElementsByClassName('container-usuario-nao-autorizado');
        naoAutorizado[0].style.visibility = 'visible';
        naoAutorizado[0].style.display = 'grid';
        }
}

// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE CLIENTES
function buscar_cliente() {
    let divGeral = document.getElementById('container-geral');
    let divSearchClient = document.getElementById('container-search-clients');
    let divAddClient = document.getElementById('container-add-clients');
    let divSearchUpdateClient = document.getElementById('container-search-to-update-clients');
    let divUpdateClient = document.getElementById('container-update-clients');
    let divDeleteClient = document.getElementById('container-delete-clients');
    let divClientFound = document.getElementById('container-cliente-encontrado');
    let divClientAdded = document.getElementById('container-cliente-adicionado');
    let divClientUpdated = document.getElementById('container-cliente-atualizado');
    let divClientDeleted = document.getElementById('container-cliente-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-clientes');
    let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente');
    let dropDownListSearchClient = document.getElementById('numerocliente-buscar');
    let dropDownListUpdateClient = document.getElementById('numerocliente-buscar-atualizar');
    let dropDownListDeleteClient = document.getElementById('numerocliente-deletar');
    
    document.getElementById('número-cliente-buscar').value = ''

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchClient.style.visibility = "visible";
    divSearchClient.style.display = "grid";
    divAddClient.style.visibility = "hidden";
    divAddClient.style.display = "none";
    divSearchUpdateClient.style.visibility = "hidden"
    divSearchUpdateClient.style.display = "none"
    divUpdateClient.style.visibility = "hidden";
    divUpdateClient.style.display = "none";
    divDeleteClient.style.visibility = "hidden";
    divDeleteClient.style.display = "none";
    divClientFound.style.visibility = "hidden";
    divClientFound.style.display = "none";
    divClientAdded.style.visibility = "hidden";
    divClientAdded.style.display = "none";
    divClientUpdated.style.visibility = "hidden";
    divClientUpdated.style.display = "none";
    divClientDeleted.style.visibility = "hidden";
    divClientDeleted.style.display = "none";
    dropDownListSearchClient.style.display = "none";
    dropDownListUpdateClient.style.display = "none";
    dropDownListDeleteClient.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

function adicionar_cliente() {
    let divGeral = document.getElementById('container-geral');
    let divSearchClient = document.getElementById('container-search-clients');
    let divAddClient = document.getElementById('container-add-clients');
    let divSearchUpdateClient = document.getElementById('container-search-to-update-clients');
    let divUpdateClient = document.getElementById('container-update-clients');
    let divDeleteClient = document.getElementById('container-delete-clients');
    let divClientFound = document.getElementById('container-cliente-encontrado');
    let divClientAdded = document.getElementById('container-cliente-adicionado');
    let divClientUpdated = document.getElementById('container-cliente-atualizado');
    let divClientDeleted = document.getElementById('container-cliente-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-clientes');
    let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente');
    let dropDownListSearchClient = document.getElementById('numerocliente-buscar');
    let dropDownListUpdateClient = document.getElementById('numerocliente-buscar-atualizar');
    let dropDownListDeleteClient = document.getElementById('numerocliente-deletar');

    document.getElementById('número-cliente-adicionar').value = ''
    document.getElementById('número-cliente-adicionar').autofocus = false
    document.getElementById('nome-cliente-adicionar').value = ''
    document.getElementById('cpf-adicionar').value = ''
    document.getElementById('rg-adicionar').value = ''
    document.getElementById('data-nascimento-adicionar').value = ''
    document.getElementById('nome-pais-adicionar').value = ''

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchClient.style.visibility = "hidden";
    divSearchClient.style.display = "none";
    divAddClient.style.visibility = "visible";
    divAddClient.style.display = "grid";
    divSearchUpdateClient.style.visibility = "hidden"
    divSearchUpdateClient.style.display = "none"
    divUpdateClient.style.visibility = "hidden";
    divUpdateClient.style.display = "none";
    divDeleteClient.style.visibility = "hidden";
    divDeleteClient.style.display = "none";
    divClientFound.style.visibility = "hidden";
    divClientFound.style.display = "none";
    divClientAdded.style.visibility = "hidden";
    divClientAdded.style.display = "none";
    divClientUpdated.style.visibility = "hidden";
    divClientUpdated.style.display = "none";
    divClientDeleted.style.visibility = "hidden";
    divClientDeleted.style.display = "none";
    dropDownListSearchClient.style.display = "none";
    dropDownListUpdateClient.style.display = "none";
    dropDownListDeleteClient.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

function atualizar_cliente() {
    let divGeral = document.getElementById('container-geral');
    let divSearchClient = document.getElementById('container-search-clients');
    let divAddClient = document.getElementById('container-add-clients');
    let divSearchUpdateClient = document.getElementById('container-search-to-update-clients');
    let divUpdateClient = document.getElementById('container-update-clients');
    let divDeleteClient = document.getElementById('container-delete-clients');
    let divClientFound = document.getElementById('container-cliente-encontrado');
    let divClientAdded = document.getElementById('container-cliente-adicionado');
    let divClientUpdated = document.getElementById('container-cliente-atualizado');
    let divClientDeleted = document.getElementById('container-cliente-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-clientes');
    let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente');
    let dropDownListSearchClient = document.getElementById('numerocliente-buscar');
    let dropDownListUpdateClient = document.getElementById('numerocliente-buscar-atualizar');
    let dropDownListDeleteClient = document.getElementById('numerocliente-deletar');

    document.getElementById('número-cliente-buscar-atualizar').value = ''

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchClient.style.visibility = "hidden";
    divSearchClient.style.display = "none";
    divAddClient.style.visibility = "hidden";
    divAddClient.style.display = "none";
    divSearchUpdateClient.style.visibility = "visible"
    divSearchUpdateClient.style.display = "grid"
    divUpdateClient.style.visibility = "hidden";
    divUpdateClient.style.display = "none";
    divDeleteClient.style.visibility = "hidden";
    divDeleteClient.style.display = "none";
    divClientFound.style.visibility = "hidden";
    divClientFound.style.display = "none";
    divClientAdded.style.visibility = "hidden";
    divClientAdded.style.display = "none";
    divClientUpdated.style.visibility = "hidden";
    divClientUpdated.style.display = "none";
    divClientDeleted.style.visibility = "hidden";
    divClientDeleted.style.display = "none";
    dropDownListSearchClient.style.display = "none";
    dropDownListUpdateClient.style.display = "none";
    dropDownListDeleteClient.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

function mostrar_campos_atualizar_clientes() {
    let divSearchUpdateClient = document.getElementById('container-search-to-update-clients');
    let divUpdateClient = document.getElementById('container-update-clients');
    let dropDownListSearchClient = document.getElementById('numerocliente-buscar');
    let dropDownListUpdateClient = document.getElementById('numerocliente-buscar-atualizar');
    let dropDownListDeleteClient = document.getElementById('numerocliente-deletar');

    let checkboxNumeroCliente = document.getElementById('checkbox-numero-cliente')

    let divNumeroCliente = document.getElementById('container-form-numero-cliente');

    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-clientes');
    let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente');

    let numeroCliente = document.getElementById('número-cliente-buscar-atualizar').value;
    
    document.getElementById('número-cliente-atualizar').value = ''
    document.getElementById('nome-cliente-atualizar').value = ''
    document.getElementById('cpf-atualizar').value = ''
    document.getElementById('rg-atualizar').value = ''
    document.getElementById('data-nascimento-atualizar').value = ''
    document.getElementById('nome-pais-atualizar').value = ''

    if (numeroCliente != '') {
        divSearchUpdateClient.style.visibility = "hidden"
        divSearchUpdateClient.style.display = "none"
        dropDownListSearchClient.style.display = "none";
        dropDownListUpdateClient.style.display = "none";
        dropDownListDeleteClient.style.display = "none";
        divUpdateClient.style.visibility = "visible"
        divUpdateClient.style.display = "grid"

        if (checkboxNumeroCliente.checked == true) {
            divNumeroCliente.style.visibility = "visible"
            divNumeroCliente.style.display = "grid"
        }

        else {
            divNumeroCliente.style.visibility = "hidden"
            divNumeroCliente.style.display = "none"
        }

        for(i = 0; i < arrayCamposObrigatorios.length; i++) {
            arrayCamposObrigatorios[i].style.visibility = "hidden"
            arrayCamposObrigatorios[i].style.display = "none"
        }

        for(i = 0; i < arrayClienteInexistente.length; i++) {
            arrayClienteInexistente[i].style.visibility = "hidden"
            arrayClienteInexistente[i].style.display = "none"
        }
    }

    else {
        for(i = 0; i < arrayCamposObrigatorios.length; i++) {
            arrayCamposObrigatorios[i].style.visibility = "visible"
            arrayCamposObrigatorios[i].style.display = "grid"
        }
    }
}

function deletar_cliente() {
    let divGeral = document.getElementById('container-geral');
    let divSearchClient = document.getElementById('container-search-clients');
    let divAddClient = document.getElementById('container-add-clients');
    let divSearchUpdateClient = document.getElementById('container-search-to-update-clients');
    let divUpdateClient = document.getElementById('container-update-clients');
    let divDeleteClient = document.getElementById('container-delete-clients');
    let divClientFound = document.getElementById('container-cliente-encontrado');
    let divClientAdded = document.getElementById('container-cliente-adicionado');
    let divClientUpdated = document.getElementById('container-cliente-atualizado');
    let divClientDeleted = document.getElementById('container-cliente-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-clientes');
    let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente');
    let dropDownListSearchClient = document.getElementById('numerocliente-buscar');
    let dropDownListUpdateClient = document.getElementById('numerocliente-buscar-atualizar');
    let dropDownListDeleteClient = document.getElementById('numerocliente-deletar');

    document.getElementById('número-cliente-deletar').value = ''

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchClient.style.visibility = "hidden";
    divSearchClient.style.display = "none";
    divAddClient.style.visibility = "hidden";
    divAddClient.style.display = "none";
    divSearchUpdateClient.style.visibility = "hidden"
    divSearchUpdateClient.style.display = "none"
    divUpdateClient.style.visibility = "hidden";
    divUpdateClient.style.display = "none";
    divDeleteClient.style.visibility = "visible";
    divDeleteClient.style.display = "grid";
    divClientFound.style.visibility = "hidden";
    divClientFound.style.display = "none";
    divClientAdded.style.visibility = "hidden";
    divClientAdded.style.display = "none";
    divClientUpdated.style.visibility = "hidden";
    divClientUpdated.style.display = "none";
    divClientDeleted.style.visibility = "hidden";
    divClientDeleted.style.display = "none";
    dropDownListSearchClient.style.display = "none";
    dropDownListUpdateClient.style.display = "none";
    dropDownListDeleteClient.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

async function mostrar_clientes(nomeFuncao) {
    let input = document.getElementById('número-cliente-' + nomeFuncao)
    let lista = document.getElementById('numerocliente-' + nomeFuncao)
    let numeroCliente = []
    let nome = []

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    let access_token = localStorage.getItem('access_token')

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodosClientes = await axios.get(
            'http://localhost:8000/all-clients', config
        ).then(
            function (response) {
                const dadosTodosClientes = response.data;
                return dadosTodosClientes;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        if (dadosTodosClientes != 'Error: Request failed with status code 401' & dadosTodosClientes != 'Error: Request failed with status code 404') {
            for (i = 0; i < dadosTodosClientes.length; i++) {
                numeroCliente[i] = String(dadosTodosClientes[i].numero_cliente);
                nome[i] = dadosTodosClientes[i].nome.toUpperCase();
                let opcao_atual = document.createElement('option');
                let texto = document.createTextNode(numeroCliente[i] + ' - ' + nome[i])
                
                opcao_atual.value = numeroCliente[i] + ' - ' + nome[i]
                opcao_atual.appendChild(texto)
                lista.appendChild(opcao_atual)
            }
        }

        else if (dadosTodosClientes == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosClientes);
            checar_autorizacao();
        }
    }

    localStorage.setItem('nome_cliente', nome)
    localStorage.setItem('numero_cliente', numeroCliente)
    
    lista.style.display = 'grid';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split(' - ')[0];
            lista.style.display = 'none';
        }
    }
}

function filtrar_clientes(nomeFuncao) {
    let input = document.getElementById('número-cliente-' + nomeFuncao);
    let lista = document.getElementById('numerocliente-' + nomeFuncao);
    
    let nome = localStorage.getItem('nome_cliente').split(',')
    let numero_cliente = localStorage.getItem('numero_cliente').split(',')

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    for (i = 0; i < numero_cliente.length; i++) {
        let opcao_atual = document.createElement('option');
        let texto = document.createTextNode(numero_cliente[i] + ' - ' + nome[i])
        
        opcao_atual.value = numero_cliente[i] + ' - ' + nome[i]
        opcao_atual.appendChild(texto)
        lista.appendChild(opcao_atual)
    }

    let numeroCliente = input.value.toUpperCase();
    let nOpcoes = lista.options.length - 1;

    for (i = nOpcoes; i >= 0; i--) {
        if (lista.options[i].value.includes(numeroCliente) == false) {
            lista.children[i].remove()
        }
    }
}

// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE INSTALAÇÕES
function buscar_instalacao() {
    let divSearchInstalation = document.getElementById('container-search-instalations');
    let divAddInstalation = document.getElementById('container-add-instalations');
    let divSearchUpdateInstalation = document.getElementById('container-search-to-update-instalations');
    let divUpdateInstalation = document.getElementById('container-update-instalations');
    let divDeleteInstalation = document.getElementById('container-delete-instalations');
    let divInstalationFound = document.getElementById('container-instalacao-encontrada');
    let divInstalationAdded = document.getElementById('container-instalacao-adicionada');
    let divInstalationUpdated = document.getElementById('container-instalacao-atualizada');
    let divInstalationDeleted = document.getElementById('container-instalacao-deletada');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-instalacoes');
    let arrayClienteInexistente = document.getElementsByClassName('container-instalacao-inexistente');
    let dropDownListSearchInstalation = document.getElementById('numeroinstalacao-buscar');
    let dropDownListUpdateInstalation = document.getElementById('numeroinstalacao-buscar-atualizar');
    let dropDownListDeleteInstalation = document.getElementById('numeroinstalacao-deletar');
    let dropDownListAddClient = document.getElementById('numerocliente-adicionar');
    let dropDownListUpdateClient = document.getElementById('numerocliente-atualizar');
    let dropDownListAddClassification = document.getElementById('classificacaocliente-adicionar');
    let dropDownListUpdateClassification = document.getElementById('classificacaocliente-atualizar');
    
    document.getElementById('número-instalação-buscar').value = ''

    divSearchInstalation.style.visibility = "visible";
    divSearchInstalation.style.display = "grid";
    divAddInstalation.style.visibility = "hidden";
    divAddInstalation.style.display = "none";
    divSearchUpdateInstalation.style.visibility = "hidden"
    divSearchUpdateInstalation.style.display = "none"
    divUpdateInstalation.style.visibility = "hidden";
    divUpdateInstalation.style.display = "none";
    divDeleteInstalation.style.visibility = "hidden";
    divDeleteInstalation.style.display = "none";
    divInstalationFound.style.visibility = "hidden";
    divInstalationFound.style.display = "none";
    divInstalationAdded.style.visibility = "hidden";
    divInstalationAdded.style.display = "none";
    divInstalationUpdated.style.visibility = "hidden";
    divInstalationUpdated.style.display = "none";
    divInstalationDeleted.style.visibility = "hidden";
    divInstalationDeleted.style.display = "none";
    dropDownListSearchInstalation.style.display = "none";
    dropDownListUpdateInstalation.style.display = "none";
    dropDownListDeleteInstalation.style.display = "none";
    dropDownListAddClient.style.display = "none";
    dropDownListUpdateClient.style.display = "none";
    dropDownListAddClassification.style.display = "none";
    dropDownListUpdateClassification.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

function adicionar_instalacao() {
    let divSearchInstalation = document.getElementById('container-search-instalations');
    let divAddInstalation = document.getElementById('container-add-instalations');
    let divSearchUpdateInstalation = document.getElementById('container-search-to-update-instalations');
    let divUpdateInstalation = document.getElementById('container-update-instalations');
    let divDeleteInstalation = document.getElementById('container-delete-instalations');
    let divInstalationFound = document.getElementById('container-instalacao-encontrada');
    let divInstalationAdded = document.getElementById('container-instalacao-adicionada');
    let divInstalationUpdated = document.getElementById('container-instalacao-atualizada');
    let divInstalationDeleted = document.getElementById('container-instalacao-deletada');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-instalacoes');
    let arrayClienteInexistente = document.getElementsByClassName('container-instalacao-inexistente');
    let dropDownListSearchInstalation = document.getElementById('numeroinstalacao-buscar');
    let dropDownListUpdateInstalation = document.getElementById('numeroinstalacao-buscar-atualizar');
    let dropDownListDeleteInstalation = document.getElementById('numeroinstalacao-deletar');
    let dropDownListAddClient = document.getElementById('numerocliente-adicionar');
    let dropDownListUpdateClient = document.getElementById('numerocliente-atualizar');
    let dropDownListAddClassification = document.getElementById('classificacaocliente-adicionar');
    let dropDownListUpdateClassification = document.getElementById('classificacaocliente-atualizar');
        
    document.getElementById('número-instalação-adicionar').value = ''
    document.getElementById('número-cliente-adicionar').value = ''
    document.getElementById('logradouro-adicionar').value = ''
    document.getElementById('numero-predial-adicionar').value = ''
    document.getElementById('complemento-adicionar').value = ''
    document.getElementById('bairro-adicionar').value = ''
    document.getElementById('cidade-adicionar').value = ''
    document.getElementById('cep-adicionar').value = ''
    document.getElementById('classificacao-adicionar').value = ''
    document.getElementById('latitude-adicionar').value = ''
    document.getElementById('longitude-adicionar').value = ''
    document.getElementById('coordenadas-decimais-adicionar').value = ''
    
    divSearchInstalation.style.visibility = "hidden";
    divSearchInstalation.style.display = "none";
    divAddInstalation.style.visibility = "visible";
    divAddInstalation.style.display = "grid";
    divSearchUpdateInstalation.style.visibility = "hidden"
    divSearchUpdateInstalation.style.display = "none"
    divUpdateInstalation.style.visibility = "hidden";
    divUpdateInstalation.style.display = "none";
    divDeleteInstalation.style.visibility = "hidden";
    divDeleteInstalation.style.display = "none";
    divInstalationFound.style.visibility = "hidden";
    divInstalationFound.style.display = "none";
    divInstalationAdded.style.visibility = "hidden";
    divInstalationAdded.style.display = "none";
    divInstalationUpdated.style.visibility = "hidden";
    divInstalationUpdated.style.display = "none";
    divInstalationDeleted.style.visibility = "hidden";
    divInstalationDeleted.style.display = "none";
    dropDownListSearchInstalation.style.display = "none";
    dropDownListUpdateInstalation.style.display = "none";
    dropDownListDeleteInstalation.style.display = "none";
    dropDownListAddClient.style.display = "none";
    dropDownListUpdateClient.style.display = "none";
    dropDownListAddClassification.style.display = "none";
    dropDownListUpdateClassification.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

function mostrar_campos_atualizar_instalacoes() {
    let divSearchUpdateInstalation = document.getElementById('container-search-to-update-instalations');
    let divUpdateInstalation = document.getElementById('container-update-instalations');
    let dropDownListSearchInstalation = document.getElementById('numeroinstalacao-buscar');
    let dropDownListUpdateInstalation = document.getElementById('numeroinstalacao-buscar-atualizar');
    let dropDownListDeleteInstalation = document.getElementById('numeroinstalacao-deletar');
    let dropDownListAddClient = document.getElementById('numerocliente-adicionar');
    let dropDownListUpdateClient = document.getElementById('numerocliente-atualizar');
    let dropDownListAddClassification = document.getElementById('classificacaocliente-adicionar');
    let dropDownListUpdateClassification = document.getElementById('classificacaocliente-atualizar');


    let checkboxNumeroInstalacao = document.getElementById('checkbox-numero-instalacao')

    let divNumeroInstalacao = document.getElementById('container-form-numero-instalacao');

    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-instalacoes');
    let arrayClienteInexistente = document.getElementsByClassName('container-instalacao-inexistente');

    let numeroInstalacao = document.getElementById('número-instalação-buscar-atualizar').value;
    
    document.getElementById('número-instalação-atualizar').value = ''
    document.getElementById('número-cliente-atualizar').value = ''
    document.getElementById('logradouro-atualizar').value = ''
    document.getElementById('numero-predial-atualizar').value = ''
    document.getElementById('complemento-atualizar').value = ''
    document.getElementById('bairro-atualizar').value = ''
    document.getElementById('cidade-atualizar').value = ''
    document.getElementById('cep-atualizar').value = ''
    document.getElementById('classificacao-atualizar').value = ''
    document.getElementById('latitude-atualizar').value = ''
    document.getElementById('longitude-atualizar').value = ''
    document.getElementById('coordenadas-decimais-atualizar').value = ''

    if (numeroInstalacao != '') {
        divSearchUpdateInstalation.style.visibility = "hidden"
        divSearchUpdateInstalation.style.display = "none"
        dropDownListSearchInstalation.style.display = "none";
        dropDownListUpdateInstalation.style.display = "none";
        dropDownListDeleteInstalation.style.display = "none";
        dropDownListAddClient.style.display = "none";
        dropDownListUpdateClient.style.display = "none";
        dropDownListAddClassification.style.display = "none";
        dropDownListUpdateClassification.style.display = "none";
        divUpdateInstalation.style.visibility = "visible"
        divUpdateInstalation.style.display = "grid"

        if (checkboxNumeroInstalacao.checked == true) {
            divNumeroInstalacao.style.visibility = "visible"
            divNumeroInstalacao.style.display = "grid"
        }

        else {
            divNumeroInstalacao.style.visibility = "hidden"
            divNumeroInstalacao.style.display = "none"
        }

        for(i = 0; i < arrayCamposObrigatorios.length; i++) {
            arrayCamposObrigatorios[i].style.visibility = "hidden"
            arrayCamposObrigatorios[i].style.display = "none"
        }

        for(i = 0; i < arrayClienteInexistente.length; i++) {
            arrayClienteInexistente[i].style.visibility = "hidden"
            arrayClienteInexistente[i].style.display = "none"
        }
    }

    else {
        for(i = 0; i < arrayCamposObrigatorios.length; i++) {
            arrayCamposObrigatorios[i].style.visibility = "visible"
            arrayCamposObrigatorios[i].style.display = "grid"
        }
    }
}

function atualizar_instalacao() {
    let divSearchInstalation = document.getElementById('container-search-instalations');
    let divAddInstalation = document.getElementById('container-add-instalations');
    let divSearchUpdateInstalation = document.getElementById('container-search-to-update-instalations');
    let divUpdateInstalation = document.getElementById('container-update-instalations');
    let divDeleteInstalation = document.getElementById('container-delete-instalations');
    let divInstalationFound = document.getElementById('container-instalacao-encontrada');
    let divInstalationAdded = document.getElementById('container-instalacao-adicionada');
    let divInstalationUpdated = document.getElementById('container-instalacao-atualizada');
    let divInstalationDeleted = document.getElementById('container-instalacao-deletada');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-instalacoes');
    let arrayClienteInexistente = document.getElementsByClassName('container-instalacao-inexistente');
    let dropDownListSearchInstalation = document.getElementById('numeroinstalacao-buscar');
    let dropDownListUpdateInstalation = document.getElementById('numeroinstalacao-buscar-atualizar');
    let dropDownListDeleteInstalation = document.getElementById('numeroinstalacao-deletar');
    let dropDownListAddClient = document.getElementById('numerocliente-adicionar');
    let dropDownListUpdateClient = document.getElementById('numerocliente-atualizar');
    let dropDownListAddClassification = document.getElementById('classificacaocliente-adicionar');
    let dropDownListUpdateClassification = document.getElementById('classificacaocliente-atualizar');

    document.getElementById('número-instalação-buscar-atualizar').value = ''

    divSearchInstalation.style.visibility = "hidden";
    divSearchInstalation.style.display = "none";
    divAddInstalation.style.visibility = "hidden";
    divAddInstalation.style.display = "none";
    divSearchUpdateInstalation.style.visibility = "visible"
    divSearchUpdateInstalation.style.display = "grid"
    divUpdateInstalation.style.visibility = "hidden";
    divUpdateInstalation.style.display = "none";
    divDeleteInstalation.style.visibility = "hidden";
    divDeleteInstalation.style.display = "none";
    divInstalationFound.style.visibility = "hidden";
    divInstalationFound.style.display = "none";
    divInstalationAdded.style.visibility = "hidden";
    divInstalationAdded.style.display = "none";
    divInstalationUpdated.style.visibility = "hidden";
    divInstalationUpdated.style.display = "none";
    divInstalationDeleted.style.visibility = "hidden";
    divInstalationDeleted.style.display = "none";
    dropDownListSearchInstalation.style.display = "none";
    dropDownListUpdateInstalation.style.display = "none";
    dropDownListDeleteInstalation.style.display = "none";
    dropDownListAddClient.style.display = "none";
    dropDownListUpdateClient.style.display = "none";
    dropDownListAddClassification.style.display = "none";
    dropDownListUpdateClassification.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

function deletar_instalacao() {
    let divSearchInstalation = document.getElementById('container-search-instalations');
    let divAddInstalation = document.getElementById('container-add-instalations');
    let divSearchUpdateInstalation = document.getElementById('container-search-to-update-instalations');
    let divUpdateInstalation = document.getElementById('container-update-instalations');
    let divDeleteInstalation = document.getElementById('container-delete-instalations');
    let divInstalationFound = document.getElementById('container-instalacao-encontrada');
    let divInstalationAdded = document.getElementById('container-instalacao-adicionada');
    let divInstalationUpdated = document.getElementById('container-instalacao-atualizada');
    let divInstalationDeleted = document.getElementById('container-instalacao-deletada');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-instalacoes');
    let arrayClienteInexistente = document.getElementsByClassName('container-instalacao-inexistente');
    let dropDownListSearchInstalation = document.getElementById('numeroinstalacao-buscar');
    let dropDownListUpdateInstalation = document.getElementById('numeroinstalacao-buscar-atualizar');
    let dropDownListDeleteInstalation = document.getElementById('numeroinstalacao-deletar');
    let dropDownListAddClient = document.getElementById('numerocliente-adicionar');
    let dropDownListUpdateClient = document.getElementById('numerocliente-atualizar');
    let dropDownListAddClassification = document.getElementById('classificacaocliente-adicionar');
    let dropDownListUpdateClassification = document.getElementById('classificacaocliente-atualizar');

    document.getElementById('número-instalação-deletar').value = ''

    divSearchInstalation.style.visibility = "hidden";
    divSearchInstalation.style.display = "none";
    divAddInstalation.style.visibility = "hidden";
    divAddInstalation.style.display = "none";
    divSearchUpdateInstalation.style.visibility = "hidden"
    divSearchUpdateInstalation.style.display = "none"
    divUpdateInstalation.style.visibility = "hidden";
    divUpdateInstalation.style.display = "none";
    divDeleteInstalation.style.visibility = "visible";
    divDeleteInstalation.style.display = "grid";
    divInstalationFound.style.visibility = "hidden";
    divInstalationFound.style.display = "none";
    divInstalationAdded.style.visibility = "hidden";
    divInstalationAdded.style.display = "none";
    divInstalationUpdated.style.visibility = "hidden";
    divInstalationUpdated.style.display = "none";
    divInstalationDeleted.style.visibility = "hidden";
    divInstalationDeleted.style.display = "none";
    dropDownListSearchInstalation.style.display = "none";
    dropDownListUpdateInstalation.style.display = "none";
    dropDownListDeleteInstalation.style.display = "none";
    dropDownListAddClient.style.display = "none";
    dropDownListUpdateClient.style.display = "none";
    dropDownListAddClassification.style.display = "none";
    dropDownListUpdateClassification.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

function ligacao_nova() {
    let estadoLigacao = document.getElementById('checkbox-ligacao').checked;
    let arrayCheckbox = document.getElementsByClassName('form-checkbox-aumento-usina');
    let arrayContainer = document.getElementsByClassName('container-modulo-2')
    
    if (estadoLigacao == true) {
        document.getElementById('checkbox-aumento-carga-1').checked = false;
        document.getElementById('checkbox-aumento-usina-1').checked = false;

        document.getElementById('container-numero-instalacao-1').style.visibility = "hidden";
        document.getElementById('container-numero-instalacao-1').style.display = "none";
        document.getElementById('container-aumento-carga-1').style.visibility = "hidden";
        document.getElementById('container-aumento-carga-1').style.display = "none";

        for (let i = 0; i < arrayCheckbox.length; i++) {
            arrayCheckbox[i].style.visibility = "hidden"
        }

        for (let i = 0; i < arrayContainer.length; i++) {
            arrayContainer[i].style.visibility = "hidden"
            arrayContainer[i].style.display = "none"
        }
    }

    else if(estadoLigacao == false) {
        document.getElementById('container-numero-instalacao-1').style.visibility = "visible";
        document.getElementById('container-numero-instalacao-1').style.display = "grid";
    }
}

async function mostrar_instalacoes(nomeFuncao) {
    let input = document.getElementById('número-instalação-' + nomeFuncao)
    let lista = document.getElementById('numeroinstalacao-' + nomeFuncao)
    let numeroInstalacao = []
    let endereco = []

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    let access_token = localStorage.getItem('access_token')

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodasInstalacoes = await axios.get(
            'http://localhost:8000/all-instalations', config
        ).then(
            function (response) {
                const dadosTodasInstalacoes = response.data;
                return dadosTodasInstalacoes;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        if (dadosTodasInstalacoes != 'Error: Request failed with status code 401' & dadosTodasInstalacoes != 'Error: Request failed with status code 404') {
            for (i = 0; i < dadosTodasInstalacoes.length; i++) {
                numeroInstalacao[i] = String(dadosTodasInstalacoes[i].numero_instalacao);
                endereco[i] = dadosTodasInstalacoes[i].logradouro + ', ' + String(dadosTodasInstalacoes[i].numero_predial) + ' ' + dadosTodasInstalacoes[i].complemento + ', ' + dadosTodasInstalacoes[i].bairro + ', ' + dadosTodasInstalacoes[i].cidade;
                let opcao_atual = document.createElement('option');
                let texto = document.createTextNode(numeroInstalacao[i] + ' - ' + endereco[i])
                
                opcao_atual.value = numeroInstalacao[i] + ' - ' + endereco[i]
                opcao_atual.appendChild(texto)
                lista.appendChild(opcao_atual)
            }
        }

        else if (dadosTodasInstalacoes == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodasInstalacoes);
            checar_autorizacao();
        }
    }

    localStorage.setItem('endereco', endereco.join('///'))
    localStorage.setItem('numero_instalacao', numeroInstalacao)
    
    lista.style.display = 'grid';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split(' - ')[0];
            lista.style.display = 'none';
        }
    }
}

function filtrar_instalacoes(nomeFuncao) {
    let input = document.getElementById('número-instalação-' + nomeFuncao);
    let lista = document.getElementById('numeroinstalacao-' + nomeFuncao);
    
    let endereco = localStorage.getItem('endereco').split('///')
    let numero_instalacao = localStorage.getItem('numero_instalacao').split(',')

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    for (i = 0; i < numero_instalacao.length; i++) {
        let opcao_atual = document.createElement('option');
        let texto = document.createTextNode(numero_instalacao[i] + ' - ' + endereco[i])
        
        opcao_atual.value = numero_instalacao[i] + ' - ' + endereco[i]
        opcao_atual.appendChild(texto)
        lista.appendChild(opcao_atual)
    }

    let numeroInstalacao = input.value.toUpperCase();
    let nOpcoes = lista.options.length - 1;

    for (i = nOpcoes; i >= 0; i--) {
        if (lista.options[i].value.includes(numeroInstalacao) == false) {
            lista.children[i].remove()
        }
    }
}

function mostrar_classificacoes(nomeFuncao) {
    let input = document.getElementById('classificacao-' + nomeFuncao)
    let lista = document.getElementById('classificacaocliente-' + nomeFuncao)

    lista.style.display = 'block';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE MÓDULOS
function buscar_modulo() {
    let divGeral = document.getElementById('container-geral');
    let divSearchModule = document.getElementById('container-search-modules');
    let divAddModule = document.getElementById('container-add-modules-general');
    let divSearchUpdateModule = document.getElementById('container-search-to-update-modules');
    let divUpdateModule = document.getElementById('container-update-modules-general');
    let divDeleteModule = document.getElementById('container-delete-modules');
    let divModuleFound = document.getElementById('container-modulo-encontrado');
    let divModuleAdded = document.getElementById('container-modulo-adicionado');
    let divModuleUpdated = document.getElementById('container-modulo-atualizado');
    let divModuleDeleted = document.getElementById('container-modulo-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-modulos');
    let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente');
    let dropDownListSearchModule = document.getElementById('modelomodulo-buscar');
    let dropDownListUpdateModule = document.getElementById('modelomodulo-buscar-atualizar');
    let dropDownListDeleteModule = document.getElementById('modelomodulo-deletar');
    let dropDownListAddType = document.getElementById('tipomodulo-adicionar');
    let dropDownListUpdateType = document.getElementById('tipomodulo-atualizar');

            
    document.getElementById('modelo-módulo-buscar').value = ''
    
    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchModule.style.visibility = "visible";
    divSearchModule.style.display = "grid";
    divAddModule.style.visibility = "hidden";
    divAddModule.style.display = "none";
    divSearchUpdateModule.style.visibility = "hidden"
    divSearchUpdateModule.style.display = "none"
    divUpdateModule.style.visibility = "hidden";
    divUpdateModule.style.display = "none";
    divDeleteModule.style.visibility = "hidden";
    divDeleteModule.style.display = "none";
    divModuleFound.style.visibility = "hidden";
    divModuleFound.style.display = "none";
    divModuleAdded.style.visibility = "hidden";
    divModuleAdded.style.display = "none";
    divModuleUpdated.style.visibility = "hidden";
    divModuleUpdated.style.display = "none";
    divModuleDeleted.style.visibility = "hidden";
    divModuleDeleted.style.display = "none";
    dropDownListSearchModule.style.display = "none";
    dropDownListUpdateModule.style.display = "none";
    dropDownListDeleteModule.style.display = "none";
    dropDownListAddType.style.display = "none";
    dropDownListUpdateType.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

function adicionar_modulo() {
    let divGeral = document.getElementById('container-geral');
    let divSearchModule = document.getElementById('container-search-modules');
    let divAddModule = document.getElementById('container-add-modules-general');
    let divSearchUpdateModule = document.getElementById('container-search-to-update-modules');
    let divUpdateModule = document.getElementById('container-update-modules-general');
    let divDeleteModule = document.getElementById('container-delete-modules');
    let divModuleFound = document.getElementById('container-modulo-encontrado');
    let divModuleAdded = document.getElementById('container-modulo-adicionado');
    let divModuleUpdated = document.getElementById('container-modulo-atualizado');
    let divModuleDeleted = document.getElementById('container-modulo-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-modulos');
    let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente');
    let dropDownListSearchModule = document.getElementById('modelomodulo-buscar');
    let dropDownListUpdateModule = document.getElementById('modelomodulo-buscar-atualizar');
    let dropDownListDeleteModule = document.getElementById('modelomodulo-deletar');
    let dropDownListAddType = document.getElementById('tipomodulo-adicionar');
    let dropDownListUpdateType = document.getElementById('tipomodulo-atualizar');
            
    document.getElementById('modelo-módulo-adicionar').value = ''
    document.getElementById('fabricante-módulo-adicionar').value = ''
    document.getElementById('potência-módulo-adicionar').value = ''
    document.getElementById('imp-módulo-adicionar').value = ''
    document.getElementById('isc-módulo-adicionar').value = ''
    document.getElementById('vmp-módulo-adicionar').value = ''
    document.getElementById('voc-módulo-adicionar').value = ''
    document.getElementById('comprimento-módulo-adicionar').value = ''
    document.getElementById('largura-módulo-adicionar').value = ''
    document.getElementById('espessura-módulo-adicionar').value = ''
    document.getElementById('eficiência-módulo-adicionar').value = ''
    document.getElementById('temperatura-módulo-adicionar').value = ''
    document.getElementById('tipo-módulo-adicionar').value = ''
    document.getElementById('coeficiente-módulo-adicionar').value = ''
    
    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchModule.style.visibility = "hidden";
    divSearchModule.style.display = "none";
    divAddModule.style.visibility = "visible";
    divAddModule.style.display = "grid";
    divSearchUpdateModule.style.visibility = "hidden"
    divSearchUpdateModule.style.display = "none"
    divUpdateModule.style.visibility = "hidden";
    divUpdateModule.style.display = "none";
    divDeleteModule.style.visibility = "hidden";
    divDeleteModule.style.display = "none";
    divModuleFound.style.visibility = "hidden";
    divModuleFound.style.display = "none";
    divModuleAdded.style.visibility = "hidden";
    divModuleAdded.style.display = "none";
    divModuleUpdated.style.visibility = "hidden";
    divModuleUpdated.style.display = "none";
    divModuleDeleted.style.visibility = "hidden";
    divModuleDeleted.style.display = "none";
    dropDownListSearchModule.style.display = "none";
    dropDownListUpdateModule.style.display = "none";
    dropDownListDeleteModule.style.display = "none";
    dropDownListAddType.style.display = "none";
    dropDownListUpdateType.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

function atualizar_modulo() {
    let divGeral = document.getElementById('container-geral');
    let divSearchModule = document.getElementById('container-search-modules');
    let divAddModule = document.getElementById('container-add-modules-general');
    let divSearchUpdateModule = document.getElementById('container-search-to-update-modules');
    let divUpdateModule = document.getElementById('container-update-modules-general');
    let divDeleteModule = document.getElementById('container-delete-modules');
    let divModuleFound = document.getElementById('container-modulo-encontrado');
    let divModuleAdded = document.getElementById('container-modulo-adicionado');
    let divModuleUpdated = document.getElementById('container-modulo-atualizado');
    let divModuleDeleted = document.getElementById('container-modulo-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-modulos');
    let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente');
    let dropDownListSearchModule = document.getElementById('modelomodulo-buscar');
    let dropDownListUpdateModule = document.getElementById('modelomodulo-buscar-atualizar');
    let dropDownListDeleteModule = document.getElementById('modelomodulo-deletar');
    let dropDownListAddType = document.getElementById('tipomodulo-adicionar');
    let dropDownListUpdateType = document.getElementById('tipomodulo-atualizar');

    
    document.getElementById('modelo-módulo-buscar-atualizar').value = ''
    document.getElementById('modelo-módulo-atualizar').value = ''
    document.getElementById('fabricante-módulo-atualizar').value = ''
    document.getElementById('potência-módulo-atualizar').value = ''
    document.getElementById('imp-módulo-atualizar').value = ''
    document.getElementById('isc-módulo-atualizar').value = ''
    document.getElementById('vmp-módulo-atualizar').value = ''
    document.getElementById('voc-módulo-atualizar').value = ''
    document.getElementById('comprimento-módulo-atualizar').value = ''
    document.getElementById('largura-módulo-atualizar').value = ''
    document.getElementById('espessura-módulo-atualizar').value = ''
    document.getElementById('eficiência-módulo-atualizar').value = ''
    document.getElementById('temperatura-módulo-atualizar').value = ''
    document.getElementById('tipo-módulo-atualizar').value = ''
    document.getElementById('coeficiente-módulo-atualizar').value = ''
    
    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchModule.style.visibility = "hidden";
    divSearchModule.style.display = "none";
    divAddModule.style.visibility = "hidden";
    divAddModule.style.display = "none";
    divSearchUpdateModule.style.visibility = "visible"
    divSearchUpdateModule.style.display = "grid"
    divUpdateModule.style.visibility = "hidden";
    divUpdateModule.style.display = "none";
    divDeleteModule.style.visibility = "hidden";
    divDeleteModule.style.display = "none";
    divModuleFound.style.visibility = "hidden";
    divModuleFound.style.display = "none";
    divModuleAdded.style.visibility = "hidden";
    divModuleAdded.style.display = "none";
    divModuleUpdated.style.visibility = "hidden";
    divModuleUpdated.style.display = "none";
    divModuleDeleted.style.visibility = "hidden";
    divModuleDeleted.style.display = "none";
    dropDownListSearchModule.style.display = "none";
    dropDownListUpdateModule.style.display = "none";
    dropDownListDeleteModule.style.display = "none";
    dropDownListAddType.style.display = "none";
    dropDownListUpdateType.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

function mostrar_campos_atualizar_modulos() {
    let divSearchUpdateModule = document.getElementById('container-search-to-update-modules');
    let divUpdateModule = document.getElementById('container-update-modules-general');
    let dropDownListSearchModule = document.getElementById('modelomodulo-buscar');
    let dropDownListUpdateModule = document.getElementById('modelomodulo-buscar-atualizar');
    let dropDownListDeleteModule = document.getElementById('modelomodulo-deletar');
    let dropDownListAddType = document.getElementById('tipomodulo-adicionar');
    let dropDownListUpdateType = document.getElementById('tipomodulo-atualizar');

    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-modulos');
    let arrayModuloInexistente = document.getElementsByClassName('container-modulo-inexistente');

    let modelo = document.getElementById('modelo-módulo-buscar-atualizar').value;
    
    document.getElementById('modelo-módulo-atualizar').value = ''
    document.getElementById('fabricante-módulo-atualizar').value = ''
    document.getElementById('potência-módulo-atualizar').value = ''
    document.getElementById('imp-módulo-atualizar').value = ''
    document.getElementById('isc-módulo-atualizar').value = ''
    document.getElementById('vmp-módulo-atualizar').value = ''
    document.getElementById('voc-módulo-atualizar').value = ''
    document.getElementById('comprimento-módulo-atualizar').value = ''
    document.getElementById('largura-módulo-atualizar').value = ''
    document.getElementById('espessura-módulo-atualizar').value = ''
    document.getElementById('eficiência-módulo-atualizar').value = ''
    document.getElementById('temperatura-módulo-atualizar').value = ''
    document.getElementById('tipo-módulo-atualizar').value = ''
    document.getElementById('coeficiente-módulo-atualizar').value = ''
    
    if (modelo != '') {
        divSearchUpdateModule.style.visibility = "hidden"
        divSearchUpdateModule.style.display = "none"
        dropDownListSearchModule.style.display = "none";
        dropDownListUpdateModule.style.display = "none";
        dropDownListDeleteModule.style.display = "none";
        dropDownListAddType.style.display = "none";
        dropDownListUpdateType.style.display = "none";
        divUpdateModule.style.visibility = "visible"
        divUpdateModule.style.display = "grid"

        for(i = 0; i < arrayCamposObrigatorios.length; i++) {
            arrayCamposObrigatorios[i].style.visibility = "hidden"
            arrayCamposObrigatorios[i].style.display = "none"
        }

        for(i = 0; i < arrayModuloInexistente.length; i++) {
            arrayModuloInexistente[i].style.visibility = "hidden"
            arrayModuloInexistente[i].style.display = "none"
        }
    }

    else {
        for(i = 0; i < arrayCamposObrigatorios.length; i++) {
            arrayCamposObrigatorios[i].style.visibility = "visible"
            arrayCamposObrigatorios[i].style.display = "grid"
        }
    }
}

function deletar_modulo() {
    let divGeral = document.getElementById('container-geral');
    let divSearchModule = document.getElementById('container-search-modules');
    let divAddModule = document.getElementById('container-add-modules-general');
    let divSearchUpdateModule = document.getElementById('container-search-to-update-modules');
    let divUpdateModule = document.getElementById('container-update-modules-general');
    let divDeleteModule = document.getElementById('container-delete-modules');
    let divModuleFound = document.getElementById('container-modulo-encontrado');
    let divModuleAdded = document.getElementById('container-modulo-adicionado');
    let divModuleUpdated = document.getElementById('container-modulo-atualizado');
    let divModuleDeleted = document.getElementById('container-modulo-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-modulos');
    let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente');
    let dropDownListSearchModule = document.getElementById('modelomodulo-buscar');
    let dropDownListUpdateModule = document.getElementById('modelomodulo-buscar-atualizar');
    let dropDownListDeleteModule = document.getElementById('modelomodulo-deletar');
    let dropDownListAddType = document.getElementById('tipomodulo-adicionar');
    let dropDownListUpdateType = document.getElementById('tipomodulo-atualizar');
       
    document.getElementById('modelo-módulo-deletar').value = ''

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchModule.style.visibility = "hidden";
    divSearchModule.style.display = "none";
    divAddModule.style.visibility = "hidden";
    divAddModule.style.display = "none";
    divSearchUpdateModule.style.visibility = "hidden"
    divSearchUpdateModule.style.display = "none"
    divUpdateModule.style.visibility = "hidden";
    divUpdateModule.style.display = "none";
    divDeleteModule.style.visibility = "visible";
    divDeleteModule.style.display = "grid";
    divModuleFound.style.visibility = "hidden";
    divModuleFound.style.display = "none";
    divModuleAdded.style.visibility = "hidden";
    divModuleAdded.style.display = "none";
    divModuleUpdated.style.visibility = "hidden";
    divModuleUpdated.style.display = "none";
    divModuleDeleted.style.visibility = "hidden";
    divModuleDeleted.style.display = "none";
    dropDownListSearchModule.style.display = "none";
    dropDownListUpdateModule.style.display = "none";
    dropDownListDeleteModule.style.display = "none";
    dropDownListAddType.style.display = "none";
    dropDownListUpdateType.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayClienteInexistente.length; i++) {
        arrayClienteInexistente[i].style.visibility = "hidden"
        arrayClienteInexistente[i].style.display = "none"
    }
}

async function mostrar_modulos(nomeFuncao) {
    let input = document.getElementById('modelo-módulo-' + nomeFuncao)
    let lista = document.getElementById('modelomodulo-' + nomeFuncao)
    let id = []
    let modelo = []
    let fabricante = []
    let potencia = []

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    let access_token = localStorage.getItem('access_token')

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodosModulos = await axios.get(
            'http://localhost:8000/all-modules', config
        ).then(
            function (response) {
                const dadosTodosModulos = response.data;
                return dadosTodosModulos;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        if (dadosTodosModulos != 'Error: Request failed with status code 401' & dadosTodosModulos != 'Error: Request failed with status code 404') {
            for (i = 0; i < dadosTodosModulos.length; i++) {
                id[i] = String(dadosTodosModulos[i].id);
                modelo[i] = dadosTodosModulos[i].modelo;
                fabricante[i] = dadosTodosModulos[i].fabricante;
                potencia[i] = String(dadosTodosModulos[i].potencia) + ' Wp'

                let opcao_atual = document.createElement('option');
                let texto = document.createTextNode('ID #' + id[i] + ' - Fabricante: ' + fabricante[i] + ' - Potência: ' + potencia[i] + ' - Modelo: ' + modelo[i])
                
                opcao_atual.value = 'ID #' + id[i] + ' - Fabricante: ' + fabricante[i] + ' - Potência: ' + potencia[i] + ' - Modelo: ' + modelo[i]
                opcao_atual.appendChild(texto)
                lista.appendChild(opcao_atual)
            }
        }

        else if (dadosTodosModulos == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosModulos);
            checar_autorizacao();
        }
    }

    localStorage.setItem('id_modulo', id)
    localStorage.setItem('modelo_modulo', modelo)
    localStorage.setItem('fabricante_modulo', fabricante)
    localStorage.setItem('potencia_modulo', potencia)
    
    lista.style.display = 'grid';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split('ID #')[1].split(' - ')[0];
            lista.style.display = 'none';
        }
    }
}

function filtrar_modulos(nomeFuncao) {
    let input = document.getElementById('modelo-módulo-' + nomeFuncao);
    let lista = document.getElementById('modelomodulo-' + nomeFuncao);
    
    let id = localStorage.getItem('id_modulo').split(',')
    let modelo = localStorage.getItem('modelo_modulo').split(',')
    let fabricante = localStorage.getItem('fabricante_modulo').split(',')
    let potencia = localStorage.getItem('potencia_modulo').split(',')

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    for (i = 0; i < id.length; i++) {
        let opcao_atual = document.createElement('option');
        let texto = document.createTextNode('ID #' + id[i] + ' - Fabricante: ' + fabricante[i] + ' - Potência: ' + potencia[i] + ' - Modelo: ' + modelo[i])
        
        opcao_atual.value = 'ID #' + id[i] + ' - Fabricante: ' + fabricante[i] + ' - Potência: ' + potencia[i] + ' - Modelo: ' + modelo[i]
        opcao_atual.appendChild(texto)
        lista.appendChild(opcao_atual)
    }

    let idModulo = input.value.toUpperCase();
    let nOpcoes = lista.options.length - 1;

    for (i = nOpcoes; i >= 0; i--) {
        if (lista.options[i].value.includes(idModulo) == false) {
            lista.children[i].remove()
        }
    }
}

function mostrar_tipos(nomeFuncao) {
    let input = document.getElementById('tipo-módulo-' + nomeFuncao)
    let lista = document.getElementById('tipomodulo-' + nomeFuncao)

    lista.style.display = 'block';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE INVERSORES
function buscar_inversor() {
    let divSearchInverter = document.getElementById('container-search-inverters');
    let divAddInverter = document.getElementById('container-add-inverters-general');
    let divUpdateInverter = document.getElementById('container-update-inverters-general');
    let divDeleteInverter = document.getElementById('container-delete-inverters');
    
    divSearchInverter.style.visibility = "visible";
    divSearchInverter.style.display = "grid";
    divAddInverter.style.visibility = "hidden";
    divAddInverter.style.display = "none";
    divUpdateInverter.style.visibility = "hidden";
    divUpdateInverter.style.display = "none";
    divDeleteInverter.style.visibility = "hidden";
    divDeleteInverter.style.display = "none";
}

function adicionar_inversor() {
    let divSearchInverter = document.getElementById('container-search-inverters');
    let divAddInverter = document.getElementById('container-add-inverters-general');
    let divUpdateInverter = document.getElementById('container-update-inverters-general');
    let divDeleteInverter = document.getElementById('container-delete-inverters');
    
    divSearchInverter.style.visibility = "hidden";
    divSearchInverter.style.display = "none";
    divAddInverter.style.visibility = "visible";
    divAddInverter.style.display = "grid";
    divUpdateInverter.style.visibility = "hidden";
    divUpdateInverter.style.display = "none";
    divDeleteInverter.style.visibility = "hidden";
    divDeleteInverter.style.display = "none";
}

function atualizar_inversor() {
    let divSearchInverter = document.getElementById('container-search-inverters');
    let divAddInverter = document.getElementById('container-add-inverters-general');
    let divUpdateInverter = document.getElementById('container-update-inverters-general');
    let divDeleteInverter = document.getElementById('container-delete-inverters');
    
    divSearchInverter.style.visibility = "hidden";
    divSearchInverter.style.display = "none";
    divAddInverter.style.visibility = "hidden";
    divAddInverter.style.display = "none";
    divUpdateInverter.style.visibility = "visible";
    divUpdateInverter.style.display = "grid";
    divDeleteInverter.style.visibility = "hidden";
    divDeleteInverter.style.display = "none";
}

function deletar_inversor() {
    let divSearchInverter = document.getElementById('container-search-inverters');
    let divAddInverter = document.getElementById('container-add-inverters-general');
    let divUpdateInverter = document.getElementById('container-update-inverters-general');
    let divDeleteInverter = document.getElementById('container-delete-inverters');
    
    divSearchInverter.style.visibility = "hidden";
    divSearchInverter.style.display = "none";
    divAddInverter.style.visibility = "hidden";
    divAddInverter.style.display = "none";
    divUpdateInverter.style.visibility = "hidden";
    divUpdateInverter.style.display = "none";
    divDeleteInverter.style.visibility = "visible";
    divDeleteInverter.style.display = "grid";
}

// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE PROJETOS
function buscar_projeto() {
    let divSearchProject = document.getElementById('container-search-projects');
    let divAddProject = document.getElementById('container-add-projects-general');
    let divUpdateProject = document.getElementById('container-update-projects-general');
    let divDeleteProject = document.getElementById('container-delete-projects');
    
    divSearchProject.style.visibility = "visible";
    divSearchProject.style.display = "grid";
    divAddProject.style.visibility = "hidden";
    divAddProject.style.display = "none";
    divUpdateProject.style.visibility = "hidden";
    divUpdateProject.style.display = "none";
    divDeleteProject.style.visibility = "hidden";
    divDeleteProject.style.display = "none";
}

function adicionar_projeto() {
    let divSearchProject = document.getElementById('container-search-projects');
    let divAddProject = document.getElementById('container-add-projects-general');
    let divUpdateProject = document.getElementById('container-update-projects-general');
    let divDeleteProject = document.getElementById('container-delete-projects');
    
    divSearchProject.style.visibility = "hidden";
    divSearchProject.style.display = "none";
    divAddProject.style.visibility = "visible";
    divAddProject.style.display = "grid";
    divUpdateProject.style.visibility = "hidden";
    divUpdateProject.style.display = "none";
    divDeleteProject.style.visibility = "hidden";
    divDeleteProject.style.display = "none";
}

function atualizar_projeto() {
    let divSearchProject = document.getElementById('container-search-projects');
    let divAddProject = document.getElementById('container-add-projects-general');
    let divUpdateProject = document.getElementById('container-update-projects-general');
    let divDeleteProject = document.getElementById('container-delete-projects');
    
    divSearchProject.style.visibility = "hidden";
    divSearchProject.style.display = "none";
    divAddProject.style.visibility = "hidden";
    divAddProject.style.display = "none";
    divUpdateProject.style.visibility = "visible";
    divUpdateProject.style.display = "grid";
    divDeleteProject.style.visibility = "hidden";
    divDeleteProject.style.display = "none";
}

function deletar_projeto() {
    let divSearchProject = document.getElementById('container-search-projects');
    let divAddProject = document.getElementById('container-add-projects-general');
    let divUpdateProject = document.getElementById('container-update-projects-general');
    let divDeleteProject = document.getElementById('container-delete-projects');
    
    divSearchProject.style.visibility = "hidden";
    divSearchProject.style.display = "none";
    divAddProject.style.visibility = "hidden";
    divAddProject.style.display = "none";
    divUpdateProject.style.visibility = "hidden";
    divUpdateProject.style.display = "none";
    divDeleteProject.style.visibility = "visible";
    divDeleteProject.style.display = "grid";
}

// FUNÇÕES PARA A PÁGINA DE PROJETOS
function ligacao_nova1() {
    let estadoLigacao1 = document.getElementById('checkbox-ligacao-1').checked;
    let arrayCheckbox = document.getElementsByClassName('form-checkbox-aumento-usina');
    let arrayContainer = document.getElementsByClassName('container-modulo-2')
    
    if (estadoLigacao1 == true) {
        document.getElementById('checkbox-aumento-carga-1').checked = false;
        document.getElementById('checkbox-aumento-usina-1').checked = false;

        document.getElementById('container-numero-instalacao-1').style.visibility = "hidden";
        document.getElementById('container-numero-instalacao-1').style.display = "none";
        document.getElementById('container-aumento-carga-1').style.visibility = "hidden";
        document.getElementById('container-aumento-carga-1').style.display = "none";

        for (let i = 0; i < arrayCheckbox.length; i++) {
            arrayCheckbox[i].style.visibility = "hidden"
        }

        for (let i = 0; i < arrayContainer.length; i++) {
            arrayContainer[i].style.visibility = "hidden"
            arrayContainer[i].style.display = "none"
        }
    }

    else if(estadoLigacao1 == false) {
        document.getElementById('container-numero-instalacao-1').style.visibility = "visible";
        document.getElementById('container-numero-instalacao-1').style.display = "grid";
    }
}

function ligacao_nova2() {
    let estadoLigacao2 = document.getElementById('checkbox-ligacao-2').checked;
    let arrayCheckbox = document.getElementsByClassName('form-checkbox-aumento-usina');
    let arrayContainer = document.getElementsByClassName('container-modulo-2')

    if (estadoLigacao2 == true) {
        document.getElementById('checkbox-aumento-carga-2').checked = false;
        document.getElementById('checkbox-aumento-usina-2').checked = false;

        document.getElementById('container-numero-instalacao-2').style.visibility = "hidden";
        document.getElementById('container-numero-instalacao-2').style.display = "none";
        document.getElementById('container-aumento-carga-2').style.visibility = "hidden";
        document.getElementById('container-aumento-carga-2').style.display = "none";

        for (let i = 0; i < arrayCheckbox.length; i++) {
            arrayCheckbox[i].style.visibility = "hidden"
        }

        for (let i = 0; i < arrayContainer.length; i++) {
            arrayContainer[i].style.visibility = "hidden"
            arrayContainer[i].style.display = "none"
        }
    }

    else if(estadoLigacao2 == false) {
        document.getElementById('container-numero-instalacao-2').style.visibility = "visible";
        document.getElementById('container-numero-instalacao-2').style.display = "grid";
    }
}

function aumento_carga1() {
    let estadoAumento1 = document.getElementById('checkbox-aumento-carga-1').checked;
    
    if (estadoAumento1 == true) {
        document.getElementById('checkbox-ligacao-1').checked = false;

        document.getElementById('container-numero-instalacao-1').style.visibility = "visible";
        document.getElementById('container-numero-instalacao-1').style.display = "grid";

        document.getElementById('container-aumento-carga-1').style.visibility = "visible";
        document.getElementById('container-aumento-carga-1').style.display = "grid";
    }

    else if (estadoAumento1 == false) {
        document.getElementById('container-aumento-carga-1').style.visibility = "hidden";
        document.getElementById('container-aumento-carga-1').style.display = "none";
    }
}

function aumento_carga2() {
    let estadoAumento2 = document.getElementById('checkbox-aumento-carga-2').checked;

    if (estadoAumento2 == true) {
        document.getElementById('checkbox-ligacao-2').checked = false;

        document.getElementById('container-numero-instalacao-2').style.visibility = "visible";
        document.getElementById('container-numero-instalacao-2').style.display = "grid";

        document.getElementById('container-aumento-carga-2').style.visibility = "visible";
        document.getElementById('container-aumento-carga-2').style.display = "grid";
    }

    if (estadoAumento2 == false) {
        document.getElementById('container-aumento-carga-2').style.visibility = "hidden";
        document.getElementById('container-aumento-carga-2').style.display = "none";
    }
}

function aumento_usina1() {
    let estadoAumentoUsina1 = document.getElementById('checkbox-aumento-usina-1').checked;
    let arrayCheckbox = document.getElementsByClassName('form-checkbox-aumento-usina');
    let arrayContainer = document.getElementsByClassName('container-modulo-2');

    if (estadoAumentoUsina1 == true) {
        document.getElementById('checkbox-ligacao-1').checked = false;

        document.getElementById('container-numero-instalacao-1').style.visibility = "visible";
        document.getElementById('container-numero-instalacao-1').style.display = "grid";
        
        for (let i = 0; i < arrayCheckbox.length; i++) {
            arrayCheckbox[i].style.visibility = "visible";
        }

        for (let i = 0; i < arrayContainer.length; i++) {
            arrayContainer[i].style.visibility = "visible";
            arrayContainer[i].style.display = "grid";
        }
    }

    else if(estadoAumentoUsina1 == false) {
        for (let i = 0; i < arrayCheckbox.length; i++) {
            arrayCheckbox[i].style.visibility = "hidden";
        }

        for (let i = 0; i < arrayContainer.length; i++) {
            arrayContainer[i].style.visibility = "hidden";
            arrayContainer[i].style.display = "none";
        }
    }
}

function aumento_usina2() {
    let estadoAumentoUsina2 = document.getElementById('checkbox-aumento-usina-2').checked;
    let arrayCheckbox = document.getElementsByClassName('form-checkbox-aumento-usina');
    let arrayContainer = document.getElementsByClassName('container-modulo-2');

    if (estadoAumentoUsina2 == true) {
        document.getElementById('checkbox-ligacao-2').checked = false;

        document.getElementById('container-numero-instalacao-2').style.visibility = "visible";
        document.getElementById('container-numero-instalacao-2').style.display = "grid";
        
        for (let i = 0; i < arrayCheckbox.length; i++) {
            arrayCheckbox[i].style.visibility = "visible";
        }

        for (let i = 0; i < arrayContainer.length; i++) {
            arrayContainer[i].style.visibility = "visible";
            arrayContainer[i].style.display = "grid";
        }
    }

    else if(estadoAumentoUsina2 == false) {
        for (let i = 0; i < arrayCheckbox.length; i++) {
            arrayCheckbox[i].style.visibility = "hidden";
        }

        for (let i = 0; i < arrayContainer.length; i++) {
            arrayContainer[i].style.visibility = "hidden";
            arrayContainer[i].style.display = "none";
        }
    }
}

function agrupamento1() {
    let estadoAgrupamento1 = document.getElementById('checkbox-agrupamento-1').checked;
    
    if (estadoAgrupamento1 == true) {
        document.getElementById('container-agrupamento-1').style.visibility = "visible";
        document.getElementById('container-agrupamento-1').style.display = "grid";
    }

    else if (estadoAgrupamento1 == false) {
        document.getElementById('container-agrupamento-1').style.visibility = "hidden";
        document.getElementById('container-agrupamento-1').style.display = "none";
    }
}

function agrupamento2() {
    let estadoAgrupamento2 = document.getElementById('checkbox-agrupamento-2').checked;

    if (estadoAgrupamento2 == true) {
        document.getElementById('container-agrupamento-2').style.visibility = "visible";
        document.getElementById('container-agrupamento-2').style.display = "grid";
    }

    else if (estadoAgrupamento2 == false) {
        document.getElementById('container-agrupamento-2').style.visibility = "hidden";
        document.getElementById('container-agrupamento-2').style.display = "none";
    }
}

function adicionar_inversor1() {
    let estadoInversor2 = document.getElementById('container-inversor-21').checkVisibility()
    let estadoInversor3 = document.getElementById('container-inversor-31').checkVisibility()
    let estadoInversor4 = document.getElementById('container-inversor-41').checkVisibility()

    if (estadoInversor2 === false) {
        document.getElementById('container-inversor-21').style.visibility = "visible"
        document.getElementById('container-inversor-21').style.display = "grid"
    }

    else if (estadoInversor2 === true) {
        if (estadoInversor3 === false) {
            document.getElementById('container-inversor-31').style.visibility = "visible"
            document.getElementById('container-inversor-31').style.display = "grid"
        }

        else if (estadoInversor3 === true) {
            if (estadoInversor4 === false) {
                document.getElementById('container-inversor-41').style.visibility = "visible"
                document.getElementById('container-inversor-41').style.display = "grid"
            }
        }
    }
}

function remover_inversor1() {
    let estadoInversor2 = document.getElementById('container-inversor-21').checkVisibility()
    let estadoInversor3 = document.getElementById('container-inversor-31').checkVisibility()
    let estadoInversor4 = document.getElementById('container-inversor-41').checkVisibility()

    if (estadoInversor4 === true) {
        document.getElementById('container-inversor-41').style.visibility = "hidden"
        document.getElementById('container-inversor-41').style.display = "none"
    }

    else if (estadoInversor4 === false) {
        if (estadoInversor3 === true) {
            document.getElementById('container-inversor-31').style.visibility = "hidden"
            document.getElementById('container-inversor-31').style.display = "none"
        }

        else if (estadoInversor3 === false) {
            if (estadoInversor2 === true) {
                document.getElementById('container-inversor-21').style.visibility = "hidden"
                document.getElementById('container-inversor-21').style.display = "none"
            }
        }
    }
}

function adicionar_inversor2() {
    let estadoInversor2 = document.getElementById('container-inversor-22').checkVisibility()
    let estadoInversor3 = document.getElementById('container-inversor-32').checkVisibility()
    let estadoInversor4 = document.getElementById('container-inversor-42').checkVisibility()

    if (estadoInversor2 === false) {
        document.getElementById('container-inversor-22').style.visibility = "visible"
        document.getElementById('container-inversor-22').style.display = "grid"
    }

    else if (estadoInversor2 === true) {
        if (estadoInversor3 === false) {
            document.getElementById('container-inversor-32').style.visibility = "visible"
            document.getElementById('container-inversor-32').style.display = "grid"
        }

        else if (estadoInversor3 === true) {
            if (estadoInversor4 === false) {
                document.getElementById('container-inversor-42').style.visibility = "visible"
                document.getElementById('container-inversor-42').style.display = "grid"
            }
        }
    }
}

function remover_inversor2() {
    let estadoInversor2 = document.getElementById('container-inversor-22').checkVisibility()
    let estadoInversor3 = document.getElementById('container-inversor-32').checkVisibility()
    let estadoInversor4 = document.getElementById('container-inversor-42').checkVisibility()

    if (estadoInversor4 === true) {
        document.getElementById('container-inversor-42').style.visibility = "hidden"
        document.getElementById('container-inversor-42').style.display = "none"
    }

    else if (estadoInversor4 === false) {
        if (estadoInversor3 === true) {
            document.getElementById('container-inversor-32').style.visibility = "hidden"
            document.getElementById('container-inversor-32').style.display = "none"
        }

        else if (estadoInversor3 === false) {
            if (estadoInversor2 === true) {
                document.getElementById('container-inversor-22').style.visibility = "hidden"
                document.getElementById('container-inversor-22').style.display = "none"
            }
        }
    }
}