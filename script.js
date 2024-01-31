// FUNÇÕES GERAIS PARA TODAS AS PÁGINAS
function nome_usuario(input) {
    let valor = input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, '');

    for (i = (valor.length - 1); i >= 0; i--) {
        if (isNaN(valor[i]) == false & valor[i] != ' ') {
            valor = valor.replace(valor[i], '')
        }
    }
    
    if (valor[0] == ' ') {
        valor = valor.replace(valor[0], '')
    }

    for (i = 0; i < valor.length; i++) {
        if (i == 0) {
            valor = valor.replace(valor[i], valor[i].toUpperCase())
            
        }
        
        else {
            if (valor[i - 1] == ' ') {
                valor = valor.replace(valor[i], valor[i].toUpperCase())
                console.log(valor[i])
            }

            else {
                valor = valor.replace(valor[i], valor[i].toLowerCase())
            }
        }
    }

    input.value = valor
}

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
async function checar_autorizacao() {
    access_token = localStorage.getItem('access_token');
    username = localStorage.getItem('username');
    
    let config = {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
    }

    let dadosUsuario = await axios.get(
        'https://entrada-dados.onrender.com/users/' + username, config
    ).then(
        function (response) {
            const dadosUsuario = response.data;
            return dadosUsuario;
        }
    ).catch(
        function (error) {
            console.log(error);
            return error;
        }
    )

    if (dadosUsuario == 'Error: Request failed with status code 401' || dadosUsuario == 'Error: Request failed with status code 403' || dadosUsuario == 'Error: Request failed with status code 422' || dadosUsuario == 'Error: Network Error' || dadosUsuario == null) {
        access_token = dadosUsuario
    }

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

// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE USUÁRIOS
function criar_usuario() {
    let divMostrarUsuario = document.getElementById('container-show-user');
    let divCriarUsuario = document.getElementById('container-add-users');
    let divBuscarAtualizarUsuario = document.getElementById('container-search-to-update-users');
    let divAtualizarUsuario = document.getElementById('container-update-users');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-usuarios');
    let arraySenhasDivergentes = document.getElementsByClassName('container-senha-divergente')
    let arrayUsuarioInexistente = document.getElementsByClassName('container-usuario-inexistente');

    divMostrarUsuario.style.visibility = "hidden";
    divMostrarUsuario.style.display = "none";
    divCriarUsuario.style.visibility = "visible";
    divCriarUsuario.style.display = "grid";
    divBuscarAtualizarUsuario.style.visibility = "hidden";
    divBuscarAtualizarUsuario.style.display = "none";
    divAtualizarUsuario.style.visibility = "hidden";
    divAtualizarUsuario.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayUsuarioInexistente.length; i++) {
        arrayUsuarioInexistente[i].style.visibility = "hidden"
        arrayUsuarioInexistente[i].style.display = "none"
    }

    for(i = 0; i < arraySenhasDivergentes.length; i++) {
        arraySenhasDivergentes[i].style.visibility = "hidden"
        arraySenhasDivergentes[i].style.display = "none"
    }
}

function atualizar_usuario() {
    let divMostrarUsuario = document.getElementById('container-show-user');
    let divCriarUsuario = document.getElementById('container-add-users');
    let divBuscarAtualizarUsuario = document.getElementById('container-search-to-update-users');
    let divAtualizarUsuario = document.getElementById('container-update-users');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-usuarios');
    let arraySenhasDivergentes = document.getElementsByClassName('container-senha-divergente')
    let arrayUsuarioInexistente = document.getElementsByClassName('container-usuario-inexistente');

    document.getElementById('usuário-buscar-atualizar').value = ''

    divMostrarUsuario.style.visibility = "hidden";
    divMostrarUsuario.style.display = "none";
    divCriarUsuario.style.visibility = "hidden";
    divCriarUsuario.style.display = "none";
    divBuscarAtualizarUsuario.style.visibility = "visible";
    divBuscarAtualizarUsuario.style.display = "grid";
    divAtualizarUsuario.style.visibility = "hidden";
    divAtualizarUsuario.style.display = "none";

    
    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayUsuarioInexistente.length; i++) {
        arrayUsuarioInexistente[i].style.visibility = "hidden"
        arrayUsuarioInexistente[i].style.display = "none"
    }

    for(i = 0; i < arraySenhasDivergentes.length; i++) {
        arraySenhasDivergentes[i].style.visibility = "hidden"
        arraySenhasDivergentes[i].style.display = "none"
    }
}

function mostrar_campos_atualizar_usuarios() {
    let divBuscarAtualizarUsuario = document.getElementById('container-search-to-update-users');
    let divAtualizarUsuario = document.getElementById('container-update-users');

    let checkboxNome = document.getElementById('checkbox-nome-usuario')

    let divNomeUsuario = document.getElementById('container-form-nome-usuario');
    
    let arraySenhasDivergentes = document.getElementsByClassName('container-senha-divergente')
    let arrayUsuarioInexistente = document.getElementsByClassName('container-usuario-inexistente');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-usuarios');
    
    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arraySenhasDivergentes.length; i++) {
        arraySenhasDivergentes[i].style.visibility = "hidden"
        arraySenhasDivergentes[i].style.display = "none"
    }

    let nomeUsuario = document.getElementById('usuário-buscar-atualizar').value;
    
    document.getElementById('usuário-atualizar').value = ''
    document.getElementById('senha-atualizar').value = ''
    document.getElementById('confirmar-senha-atualizar').value = ''

    if (nomeUsuario != '') {
        divBuscarAtualizarUsuario.style.visibility = "hidden"
        divBuscarAtualizarUsuario.style.display = "none"
        divAtualizarUsuario.style.visibility = "visible"
        divAtualizarUsuario.style.display = "grid"

        if (checkboxNome.checked == true) {
            divNomeUsuario.style.visibility = "visible"
            divNomeUsuario.style.display = "grid"
        }

        else {
            divNomeUsuario.style.visibility = "hidden"
            divNomeUsuario.style.display = "none"
        }

        for(i = 0; i < arrayCamposObrigatorios.length; i++) {
            arrayCamposObrigatorios[i].style.visibility = "hidden"
            arrayCamposObrigatorios[i].style.display = "none"
        }

        for(i = 0; i < arrayUsuarioInexistente.length; i++) {
            arrayUsuarioInexistente[i].style.visibility = "hidden"
            arrayUsuarioInexistente[i].style.display = "none"
        }
    }

    else {
        for(i = 0; i < arrayCamposObrigatorios.length; i++) {
            arrayCamposObrigatorios[i].style.visibility = "visible"
            arrayCamposObrigatorios[i].style.display = "grid"
        }
    }
}

async function mostrar_usuarios(nomeFuncao) {
    let input = document.getElementById('usuário-' + nomeFuncao)
    let lista = document.getElementById('nomeusuario-' + nomeFuncao)
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

        let dadosTodosUsuarios = await axios.get(
            'https://entrada-dados.onrender.com/users/', config
        ).then(
            function (response) {
                const dadosTodosUsuarios = response.data;
                return dadosTodosUsuarios;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        if (dadosTodosUsuarios != 'Error: Request failed with status code 401' & dadosTodosUsuarios != 'Error: Request failed with status code 404') {
            for (i = 0; i < dadosTodosUsuarios.length; i++) {
                nome[i] = dadosTodosUsuarios[i].nome;
                let opcao_atual = document.createElement('option');
                let texto = document.createTextNode(String(i + 1) + ' - ' + nome[i])
                
                opcao_atual.value = String(i + 1) + ' - ' + nome[i]
                opcao_atual.appendChild(texto)
                lista.appendChild(opcao_atual)
            }
        }

        else if (dadosTodosUsuarios == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosUsuarios);
            checar_autorizacao();
        }
    }

    localStorage.setItem('nome_usuario', nome)
    
    lista.style.display = 'grid';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split(' - ')[1];
            lista.style.display = 'none';
        }
    }
}

function filtrar_usuarios(nomeFuncao) {
    let input = document.getElementById('usuário-' + nomeFuncao);
    let lista = document.getElementById('nomeusuario-' + nomeFuncao);
    
    let nome = localStorage.getItem('nome_usuario').split(',')
    
    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    for (i = 0; i < nome.length; i++) {
        let opcao_atual = document.createElement('option');
        let texto = document.createTextNode(String(i + 1) + ' - ' + nome[i])
        
        opcao_atual.value = String(i + 1) + ' - ' + nome[i]
        opcao_atual.appendChild(texto)
        lista.appendChild(opcao_atual)
    }

    let nomeUsuario = input.value;
    let nOpcoes = lista.options.length - 1;

    for (i = nOpcoes; i >= 0; i--) {
        if (lista.options[i].value.includes(nomeUsuario) == false) {
            lista.children[i].remove()
        }
    }
    
    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split(' - ')[1];
            lista.style.display = 'none';
        }
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

