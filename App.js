// FUNÇÕES DE LOGIN E LOGOUT DE USUÁRIOS
async function login() {
    let usuario = document.getElementById('usuário').value;
    let senha = document.getElementById('senha').value;
    let dicionario = new FormData();
    
    if (usuario != '' & senha != '') {
        dicionario.append('username', usuario);
        dicionario.append('password', senha);

        token_acesso = await axios.post(
            'http://localhost:8000/login', dicionario
        ).then(
            function (response) {
                const token_acesso = response.data.access_token;
                return token_acesso;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        localStorage.setItem('username', usuario);
        localStorage.setItem('access_token', token_acesso);
        
        if (token_acesso != 'Error: Request failed with status code 403'){
            let nomePagina = String(location.pathname.split("/").slice(-1))
                
            if (nomePagina != 'index.html') {
                setTimeout(window.location.replace('../index.html'), 5000);
            }
        
            else {
                setTimeout(window.location.reload(), 5000);
            }
        }

        else {
            divCredenciasInvalidas = document.getElementsByClassName('container-usuario-inexistente')
            divCredenciasInvalidas[0].style.visibility = "visible"
            divCredenciasInvalidas[0].style.display = "flex"
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-usuarios')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
    
    
}

async function logout() {
    let usuario = '';
    let senha = '';
    let dicionario = new FormData();
    
    dicionario.append('username', usuario);
    dicionario.append('password', senha);

    token_acesso = await axios.post(
        'http://localhost:8000/login', dicionario
    ).then(
        function (response) {
            const token_acesso = response.data.access_token;
            return token_acesso;
        }
    ).catch(
        function (error) {
            console.log(error);
            return error;
        }
    )
    
    let nomePagina = String(location.pathname.split("/").slice(-1))
        
    if (nomePagina != 'index.html') {
        setTimeout(window.location.replace('../index.html'), 5000);
    }

    else {
        setTimeout(window.location.reload(), 5000);
    }
    
    localStorage.setItem('username', '');
    localStorage.setItem('access_token', token_acesso);
}

// FUNÇÕES GERAIS PARA AS PÁGINAS
async function get_username() {
    let access_token = localStorage.getItem('access_token');
    let username = localStorage.getItem('username');
    
    if (access_token != 'Error: Request failed with status code 403' & access_token != null & access_token != 'Error: Request failed with status code 422') {
        nomeUsuario = document.getElementsByClassName('nome-usuario')
        nomeUsuario[0].innerHTML = username
    }
}

//FUNÇÕES PARA A PÁGINA DE USUÁRIO
async function get_user() {
    let access_token = localStorage.getItem('access_token');
    let username = localStorage.getItem('username');

    if (username != '' & username != null) {

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosUsuario = await axios.get(
            'http://localhost:8000/users/' + username, config
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
        
        hora = dadosUsuario.criado_em.split('T')[1].split('.')[0];
        data = dadosUsuario.criado_em.split('-')[2].split('T')[0] + '/' + dadosUsuario.criado_em.split('-')[1] + '/' + dadosUsuario.criado_em.split('-')[0];
        document.getElementById('username').innerHTML = dadosUsuario.nome;
        document.getElementById('user-role').innerHTML = dadosUsuario.cargo;
        document.getElementById('user-created-at').innerHTML = data  + ' às ' + hora;
        document.getElementById('titulo-pagina').innerHTML = "Usuário";
    }
}

// FUNÇÕES PARA A PÁGINA DE CLIENTES
async function get_all_clients() {
    let access_token = localStorage.getItem('access_token');

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        localStorage.setItem('paginaAtualClientes', 0);

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodosClientes = await axios.get(
            'http://localhost:8000/clients/', config
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
            let arrayTD = document.getElementsByTagName('td')

            for (i = 0; i < 10; i++) {

                if (i < dadosTodosClientes.length) {
                    arrayTD[6 * i].innerHTML = dadosTodosClientes[i].numero_cliente
                    arrayTD[6 * i].style.visibility = 'visible'
                    arrayTD[6 * i].style.display = 'table-cell'
                    arrayTD[6 * i + 1].innerHTML = dadosTodosClientes[i].nome
                    arrayTD[6 * i + 1].style.visibility = 'visible'
                    arrayTD[6 * i + 1].style.display = 'table-cell'
                    arrayTD[6 * i + 2].innerHTML = dadosTodosClientes[i].cpf
                    arrayTD[6 * i + 2].style.visibility = 'visible'
                    arrayTD[6 * i + 2].style.display = 'table-cell'
                    arrayTD[6 * i + 3].innerHTML = dadosTodosClientes[i].rg
                    arrayTD[6 * i + 3].style.visibility = 'visible'
                    arrayTD[6 * i + 3].style.display = 'table-cell'
                    arrayTD[6 * i + 4].innerHTML = dadosTodosClientes[i].nascimento
                    arrayTD[6 * i + 4].style.visibility = 'visible'
                    arrayTD[6 * i + 4].style.display = 'table-cell'
                    arrayTD[6 * i + 5].innerHTML = dadosTodosClientes[i].nome_pais
                    arrayTD[6 * i + 5].style.visibility = 'visible'
                    arrayTD[6 * i + 5].style.display = 'table-cell'

                    if (i == (dadosTodosClientes.length - 1)) {
                        arrayTD[6 * i].style.borderBottom = 0;
                        arrayTD[6 * i + 1].style.borderBottom = 0;
                        arrayTD[6 * i + 2].style.borderBottom = 0;
                        arrayTD[6 * i + 3].style.borderBottom = 0;
                        arrayTD[6 * i + 4].style.borderBottom = 0;
                        arrayTD[6 * i + 5].style.borderBottom = 0;
                    }
                }

                else {
                    arrayTD[6 * i].style.visibility = 'hidden'
                    arrayTD[6 * i].style.display = 'none'
                    arrayTD[6 * i + 1].style.visibility = 'hidden'
                    arrayTD[6 * i + 1].style.display = 'none'
                    arrayTD[6 * i + 2].style.visibility = 'hidden'
                    arrayTD[6 * i + 2].style.display = 'none'
                    arrayTD[6 * i + 3].style.visibility = 'hidden'
                    arrayTD[6 * i + 3].style.display = 'none'
                    arrayTD[6 * i + 4].style.visibility = 'hidden'
                    arrayTD[6 * i + 4].style.display = 'none'
                    arrayTD[6 * i + 5].style.visibility = 'hidden'
                    arrayTD[6 * i + 5].style.display = 'none'
                }
            }
        }

        else if (dadosTodosClientes == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosClientes);
            checar_autorizacao();
        }
    }
}

// FUNÇÕES PARA A PÁGINA DE CLIENTES
async function get_all_clients_skip(alterar) {
    let access_token = localStorage.getItem('access_token');

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        
        let pagina = parseInt(localStorage.getItem('paginaAtualClientes')) + parseInt(alterar);

        if (pagina < 0) {
            pagina = 0
        }

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodosClientes = await axios.get(
            'http://localhost:8000/clients/?pular=' + pagina, config
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
            let arrayTD = document.getElementsByTagName('td')
            
            if (pagina > dadosTodosClientes.length) {
                pagina = parseInt(dadosTodosClientes.length - dadosTodosClientes.length % 10)
            }
            
            localStorage.setItem('paginaAtualClientes', pagina);
            
            for (i = 0; i < 10; i++) {
                if (i < dadosTodosClientes.length) {
                    arrayTD[6 * i].innerHTML = dadosTodosClientes[i].numero_cliente
                    arrayTD[6 * i].style.visibility = 'visible'
                    arrayTD[6 * i].style.display = 'table-cell'
                    arrayTD[6 * i + 1].innerHTML = dadosTodosClientes[i].nome
                    arrayTD[6 * i + 1].style.visibility = 'visible'
                    arrayTD[6 * i + 1].style.display = 'table-cell'
                    arrayTD[6 * i + 2].innerHTML = dadosTodosClientes[i].cpf
                    arrayTD[6 * i + 2].style.visibility = 'visible'
                    arrayTD[6 * i + 2].style.display = 'table-cell'
                    arrayTD[6 * i + 3].innerHTML = dadosTodosClientes[i].rg
                    arrayTD[6 * i + 3].style.visibility = 'visible'
                    arrayTD[6 * i + 3].style.display = 'table-cell'
                    arrayTD[6 * i + 4].innerHTML = dadosTodosClientes[i].nascimento
                    arrayTD[6 * i + 4].style.visibility = 'visible'
                    arrayTD[6 * i + 4].style.display = 'table-cell'
                    arrayTD[6 * i + 5].innerHTML = dadosTodosClientes[i].nome_pais
                    arrayTD[6 * i + 5].style.visibility = 'visible'
                    arrayTD[6 * i + 5].style.display = 'table-cell'

                    if (i == (dadosTodosClientes.length - 1)) {
                        arrayTD[6 * i].style.borderBottom = 0;
                        arrayTD[6 * i + 1].style.borderBottom = 0;
                        arrayTD[6 * i + 2].style.borderBottom = 0;
                        arrayTD[6 * i + 3].style.borderBottom = 0;
                        arrayTD[6 * i + 4].style.borderBottom = 0;
                        arrayTD[6 * i + 5].style.borderBottom = 0;
                    }
                }
                
                else {
                    arrayTD[6 * i].innerHTML = ''
                    arrayTD[6 * i].style.visibility = 'hidden'
                    arrayTD[6 * i].style.display = 'none'
                    arrayTD[6 * i + 1].innerHTML = ''
                    arrayTD[6 * i + 1].style.visibility = 'hidden'
                    arrayTD[6 * i + 1].style.display = 'none'
                    arrayTD[6 * i + 2].innerHTML = ''
                    arrayTD[6 * i + 2].style.visibility = 'hidden'
                    arrayTD[6 * i + 2].style.display = 'none'
                    arrayTD[6 * i + 3].innerHTML = ''
                    arrayTD[6 * i + 3].style.visibility = 'hidden'
                    arrayTD[6 * i + 3].style.display = 'none'
                    arrayTD[6 * i + 4].innerHTML = ''
                    arrayTD[6 * i + 4].style.visibility = 'hidden'
                    arrayTD[6 * i + 4].style.display = 'none'
                    arrayTD[6 * i + 5].innerHTML = ''
                    arrayTD[6 * i + 5].style.visibility = 'hidden'
                    arrayTD[6 * i + 5].style.display = 'none'
                }
            }
        }

        else if (dadosTodosClientes == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosClientes);
            checar_autorizacao();
        }
    }
}

async function get_client() {
    let access_token = localStorage.getItem('access_token');

    let numero_cliente = document.getElementById('número-cliente-buscar').value;
    let divSearchClient = document.getElementById('container-search-clients');

    if (numero_cliente != '') {
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosCliente = await axios.get(
            'http://localhost:8000/clients/' + numero_cliente, config
        ).then(
            function (response) {
                const dadosCliente = response.data;
                return dadosCliente;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (dadosCliente != 'Error: Request failed with status code 401') {
            divSearchClient.style.visibility = 'hidden';
            divSearchClient.style.display = 'none';

            document.getElementById('container-cliente-encontrado').style.visibility = 'visible';
            document.getElementById('container-cliente-encontrado').style.display = 'grid';
            
            let hora = dadosCliente.criado_em.split('T')[1].split('.')[0];
            let data = dadosCliente.criado_em.split('-')[2].split('T')[0] + '/' + dadosCliente.criado_em.split('-')[1] + '/' + dadosCliente.criado_em.split('-')[0];
            
            document.getElementById('client-name').innerHTML = dadosCliente.nome;
            document.getElementById('client-cpf').innerHTML = dadosCliente.cpf;
            document.getElementById('client-number').innerHTML = dadosCliente.numero_cliente;
            document.getElementById('client-rg').innerHTML = dadosCliente.rg;
            document.getElementById('client-date').innerHTML = dadosCliente.nascimento.split('-')[2] + '/' + dadosCliente.nascimento.split('-')[1] + '/' + dadosCliente.nascimento.split('-')[0];
            document.getElementById('client-parent-name').innerHTML = dadosCliente.nome_pais;
            document.getElementById('client-added-in').innerHTML = data  + ' às ' + hora;
        }

        else if (dadosCliente == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosCliente);
            checar_autorizacao();
        }

        else {
            let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente')

            for (i = 0; i < arrayClienteInexistente.length; i ++) {
                arrayClienteInexistente[i].style.visibility = 'visible';
                arrayClienteInexistente[i].style.display = 'flex';
            }
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-clientes')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

async function post_client() {
    let access_token = localStorage.getItem('access_token');

    let numero_cliente = document.getElementById('número-cliente-adicionar').value;
    let nome = document.getElementById('nome-cliente-adicionar').value;
    let cpf = document.getElementById('cpf-adicionar').value;
    let rg = document.getElementById('rg-adicionar').value;
    let nascimento = document.getElementById('data-nascimento-adicionar').value.split('-').reverse().join('/');
    let nome_pais = document.getElementById('nome-pais-adicionar').value;

    dicionario = {
        'nome': nome,
        'cpf': cpf,
        'numero_cliente': numero_cliente,
        'nome_pais': nome_pais,
        'rg': rg,
        'nascimento': nascimento
    }

    let config = {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
    }

    if (numero_cliente != '' & nome != '' & cpf != ''){
        resposta = await axios.post(
            'http://localhost:8000/clients', dicionario, config
        ).then(
            function (response) {
                const dadosCliente = response.data;
                return dadosCliente;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )

        if (resposta != 'Error: Network Error' & resposta != 'Error: Request failed with status code 401') {
            document.getElementById('container-cliente-adicionado').style.visibility = 'visible';
            document.getElementById('container-cliente-adicionado').style.display = 'grid';
            
            document.getElementById('container-add-clients').style.visibility = 'hidden';
            document.getElementById('container-add-clients').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else {
            divExistentClient = document.getElementsByClassName('container-cliente-existente')
            divExistentClient[0].style.visibility = 'visible';
            divExistentClient[0].style.display = 'flex';
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-clientes')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

async function patch_client() {
    let access_token = localStorage.getItem('access_token');

    let numero_cliente_buscar = document.getElementById('número-cliente-buscar-atualizar').value;
    let numero_cliente = document.getElementById('número-cliente-atualizar').value;
    let nome = document.getElementById('nome-cliente-atualizar').value;
    let cpf = document.getElementById('cpf-atualizar').value;
    let rg = document.getElementById('rg-atualizar').value;
    let nascimento = document.getElementById('data-nascimento-atualizar').value;
    let nome_pais = document.getElementById('nome-pais-atualizar').value;
    let dicionario = {}; // Create an empty array

    if (numero_cliente == '' & nome == '' & cpf == '' & rg == '' & nascimento == '' & nome_pais == '') {
        containerCamposNaoPreenchidos = document.getElementsByClassName('container-campos-nao-preenchidos')
        containerCamposNaoPreenchidos[0].style.visibility = "visible"
        containerCamposNaoPreenchidos[0].style.display = "flex"
    }

    else {
        if (numero_cliente != ''){
            dicionario['numero_cliente'] = numero_cliente
        }

        if (nome != ''){
            dicionario['nome'] = nome
        }

        if (cpf != ''){
            dicionario['cpf'] = cpf
        }

        if (rg != ''){
            dicionario['rg'] = rg
        }

        if (nascimento != ''){
            dicionario['nascimento'] = nascimento
        }

        if (nome_pais != ''){
            dicionario['nome_pais'] = nome_pais
        }

        let config = {
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        }
        
        
        url = 'http://localhost:8000/clients/' + numero_cliente_buscar
        
        resposta = await axios.patch(
            url, dicionario, config
        ).then(
            function (response) {
                const dadosCliente = response.data;
                return dadosCliente;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (resposta != 'Error: Request failed with status code 404' & resposta != 'Error: Request failed with status code 401') {
            document.getElementById('container-cliente-atualizado').style.visibility = 'visible';
            document.getElementById('container-cliente-atualizado').style.display = 'grid';
                
            document.getElementById('container-update-clients').style.visibility = 'hidden';
            document.getElementById('container-update-clients').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else {
            let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente')

            for (i = 0; i < arrayClienteInexistente.length; i ++) {
                arrayClienteInexistente[i].style.visibility = 'visible'
                arrayClienteInexistente[i].style.display = 'flex'
            }
        }
    }
}

async function delete_client() {
    let access_token = localStorage.getItem('access_token');
    let numero_cliente = document.getElementById('número-cliente-deletar').value;

    if (numero_cliente != '') {

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let resposta = await axios.delete(
            'http://localhost:8000/clients/' + numero_cliente, config
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
        
        if (resposta == '') {
            document.getElementById('container-cliente-deletado').style.visibility = 'visible';
            document.getElementById('container-cliente-deletado').style.display = 'grid';

            document.getElementById('container-delete-clients').style.visibility = 'hidden';
            document.getElementById('container-delete-clients').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else if (resposta == 'Error: Request failed with status code 404') {
            let arrayClienteInexistente = document.getElementsByClassName('container-cliente-inexistente');

            for (i = 0; i < arrayClienteInexistente.length; i ++) {
                arrayClienteInexistente[i].style.visibility = 'visible';
                arrayClienteInexistente[i].style.display = 'flex';
            }
        }

    }
    
    else {
        let arrayCampos = document.getElementsByClassName('campo-obrigatorio-clientes');

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}