async function mostrar_campos_atualizar_clientes() {
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
    
    

    if (numeroCliente != '') {
        let config = {
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosOriginais = await axios.get(
            'https://entrada-dados.onrender.com/clients/' + numeroCliente.toString(), config
        ).then(
            function (response) {
                const dadosOriginais = response.data;
                return dadosOriginais;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (dadosOriginais != 'Error: Request failed with status code 404' & dadosOriginais != 'Error: Request failed with status code 401') {
            divSearchUpdateClient.style.visibility = "hidden"
            divSearchUpdateClient.style.display = "none"
            dropDownListSearchClient.style.display = "none";
            dropDownListUpdateClient.style.display = "none";
            dropDownListDeleteClient.style.display = "none";
            divUpdateClient.style.visibility = "visible"
            divUpdateClient.style.display = "grid"
            
            document.getElementById('número-cliente-atualizar').value = dadosOriginais.numero_cliente;
            document.getElementById('nome-cliente-atualizar').value = dadosOriginais.nome;
            document.getElementById('cpf-atualizar').value = dadosOriginais.cpf;
            document.getElementById('rg-atualizar').value = dadosOriginais.rg;
            document.getElementById('data-nascimento-atualizar').value = dadosOriginais.nascimento.split('/').reverse().join('-');
            document.getElementById('nome-pais-atualizar').value = dadosOriginais.nome_pais;

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

        else if (dadosOriginais == 'Error: Request failed with status code 404') {
            for(i = 0; i < arrayClienteInexistente.length; i++) {
                arrayClienteInexistente[i].style.visibility = "visible"
                arrayClienteInexistente[i].style.display = "flex"
            }
        }

        else {
            localStorage.setItem('access_token', dadosOriginais);
            checar_autorizacao();
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
            'https://entrada-dados.onrender.com/all-clients', config
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

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split(' - ')[0];
            lista.style.display = 'none';
        }
    }
    
    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split(' - ')[0];
            lista.style.display = 'none';
        }
    }
}

// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE INSTALAÇÕES
function buscar_instalacao() {
    let divGeral = document.getElementById('container-geral');
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

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
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
    let divGeral = document.getElementById('container-geral');
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
    
    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
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

async function mostrar_campos_atualizar_instalacoes() {
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
    let checkboxLigacao = document.getElementById('form-checkbox-ligacao-atualizar')
    let divNumeroInstalacao = document.getElementById('container-form-numero-instalacao-atualizar');

    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-instalacoes');
    let arrayInstalacaoInexistente = document.getElementsByClassName('container-instalacao-inexistente');

    let numeroInstalacao = document.getElementById('número-instalação-buscar-atualizar').value;
    
    if (numeroInstalacao != '') {
        let config = {
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosOriginais = await axios.get(
            'https://entrada-dados.onrender.com/instalations/' + numeroInstalacao.toString(), config
        ).then(
            function (response) {
                const dadosOriginais = response.data;
                return dadosOriginais;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )

        if (dadosOriginais != 'Error: Request failed with status code 404' & dadosOriginais != 'Error: Request failed with status code 401') {
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

            document.getElementById('número-instalação-atualizar').value = dadosOriginais.numero_instalacao
            document.getElementById('número-cliente-atualizar').value = dadosOriginais.numero_cliente
            document.getElementById('logradouro-atualizar').value = dadosOriginais.logradouro
            document.getElementById('numero-predial-atualizar').value = dadosOriginais.numero_predial
            document.getElementById('complemento-atualizar').value = dadosOriginais.complemento
            document.getElementById('bairro-atualizar').value = dadosOriginais.bairro
            document.getElementById('cidade-atualizar').value = dadosOriginais.cidade
            document.getElementById('cep-atualizar').value = dadosOriginais.cep
            document.getElementById('classificacao-atualizar').value = dadosOriginais.classificacao
            document.getElementById('latitude-atualizar').value = dadosOriginais.latitude
            document.getElementById('longitude-atualizar').value = dadosOriginais.longitude
            document.getElementById('coordenadas-decimais-atualizar').value = dadosOriginais.coordenadas_decimais
            
            if (checkboxNumeroInstalacao.checked == true) {
                checkboxLigacao.style.visibility = "visible"
                checkboxLigacao.style.display = "block"
                divNumeroInstalacao.style.visibility = "visible"
                divNumeroInstalacao.style.display = "grid"
                
            }

            else {
                checkboxLigacao.style.visibility = "hidden"
                checkboxLigacao.style.display = "none"
                divNumeroInstalacao.style.visibility = "hidden"
                divNumeroInstalacao.style.display = "none"
            }

            for(i = 0; i < arrayCamposObrigatorios.length; i++) {
                arrayCamposObrigatorios[i].style.visibility = "hidden"
                arrayCamposObrigatorios[i].style.display = "none"
            }

            for(i = 0; i < arrayInstalacaoInexistente.length; i++) {
                arrayInstalacaoInexistente[i].style.visibility = "hidden"
                arrayInstalacaoInexistente[i].style.display = "none"
            }
        }

        else if (dadosOriginais == 'Error: Request failed with status code 404') {
            for(i = 0; i < arrayInstalacaoInexistente.length; i++) {
                arrayInstalacaoInexistente[i].style.visibility = "visible"
                arrayInstalacaoInexistente[i].style.display = "flex"
            }
        }

        else {
            localStorage.setItem('access_token', dadosOriginais);
            checar_autorizacao();
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
    let divGeral = document.getElementById('container-geral');
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

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
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
    let divGeral = document.getElementById('container-geral');
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

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
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

function ligacao_nova(nomeFuncao) {
    let checkboxLigacao = document.getElementById('checkbox-ligacao-' + nomeFuncao).checked;
    let divNumeroInstalacao = document.getElementById('container-form-numero-instalacao-' + nomeFuncao)
    
    if (checkboxLigacao == true) {
        divNumeroInstalacao.style.visibility = "hidden";
        divNumeroInstalacao.style.display = "none";
    }

    else if(checkboxLigacao == false) {
        divNumeroInstalacao.style.visibility = "visible";
        divNumeroInstalacao.style.display = "grid";
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
            'https://entrada-dados.onrender.com/all-instalations', config
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
    
    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split(' - ')[0];
            lista.style.display = 'none';
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
    let arrayModuloInexistente = document.getElementsByClassName('container-modulo-inexistente');
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

    for(i = 0; i < arrayModuloInexistente.length; i++) {
        arrayModuloInexistente[i].style.visibility = "hidden"
        arrayModuloInexistente[i].style.display = "none"
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

async function mostrar_campos_atualizar_modulos() {
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
    
    if (modelo != '') {
        let config = {
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosOriginais = await axios.get(
            'https://entrada-dados.onrender.com/modules/' + modelo.toString(), config
        ).then(
            function (response) {
                const dadosOriginais = response.data;
                return dadosOriginais;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (dadosOriginais != 'Error: Request failed with status code 404' & dadosOriginais != 'Error: Request failed with status code 401') {
            divSearchUpdateModule.style.visibility = "hidden"
            divSearchUpdateModule.style.display = "none"
            dropDownListSearchModule.style.display = "none";
            dropDownListUpdateModule.style.display = "none";
            dropDownListDeleteModule.style.display = "none";
            dropDownListAddType.style.display = "none";
            dropDownListUpdateType.style.display = "none";
            divUpdateModule.style.visibility = "visible"
            divUpdateModule.style.display = "grid"

            document.getElementById('modelo-módulo-atualizar').value = dadosOriginais.modelo
            document.getElementById('fabricante-módulo-atualizar').value = dadosOriginais.fabricante
            document.getElementById('potência-módulo-atualizar').value = dadosOriginais.potencia
            document.getElementById('imp-módulo-atualizar').value = dadosOriginais.imp.toString().replace('.', ',')
            document.getElementById('isc-módulo-atualizar').value = dadosOriginais.isc.toString().replace('.', ',')
            document.getElementById('vmp-módulo-atualizar').value = dadosOriginais.vmp.toString().replace('.', ',')
            document.getElementById('voc-módulo-atualizar').value = dadosOriginais.voc.toString().replace('.', ',')
            document.getElementById('comprimento-módulo-atualizar').value = dadosOriginais.comprimento
            document.getElementById('largura-módulo-atualizar').value = dadosOriginais.largura
            document.getElementById('espessura-módulo-atualizar').value = dadosOriginais.espessura
            document.getElementById('eficiência-módulo-atualizar').value = dadosOriginais.eficiencia.toString().replace('.', ',')
            document.getElementById('temperatura-módulo-atualizar').value = dadosOriginais.temperatura_nominal
            document.getElementById('tipo-módulo-atualizar').value = dadosOriginais.tipo
            document.getElementById('coeficiente-módulo-atualizar').value = dadosOriginais.coeficiente_temperatura.toString().replace('.', ',')

            for(i = 0; i < arrayCamposObrigatorios.length; i++) {
                arrayCamposObrigatorios[i].style.visibility = "hidden"
                arrayCamposObrigatorios[i].style.display = "none"
            }

            for(i = 0; i < arrayModuloInexistente.length; i++) {
                arrayModuloInexistente[i].style.visibility = "hidden"
                arrayModuloInexistente[i].style.display = "none"
            }
        }

        else if (dadosOriginais == 'Error: Request failed with status code 404') {
            for(i = 0; i < arrayModuloInexistente.length; i++) {
                arrayModuloInexistente[i].style.visibility = "visible"
                arrayModuloInexistente[i].style.display = "flex"
            }
        }

        else {
            localStorage.setItem('access_token', dadosOriginais);
            checar_autorizacao();
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
            'https://entrada-dados.onrender.com/all-modules', config
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
    
    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split('ID #')[1].split(' - ')[0];
            lista.style.display = 'none';
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
    let divGeral = document.getElementById('container-geral');
    let divSearchInverter = document.getElementById('container-search-inverters');
    let divAddInverter = document.getElementById('container-add-inverters-general');
    let divSearchUpdateInverter = document.getElementById('container-search-to-update-inverters');
    let divUpdateInverter = document.getElementById('container-update-inverters-general');
    let divDeleteInverter = document.getElementById('container-delete-inverters');
    let divInverterFound = document.getElementById('container-inversor-encontrado');
    let divInverterAdded = document.getElementById('container-inversor-adicionado');
    let divInverterUpdated = document.getElementById('container-inversor-atualizado');
    let divInverterDeleted = document.getElementById('container-inversor-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-inversores');
    let arrayInversorInexistente = document.getElementsByClassName('container-inversor-inexistente');
    let dropDownListSearchInverter = document.getElementById('modeloinversor-buscar');
    let dropDownListUpdateInverter = document.getElementById('modeloinversor-buscar-atualizar');
    let dropDownListDeleteInverter = document.getElementById('modeloinversor-deletar');
  
    document.getElementById('modelo-inversor-buscar').value = ''
    
    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchInverter.style.visibility = "visible";
    divSearchInverter.style.display = "grid";
    divAddInverter.style.visibility = "hidden";
    divAddInverter.style.display = "none";
    divSearchUpdateInverter.style.visibility = "hidden"
    divSearchUpdateInverter.style.display = "none"
    divUpdateInverter.style.visibility = "hidden";
    divUpdateInverter.style.display = "none";
    divDeleteInverter.style.visibility = "hidden";
    divDeleteInverter.style.display = "none";
    divInverterFound.style.visibility = "hidden";
    divInverterFound.style.display = "none";
    divInverterAdded.style.visibility = "hidden";
    divInverterAdded.style.display = "none";
    divInverterUpdated.style.visibility = "hidden";
    divInverterUpdated.style.display = "none";
    divInverterDeleted.style.visibility = "hidden";
    divInverterDeleted.style.display = "none";
    dropDownListSearchInverter.style.display = "none";
    dropDownListUpdateInverter.style.display = "none";
    dropDownListDeleteInverter.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayInversorInexistente.length; i++) {
        arrayInversorInexistente[i].style.visibility = "hidden"
        arrayInversorInexistente[i].style.display = "none"
    }
}

function adicionar_inversor() {
    let divGeral = document.getElementById('container-geral');
    let divSearchInverter = document.getElementById('container-search-inverters');
    let divAddInverter = document.getElementById('container-add-inverters-general');
    let divSearchUpdateInverter = document.getElementById('container-search-to-update-inverters');
    let divUpdateInverter = document.getElementById('container-update-inverters-general');
    let divDeleteInverter = document.getElementById('container-delete-inverters');
    let divInverterFound = document.getElementById('container-inversor-encontrado');
    let divInverterAdded = document.getElementById('container-inversor-adicionado');
    let divInverterUpdated = document.getElementById('container-inversor-atualizado');
    let divInverterDeleted = document.getElementById('container-inversor-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-inversores');
    let arrayInversorInexistente = document.getElementsByClassName('container-inversor-inexistente');
    let dropDownListSearchInverter = document.getElementById('modeloinversor-buscar');
    let dropDownListUpdateInverter = document.getElementById('modeloinversor-buscar-atualizar');
    let dropDownListDeleteInverter = document.getElementById('modeloinversor-deletar');
    
    document.getElementById('modelo-inversor-adicionar').value = ''
    document.getElementById('fabricante-inversor-adicionar').value = ''
    document.getElementById('potência-inversor-adicionar').value = ''
    document.getElementById('overload-inversor-adicionar').value = ''
    document.getElementById('imp-inversor-adicionar').value = ''
    document.getElementById('isc-inversor-adicionar').value = ''
    document.getElementById('vmin-mppt-inversor-adicionar').value = ''
    document.getElementById('vmax-mppt-inversor-adicionar').value = ''
    document.getElementById('voc-inversor-adicionar').value = ''
    document.getElementById('n-mppt-inversor-adicionar').value = ''
    document.getElementById('n-entrada-inversor-adicionar').value = ''
    document.getElementById('v-saída-inversor-adicionar').value = ''
    document.getElementById('i-saída-inversor-adicionar').value = ''
    document.getElementById('comprimento-inversor-adicionar').value = ''
    document.getElementById('largura-inversor-adicionar').value = ''
    document.getElementById('espessura-inversor-adicionar').value = ''
    document.getElementById('eficiência-inversor-adicionar').value = ''

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchInverter.style.visibility = "hidden";
    divSearchInverter.style.display = "none";
    divAddInverter.style.visibility = "visible";
    divAddInverter.style.display = "grid";
    divSearchUpdateInverter.style.visibility = "hidden"
    divSearchUpdateInverter.style.display = "none"
    divUpdateInverter.style.visibility = "hidden";
    divUpdateInverter.style.display = "none";
    divDeleteInverter.style.visibility = "hidden";
    divDeleteInverter.style.display = "none";
    divInverterFound.style.visibility = "hidden";
    divInverterFound.style.display = "none";
    divInverterAdded.style.visibility = "hidden";
    divInverterAdded.style.display = "none";
    divInverterUpdated.style.visibility = "hidden";
    divInverterUpdated.style.display = "none";
    divInverterDeleted.style.visibility = "hidden";
    divInverterDeleted.style.display = "none";
    dropDownListSearchInverter.style.display = "none";
    dropDownListUpdateInverter.style.display = "none";
    dropDownListDeleteInverter.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayInversorInexistente.length; i++) {
        arrayInversorInexistente[i].style.visibility = "hidden"
        arrayInversorInexistente[i].style.display = "none"
    }
}

async function mostrar_campos_atualizar_inversores() {
    let divSearchUpdateInverter = document.getElementById('container-search-to-update-inverters');
    let divUpdateInverter = document.getElementById('container-update-inverters-general');
    let dropDownListSearchInverter = document.getElementById('modeloinversor-buscar');
    let dropDownListUpdateInverter = document.getElementById('modeloinversor-buscar-atualizar');
    let dropDownListDeleteInverter = document.getElementById('modeloinversor-deletar');
  
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-inversores');
    let arrayInversorInexistente = document.getElementsByClassName('container-inversor-inexistente');

    let modelo = document.getElementById('modelo-inversor-buscar-atualizar').value;
    
    if (modelo != '') {
        let config = {
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosOriginais = await axios.get(
            'https://entrada-dados.onrender.com/inverters/' + modelo.toString(), config
        ).then(
            function (response) {
                const dadosOriginais = response.data;
                return dadosOriginais;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (dadosOriginais != 'Error: Request failed with status code 404' & dadosOriginais != 'Error: Request failed with status code 401') {
            divSearchUpdateInverter.style.visibility = "hidden"
            divSearchUpdateInverter.style.display = "none"
            dropDownListSearchInverter.style.display = "none";
            dropDownListUpdateInverter.style.display = "none";
            dropDownListDeleteInverter.style.display = "none";
            divUpdateInverter.style.visibility = "visible"
            divUpdateInverter.style.display = "grid"

            document.getElementById('modelo-inversor-atualizar').value = dadosOriginais.modelo
            document.getElementById('fabricante-inversor-atualizar').value = dadosOriginais.fabricante
            document.getElementById('potência-inversor-atualizar').value = dadosOriginais.potencia
            document.getElementById('overload-inversor-atualizar').value = dadosOriginais.overload
            document.getElementById('imp-inversor-atualizar').value = dadosOriginais.imp.toString().replace('.', ',')
            document.getElementById('isc-inversor-atualizar').value = dadosOriginais.isc.toString().replace('.', ',')
            document.getElementById('vmin-mppt-inversor-atualizar').value = dadosOriginais.v_min_mppt
            document.getElementById('vmax-mppt-inversor-atualizar').value = dadosOriginais.v_max_mppt
            document.getElementById('voc-inversor-atualizar').value = dadosOriginais.v_max
            document.getElementById('n-mppt-inversor-atualizar').value = dadosOriginais.n_mppt
            document.getElementById('n-entrada-inversor-atualizar').value = dadosOriginais.n_entrada
            document.getElementById('v-saída-inversor-atualizar').value = dadosOriginais.v_saida
            document.getElementById('i-saída-inversor-atualizar').value = dadosOriginais.i_saida.toString().replace('.', ',')
            document.getElementById('comprimento-inversor-atualizar').value = dadosOriginais.comprimento
            document.getElementById('largura-inversor-atualizar').value = dadosOriginais.largura
            document.getElementById('espessura-inversor-atualizar').value = dadosOriginais.espessura
            document.getElementById('eficiência-inversor-atualizar').value = dadosOriginais.eficiencia.toString().replace('.', ',')

            for(i = 0; i < arrayCamposObrigatorios.length; i++) {
                arrayCamposObrigatorios[i].style.visibility = "hidden"
                arrayCamposObrigatorios[i].style.display = "none"
            }

            for(i = 0; i < arrayInversorInexistente.length; i++) {
                arrayInversorInexistente[i].style.visibility = "hidden"
                arrayInversorInexistente[i].style.display = "none"
            }
        }

        else if (dadosOriginais == 'Error: Request failed with status code 404') {
            for(i = 0; i < arrayInversorInexistente.length; i++) {
                arrayInversorInexistente[i].style.visibility = "visible"
                arrayInversorInexistente[i].style.display = "flex"
            }
        }

        else {
            localStorage.setItem('access_token', dadosOriginais);
            checar_autorizacao();
        }
    }

    else {
        for(i = 0; i < arrayCamposObrigatorios.length; i++) {
            arrayCamposObrigatorios[i].style.visibility = "visible"
            arrayCamposObrigatorios[i].style.display = "grid"
        }
    }
}

function atualizar_inversor() {
    let divGeral = document.getElementById('container-geral');
    let divSearchInverter = document.getElementById('container-search-inverters');
    let divAddInverter = document.getElementById('container-add-inverters-general');
    let divSearchUpdateInverter = document.getElementById('container-search-to-update-inverters');
    let divUpdateInverter = document.getElementById('container-update-inverters-general');
    let divDeleteInverter = document.getElementById('container-delete-inverters');
    let divInverterFound = document.getElementById('container-inversor-encontrado');
    let divInverterAdded = document.getElementById('container-inversor-adicionado');
    let divInverterUpdated = document.getElementById('container-inversor-atualizado');
    let divInverterDeleted = document.getElementById('container-inversor-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-inversores');
    let arrayInversorInexistente = document.getElementsByClassName('container-inversor-inexistente');
    let dropDownListSearchInverter = document.getElementById('modeloinversor-buscar');
    let dropDownListUpdateInverter = document.getElementById('modeloinversor-buscar-atualizar');
    let dropDownListDeleteInverter = document.getElementById('modeloinversor-deletar');
    
    document.getElementById('modelo-inversor-buscar-atualizar').value = ''

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchInverter.style.visibility = "hidden";
    divSearchInverter.style.display = "none";
    divAddInverter.style.visibility = "hidden";
    divAddInverter.style.display = "none";
    divSearchUpdateInverter.style.visibility = "visible"
    divSearchUpdateInverter.style.display = "grid"
    divUpdateInverter.style.visibility = "hidden";
    divUpdateInverter.style.display = "none";
    divDeleteInverter.style.visibility = "hidden";
    divDeleteInverter.style.display = "none";
    divInverterFound.style.visibility = "hidden";
    divInverterFound.style.display = "none";
    divInverterAdded.style.visibility = "hidden";
    divInverterAdded.style.display = "none";
    divInverterUpdated.style.visibility = "hidden";
    divInverterUpdated.style.display = "none";
    divInverterDeleted.style.visibility = "hidden";
    divInverterDeleted.style.display = "none";
    dropDownListSearchInverter.style.display = "none";
    dropDownListUpdateInverter.style.display = "none";
    dropDownListDeleteInverter.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayInversorInexistente.length; i++) {
        arrayInversorInexistente[i].style.visibility = "hidden"
        arrayInversorInexistente[i].style.display = "none"
    }
}

function deletar_inversor() {
    let divGeral = document.getElementById('container-geral');
    let divSearchInverter = document.getElementById('container-search-inverters');
    let divAddInverter = document.getElementById('container-add-inverters-general');
    let divSearchUpdateInverter = document.getElementById('container-search-to-update-inverters');
    let divUpdateInverter = document.getElementById('container-update-inverters-general');
    let divDeleteInverter = document.getElementById('container-delete-inverters');
    let divInverterFound = document.getElementById('container-inversor-encontrado');
    let divInverterAdded = document.getElementById('container-inversor-adicionado');
    let divInverterUpdated = document.getElementById('container-inversor-atualizado');
    let divInverterDeleted = document.getElementById('container-inversor-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-inversores');
    let arrayInversorInexistente = document.getElementsByClassName('container-inversor-inexistente');
    let dropDownListSearchInverter = document.getElementById('modeloinversor-buscar');
    let dropDownListUpdateInverter = document.getElementById('modeloinversor-buscar-atualizar');
    let dropDownListDeleteInverter = document.getElementById('modeloinversor-deletar');
    
    document.getElementById('modelo-inversor-deletar').value = ''

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchInverter.style.visibility = "hidden";
    divSearchInverter.style.display = "none";
    divAddInverter.style.visibility = "hidden";
    divAddInverter.style.display = "none";
    divSearchUpdateInverter.style.visibility = "hidden"
    divSearchUpdateInverter.style.display = "none"
    divUpdateInverter.style.visibility = "hidden";
    divUpdateInverter.style.display = "none";
    divDeleteInverter.style.visibility = "visible";
    divDeleteInverter.style.display = "grid";
    divInverterFound.style.visibility = "hidden";
    divInverterFound.style.display = "none";
    divInverterAdded.style.visibility = "hidden";
    divInverterAdded.style.display = "none";
    divInverterUpdated.style.visibility = "hidden";
    divInverterUpdated.style.display = "none";
    divInverterDeleted.style.visibility = "hidden";
    divInverterDeleted.style.display = "none";
    dropDownListSearchInverter.style.display = "none";
    dropDownListUpdateInverter.style.display = "none";
    dropDownListDeleteInverter.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayInversorInexistente.length; i++) {
        arrayInversorInexistente[i].style.visibility = "hidden"
        arrayInversorInexistente[i].style.display = "none"
    }
}

async function mostrar_inversores(nomeFuncao) {
    let input = document.getElementById('modelo-inversor-' + nomeFuncao)
    let lista = document.getElementById('modeloinversor-' + nomeFuncao)
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

        let dadosTodosInversores = await axios.get(
            'https://entrada-dados.onrender.com/all-inverters', config
        ).then(
            function (response) {
                const dadosTodosInversores = response.data;
                return dadosTodosInversores;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        if (dadosTodosInversores != 'Error: Request failed with status code 401' & dadosTodosInversores != 'Error: Request failed with status code 404') {
            for (i = 0; i < dadosTodosInversores.length; i++) {
                id[i] = String(dadosTodosInversores[i].id);
                modelo[i] = dadosTodosInversores[i].modelo;
                fabricante[i] = dadosTodosInversores[i].fabricante;
                potencia[i] = parseFloat(dadosTodosInversores[i].potencia)

                let opcao_atual = document.createElement('option');
                let texto = document.createTextNode('ID #' + id[i] + ' - Fabricante: ' + fabricante[i] + ' - Potência: ' + (potencia[i] / 1000 ).toString().replace('.', ',') + ' kW - Modelo: ' + modelo[i])
                
                opcao_atual.value = 'ID #' + id[i] + ' - Fabricante: ' + fabricante[i] + ' - Potência: ' + (potencia[i] / 1000 ).toString().replace('.', ',') + ' kW - Modelo: ' + modelo[i]
                opcao_atual.appendChild(texto)
                lista.appendChild(opcao_atual)
            }
        }

        else if (dadosTodosInversores == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosInversores);
            checar_autorizacao();
        }
    }

    localStorage.setItem('id_inversor', id)
    localStorage.setItem('modelo_inversor', modelo)
    localStorage.setItem('fabricante_inversor', fabricante)
    localStorage.setItem('potencia_inversor', potencia)
    
    lista.style.display = 'grid';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split('ID #')[1].split(' - ')[0];
            lista.style.display = 'none';
        }
    }
}

function filtrar_inversores(nomeFuncao) {
    let input = document.getElementById('modelo-inversor-' + nomeFuncao);
    let lista = document.getElementById('modeloinversor-' + nomeFuncao);
    
    let id = localStorage.getItem('id_inversor').split(',')
    let modelo = localStorage.getItem('modelo_inversor').split(',')
    let fabricante = localStorage.getItem('fabricante_inversor').split(',')
    let potencia = localStorage.getItem('potencia_inversor').split(',')

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    for (i = 0; i < id.length; i++) {
        let opcao_atual = document.createElement('option');
        let texto = document.createTextNode('ID #' + id[i] + ' - Fabricante: ' + fabricante[i] + ' - Potência: ' + (parseFloat(potencia[i]) / 1000 ).toString().replace('.', ',') + ' kW - Modelo: ' + modelo[i])
        
        opcao_atual.value = 'ID #' + id[i] + ' - Fabricante: ' + fabricante[i] + ' - Potência: ' + (parseFloat(potencia[i]) / 1000 ).toString().replace('.', ',') + ' kW - Modelo: ' + modelo[i]
        opcao_atual.appendChild(texto)
        lista.appendChild(opcao_atual)
    }

    let idInversor = input.value.toUpperCase();
    let nOpcoes = lista.options.length - 1;

    for (i = nOpcoes; i >= 0; i--) {
        if (lista.options[i].value.includes(idInversor) == false) {
            lista.children[i].remove()
        }
    }
    
    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split('ID #')[1].split(' - ')[0];
            lista.style.display = 'none';
        }
    }
}

// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE PROJETOS
function buscar_projeto() {
    let divGeral = document.getElementById('container-geral');
    let divSearchProject = document.getElementById('container-search-projects');
    let divAddProject = document.getElementById('container-add-projects-general');
    let divSearchUpdateProject = document.getElementById('container-search-to-update-projects');
    let divUpdateProject = document.getElementById('container-update-projects-general');
    let divPrintProject = document.getElementById('container-print-projects');
    let divDeleteProject = document.getElementById('container-delete-projects');
    let divProjectFound = document.getElementById('container-projeto-encontrado');
    let divProjectAdded = document.getElementById('container-projeto-adicionado');
    let divProjectUpdated = document.getElementById('container-projeto-atualizado');
    let divProjectPrinted = document.getElementById('container-projeto-impresso');
    let divProjectDeleted = document.getElementById('container-projeto-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-projetos');
    let arrayProjectInexistente = document.getElementsByClassName('container-projeto-inexistente');
    let dropDownListSearchProject = document.getElementById('idprojeto-buscar');
    let dropDownListUpdateProject = document.getElementById('idprojeto-buscar-atualizar');
    let dropDownListPrintProject = document.getElementById('idprojeto-imprimir');
    let dropDownListDeleteProject = document.getElementById('idprojeto-deletar');
    let dropDownListModelModule1 = document.getElementById('modelomodulo-1-adicionar');
    let dropDownListModelModule2 = document.getElementById('modelomodulo-2-adicionar');
    let dropDownListManufacturerModule1 = document.getElementById('fabricantemodulo-1-adicionar');
    let dropDownListManufacturerModule2 = document.getElementById('fabricantemodulo-2-adicionar');
    let dropDownListModelInverter1 = document.getElementById('modeloinversor-1-adicionar');
    let dropDownListModelInverter2 = document.getElementById('modeloinversor-2-adicionar');
    let dropDownListModelInverter3 = document.getElementById('modeloinversor-3-adicionar');
    let dropDownListModelInverter4 = document.getElementById('modeloinversor-4-adicionar');
    let dropDownListManufacturerInverter1 = document.getElementById('fabricanteinversor-1-adicionar');
    let dropDownListManufacturerInverter2 = document.getElementById('fabricanteinversor-2-adicionar');
    let dropDownListManufacturerInverter3 = document.getElementById('fabricanteinversor-3-adicionar');
    let dropDownListManufacturerInverter4 = document.getElementById('fabricanteinversor-1-adicionar');
    let dropDownListUpdateModelModule1 = document.getElementById('modelomodulo-1-atualizar');
    let dropDownListUpdateModelModule2 = document.getElementById('modelomodulo-2-atualizar');
    let dropDownListUpdateManufacturerModule1 = document.getElementById('fabricantemodulo-1-atualizar');
    let dropDownListUpdateManufacturerModule2 = document.getElementById('fabricantemodulo-2-atualizar');
    let dropDownListUpdateModelInverter1 = document.getElementById('modeloinversor-1-atualizar');
    let dropDownListUpdateModelInverter2 = document.getElementById('modeloinversor-2-atualizar');
    let dropDownLisUpdatetModelInverter3 = document.getElementById('modeloinversor-3-atualizar');
    let dropDownListUpdateModelInverter4 = document.getElementById('modeloinversor-4-atualizar');
    let dropDownListUpdateManufacturerInverter1 = document.getElementById('fabricanteinversor-1-atualizar');
    let dropDownListUpdateManufacturerInverter2 = document.getElementById('fabricanteinversor-2-atualizar');
    let dropDownListUpdateManufacturerInverter3 = document.getElementById('fabricanteinversor-3-atualizar');
    let dropDownListUpdateManufacturerInverter4 = document.getElementById('fabricanteinversor-1-atualizar');
    let dropDownListNPhasesAdd = document.getElementById('nfasesadicionar');
    let dropDownListNewNPhasesAdd = document.getElementById('novonfasesadicionar');
    let dropDownListGroupingNPhasesAdd = document.getElementById('nfasesagrupamentoadicionar');
    let dropDownListNPhasesUpdate = document.getElementById('nfasesatualizar');
    let dropDownListNewNPhasesUpdate = document.getElementById('novonfasesatualizar');
    let dropDownListGroupingNPhasesUpdate = document.getElementById('nfasesagrupamentoatualizar');
    let dropDownListClientAdd = document.getElementById('numerocliente-adicionar')
    let dropDownListInstalationAdd = document.getElementById('numeroinstalacao-adicionar')
    let dropDownListClientUpdate = document.getElementById('numerocliente-atualizar')
    let dropDownListInstalationUpdate = document.getElementById('numeroinstalacao-atualizar')
  
    document.getElementById('id-projeto-buscar').value = ''
    
    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchProject.style.visibility = "visible";
    divSearchProject.style.display = "grid";
    divAddProject.style.visibility = "hidden";
    divAddProject.style.display = "none";
    divSearchUpdateProject.style.visibility = "hidden"
    divSearchUpdateProject.style.display = "none"
    divUpdateProject.style.visibility = "hidden";
    divUpdateProject.style.display = "none";
    divPrintProject.style.visibility = "hidden";
    divPrintProject.style.display = "none";
    divDeleteProject.style.visibility = "hidden";
    divDeleteProject.style.display = "none";
    divProjectFound.style.visibility = "hidden";
    divProjectFound.style.display = "none";
    divProjectAdded.style.visibility = "hidden";
    divProjectAdded.style.display = "none";
    divProjectUpdated.style.visibility = "hidden";
    divProjectUpdated.style.display = "none";
    divProjectPrinted.style.visibility = "hidden";
    divProjectPrinted.style.display = "none";
    divProjectDeleted.style.visibility = "hidden";
    divProjectDeleted.style.display = "none";
    dropDownListSearchProject.style.display = "none";
    dropDownListUpdateProject.style.display = "none";
    dropDownListPrintProject.style.display = "none";
    dropDownListDeleteProject.style.display = "none";
    dropDownListModelModule1.style.display = "none";
    dropDownListModelModule2.style.display = "none";
    dropDownListManufacturerModule1.style.display = "none";
    dropDownListManufacturerModule2.style.display = "none";
    dropDownListModelInverter1.style.display = "none";
    dropDownListModelInverter2.style.display = "none";
    dropDownListModelInverter3.style.display = "none";
    dropDownListModelInverter4.style.display = "none";
    dropDownListManufacturerInverter1.style.display = "none";
    dropDownListManufacturerInverter2.style.display = "none";
    dropDownListManufacturerInverter3.style.display = "none";
    dropDownListManufacturerInverter4.style.display = "none";
    dropDownListUpdateModelModule1.style.display = "none";
    dropDownListUpdateModelModule2.style.display = "none";
    dropDownListUpdateManufacturerModule1.style.display = "none";
    dropDownListUpdateManufacturerModule2.style.display = "none";
    dropDownListUpdateModelInverter1.style.display = "none";
    dropDownListUpdateModelInverter2.style.display = "none";
    dropDownLisUpdatetModelInverter3.style.display = "none";
    dropDownListUpdateModelInverter4.style.display = "none";
    dropDownListUpdateManufacturerInverter1.style.display = "none";
    dropDownListUpdateManufacturerInverter2.style.display = "none";
    dropDownListUpdateManufacturerInverter3.style.display = "none";
    dropDownListUpdateManufacturerInverter4.style.display = "none";
    dropDownListNPhasesAdd.style.display = "none";
    dropDownListNewNPhasesAdd.style.display = "none";
    dropDownListGroupingNPhasesAdd.style.display = "none";
    dropDownListNPhasesUpdate.style.display = "none";
    dropDownListNewNPhasesUpdate.style.display = "none";
    dropDownListGroupingNPhasesUpdate.style.display = "none";
    dropDownListClientAdd.style.display = "none";
    dropDownListInstalationAdd.style.display = "none";
    dropDownListClientUpdate.style.display = "none";
    dropDownListInstalationUpdate.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayProjectInexistente.length; i++) {
        arrayProjectInexistente[i].style.visibility = "hidden"
        arrayProjectInexistente[i].style.display = "none"
    }
}

function adicionar_projeto() {
    let divGeral = document.getElementById('container-geral');
    let divSearchProject = document.getElementById('container-search-projects');
    let divAddProject = document.getElementById('container-add-projects-general');
    let divSearchUpdateProject = document.getElementById('container-search-to-update-projects');
    let divUpdateProject = document.getElementById('container-update-projects-general');
    let divPrintProject = document.getElementById('container-print-projects');
    let divDeleteProject = document.getElementById('container-delete-projects');
    let divProjectFound = document.getElementById('container-projeto-encontrado');
    let divProjectAdded = document.getElementById('container-projeto-adicionado');
    let divProjectUpdated = document.getElementById('container-projeto-atualizado');
    let divProjectPrinted = document.getElementById('container-projeto-impresso');
    let divProjectDeleted = document.getElementById('container-projeto-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-projetos');
    let arrayProjectInexistente = document.getElementsByClassName('container-projeto-inexistente');
    let dropDownListSearchProject = document.getElementById('idprojeto-buscar');
    let dropDownListUpdateProject = document.getElementById('idprojeto-buscar-atualizar');
    let dropDownListPrintProject = document.getElementById('idprojeto-imprimir');
    let dropDownListDeleteProject = document.getElementById('idprojeto-deletar');
    let dropDownListModelModule1 = document.getElementById('modelomodulo-1-adicionar');
    let dropDownListModelModule2 = document.getElementById('modelomodulo-2-adicionar');
    let dropDownListManufacturerModule1 = document.getElementById('fabricantemodulo-1-adicionar');
    let dropDownListManufacturerModule2 = document.getElementById('fabricantemodulo-2-adicionar');
    let dropDownListModelInverter1 = document.getElementById('modeloinversor-1-adicionar');
    let dropDownListModelInverter2 = document.getElementById('modeloinversor-2-adicionar');
    let dropDownListModelInverter3 = document.getElementById('modeloinversor-3-adicionar');
    let dropDownListModelInverter4 = document.getElementById('modeloinversor-4-adicionar');
    let dropDownListManufacturerInverter1 = document.getElementById('fabricanteinversor-1-adicionar');
    let dropDownListManufacturerInverter2 = document.getElementById('fabricanteinversor-2-adicionar');
    let dropDownListManufacturerInverter3 = document.getElementById('fabricanteinversor-3-adicionar');
    let dropDownListManufacturerInverter4 = document.getElementById('fabricanteinversor-1-adicionar');
    let dropDownListUpdateModelModule1 = document.getElementById('modelomodulo-1-atualizar');
    let dropDownListUpdateModelModule2 = document.getElementById('modelomodulo-2-atualizar');
    let dropDownListUpdateManufacturerModule1 = document.getElementById('fabricantemodulo-1-atualizar');
    let dropDownListUpdateManufacturerModule2 = document.getElementById('fabricantemodulo-2-atualizar');
    let dropDownListUpdateModelInverter1 = document.getElementById('modeloinversor-1-atualizar');
    let dropDownListUpdateModelInverter2 = document.getElementById('modeloinversor-2-atualizar');
    let dropDownLisUpdatetModelInverter3 = document.getElementById('modeloinversor-3-atualizar');
    let dropDownListUpdateModelInverter4 = document.getElementById('modeloinversor-4-atualizar');
    let dropDownListUpdateManufacturerInverter1 = document.getElementById('fabricanteinversor-1-atualizar');
    let dropDownListUpdateManufacturerInverter2 = document.getElementById('fabricanteinversor-2-atualizar');
    let dropDownListUpdateManufacturerInverter3 = document.getElementById('fabricanteinversor-3-atualizar');
    let dropDownListUpdateManufacturerInverter4 = document.getElementById('fabricanteinversor-1-atualizar');
    let dropDownListNPhasesAdd = document.getElementById('nfasesadicionar');
    let dropDownListNewNPhasesAdd = document.getElementById('novonfasesadicionar');
    let dropDownListGroupingNPhasesAdd = document.getElementById('nfasesagrupamentoadicionar');
    let dropDownListNPhasesUpdate = document.getElementById('nfasesatualizar');
    let dropDownListNewNPhasesUpdate = document.getElementById('novonfasesatualizar');
    let dropDownListGroupingNPhasesUpdate = document.getElementById('nfasesagrupamentoatualizar');
    let dropDownListClientAdd = document.getElementById('numerocliente-adicionar')
    let dropDownListInstalationAdd = document.getElementById('numeroinstalacao-adicionar')
    let dropDownListClientUpdate = document.getElementById('numerocliente-atualizar')
    let dropDownListInstalationUpdate = document.getElementById('numeroinstalacao-atualizar')
    
    document.getElementById('número-instalação-adicionar').value = ''
    document.getElementById('número-cliente-adicionar').value = ''
    document.getElementById('n-fases-adicionar').value = ''
    document.getElementById('disjuntor-adicionar').value = ''
    document.getElementById('novo-n-fases-adicionar').value = ''
    document.getElementById('novo-disjuntor-adicionar').value = ''
    document.getElementById('n-fases-agrupamento-adicionar').value = ''
    document.getElementById('disjuntor-agrupamento-adicionar').value = ''
    document.getElementById('quantidade-módulo-1-adicionar').value = ''
    document.getElementById('fabricante-módulo-1-adicionar').value = ''
    document.getElementById('modelo-módulo-1-adicionar').value = ''
    document.getElementById('quantidade-módulo-2-adicionar').value = ''
    document.getElementById('fabricante-módulo-2-adicionar').value = ''
    document.getElementById('modelo-módulo-2-adicionar').value = ''
    document.getElementById('quantidade-inversor-1-adicionar').value = ''
    document.getElementById('fabricante-inversor-1-adicionar').value = ''
    document.getElementById('modelo-inversor-1-adicionar').value = ''
    document.getElementById('quantidade-inversor-2-adicionar').value = ''
    document.getElementById('fabricante-inversor-2-adicionar').value = ''
    document.getElementById('modelo-inversor-2-adicionar').value = ''
    document.getElementById('quantidade-inversor-3-adicionar').value = ''
    document.getElementById('fabricante-inversor-3-adicionar').value = ''
    document.getElementById('modelo-inversor-3-adicionar').value = ''
    document.getElementById('quantidade-inversor-4-adicionar').value = ''
    document.getElementById('fabricante-inversor-4-adicionar').value = ''
    document.getElementById('modelo-inversor-4-adicionar').value = ''

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchProject.style.visibility = "hidden";
    divSearchProject.style.display = "none";
    divAddProject.style.visibility = "visible";
    divAddProject.style.display = "grid";
    divSearchUpdateProject.style.visibility = "hidden"
    divSearchUpdateProject.style.display = "none"
    divUpdateProject.style.visibility = "hidden";
    divUpdateProject.style.display = "none";
    divPrintProject.style.visibility = "hidden";
    divPrintProject.style.display = "none";
    divDeleteProject.style.visibility = "hidden";
    divDeleteProject.style.display = "none";
    divProjectFound.style.visibility = "hidden";
    divProjectFound.style.display = "none";
    divProjectAdded.style.visibility = "hidden";
    divProjectAdded.style.display = "none";
    divProjectUpdated.style.visibility = "hidden";
    divProjectUpdated.style.display = "none";
    divProjectPrinted.style.visibility = "hidden";
    divProjectPrinted.style.display = "none";
    divProjectDeleted.style.visibility = "hidden";
    divProjectDeleted.style.display = "none";
    dropDownListSearchProject.style.display = "none";
    dropDownListUpdateProject.style.display = "none";
    dropDownListPrintProject.style.display = "none";
    dropDownListDeleteProject.style.display = "none";
    dropDownListModelModule1.style.display = "none";
    dropDownListModelModule2.style.display = "none";
    dropDownListManufacturerModule1.style.display = "none";
    dropDownListManufacturerModule2.style.display = "none";
    dropDownListModelInverter1.style.display = "none";
    dropDownListModelInverter2.style.display = "none";
    dropDownListModelInverter3.style.display = "none";
    dropDownListModelInverter4.style.display = "none";
    dropDownListManufacturerInverter1.style.display = "none";
    dropDownListManufacturerInverter2.style.display = "none";
    dropDownListManufacturerInverter3.style.display = "none";
    dropDownListManufacturerInverter4.style.display = "none";
    dropDownListUpdateModelModule1.style.display = "none";
    dropDownListUpdateModelModule2.style.display = "none";
    dropDownListUpdateManufacturerModule1.style.display = "none";
    dropDownListUpdateManufacturerModule2.style.display = "none";
    dropDownListUpdateModelInverter1.style.display = "none";
    dropDownListUpdateModelInverter2.style.display = "none";
    dropDownLisUpdatetModelInverter3.style.display = "none";
    dropDownListUpdateModelInverter4.style.display = "none";
    dropDownListUpdateManufacturerInverter1.style.display = "none";
    dropDownListUpdateManufacturerInverter2.style.display = "none";
    dropDownListUpdateManufacturerInverter3.style.display = "none";
    dropDownListUpdateManufacturerInverter4.style.display = "none";
    dropDownListNPhasesAdd.style.display = "none";
    dropDownListNewNPhasesAdd.style.display = "none";
    dropDownListGroupingNPhasesAdd.style.display = "none";
    dropDownListNPhasesUpdate.style.display = "none";
    dropDownListNewNPhasesUpdate.style.display = "none";
    dropDownListGroupingNPhasesUpdate.style.display = "none";
    dropDownListClientAdd.style.display = "none";
    dropDownListInstalationAdd.style.display = "none";
    dropDownListClientUpdate.style.display = "none";
    dropDownListInstalationUpdate.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayProjectInexistente.length; i++) {
        arrayProjectInexistente[i].style.visibility = "hidden"
        arrayProjectInexistente[i].style.display = "none"
    }
}

function atualizar_projeto() {
    let divGeral = document.getElementById('container-geral');
    let divSearchProject = document.getElementById('container-search-projects');
    let divAddProject = document.getElementById('container-add-projects-general');
    let divSearchUpdateProject = document.getElementById('container-search-to-update-projects');
    let divUpdateProject = document.getElementById('container-update-projects-general');
    let divPrintProject = document.getElementById('container-print-projects');
    let divDeleteProject = document.getElementById('container-delete-projects');
    let divProjectFound = document.getElementById('container-projeto-encontrado');
    let divProjectAdded = document.getElementById('container-projeto-adicionado');
    let divProjectUpdated = document.getElementById('container-projeto-atualizado');
    let divProjectPrinted = document.getElementById('container-projeto-impresso');
    let divProjectDeleted = document.getElementById('container-projeto-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-projetos');
    let arrayProjectInexistente = document.getElementsByClassName('container-projeto-inexistente');
    let dropDownListSearchProject = document.getElementById('idprojeto-buscar');
    let dropDownListUpdateProject = document.getElementById('idprojeto-buscar-atualizar');
    let dropDownListPrintProject = document.getElementById('idprojeto-imprimir');
    let dropDownListDeleteProject = document.getElementById('idprojeto-deletar');
    let dropDownListModelModule1 = document.getElementById('modelomodulo-1-adicionar');
    let dropDownListModelModule2 = document.getElementById('modelomodulo-2-adicionar');
    let dropDownListManufacturerModule1 = document.getElementById('fabricantemodulo-1-adicionar');
    let dropDownListManufacturerModule2 = document.getElementById('fabricantemodulo-2-adicionar');
    let dropDownListModelInverter1 = document.getElementById('modeloinversor-1-adicionar');
    let dropDownListModelInverter2 = document.getElementById('modeloinversor-2-adicionar');
    let dropDownListModelInverter3 = document.getElementById('modeloinversor-3-adicionar');
    let dropDownListModelInverter4 = document.getElementById('modeloinversor-4-adicionar');
    let dropDownListManufacturerInverter1 = document.getElementById('fabricanteinversor-1-adicionar');
    let dropDownListManufacturerInverter2 = document.getElementById('fabricanteinversor-2-adicionar');
    let dropDownListManufacturerInverter3 = document.getElementById('fabricanteinversor-3-adicionar');
    let dropDownListManufacturerInverter4 = document.getElementById('fabricanteinversor-1-adicionar');
    let dropDownListUpdateModelModule1 = document.getElementById('modelomodulo-1-atualizar');
    let dropDownListUpdateModelModule2 = document.getElementById('modelomodulo-2-atualizar');
    let dropDownListUpdateManufacturerModule1 = document.getElementById('fabricantemodulo-1-atualizar');
    let dropDownListUpdateManufacturerModule2 = document.getElementById('fabricantemodulo-2-atualizar');
    let dropDownListUpdateModelInverter1 = document.getElementById('modeloinversor-1-atualizar');
    let dropDownListUpdateModelInverter2 = document.getElementById('modeloinversor-2-atualizar');
    let dropDownLisUpdatetModelInverter3 = document.getElementById('modeloinversor-3-atualizar');
    let dropDownListUpdateModelInverter4 = document.getElementById('modeloinversor-4-atualizar');
    let dropDownListUpdateManufacturerInverter1 = document.getElementById('fabricanteinversor-1-atualizar');
    let dropDownListUpdateManufacturerInverter2 = document.getElementById('fabricanteinversor-2-atualizar');
    let dropDownListUpdateManufacturerInverter3 = document.getElementById('fabricanteinversor-3-atualizar');
    let dropDownListUpdateManufacturerInverter4 = document.getElementById('fabricanteinversor-1-atualizar');
    let dropDownListNPhasesAdd = document.getElementById('nfasesadicionar');
    let dropDownListNewNPhasesAdd = document.getElementById('novonfasesadicionar');
    let dropDownListGroupingNPhasesAdd = document.getElementById('nfasesagrupamentoadicionar');
    let dropDownListNPhasesUpdate = document.getElementById('nfasesatualizar');
    let dropDownListNewNPhasesUpdate = document.getElementById('novonfasesatualizar');
    let dropDownListGroupingNPhasesUpdate = document.getElementById('nfasesagrupamentoatualizar');
    let dropDownListClientAdd = document.getElementById('numerocliente-adicionar')
    let dropDownListInstalationAdd = document.getElementById('numeroinstalacao-adicionar')
    let dropDownListClientUpdate = document.getElementById('numerocliente-atualizar')
    let dropDownListInstalationUpdate = document.getElementById('numeroinstalacao-atualizar')
    
    document.getElementById('id-projeto-buscar-atualizar').value = ''

    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchProject.style.visibility = "hidden";
    divSearchProject.style.display = "none";
    divAddProject.style.visibility = "hidden";
    divAddProject.style.display = "none";
    divSearchUpdateProject.style.visibility = "visible"
    divSearchUpdateProject.style.display = "grid"
    divUpdateProject.style.visibility = "hidden";
    divUpdateProject.style.display = "none";
    divPrintProject.style.visibility = "hidden";
    divPrintProject.style.display = "none";
    divDeleteProject.style.visibility = "hidden";
    divDeleteProject.style.display = "none";
    divProjectFound.style.visibility = "hidden";
    divProjectFound.style.display = "none";
    divProjectAdded.style.visibility = "hidden";
    divProjectAdded.style.display = "none";
    divProjectUpdated.style.visibility = "hidden";
    divProjectUpdated.style.display = "none";
    divProjectPrinted.style.visibility = "hidden";
    divProjectPrinted.style.display = "none";
    divProjectDeleted.style.visibility = "hidden";
    divProjectDeleted.style.display = "none";
    dropDownListSearchProject.style.display = "none";
    dropDownListUpdateProject.style.display = "none";
    dropDownListPrintProject.style.display = "none";
    dropDownListDeleteProject.style.display = "none";
    dropDownListModelModule1.style.display = "none";
    dropDownListModelModule2.style.display = "none";
    dropDownListManufacturerModule1.style.display = "none";
    dropDownListManufacturerModule2.style.display = "none";
    dropDownListModelInverter1.style.display = "none";
    dropDownListModelInverter2.style.display = "none";
    dropDownListModelInverter3.style.display = "none";
    dropDownListModelInverter4.style.display = "none";
    dropDownListManufacturerInverter1.style.display = "none";
    dropDownListManufacturerInverter2.style.display = "none";
    dropDownListManufacturerInverter3.style.display = "none";
    dropDownListManufacturerInverter4.style.display = "none";
    dropDownListUpdateModelModule1.style.display = "none";
    dropDownListUpdateModelModule2.style.display = "none";
    dropDownListUpdateManufacturerModule1.style.display = "none";
    dropDownListUpdateManufacturerModule2.style.display = "none";
    dropDownListUpdateModelInverter1.style.display = "none";
    dropDownListUpdateModelInverter2.style.display = "none";
    dropDownLisUpdatetModelInverter3.style.display = "none";
    dropDownListUpdateModelInverter4.style.display = "none";
    dropDownListUpdateManufacturerInverter1.style.display = "none";
    dropDownListUpdateManufacturerInverter2.style.display = "none";
    dropDownListUpdateManufacturerInverter3.style.display = "none";
    dropDownListUpdateManufacturerInverter4.style.display = "none";
    dropDownListNPhasesAdd.style.display = "none";
    dropDownListNewNPhasesAdd.style.display = "none";
    dropDownListGroupingNPhasesAdd.style.display = "none";
    dropDownListNPhasesUpdate.style.display = "none";
    dropDownListNewNPhasesUpdate.style.display = "none";
    dropDownListGroupingNPhasesUpdate.style.display = "none";
    dropDownListClientAdd.style.display = "none";
    dropDownListInstalationAdd.style.display = "none";
    dropDownListClientUpdate.style.display = "none";
    dropDownListInstalationUpdate.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayProjectInexistente.length; i++) {
        arrayProjectInexistente[i].style.visibility = "hidden"
        arrayProjectInexistente[i].style.display = "none"
    }
}

async function mostrar_campos_atualizar_projetos() {
    let divSearchUpdateProject = document.getElementById('container-search-to-update-projects');
    let divUpdateProject = document.getElementById('container-update-projects-general');
    let divInverter2 = document.getElementById('container-inversor-22');
    let divInverter3 = document.getElementById('container-inversor-32');
    let divInverter4 = document.getElementById('container-inversor-42');
    let dropDownListSearchProject = document.getElementById('idprojeto-buscar');
    let dropDownListUpdateProject = document.getElementById('idprojeto-buscar-atualizar');
    let dropDownListPrintProject = document.getElementById('idprojeto-imprimir');
    let dropDownListDeleteProject = document.getElementById('idprojeto-deletar');
    let dropDownListNPhasesAdd = document.getElementById('nfasesadicionar');
    let dropDownListNewNPhasesAdd = document.getElementById('novonfasesadicionar');
    let dropDownListGroupingNPhasesAdd = document.getElementById('nfasesagrupamentoadicionar');
    let dropDownListNPhasesUpdate = document.getElementById('nfasesatualizar');
    let dropDownListNewNPhasesUpdate = document.getElementById('novonfasesatualizar');
    let dropDownListGroupingNPhasesUpdate = document.getElementById('nfasesagrupamentoatualizar');
    let dropDownListClientAdd = document.getElementById('numerocliente-adicionar')
    let dropDownListInstalationAdd = document.getElementById('numeroinstalacao-adicionar')
    let dropDownListClientUpdate = document.getElementById('numerocliente-atualizar')
    let dropDownListInstalationUpdate = document.getElementById('numeroinstalacao-atualizar')
    
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-projetos');
    let arrayProjectInexistente = document.getElementsByClassName('container-projeto-inexistente');

    let idProjeto = document.getElementById('id-projeto-buscar-atualizar').value;
    
    if (idProjeto != '') {
        let config = {
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosOriginais = await axios.get(
            'https://entrada-dados.onrender.com/projects/' + idProjeto.toString(), config
        ).then(
            function (response) {
                const dadosOriginais = response.data;
                return dadosOriginais;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (dadosOriginais != 'Error: Request failed with status code 404' & dadosOriginais != 'Error: Request failed with status code 401') {
            let fabricante_modulo_1 = '';
            let fabricante_modulo_2 = '';
            let fabricante_inversor_1 = '';
            let fabricante_inversor_2 = '';
            let fabricante_inversor_3 = '';
            let fabricante_inversor_4 = '';

            if (dadosOriginais.modelo_modulo_1 != '') {
                let dadosModulo1 = await axios.get(
                    'https://entrada-dados.onrender.com/modules?buscar=' + dadosOriginais.modelo_modulo_1, config
                ).then(
                    function (response) {
                        const dadosModulo1 = response.data;
                        return dadosModulo1;
                    }
                ).catch(
                    function (error) {
                        console.log(error);
                        return error;
                    }
                )

                fabricante_modulo_1 = dadosModulo1[0]['fabricante']
            }

            if (dadosOriginais.modelo_modulo_2 != '') {
                let dadosModulo2 = await axios.get(
                    'https://entrada-dados.onrender.com/modules?buscar=' + dadosOriginais.modelo_modulo_2, config
                ).then(
                    function (response) {
                        const dadosModulo2 = response.data;
                        return dadosModulo2;
                    }
                ).catch(
                    function (error) {
                        console.log(error);
                        return error;
                    }
                )

                fabricante_modulo_2 = dadosModulo2[0]['fabricante']
            }

            if (dadosOriginais.modelo_inversor_1 != '') {
                let dadosInversor1 = await axios.get(
                    'https://entrada-dados.onrender.com/inverters?buscar=' + dadosOriginais.modelo_inversor_1, config
                ).then(
                    function (response) {
                        const dadosInversor1 = response.data;
                        return dadosInversor1;
                    }
                ).catch(
                    function (error) {
                        console.log(error);
                        return error;
                    }
                )

                fabricante_inversor_1 = dadosInversor1[0]['fabricante']
            }

            if (dadosOriginais.modelo_inversor_2 != '') {
                let dadosInversor2 = await axios.get(
                    'https://entrada-dados.onrender.com/inverters?buscar=' + dadosOriginais.modelo_inversor_2, config
                ).then(
                    function (response) {
                        const dadosInversor2 = response.data;
                        return dadosInversor2;
                    }
                ).catch(
                    function (error) {
                        console.log(error);
                        return error;
                    }
                )

                fabricante_inversor_2 = dadosInversor2[0]['fabricante']

                divInverter2.style.visibility = "visible"
                divInverter2.style.display = "grid"
            }

            if (dadosOriginais.modelo_inversor_3 != '') {
                let dadosInversor3 = await axios.get(
                    'https://entrada-dados.onrender.com/inverters?buscar=' + dadosOriginais.modelo_inversor_3, config
                ).then(
                    function (response) {
                        const dadosInversor3 = response.data;
                        return dadosInversor3;
                    }
                ).catch(
                    function (error) {
                        console.log(error);
                        return error;
                    }
                )

                fabricante_inversor_3 = dadosInversor3[0]['fabricante']

                divInverter3.style.visibility = "visible"
                divInverter3.style.display = "grid"
            }

            if (dadosOriginais.modelo_inversor_4 != '') {
                let dadosInversor4 = await axios.get(
                    'https://entrada-dados.onrender.com/inverters?buscar=' + dadosOriginais.modelo_inversor_4, config
                ).then(
                    function (response) {
                        const dadosInversor4 = response.data;
                        return dadosInversor4;
                    }
                ).catch(
                    function (error) {
                        console.log(error);
                        return error;
                    }
                )
                
                fabricante_inversor_4 = dadosInversor4[0]['fabricante']

                divInverter4.style.visibility = "visible"
                divInverter4.style.display = "grid"
            }

            divSearchUpdateProject.style.visibility = "hidden"
            divSearchUpdateProject.style.display = "none"
            dropDownListSearchProject.style.display = "none";
            dropDownListUpdateProject.style.display = "none";
            dropDownListPrintProject.style.display = "none";
            dropDownListDeleteProject.style.display = "none";
            dropDownListNPhasesAdd.style.display = "none";
            dropDownListNewNPhasesAdd.style.display = "none";
            dropDownListGroupingNPhasesAdd.style.display = "none";
            dropDownListNPhasesUpdate.style.display = "none";
            dropDownListNewNPhasesUpdate.style.display = "none";
            dropDownListGroupingNPhasesUpdate.style.display = "none";
            dropDownListClientAdd.style.display = "none";
            dropDownListInstalationAdd.style.display = "none";
            dropDownListClientUpdate.style.display = "none";
            dropDownListInstalationUpdate.style.display = "none";
            divUpdateProject.style.visibility = "visible"
            divUpdateProject.style.display = "grid"

            document.getElementById('número-instalação-atualizar').value = dadosOriginais.numero_instalacao
            document.getElementById('número-cliente-atualizar').value = dadosOriginais.numero_cliente
            document.getElementById('checkbox-ligacao-2').checked = dadosOriginais.ligacao_nova
            document.getElementById('checkbox-aumento-carga-2').checked = dadosOriginais.aumento_carga
            document.getElementById('checkbox-aumento-usina-2').checked = dadosOriginais.aumento_usina
            document.getElementById('checkbox-agrupamento-2').checked = dadosOriginais.agrupamento
            document.getElementById('n-fases-atualizar').value = dadosOriginais.n_fases
            document.getElementById('disjuntor-atualizar').value = dadosOriginais.disjuntor
            document.getElementById('novo-n-fases-atualizar').value = dadosOriginais.novo_n_fases
            document.getElementById('novo-disjuntor-atualizar').value = dadosOriginais.novo_disjuntor
            document.getElementById('n-fases-agrupamento-atualizar').value = dadosOriginais.n_fases_agrupamento
            document.getElementById('disjuntor-agrupamento-atualizar').value = dadosOriginais.disjuntor_agrupamento
            document.getElementById('tensão-atualizar').value = dadosOriginais.tensao
            document.getElementById('quantidade-módulo-1-atualizar').value = dadosOriginais.quantidade_modulo_1
            document.getElementById('modulo-anterior-1-atualizar').checked = dadosOriginais.modulo_anterior_1
            document.getElementById('fabricante-módulo-1-atualizar').value = fabricante_modulo_1
            document.getElementById('modelo-módulo-1-atualizar').value = dadosOriginais.modelo_modulo_1
            document.getElementById('quantidade-módulo-2-atualizar').value = dadosOriginais.quantidade_modulo_2
            document.getElementById('modulo-anterior-2-atualizar').checked = dadosOriginais.modulo_anterior_2
            document.getElementById('fabricante-módulo-2-atualizar').value = fabricante_modulo_2
            document.getElementById('modelo-módulo-2-atualizar').value = dadosOriginais.modelo_modulo_2
            document.getElementById('quantidade-inversor-1-atualizar').value = dadosOriginais.quantidade_inversor_1
            document.getElementById('inversor-anterior-1-atualizar').checked = dadosOriginais.inversor_anterior_1
            document.getElementById('fabricante-inversor-1-atualizar').value = fabricante_inversor_1
            document.getElementById('modelo-inversor-1-atualizar').value = dadosOriginais.modelo_inversor_1
            document.getElementById('quantidade-inversor-2-atualizar').value = dadosOriginais.quantidade_inversor_2
            document.getElementById('inversor-anterior-2-atualizar').checked = dadosOriginais.inversor_anterior_2
            document.getElementById('fabricante-inversor-2-atualizar').value = fabricante_inversor_2
            document.getElementById('modelo-inversor-2-atualizar').value = dadosOriginais.modelo_inversor_2
            document.getElementById('quantidade-inversor-3-atualizar').value = dadosOriginais.quantidade_inversor_3
            document.getElementById('inversor-anterior-3-atualizar').checked = dadosOriginais.inversor_anterior_3
            document.getElementById('fabricante-inversor-3-atualizar').value = fabricante_inversor_3
            document.getElementById('modelo-inversor-3-atualizar').value = dadosOriginais.modelo_inversor_3
            document.getElementById('quantidade-inversor-4-atualizar').value = dadosOriginais.quantidade_inversor_4
            document.getElementById('inversor-anterior-4-atualizar').checked = dadosOriginais.inversor_anterior_4
            document.getElementById('fabricante-inversor-4-atualizar').value = fabricante_inversor_4
            document.getElementById('modelo-inversor-4-atualizar').value = dadosOriginais.modelo_inversor_4
            
            ligacao_nova2();
            aumento_carga2();
            aumento_usina2();
            agrupamento2();

            for(i = 0; i < arrayCamposObrigatorios.length; i++) {
                arrayCamposObrigatorios[i].style.visibility = "hidden"
                arrayCamposObrigatorios[i].style.display = "none"
            }

            for(i = 0; i < arrayProjectInexistente.length; i++) {
                arrayProjectInexistente[i].style.visibility = "hidden"
                arrayProjectInexistente[i].style.display = "hidden"
            }
        }  

        else if (dadosOriginais == 'Error: Request failed with status code 404') {
            for(i = 0; i < arrayProjectInexistente.length; i++) {
                arrayProjectInexistente[i].style.visibility = "visible"
                arrayProjectInexistente[i].style.display = "flex"
            }
        }

        else {
            localStorage.setItem('access_token', dadosOriginais);
            checar_autorizacao();
        }
    }

    else {
        for(i = 0; i < arrayCamposObrigatorios.length; i++) {
            arrayCamposObrigatorios[i].style.visibility = "visible"
            arrayCamposObrigatorios[i].style.display = "grid"
        }
    }
}

function imprimir_projeto() {
    let divGeral = document.getElementById('container-geral');
    let divSearchProject = document.getElementById('container-search-projects');
    let divAddProject = document.getElementById('container-add-projects-general');
    let divSearchUpdateProject = document.getElementById('container-search-to-update-projects');
    let divUpdateProject = document.getElementById('container-update-projects-general');
    let divPrintProject = document.getElementById('container-print-projects');
    let divDeleteProject = document.getElementById('container-delete-projects');
    let divProjectFound = document.getElementById('container-projeto-encontrado');
    let divProjectAdded = document.getElementById('container-projeto-adicionado');
    let divProjectUpdated = document.getElementById('container-projeto-atualizado');
    let divProjectPrinted = document.getElementById('container-projeto-impresso');
    let divProjectDeleted = document.getElementById('container-projeto-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-projetos');
    let arrayProjectInexistente = document.getElementsByClassName('container-projeto-inexistente');
    let dropDownListSearchProject = document.getElementById('idprojeto-buscar');
    let dropDownListUpdateProject = document.getElementById('idprojeto-buscar-atualizar');
    let dropDownListPrintProject = document.getElementById('idprojeto-imprimir');
    let dropDownListDeleteProject = document.getElementById('idprojeto-deletar');
    let dropDownListModelModule1 = document.getElementById('modelomodulo-1-adicionar');
    let dropDownListModelModule2 = document.getElementById('modelomodulo-2-adicionar');
    let dropDownListManufacturerModule1 = document.getElementById('fabricantemodulo-1-adicionar');
    let dropDownListManufacturerModule2 = document.getElementById('fabricantemodulo-2-adicionar');
    let dropDownListModelInverter1 = document.getElementById('modeloinversor-1-adicionar');
    let dropDownListModelInverter2 = document.getElementById('modeloinversor-2-adicionar');
    let dropDownListModelInverter3 = document.getElementById('modeloinversor-3-adicionar');
    let dropDownListModelInverter4 = document.getElementById('modeloinversor-4-adicionar');
    let dropDownListManufacturerInverter1 = document.getElementById('fabricanteinversor-1-adicionar');
    let dropDownListManufacturerInverter2 = document.getElementById('fabricanteinversor-2-adicionar');
    let dropDownListManufacturerInverter3 = document.getElementById('fabricanteinversor-3-adicionar');
    let dropDownListManufacturerInverter4 = document.getElementById('fabricanteinversor-1-adicionar');
    let dropDownListUpdateModelModule1 = document.getElementById('modelomodulo-1-atualizar');
    let dropDownListUpdateModelModule2 = document.getElementById('modelomodulo-2-atualizar');
    let dropDownListUpdateManufacturerModule1 = document.getElementById('fabricantemodulo-1-atualizar');
    let dropDownListUpdateManufacturerModule2 = document.getElementById('fabricantemodulo-2-atualizar');
    let dropDownListUpdateModelInverter1 = document.getElementById('modeloinversor-1-atualizar');
    let dropDownListUpdateModelInverter2 = document.getElementById('modeloinversor-2-atualizar');
    let dropDownLisUpdatetModelInverter3 = document.getElementById('modeloinversor-3-atualizar');
    let dropDownListUpdateModelInverter4 = document.getElementById('modeloinversor-4-atualizar');
    let dropDownListUpdateManufacturerInverter1 = document.getElementById('fabricanteinversor-1-atualizar');
    let dropDownListUpdateManufacturerInverter2 = document.getElementById('fabricanteinversor-2-atualizar');
    let dropDownListUpdateManufacturerInverter3 = document.getElementById('fabricanteinversor-3-atualizar');
    let dropDownListUpdateManufacturerInverter4 = document.getElementById('fabricanteinversor-1-atualizar');
    let dropDownListNPhasesAdd = document.getElementById('nfasesadicionar');
    let dropDownListNewNPhasesAdd = document.getElementById('novonfasesadicionar');
    let dropDownListGroupingNPhasesAdd = document.getElementById('nfasesagrupamentoadicionar');
    let dropDownListNPhasesUpdate = document.getElementById('nfasesatualizar');
    let dropDownListNewNPhasesUpdate = document.getElementById('novonfasesatualizar');
    let dropDownListGroupingNPhasesUpdate = document.getElementById('nfasesagrupamentoatualizar');
    let dropDownListClientAdd = document.getElementById('numerocliente-adicionar')
    let dropDownListInstalationAdd = document.getElementById('numeroinstalacao-adicionar')
    let dropDownListClientUpdate = document.getElementById('numerocliente-atualizar')
    let dropDownListInstalationUpdate = document.getElementById('numeroinstalacao-atualizar')
  
    document.getElementById('id-projeto-deletar').value = ''
    
    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchProject.style.visibility = "hidden";
    divSearchProject.style.display = "none";
    divAddProject.style.visibility = "hidden";
    divAddProject.style.display = "none";
    divSearchUpdateProject.style.visibility = "hidden"
    divSearchUpdateProject.style.display = "none"
    divUpdateProject.style.visibility = "hidden";
    divUpdateProject.style.display = "none";
    divPrintProject.style.visibility = "visible";
    divPrintProject.style.display = "grid";
    divDeleteProject.style.visibility = "hidden";
    divDeleteProject.style.display = "none";
    divProjectFound.style.visibility = "hidden";
    divProjectFound.style.display = "none";
    divProjectAdded.style.visibility = "hidden";
    divProjectAdded.style.display = "none";
    divProjectUpdated.style.visibility = "hidden";
    divProjectUpdated.style.display = "none";
    divProjectPrinted.style.visibility = "hidden";
    divProjectPrinted.style.display = "none";
    divProjectDeleted.style.visibility = "hidden";
    divProjectDeleted.style.display = "none";
    dropDownListSearchProject.style.display = "none";
    dropDownListUpdateProject.style.display = "none";
    dropDownListPrintProject.style.display = "none";
    dropDownListDeleteProject.style.display = "none";
    dropDownListModelModule1.style.display = "none";
    dropDownListModelModule2.style.display = "none";
    dropDownListManufacturerModule1.style.display = "none";
    dropDownListManufacturerModule2.style.display = "none";
    dropDownListModelInverter1.style.display = "none";
    dropDownListModelInverter2.style.display = "none";
    dropDownListModelInverter3.style.display = "none";
    dropDownListModelInverter4.style.display = "none";
    dropDownListManufacturerInverter1.style.display = "none";
    dropDownListManufacturerInverter2.style.display = "none";
    dropDownListManufacturerInverter3.style.display = "none";
    dropDownListManufacturerInverter4.style.display = "none";
    dropDownListUpdateModelModule1.style.display = "none";
    dropDownListUpdateModelModule2.style.display = "none";
    dropDownListUpdateManufacturerModule1.style.display = "none";
    dropDownListUpdateManufacturerModule2.style.display = "none";
    dropDownListUpdateModelInverter1.style.display = "none";
    dropDownListUpdateModelInverter2.style.display = "none";
    dropDownLisUpdatetModelInverter3.style.display = "none";
    dropDownListUpdateModelInverter4.style.display = "none";
    dropDownListUpdateManufacturerInverter1.style.display = "none";
    dropDownListUpdateManufacturerInverter2.style.display = "none";
    dropDownListUpdateManufacturerInverter3.style.display = "none";
    dropDownListUpdateManufacturerInverter4.style.display = "none";
    dropDownListNPhasesAdd.style.display = "none";
    dropDownListNewNPhasesAdd.style.display = "none";
    dropDownListGroupingNPhasesAdd.style.display = "none";
    dropDownListNPhasesUpdate.style.display = "none";
    dropDownListNewNPhasesUpdate.style.display = "none";
    dropDownListGroupingNPhasesUpdate.style.display = "none";
    dropDownListClientAdd.style.display = "none";
    dropDownListInstalationAdd.style.display = "none";
    dropDownListClientUpdate.style.display = "none";
    dropDownListInstalationUpdate.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayProjectInexistente.length; i++) {
        arrayProjectInexistente[i].style.visibility = "hidden"
        arrayProjectInexistente[i].style.display = "none"
    }
}

function deletar_projeto() {
    let divGeral = document.getElementById('container-geral');
    let divSearchProject = document.getElementById('container-search-projects');
    let divAddProject = document.getElementById('container-add-projects-general');
    let divSearchUpdateProject = document.getElementById('container-search-to-update-projects');
    let divUpdateProject = document.getElementById('container-update-projects-general');
    let divPrintProject = document.getElementById('container-print-projects');
    let divDeleteProject = document.getElementById('container-delete-projects');
    let divProjectFound = document.getElementById('container-projeto-encontrado');
    let divProjectAdded = document.getElementById('container-projeto-adicionado');
    let divProjectUpdated = document.getElementById('container-projeto-atualizado');
    let divProjectPrinted = document.getElementById('container-projeto-impresso');
    let divProjectDeleted = document.getElementById('container-projeto-deletado');
    let arrayCamposObrigatorios = document.getElementsByClassName('campo-obrigatorio-projetos');
    let arrayProjectInexistente = document.getElementsByClassName('container-projeto-inexistente');
    let dropDownListSearchProject = document.getElementById('idprojeto-buscar');
    let dropDownListUpdateProject = document.getElementById('idprojeto-buscar-atualizar');
    let dropDownListPrintProject = document.getElementById('idprojeto-imprimir');
    let dropDownListDeleteProject = document.getElementById('idprojeto-deletar');
    let dropDownListModelModule1 = document.getElementById('modelomodulo-1-adicionar');
    let dropDownListModelModule2 = document.getElementById('modelomodulo-2-adicionar');
    let dropDownListManufacturerModule1 = document.getElementById('fabricantemodulo-1-adicionar');
    let dropDownListManufacturerModule2 = document.getElementById('fabricantemodulo-2-adicionar');
    let dropDownListModelInverter1 = document.getElementById('modeloinversor-1-adicionar');
    let dropDownListModelInverter2 = document.getElementById('modeloinversor-2-adicionar');
    let dropDownListModelInverter3 = document.getElementById('modeloinversor-3-adicionar');
    let dropDownListModelInverter4 = document.getElementById('modeloinversor-4-adicionar');
    let dropDownListManufacturerInverter1 = document.getElementById('fabricanteinversor-1-adicionar');
    let dropDownListManufacturerInverter2 = document.getElementById('fabricanteinversor-2-adicionar');
    let dropDownListManufacturerInverter3 = document.getElementById('fabricanteinversor-3-adicionar');
    let dropDownListManufacturerInverter4 = document.getElementById('fabricanteinversor-1-adicionar');
    let dropDownListUpdateModelModule1 = document.getElementById('modelomodulo-1-atualizar');
    let dropDownListUpdateModelModule2 = document.getElementById('modelomodulo-2-atualizar');
    let dropDownListUpdateManufacturerModule1 = document.getElementById('fabricantemodulo-1-atualizar');
    let dropDownListUpdateManufacturerModule2 = document.getElementById('fabricantemodulo-2-atualizar');
    let dropDownListUpdateModelInverter1 = document.getElementById('modeloinversor-1-atualizar');
    let dropDownListUpdateModelInverter2 = document.getElementById('modeloinversor-2-atualizar');
    let dropDownLisUpdatetModelInverter3 = document.getElementById('modeloinversor-3-atualizar');
    let dropDownListUpdateModelInverter4 = document.getElementById('modeloinversor-4-atualizar');
    let dropDownListUpdateManufacturerInverter1 = document.getElementById('fabricanteinversor-1-atualizar');
    let dropDownListUpdateManufacturerInverter2 = document.getElementById('fabricanteinversor-2-atualizar');
    let dropDownListUpdateManufacturerInverter3 = document.getElementById('fabricanteinversor-3-atualizar');
    let dropDownListUpdateManufacturerInverter4 = document.getElementById('fabricanteinversor-1-atualizar');
    let dropDownListNPhasesAdd = document.getElementById('nfasesadicionar');
    let dropDownListNewNPhasesAdd = document.getElementById('novonfasesadicionar');
    let dropDownListGroupingNPhasesAdd = document.getElementById('nfasesagrupamentoadicionar');
    let dropDownListNPhasesUpdate = document.getElementById('nfasesatualizar');
    let dropDownListNewNPhasesUpdate = document.getElementById('novonfasesatualizar');
    let dropDownListGroupingNPhasesUpdate = document.getElementById('nfasesagrupamentoatualizar');
    let dropDownListClientAdd = document.getElementById('numerocliente-adicionar')
    let dropDownListInstalationAdd = document.getElementById('numeroinstalacao-adicionar')
    let dropDownListClientUpdate = document.getElementById('numerocliente-atualizar')
    let dropDownListInstalationUpdate = document.getElementById('numeroinstalacao-atualizar')
  
    document.getElementById('id-projeto-deletar').value = ''
    
    divGeral.style.visibility = "hidden"
    divGeral.style.display = "none";
    divSearchProject.style.visibility = "hidden";
    divSearchProject.style.display = "none";
    divAddProject.style.visibility = "hidden";
    divAddProject.style.display = "none";
    divSearchUpdateProject.style.visibility = "hidden"
    divSearchUpdateProject.style.display = "none"
    divUpdateProject.style.visibility = "hidden";
    divUpdateProject.style.display = "none";
    divPrintProject.style.visibility = "hidden";
    divPrintProject.style.display = "none";
    divDeleteProject.style.visibility = "visible";
    divDeleteProject.style.display = "grid";
    divProjectFound.style.visibility = "hidden";
    divProjectFound.style.display = "none";
    divProjectAdded.style.visibility = "hidden";
    divProjectAdded.style.display = "none";
    divProjectUpdated.style.visibility = "hidden";
    divProjectUpdated.style.display = "none";
    divProjectPrinted.style.visibility = "hidden";
    divProjectPrinted.style.display = "none";
    divProjectDeleted.style.visibility = "hidden";
    divProjectDeleted.style.display = "none";
    dropDownListSearchProject.style.display = "none";
    dropDownListUpdateProject.style.display = "none";
    dropDownListPrintProject.style.display = "none";
    dropDownListDeleteProject.style.display = "none";
    dropDownListModelModule1.style.display = "none";
    dropDownListModelModule2.style.display = "none";
    dropDownListManufacturerModule1.style.display = "none";
    dropDownListManufacturerModule2.style.display = "none";
    dropDownListModelInverter1.style.display = "none";
    dropDownListModelInverter2.style.display = "none";
    dropDownListModelInverter3.style.display = "none";
    dropDownListModelInverter4.style.display = "none";
    dropDownListManufacturerInverter1.style.display = "none";
    dropDownListManufacturerInverter2.style.display = "none";
    dropDownListManufacturerInverter3.style.display = "none";
    dropDownListManufacturerInverter4.style.display = "none";
    dropDownListUpdateModelModule1.style.display = "none";
    dropDownListUpdateModelModule2.style.display = "none";
    dropDownListUpdateManufacturerModule1.style.display = "none";
    dropDownListUpdateManufacturerModule2.style.display = "none";
    dropDownListUpdateModelInverter1.style.display = "none";
    dropDownListUpdateModelInverter2.style.display = "none";
    dropDownLisUpdatetModelInverter3.style.display = "none";
    dropDownListUpdateModelInverter4.style.display = "none";
    dropDownListUpdateManufacturerInverter1.style.display = "none";
    dropDownListUpdateManufacturerInverter2.style.display = "none";
    dropDownListUpdateManufacturerInverter3.style.display = "none";
    dropDownListUpdateManufacturerInverter4.style.display = "none";
    dropDownListNPhasesAdd.style.display = "none";
    dropDownListNewNPhasesAdd.style.display = "none";
    dropDownListGroupingNPhasesAdd.style.display = "none";
    dropDownListNPhasesUpdate.style.display = "none";
    dropDownListNewNPhasesUpdate.style.display = "none";
    dropDownListGroupingNPhasesUpdate.style.display = "none";
    dropDownListClientAdd.style.display = "none";
    dropDownListInstalationAdd.style.display = "none";
    dropDownListClientUpdate.style.display = "none";
    dropDownListInstalationUpdate.style.display = "none";

    for(i = 0; i < arrayCamposObrigatorios.length; i++) {
        arrayCamposObrigatorios[i].style.visibility = "hidden"
        arrayCamposObrigatorios[i].style.display = "none"
    }

    for(i = 0; i < arrayProjectInexistente.length; i++) {
        arrayProjectInexistente[i].style.visibility = "hidden"
        arrayProjectInexistente[i].style.display = "none"
    }
}

// FUNÇÕES PARA A PÁGINA DE PROJETOS
function ligacao_nova1() {
    let estadoLigacao1 = document.getElementById('checkbox-ligacao-1').checked;
    let arrayCheckbox = document.getElementsByClassName('form-checkbox-aumento-usina');
    let arrayContainer = document.getElementsByClassName('container-modulo-2')
    
    if (estadoLigacao1 == true) {
        document.getElementById('checkbox-aumento-carga-1').checked = false;
        document.getElementById('checkbox-aumento-usina-1').checked = false;

        document.getElementById('número-instalação-adicionar').value = ''

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

        document.getElementById('número-instalação-atualizar').value = 0

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
    let checkboxModulo1 = document.getElementById('modulo-anterior-1-adicionar');
    let checkboxModulo2 = document.getElementById('modulo-anterior-2-adicionar');
    let checkboxInversor1 = document.getElementById('inversor-anterior-1-adicionar');
    let checkboxInversor2 = document.getElementById('inversor-anterior-2-adicionar');
    let checkboxInversor3 = document.getElementById('inversor-anterior-3-adicionar');
    let checkboxInversor4 = document.getElementById('inversor-anterior-4-adicionar');
    let containerInversor2 = document.getElementById('container-inversor-21');

    if (estadoAumentoUsina1 == true) {
        document.getElementById('checkbox-ligacao-1').checked = false;

        document.getElementById('container-numero-instalacao-1').style.visibility = "visible";
        document.getElementById('container-numero-instalacao-1').style.display = "grid";

        checkboxModulo1.checked = true;
        checkboxInversor1.checked = true;
        containerInversor2.style.visibility = "visible";
        containerInversor2.style.display = "grid";
        
        for (let i = 0; i < arrayCheckbox.length; i++) {
            arrayCheckbox[i].style.visibility = "visible";
        }

        for (let i = 0; i < arrayContainer.length; i++) {
            arrayContainer[i].style.visibility = "visible";
            arrayContainer[i].style.display = "grid";
        }
    }

    else if(estadoAumentoUsina1 == false) {
        document.getElementById('quantidade-módulo-2-adicionar').value = '';
        document.getElementById('fabricante-módulo-2-adicionar').value = '';
        document.getElementById('modelo-módulo-2-adicionar').value = '';
        
        checkboxModulo1.checked = false;
        checkboxModulo2.checked = false;
        checkboxInversor1.checked = false;
        checkboxInversor2.checked = false;
        checkboxInversor3.checked = false;
        checkboxInversor4.checked = false;
        containerInversor2.style.visibility = "hidden";
        containerInversor2.style.display = "none";

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
    let checkboxModulo1 = document.getElementById('modulo-anterior-1-atualizar');
    let checkboxModulo2 = document.getElementById('modulo-anterior-2-atualizar');
    let checkboxInversor1 = document.getElementById('inversor-anterior-1-atualizar');
    let checkboxInversor2 = document.getElementById('inversor-anterior-2-atualizar');
    let checkboxInversor3 = document.getElementById('inversor-anterior-3-atualizar');
    let checkboxInversor4 = document.getElementById('inversor-anterior-4-atualizar');
    let containerInversor2 = document.getElementById('container-inversor-22');

    if (estadoAumentoUsina2 == true) {
        document.getElementById('checkbox-ligacao-2').checked = false;

        document.getElementById('container-numero-instalacao-2').style.visibility = "visible";
        document.getElementById('container-numero-instalacao-2').style.display = "grid";
        
        checkboxModulo1.checked = true;
        checkboxInversor1.checked = true;
        containerInversor2.style.visibility = "visible";
        containerInversor2.style.display = "grid";

        for (let i = 0; i < arrayCheckbox.length; i++) {
            arrayCheckbox[i].style.visibility = "visible";
        }

        for (let i = 0; i < arrayContainer.length; i++) {
            arrayContainer[i].style.visibility = "visible";
            arrayContainer[i].style.display = "grid";
        }
    }

    else if(estadoAumentoUsina2 == false) {
        document.getElementById('quantidade-módulo-2-atualizar').value = ''
        document.getElementById('fabricante-módulo-2-atualizar').value = ''
        document.getElementById('modelo-módulo-2-atualizar').value = ''
        
        checkboxModulo1.checked = false;
        checkboxModulo2.checked = false;
        checkboxInversor1.checked = false;
        checkboxInversor2.checked = false;
        checkboxInversor3.checked = false;
        checkboxInversor4.checked = false;
        containerInversor2.style.visibility = "hidden";
        containerInversor2.style.display = "none";

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

function modulo_antigo(descricao) {
    let checkboxModuloAntigo = document.getElementById('modulo-anterior-' + descricao);

    let arrayDescricao = descricao.split('-');

    if (arrayDescricao[0] == '1') {
        checkboxModuloAtual = document.getElementById('modulo-anterior-2-' + arrayDescricao[1])
    }

    else {
        checkboxModuloAtual = document.getElementById('modulo-anterior-1-' + arrayDescricao[1])
    }

    if (checkboxModuloAntigo.checked == true) {
        checkboxModuloAtual.checked = false
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

async function mostrar_projetos(nomeFuncao) {
    let input = document.getElementById('id-projeto-' + nomeFuncao)
    let lista = document.getElementById('idprojeto-' + nomeFuncao)

    let id = []
    let cliente = []
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

        let dadosTodosProjetos = await axios.get(
            'https://entrada-dados.onrender.com/all-projects', config
        ).then(
            function (response) {
                const dadosTodosProjetos = response.data;
                return dadosTodosProjetos;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )

        if (dadosTodosProjetos != 'Error: Request failed with status code 401' & dadosTodosProjetos != 'Error: Request failed with status code 404') {
            for (i = 0; i < dadosTodosProjetos.length; i++) {
                id[i] = String(dadosTodosProjetos[i].id);
                cliente[i] = await axios.get(
                    'https://entrada-dados.onrender.com/clients/' + dadosTodosProjetos[i].numero_cliente, config
                ).then(
                    function (response) {
                        const dadosTodosProjetos = response.data.nome;
                        return dadosTodosProjetos;
                    }
                ).catch(
                    function (error) {
                        console.log(error);
                        return error;
                    }
                )

                endereco[i] = await axios.get(
                    'https://entrada-dados.onrender.com/instalations/' + dadosTodosProjetos[i].numero_instalacao, config
                ).then(
                    function (response) {
                        const dadosTodosProjetos = response.data.logradouro + ', ' + response.data.numero_predial + ' ' + response.data.complemento + ', ' + response.data.bairro + ', ' + response.data.cidade + ' - MG ';
                        return dadosTodosProjetos;
                    }
                ).catch(
                    function (error) {
                        console.log(error);
                        return error;
                    }
                )
                
                let opcao_atual = document.createElement('option');
                let texto = document.createTextNode('ID #' + id[i] + ' - ' + cliente[i] + ' - ' + endereco[i])
                
                opcao_atual.value = 'ID #' + id[i] + ' - ' + cliente[i] + ' - ' + endereco[i]
                opcao_atual.appendChild(texto)
                lista.appendChild(opcao_atual)
            }
        }

        else if (dadosTodosProjetos == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosProjetos);
            checar_autorizacao();
        }
    }

    localStorage.setItem('id_projeto', id)
    localStorage.setItem('cliente_projeto', cliente)
    localStorage.setItem('endereco_projeto', endereco.join('///'))
    
    lista.style.display = 'grid';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split(' ')[1].split('#')[1];
            lista.style.display = 'none';
        }
    }
}

function filtrar_projetos(nomeFuncao) {
    let input = document.getElementById('id-projeto-' + nomeFuncao);
    let lista = document.getElementById('idprojeto-' + nomeFuncao);
    
    let id = localStorage.getItem('id_projeto').split(',')
    let cliente = localStorage.getItem('cliente_projeto').split(',')
    let endereco = localStorage.getItem('endereco_projeto').split('///')

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    for (i = 0; i < id.length; i++) {
        let opcao_atual = document.createElement('option');
        let texto = document.createTextNode('ID #' + id[i] + ' - ' + cliente[i] + ' - ' + endereco[i])
        
        opcao_atual.value = 'ID #' + id[i] + ' - ' + cliente[i] + ' - ' + endereco[i]
        opcao_atual.appendChild(texto)
        lista.appendChild(opcao_atual)
    }

    let idProjeto = input.value.toUpperCase();
    let nOpcoes = lista.options.length - 1;

    for (i = nOpcoes; i >= 0; i--) {
        if (lista.options[i].value.includes(idProjeto) == false) {
            lista.children[i].remove()
        }
    }
    
    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value.split(' ')[1].split('#')[1];
            lista.style.display = 'none';
        }
    }
}

function mostrar_fases(nomeInput) {
    let input = document.getElementById(nomeInput)
    let lista = document.getElementById(nomeInput.split('-').join(''))

    lista.style.display = 'block';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

async function mostrar_fabricantes_modulos(nomeFuncao) {
    let input = document.getElementById('fabricante-módulo-' + nomeFuncao)
    let lista = document.getElementById('fabricantemodulo-' + nomeFuncao)

    let fabricante = []
    let fabricanteUnico = []
    
    document.getElementById('modelo-módulo-' + nomeFuncao).value = ''

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

        fabricante = await axios.get(
            'https://entrada-dados.onrender.com/all-modules', config
        ).then(
            function (response) {
                const fabricante = response.data;
                return fabricante;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )

        if (fabricante != 'Error: Request failed with status code 401' & fabricante != 'Error: Request failed with status code 404') {
            contadorFabricantes = 0;
            
            for (i = 0; i < fabricante.length; i++) {
                let adicionado = false
                let fabricanteAtual = fabricante[i].fabricante
                
                for (j = 0; j < fabricanteUnico.length; j++) {
                    if (fabricanteAtual == fabricanteUnico[j]) {
                        adicionado = true;
                    }
                }

                if (adicionado == false) {
                    fabricanteUnico[contadorFabricantes] = fabricanteAtual
                    contadorFabricantes += 1
                }
            }

            fabricanteUnico.sort()

            for(i = 0; i < fabricanteUnico.length; i++) {
                let opcao_atual = document.createElement('option');
                let texto = document.createTextNode(fabricanteUnico[i])
                
                opcao_atual.value = fabricanteUnico[i]
                opcao_atual.appendChild(texto)
                lista.appendChild(opcao_atual)
            }
        }

        else if (fabricante == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', fabricante);
            checar_autorizacao();
        }
    }

    localStorage.setItem('fabricante_modulos', fabricanteUnico)
    
    lista.style.display = 'grid';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

function filtrar_fabricantes_modulos(nomeFuncao) {
    let input = document.getElementById('fabricante-módulo-' + nomeFuncao)
    let lista = document.getElementById('fabricantemodulo-' + nomeFuncao)

    let fabricante = localStorage.getItem('fabricante_modulos').split(',')

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    for (i = 0; i < fabricante.length; i++) {
        let opcao_atual = document.createElement('option');
        let texto = document.createTextNode(fabricante[i])
        
        opcao_atual.value = fabricante[i]
        opcao_atual.appendChild(texto)
        lista.appendChild(opcao_atual)
    }

    let fabricanteEscolhido = input.value.toUpperCase();
    let nOpcoes = lista.options.length - 1;

    for (i = nOpcoes; i >= 0; i--) {
        if (lista.options[i].value.includes(fabricanteEscolhido) == false) {
            lista.children[i].remove()
        }
    }
    
    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

async function mostrar_modelos_modulos(nomeFuncao) {
    let fabricante = document.getElementById('fabricante-módulo-' + nomeFuncao).value
    let input = document.getElementById('modelo-módulo-' + nomeFuncao)
    let lista = document.getElementById('modelomodulo-' + nomeFuncao)

    let modelos = []
    
    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    let access_token = localStorage.getItem('access_token')

    if (fabricante != '' & access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        dadosTodosModulos = await axios.get(
            'https://entrada-dados.onrender.com/modules-' + fabricante, config
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
                modelos[i] = dadosTodosModulos[i].modelo
                let opcao_atual = document.createElement('option');
                let texto = document.createTextNode(modelos[i])
                
                opcao_atual.value = modelos[i]
                opcao_atual.appendChild(texto)
                lista.appendChild(opcao_atual)
            }
        }

        else if (modelos == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosModulos);
            checar_autorizacao();
        }
    }

    localStorage.setItem('modelo_modulos', modelos)
    
    lista.style.display = 'grid';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

function filtrar_modelos_modulos(nomeFuncao) {
    let input = document.getElementById('modelo-módulo-' + nomeFuncao)
    let lista = document.getElementById('modelomodulo-' + nomeFuncao)

    let modelo = localStorage.getItem('modelo_modulos').split(',')

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    for (i = 0; i < modelo.length; i++) {
        let opcao_atual = document.createElement('option');
        let texto = document.createTextNode(modelo[i])
        
        opcao_atual.value = modelo[i]
        opcao_atual.appendChild(texto)
        lista.appendChild(opcao_atual)
    }

    let modeloEscolhido = input.value.toUpperCase();
    let nOpcoes = lista.options.length - 1;

    for (i = nOpcoes; i >= 0; i--) {
        if (lista.options[i].value.includes(modeloEscolhido) == false) {
            lista.children[i].remove()
        }
    }
    
    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

async function mostrar_fabricantes_inversores(nomeFuncao) {
    let input = document.getElementById('fabricante-inversor-' + nomeFuncao)
    let lista = document.getElementById('fabricanteinversor-' + nomeFuncao)

    let fabricante = []
    let fabricanteUnico = []
    
    document.getElementById('modelo-inversor-' + nomeFuncao).value = ''

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

        fabricante = await axios.get(
            'https://entrada-dados.onrender.com/all-inverters', config
        ).then(
            function (response) {
                const fabricante = response.data;
                return fabricante;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )

        if (fabricante != 'Error: Request failed with status code 401' & fabricante != 'Error: Request failed with status code 404') {
            contadorFabricantes = 0;
            
            for (i = 0; i < fabricante.length; i++) {
                let adicionado = false
                let fabricanteAtual = fabricante[i].fabricante
                
                for (j = 0; j < fabricanteUnico.length; j++) {
                    if (fabricanteAtual == fabricanteUnico[j]) {
                        adicionado = true;
                    }
                }

                if (adicionado == false) {
                    fabricanteUnico[contadorFabricantes] = fabricanteAtual
                    contadorFabricantes += 1
                }
            }

            fabricanteUnico.sort()

            for(i = 0; i < fabricanteUnico.length; i++) {
                let opcao_atual = document.createElement('option');
                let texto = document.createTextNode(fabricanteUnico[i])
                
                opcao_atual.value = fabricanteUnico[i]
                opcao_atual.appendChild(texto)
                lista.appendChild(opcao_atual)
            }
        }

        else if (fabricante == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', fabricante);
            checar_autorizacao();
        }
    }

    localStorage.setItem('fabricante_inversores', fabricanteUnico)
    
    lista.style.display = 'grid';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

function filtrar_fabricantes_inversores(nomeFuncao) {
    let input = document.getElementById('fabricante-inversor-' + nomeFuncao)
    let lista = document.getElementById('fabricanteinversor-' + nomeFuncao)

    let fabricante = localStorage.getItem('fabricante_inversores').split(',')

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    for (i = 0; i < fabricante.length; i++) {
        let opcao_atual = document.createElement('option');
        let texto = document.createTextNode(fabricante[i])
        
        opcao_atual.value = fabricante[i]
        opcao_atual.appendChild(texto)
        lista.appendChild(opcao_atual)
    }

    let fabricanteEscolhido = input.value.toUpperCase();
    let nOpcoes = lista.options.length - 1;

    for (i = nOpcoes; i >= 0; i--) {
        if (lista.options[i].value.includes(fabricanteEscolhido) == false) {
            lista.children[i].remove()
        }
    }
    
    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

async function mostrar_modelos_inversores(nomeFuncao) {
    let fabricante = document.getElementById('fabricante-inversor-' + nomeFuncao).value
    let input = document.getElementById('modelo-inversor-' + nomeFuncao)
    let lista = document.getElementById('modeloinversor-' + nomeFuncao)

    let modelos = []
    
    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    let access_token = localStorage.getItem('access_token')

    if (fabricante != '' & access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        dadosTodosInversores = await axios.get(
            'https://entrada-dados.onrender.com/inverters-' + fabricante, config
        ).then(
            function (response) {
                const dadosTodosInversores = response.data;
                return dadosTodosInversores;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )

        if (dadosTodosInversores != 'Error: Request failed with status code 401' & dadosTodosInversores != 'Error: Request failed with status code 404') {
            for (i = 0; i < dadosTodosInversores.length; i++) {
                modelos[i] = dadosTodosInversores[i].modelo
                let opcao_atual = document.createElement('option');
                let texto = document.createTextNode(modelos[i])
                
                opcao_atual.value = modelos[i]
                opcao_atual.appendChild(texto)
                lista.appendChild(opcao_atual)
            }
        }

        else if (modelos == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosInversores);
            checar_autorizacao();
        }
    }

    localStorage.setItem('modelo_inversores', modelos)
    
    lista.style.display = 'grid';

    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

function filtrar_modelos_inversores(nomeFuncao) {
    let input = document.getElementById('modelo-inversor-' + nomeFuncao)
    let lista = document.getElementById('modeloinversor-' + nomeFuncao)

    let modelo = localStorage.getItem('modelo_inversores').split(',')

    while (lista.options.length > 0) {
        lista.children[0].remove()
    }

    for (i = 0; i < modelo.length; i++) {
        let opcao_atual = document.createElement('option');
        let texto = document.createTextNode(modelo[i])
        
        opcao_atual.value = modelo[i]
        opcao_atual.appendChild(texto)
        lista.appendChild(opcao_atual)
    }

    let modeloEscolhido = input.value.toUpperCase();
    let nOpcoes = lista.options.length - 1;

    for (i = nOpcoes; i >= 0; i--) {
        if (lista.options[i].value.includes(modeloEscolhido) == false) {
            lista.children[i].remove()
        }
    }
    
    for (let opcao of lista.options) {
        opcao.onclick = function () {
            input.value = opcao.value;
            lista.style.display = 'none';
        }
    }
}

async function modulos_por_inversor(descricao) {
    let checkboxModulo1 = document.getElementById('modulo-anterior-1-' + descricao);
    let modeloModulo = '';

    if (checkboxModulo1.checked == false) {
        modeloModulo = document.getElementById('modelo-módulo-1-' + descricao).value;
        numeroEntrada = document.getElementById('quantidade-módulo-1-' + descricao).value;
    }

    else {
        modeloModulo = document.getElementById('modelo-módulo-2-' + descricao).value;
        numeroEntrada = document.getElementById('quantidade-módulo-2-' + descricao).value;
    }

    let access_token = localStorage.getItem('access_token')

    let totalModulosCalculado = 0;

    for (i = 0; i < 4; i++) {
        let modeloInversor = document.getElementById('modelo-inversor-' + String(i + 1) + '-' + descricao).value;
        let quantidadeInversor = document.getElementById('quantidade-inversor-' + String(i + 1) + '-' + descricao).value;
        
        let numeroCalculado = 0;

        if (modeloInversor != '' & modeloModulo != '' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != null ) {
            let config = {
                headers: {
                'Authorization': 'Bearer ' + access_token
                }
            }
            
            let dadosInversor = await axios.get(
                'https://entrada-dados.onrender.com/inverters?buscar=' + modeloInversor, config
            ).then(
                function (response) {
                    const dadosInversor = response.data;
                    return dadosInversor;
                }
            ).catch(
                function (error) {
                    console.log(error);
                    return error;
                }
            )

            let dadosModulo = await axios.get(
                'https://entrada-dados.onrender.com/modules?buscar=' + modeloModulo, config
            ).then(
                function (response) {
                    const dadosModulo = response.data;
                    return dadosModulo;
                }
            ).catch(
                function (error) {
                    console.log(error);
                    return error;
                }
            )
            if (dadosInversor != 'Error: Request failed with status code 404' & dadosInversor != 'Error: Request failed with status code 401' & dadosModulo != 'Error: Request failed with status code 404' & dadosModulo != 'Error: Request failed with status code 401') {
                let imp_i = parseFloat(dadosInversor[0].imp)
                let isc_i = parseFloat(dadosInversor[0].isc)
                let vmp_i = parseFloat(dadosInversor[0].v_max_mppt)
                let voc_i = parseFloat(dadosInversor[0].v_max)
                let overload = parseFloat(dadosInversor[0].overload)
                let n_entrada = parseFloat(dadosInversor[0].n_entrada)
                let n_mppt = parseFloat(dadosInversor[0].n_mppt)
                
                let arrayEntradas = []
                
                let restoEntradas = n_entrada % n_mppt
                let entradaPorMPPT = 0

                if (restoEntradas == 0) {
                    entradaPorMPPT = (n_entrada - restoEntradas) / n_mppt
                }

                else {
                    entradaPorMPPT = (n_entrada - restoEntradas) / n_mppt + 1
                }
                
                let imp_m = parseFloat(dadosModulo[0].imp)
                let isc_m = parseFloat(dadosModulo[0].isc)
                let vmp_m = parseFloat(dadosModulo[0].vmp)
                let voc_m = parseFloat(dadosModulo[0].voc)
                let potencia_m = parseFloat(dadosModulo[0].potencia)

                let entradasUsaveis = 0;
                
                if (((imp_i / entradaPorMPPT) / imp_m) >= 0.95) {
                    entradasUsaveis = entradaPorMPPT
                }

                else { 
                    if ((imp_i / imp_m) < (isc_i / isc_m)) {
                        entradasUsaveis = Math.floor(imp_i / imp_m)
                    }

                    else {
                        entradasUsaveis = Math.floor(isc_i / isc_m)
                    }
                }

                let modulosSerie = 0;
                
                if ((vmp_i / vmp_m) < (voc_i / voc_m)) {
                    modulosSerie = Math.floor(vmp_i / vmp_m)
                }

                else {
                    modulosSerie = Math.floor(voc_i / voc_m)
                }

                let totalEntradas = 0;

                if (entradasUsaveis < entradaPorMPPT) {
                    for (i = 0; i < n_mppt; i++) {
                        arrayEntradas[i] = entradasUsaveis

                        if(i >= restoEntradas & restoEntradas != 0) {
                            arrayEntradas[i] -= 1
                        }

                        totalEntradas += arrayEntradas[i]
                    }                
                }

                else {
                    for (i = 0; i < n_mppt; i++) {
                        arrayEntradas[i] = entradaPorMPPT

                        if(i >= restoEntradas & restoEntradas != 0) {
                            arrayEntradas[i] -= 1
                        }

                        totalEntradas += arrayEntradas[i]
                    }
                }

                numeroModVI = totalEntradas * modulosSerie
                numeroModP = Math.floor(overload / potencia_m)
                    
                
                if (numeroModVI < numeroModP) {
                    numeroCalculado = quantidadeInversor * numeroModVI
                }

                else {
                    numeroCalculado = quantidadeInversor * numeroModP
                }
            }

            let containerErro1 = document.getElementById('container-inversor-incompativel-' + String(i + 1) + '-' + descricao)
            
            if (numeroModVI == 0) {
                containerErro1.style.visibility = "visible"
                containerErro1.style.display = "flex"
            }

            else {
                containerErro1.style.visibility = "hidden"
                containerErro1.style.display = "none"
            }
        }

        totalModulosCalculado += numeroCalculado
        
    }

    let containerErro2 = document.getElementById('container-superou-overload-' + descricao)
    
    if (numeroEntrada > totalModulosCalculado) {
        containerErro2.style.visibility = "visible"
        containerErro2.style.display = "flex"
    }

    else {
        containerErro2.style.visibility = "hidden"
        containerErro2.style.display = "none"
    }
}