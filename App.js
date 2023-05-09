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

async function get_user_role() {
    let access_token = localStorage.getItem('access_token');
    let username = localStorage.getItem('username')

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
        
        if (dadosUsuario.cargo == 'Administrador') {
            containerAdministrador = document.getElementsByClassName('container-usuario-administrador')
            containerAdministrador[0].style.visibility = 'visible'
            containerAdministrador[0].style.display = 'flex'
            containerAdministrador[0].style.flexDirection = 'row'
        }
    }
}

async function post_user() {
    let access_token = localStorage.getItem('access_token');

    let nome = document.getElementById('usuário-adicionar').value;
    let senha = document.getElementById('senha-adicionar').value;
    let confirmar_senha = document.getElementById('confirmar-senha-adicionar').value;
    
    dicionario = {
        'nome': nome,
        'senha': senha,
        'confirmar_senha': confirmar_senha
    }

    let config = {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
    }

    if (nome != '' & senha != '' & confirmar_senha != '') {
        if(senha == confirmar_senha) {
            resposta = await axios.post(
                'http://localhost:8000/users', dicionario, config
            ).then(
                function (response) {
                    const resposta = response.data;
                    return resposta;
                }
            ).catch(
                function (error) {
                    console.log(error);
                    return error;
                }
            )
    
            if (resposta != 'Error: Network Error' & resposta != 'Error: Request failed with status code 401') {
                document.getElementById('container-usuario-adicionado').style.visibility = 'visible';
                document.getElementById('container-usuario-adicionado').style.display = 'grid';
                
                document.getElementById('container-add-users').style.visibility = 'hidden';
                document.getElementById('container-add-users').style.display = 'none';
            }
    
            else if (resposta == 'Error: Request failed with status code 401') {
                localStorage.setItem('access_token', resposta);
                checar_autorizacao();
            }
    
            else {
                divExistentUser = document.getElementsByClassName('container-usuario-existente')
                divExistentUser[0].style.visibility = 'visible';
                divExistentUser[0].style.display = 'flex';
            }
        }

        else {
            divDivergentPassword = document.getElementsByClassName('container-senha-divergente')
            divDivergentPassword[0].style.visibility = 'visible';
            divDivergentPassword[0].style.display = 'flex';
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

async function patch_user() {
    let access_token = localStorage.getItem('access_token');

    let nome_buscar = document.getElementById('usuário-buscar-atualizar').value;

    let nome = document.getElementById('usuário-atualizar').value;
    let senha = document.getElementById('senha-atualizar').value;
    let confirmar_senha = document.getElementById('confirmar-senha-atualizar').value;

    let dicionario = {};

    if (nome == '' & senha == '' & confirmar_senha == '') {
        containerCamposNaoPreenchidos = document.getElementsByClassName('container-campos-nao-preenchidos')
        containerCamposNaoPreenchidos[0].style.visibility = "visible"
        containerCamposNaoPreenchidos[0].style.display = "flex"
    }

    else {
        if (senha == confirmar_senha) {
            if (nome != ''){
                dicionario['nome'] = nome
            }

            if (senha != ''){
                dicionario['senha'] = senha
            }

            let config = {
                headers: {
                'Authorization': 'Bearer ' + access_token
                }
            }
            
            url = 'http://localhost:8000/users/' + nome_buscar
            
            resposta = await axios.patch(
                url, dicionario, config
            ).then(
                function (response) {
                    const resposta = response.data;
                    return resposta;
                }
            ).catch(
                function (error) {
                    console.log(error);
                    return error;
                }
            )
            
            if (resposta != 'Error: Request failed with status code 404' & resposta != 'Error: Request failed with status code 401') {
                document.getElementById('container-usuario-atualizado').style.visibility = 'visible';
                document.getElementById('container-usuario-atualizado').style.display = 'grid';
                    
                document.getElementById('container-update-users').style.visibility = 'hidden';
                document.getElementById('container-update-users').style.display = 'none';
            }

            else if (resposta == 'Error: Request failed with status code 401') {
                localStorage.setItem('access_token', resposta);
                checar_autorizacao();
            }

            else {
                let arrayUsarioInexistente = document.getElementsByClassName('container-usuario-inexistente')

                for (i = 0; i < arrayUsarioInexistente.length; i ++) {
                    arrayUsarioInexistente[i].style.visibility = 'visible'
                    arrayUsarioInexistente[i].style.display = 'flex'
                }
            }
        }

        else {
            divDivergentPassword = document.getElementsByClassName('container-senha-divergente')
            divDivergentPassword[1].style.visibility = 'visible';
            divDivergentPassword[1].style.display = 'flex';
        }
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
        
        if (dadosCliente != 'Error: Request failed with status code 401' & dadosCliente != 'Error: Request failed with status code 404') {
            divSearchClient.style.visibility = 'hidden';
            divSearchClient.style.display = 'none';

            document.getElementById('container-cliente-encontrado').style.visibility = 'visible';
            document.getElementById('container-cliente-encontrado').style.display = 'grid';
            
            let hora = dadosCliente.criado_em.split('T')[1].split('.')[0];
            let data = dadosCliente.criado_em.split('-')[2].split('T')[0] + '/' + dadosCliente.criado_em.split('-')[1] + '/' + dadosCliente.criado_em.split('-')[0];
            
            if (dadosCliente.nome != '') {
                document.getElementById('client-name').innerHTML = dadosCliente.nome;
                document.getElementById('title-client-name').style.visibility = 'visible';
                document.getElementById('title-client-name').style.display = 'grid';
                document.getElementById('client-name').style.visibility = 'visible';
                document.getElementById('client-name').style.display = 'grid';
            }

            if (dadosCliente.cpf != '') {
                document.getElementById('client-cpf').innerHTML = dadosCliente.cpf;
                document.getElementById('title-client-cpf').style.visibility = 'visible';
                document.getElementById('title-client-cpf').style.display = 'grid';
                document.getElementById('client-cpf').style.visibility = 'visible';
                document.getElementById('client-cpf').style.display = 'grid';
            }

            if (dadosCliente.numero_cliente != 0) {
                document.getElementById('client-number').innerHTML = dadosCliente.numero_cliente;
                document.getElementById('title-client-number').style.visibility = 'visible';
                document.getElementById('title-client-number').style.display = 'grid';
                document.getElementById('client-number').style.visibility = 'visible';
                document.getElementById('client-number').style.display = 'grid';
            }

            if (dadosCliente.rg != '') {
                document.getElementById('client-rg').innerHTML = dadosCliente.rg;
                document.getElementById('title-client-rg').style.visibility = 'visible';
                document.getElementById('title-client-rg').style.display = 'grid';
                document.getElementById('client-rg').style.visibility = 'visible';
                document.getElementById('client-rg').style.display = 'grid';
            }

            if (dadosCliente.nascimento != '') {
                document.getElementById('client-date').innerHTML = dadosCliente.nascimento;
                document.getElementById('title-client-date').style.visibility = 'visible';
                document.getElementById('title-client-date').style.display = 'grid';
                document.getElementById('client-date').style.visibility = 'visible';
                document.getElementById('client-date').style.display = 'grid';
            }

            if (dadosCliente.nome_pais != '') {
                document.getElementById('client-parent-name').innerHTML = dadosCliente.nome_pais;
                document.getElementById('title-client-parent-name').style.visibility = 'visible';
                document.getElementById('title-client-parent-name').style.display = 'grid';
                document.getElementById('client-parent-name').style.visibility = 'visible';
                document.getElementById('client-parent-name').style.display = 'grid';
            }

            if (dadosCliente.criado_em != '') {
                document.getElementById('client-added-in').innerHTML = data  + ' às ' + hora;
                document.getElementById('title-client-added-in').style.visibility = 'visible';
                document.getElementById('title-client-added-in').style.display = 'grid';
                document.getElementById('client-added-in').style.visibility = 'visible';
                document.getElementById('client-added-in').style.display = 'grid';
            }
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
    let nome = document.getElementById('nome-cliente-adicionar').value.toUpperCase();
    let cpf = document.getElementById('cpf-adicionar').value;
    let rg = document.getElementById('rg-adicionar').value;
    let nascimento = document.getElementById('data-nascimento-adicionar').value.split('-').reverse().join('/');
    let nome_pais = document.getElementById('nome-pais-adicionar').value.toUpperCase();

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
                const resposta = response.data;
                return resposta;
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
    let nome = document.getElementById('nome-cliente-atualizar').value.toUpperCase();
    let cpf = document.getElementById('cpf-atualizar').value;
    let rg = document.getElementById('rg-atualizar').value;
    let nascimento = document.getElementById('data-nascimento-atualizar').value;
    let nome_pais = document.getElementById('nome-pais-atualizar').value.toUpperCase();
    let dicionario = {}; // Create an empty array

    let config = {
        headers: {
        'Authorization': 'Bearer ' + access_token
        }
    }

    let dadosOriginais = await axios.get(
        'http://localhost:8000/clients/' + numero_cliente_buscar.toString(), config
    ).then(
        function (response) {
            const dadosProjeto = response.data;
            return dadosProjeto;
        }
    ).catch(
        function (error) {
            console.log(error);
            return error;
        }
    )
    
    if (numero_cliente != dadosOriginais.numero_cliente.toString()){
        dicionario['numero_cliente'] = numero_cliente
    }

    if (nome != dadosOriginais.nome.toString()){
        dicionario['nome'] = nome
    }

    if (cpf != dadosOriginais.cpf.toString()){
        dicionario['cpf'] = cpf
    }

    if (rg != dadosOriginais.rg.toString()){
        dicionario['rg'] = rg
    }

    if (nascimento != dadosOriginais.nascimento.toString()){
        dicionario['nascimento'] = nascimento
    }

    if (nome_pais != dadosOriginais.nome_pais.toString()){
        dicionario['nome_pais'] = nome_pais
    }

    if (Object.keys(dicionario).length == 0) {
        containerCamposNaoPreenchidos = document.getElementsByClassName('container-campos-nao-preenchidos')
        containerCamposNaoPreenchidos[0].style.visibility = "visible"
        containerCamposNaoPreenchidos[0].style.display = "flex"
    }

    else {
        url = 'http://localhost:8000/clients/' + numero_cliente_buscar
        
        resposta = await axios.patch(
            url, dicionario, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
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
                const resposta = response.data;
                return resposta;
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

// FUNÇÕES PARA A PÁGINA DE INSTALAÇÕES
async function get_instalation() {
    let access_token = localStorage.getItem('access_token');

    let numero_instalacao = document.getElementById('número-instalação-buscar').value;
    let divSearchInstalation = document.getElementById('container-search-instalations');

    if (numero_instalacao != '') {
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosInstalacao = await axios.get(
            'http://localhost:8000/instalations/' + numero_instalacao, config
        ).then(
            function (response) {
                const dadosInstalacao = response.data;
                return dadosInstalacao;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (dadosInstalacao != 'Error: Request failed with status code 401' & dadosInstalacao != 'Error: Request failed with status code 404') {
            divSearchInstalation.style.visibility = 'hidden';
            divSearchInstalation.style.display = 'none';

            document.getElementById('container-instalacao-encontrada').style.visibility = 'visible';
            document.getElementById('container-instalacao-encontrada').style.display = 'grid';
            
            let hora = dadosInstalacao.criado_em.split('T')[1].split('.')[0];
            let data = dadosInstalacao.criado_em.split('-')[2].split('T')[0] + '/' + dadosInstalacao.criado_em.split('-')[1] + '/' + dadosInstalacao.criado_em.split('-')[0];
            
            if (dadosInstalacao.numero_instalacao != '') {
                document.getElementById('instalation-number').innerHTML = dadosInstalacao.numero_instalacao;
                document.getElementById('title-instalation-number').style.visibility = 'visible';
                document.getElementById('title-instalation-number').style.display = 'grid';
                document.getElementById('instalation-number').style.visibility = 'visible';
                document.getElementById('instalation-number').style.display = 'grid';
            }
            
            if (dadosInstalacao.numero_cliente != '') {
                document.getElementById('instalation-client-number').innerHTML = dadosInstalacao.numero_cliente;
                document.getElementById('title-instalation-client-number').style.visibility = 'visible';
                document.getElementById('title-instalation-client-number').style.display = 'grid';
                document.getElementById('instalation-client-number').style.visibility = 'visible';
                document.getElementById('instalation-client-number').style.display = 'grid';
            }

            if (dadosInstalacao.logradouro != '') {
                document.getElementById('instalation-street').innerHTML = dadosInstalacao.logradouro;
                document.getElementById('title-instalation-street').style.visibility = 'visible';
                document.getElementById('title-instalation-street').style.display = 'grid';
                document.getElementById('instalation-street').style.visibility = 'visible';
                document.getElementById('instalation-street').style.display = 'grid';
            }
            
            if (dadosInstalacao.numero_predial != '') {
                document.getElementById('instalation-street-number').innerHTML = dadosInstalacao.numero_predial;
                document.getElementById('title-instalation-street-number').style.visibility = 'visible';
                document.getElementById('title-instalation-street-number').style.display = 'grid';
                document.getElementById('instalation-street-number').style.visibility = 'visible';
                document.getElementById('instalation-street-number').style.display = 'grid';
            }
            
            if (dadosInstalacao.complemento != '') {
                document.getElementById('instalation-complement').innerHTML = dadosInstalacao.complemento;
                document.getElementById('title-instalation-complement').style.visibility = 'visible';
                document.getElementById('title-instalation-complement').style.display = 'grid';
                document.getElementById('instalation-complement').style.visibility = 'visible';
                document.getElementById('instalation-complement').style.display = 'grid';
            }
            
            if (dadosInstalacao.bairro != '') {
                document.getElementById('instalation-district').innerHTML = dadosInstalacao.bairro;
                document.getElementById('title-instalation-district').style.visibility = 'visible';
                document.getElementById('title-instalation-district').style.display = 'grid';
                document.getElementById('instalation-district').style.visibility = 'visible';
                document.getElementById('instalation-district').style.display = 'grid';
            }

            if (dadosInstalacao.cidade != '') {
                document.getElementById('instalation-city').innerHTML = dadosInstalacao.cidade;
                document.getElementById('title-instalation-city').style.visibility = 'visible';
                document.getElementById('title-instalation-city').style.display = 'grid';
                document.getElementById('instalation-city').style.visibility = 'visible';
                document.getElementById('instalation-city').style.display = 'grid';
            }
            
            if (dadosInstalacao.cep != '') {
                document.getElementById('instalation-cep').innerHTML = dadosInstalacao.cep;
                document.getElementById('title-instalation-cep').style.visibility = 'visible';
                document.getElementById('title-instalation-cep').style.display = 'grid';
                document.getElementById('instalation-cep').style.visibility = 'visible';
                document.getElementById('instalation-cep').style.display = 'grid';
            }
            
            if (dadosInstalacao.latitude != '') {
                document.getElementById('instalation-latitude').innerHTML = dadosInstalacao.latitude;
                document.getElementById('title-instalation-latitude').style.visibility = 'visible';
                document.getElementById('title-instalation-latitude').style.display = 'grid';
                document.getElementById('instalation-latitude').style.visibility = 'visible';
                document.getElementById('instalation-latitude').style.display = 'grid';
            }
            
            if (dadosInstalacao.longitude != '') {
                document.getElementById('instalation-longitude').innerHTML = dadosInstalacao.longitude;
                document.getElementById('title-instalation-longitude').style.visibility = 'visible';
                document.getElementById('title-instalation-longitude').style.display = 'grid';
                document.getElementById('instalation-longitude').style.visibility = 'visible';
                document.getElementById('instalation-longitude').style.display = 'grid';
            }

            if (dadosInstalacao.coordenadas != '') {
                document.getElementById('instalation-coordinates').innerHTML = dadosInstalacao.coordenadas_decimais;
                document.getElementById('title-instalation-coordinates').style.visibility = 'visible';
                document.getElementById('title-instalation-coordinates').style.display = 'grid';
                document.getElementById('instalation-coordinates').style.visibility = 'visible';
                document.getElementById('instalation-coordinates').style.display = 'grid';
            }

            if (dadosInstalacao.criado_em != '') {
                document.getElementById('instalation-added-in').innerHTML = data + ' às ' + hora;
                document.getElementById('title-instalation-added-in').style.visibility = 'visible';
                document.getElementById('title-instalation-added-in').style.display = 'grid';
                document.getElementById('instalation-added-in').style.visibility = 'visible';
                document.getElementById('instalation-added-in').style.display = 'grid';
            }
        }

        else if (dadosInstalacao == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosInstalacao);
            checar_autorizacao();
        }

        else {
            let arrayInstalacaoInexistente = document.getElementsByClassName('container-instalacao-inexistente')

            for (i = 0; i < arrayInstalacaoInexistente.length; i ++) {
                arrayInstalacaoInexistente[i].style.visibility = 'visible';
                arrayInstalacaoInexistente[i].style.display = 'flex';
            }
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-instalacoes')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

async function post_instalation() {
    let access_token = localStorage.getItem('access_token');
    
    let divNumeroInstalacao = document.getElementById('container-form-numero-instalacao-adicionar')
    let visibilidade = window.getComputedStyle(divNumeroInstalacao).visibility
    
    let numero_instalacao = document.getElementById('número-instalação-adicionar').value
    let numero_cliente = document.getElementById('número-cliente-adicionar').value
    let logradouro = document.getElementById('logradouro-adicionar').value.toUpperCase()
    let numero_predial = document.getElementById('numero-predial-adicionar').value
    let complemento = document.getElementById('complemento-adicionar').value.toUpperCase()
    let bairro = document.getElementById('bairro-adicionar').value.toUpperCase()
    let cidade = document.getElementById('cidade-adicionar').value.toUpperCase()
    let cep = document.getElementById('cep-adicionar').value
    let classificacao = document.getElementById('classificacao-adicionar').value
    let latitude = document.getElementById('latitude-adicionar').value
    let longitude = document.getElementById('longitude-adicionar').value
    let coordenadas_decimais = document.getElementById('coordenadas-decimais-adicionar').value
    let dicionario = {}

    dicionario = {
        'numero_cliente': numero_cliente,
        'logradouro': logradouro,
        'numero_predial': numero_predial,
        'complemento': complemento,
        'bairro': bairro,
        'cidade': cidade,
        'cep': cep,
        'classificacao': classificacao,
        'latitude': latitude,
        'longitude': longitude,
        'coordenadas_decimais': coordenadas_decimais
    }

    if (numero_instalacao != ''){
        dicionario['numero_instalacao'] = numero_instalacao
    }

    let config = {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
    }
    if (visibilidade == 'hidden') {
        if (numero_cliente != '' & logradouro != '' & numero_predial != '' & complemento != '' & bairro != '' & cidade != '' & cep != '' & classificacao != '' & latitude != '' & cep != '' & coordenadas_decimais != ''){
            resposta = await axios.post(
                'http://localhost:8000/instalations', dicionario, config
            ).then(
                function (response) {
                    const resposta = response.data;
                    return resposta;
                }
            ).catch(
                function (error) {
                    console.log(error);
                    return error;
                }
            )

            if (resposta != 'Error: Network Error' & resposta != 'Error: Request failed with status code 401') {
                document.getElementById('container-instalacao-adicionada').style.visibility = 'visible';
                document.getElementById('container-instalacao-adicionada').style.display = 'grid';
                
                document.getElementById('container-add-instalations').style.visibility = 'hidden';
                document.getElementById('container-add-instalations').style.display = 'none';
            }

            else if (resposta == 'Error: Request failed with status code 401') {
                localStorage.setItem('access_token', resposta);
                checar_autorizacao();
            }

            else {
                divExistentInstalation = document.getElementsByClassName('container-instalacao-existente')
                divExistentInstalation[0].style.visibility = 'visible';
                divExistentInstalation[0].style.display = 'flex';
            }
        }

        else {
            arrayCampos = document.getElementsByClassName('campo-obrigatorio-instalacoes')

            for (i = 0; i < arrayCampos.length; i ++) {
                arrayCampos[i].style.visibility = "visible";
                arrayCampos[i].style.display = "grid";
            }
        }
    }

    else if(visibilidade == 'visible') {
        if (numero_instalacao != '' & numero_cliente != '' & logradouro != '' & numero_predial != '' & complemento != '' & bairro != '' & cidade != '' & cep != '' & classificacao != '' & latitude != '' & cep != '' & coordenadas_decimais != ''){
            resposta = await axios.post(
                'http://localhost:8000/instalations', dicionario, config
            ).then(
                function (response) {
                    const resposta = response.data;
                    return resposta;
                }
            ).catch(
                function (error) {
                    console.log(error);
                    return error;
                }
            )

            if (resposta != 'Error: Network Error' & resposta != 'Error: Request failed with status code 401') {
                document.getElementById('container-instalacao-adicionada').style.visibility = 'visible';
                document.getElementById('container-instalacao-adicionada').style.display = 'grid';
                
                document.getElementById('container-add-instalations').style.visibility = 'hidden';
                document.getElementById('container-add-instalations').style.display = 'none';
            }

            else if (resposta == 'Error: Request failed with status code 401') {
                localStorage.setItem('access_token', resposta);
                checar_autorizacao();
            }

            else {
                divExistentInstalation = document.getElementsByClassName('container-instalacao-existente')
                divExistentInstalation[0].style.visibility = 'visible';
                divExistentInstalation[0].style.display = 'flex';
            }
        }

        else {
            arrayCampos = document.getElementsByClassName('campo-obrigatorio-instalacoes')

            for (i = 0; i < arrayCampos.length; i ++) {
                arrayCampos[i].style.visibility = "visible";
                arrayCampos[i].style.display = "grid";
            }
        }
    }
}

async function patch_instalation() {
    let access_token = localStorage.getItem('access_token');

    let checkboxLigacao = document.getElementById('checkbox-ligacao-atualizar').checked;

    let numero_instalacao_buscar = document.getElementById('número-instalação-buscar-atualizar').value;
    let numero_instalacao = document.getElementById('número-instalação-atualizar').value;
    let numero_cliente = document.getElementById('número-cliente-atualizar').value;
    let logradouro = document.getElementById('logradouro-atualizar').value.toUpperCase();
    let numero_predial = document.getElementById('numero-predial-atualizar').value;
    let complemento = document.getElementById('complemento-atualizar').value.toUpperCase();
    let bairro = document.getElementById('bairro-atualizar').value.toUpperCase();
    let cidade = document.getElementById('cidade-atualizar').value.toUpperCase();
    let cep = document.getElementById('cep-atualizar').value;
    let classificacao = document.getElementById('classificacao-atualizar').value;
    let latitude = document.getElementById('latitude-atualizar').value;
    let longitude = document.getElementById('longitude-atualizar').value;
    let coordenadas_decimais = document.getElementById('coordenadas-decimais-atualizar').value;
    let dicionario = {};

    if (checkboxLigacao == true) {
        numero_instalacao = '0';
    }

    let config = {
        headers: {
        'Authorization': 'Bearer ' + access_token
        }
    }

    let dadosOriginais = await axios.get(
        'http://localhost:8000/instalations/' + numero_instalacao_buscar.toString(), config
    ).then(
        function (response) {
            const dadosProjeto = response.data;
            return dadosProjeto;
        }
    ).catch(
        function (error) {
            console.log(error);
            return error;
        }
    )

    if (numero_instalacao != dadosOriginais.numero_instalacao.toString()){
        dicionario['numero_instalacao'] = numero_instalacao;
    }

    if (numero_cliente != dadosOriginais.numero_cliente.toString()){
        dicionario['numero_cliente'] = numero_cliente;
    }

    if (logradouro != dadosOriginais.logradouro.toString()){
        dicionario['logradouro'] = logradouro;
    }

    if (numero_predial != dadosOriginais.numero_predial.toString()){
        dicionario['numero_predial'] = numero_predial;
    }

    if (complemento != dadosOriginais.complemento.toString()){
        dicionario['complemento'] = complemento;
    }

    if (cep != dadosOriginais.cep.toString()){
        dicionario['cep'] = cep;
    }

    if (classificacao != dadosOriginais.classificacao.toString()){
        dicionario['classificacao'] = classificacao;
    }
    
    if (latitude != dadosOriginais.latitude.toString()){
        dicionario['latitude'] = latitude;
    }
    
    if (longitude != dadosOriginais.longitude.toString()){
        dicionario['longitude'] = longitude;
    }

    if (coordenadas_decimais != dadosOriginais.coordenadas_decimais.toString()){
        dicionario['coordenadas_decimais'] = coordenadas_decimais;
    }

    if (Object.keys(dicionario).length == 0){
        containerCamposNaoPreenchidos = document.getElementsByClassName('container-campos-nao-preenchidos');
        containerCamposNaoPreenchidos[0].style.visibility = "visible";
        containerCamposNaoPreenchidos[0].style.display = "flex";
    }

    else {
        url = 'http://localhost:8000/instalations/' + numero_instalacao_buscar;
        
        resposta = await axios.patch(
            url, dicionario, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (resposta != 'Error: Request failed with status code 404' & resposta != 'Error: Request failed with status code 401') {
            document.getElementById('container-instalacao-atualizada').style.visibility = 'visible';
            document.getElementById('container-instalacao-atualizada').style.display = 'grid';
                
            document.getElementById('container-update-instalations').style.visibility = 'hidden';
            document.getElementById('container-update-instalations').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else {
            let arrayInstalacaoInexistente = document.getElementsByClassName('container-instalacao-inexistente')

            for (i = 0; i < arrayInstalacaoInexistente.length; i ++) {
                arrayInstalacaoInexistente[i].style.visibility = 'visible';
                arrayInstalacaoInexistente[i].style.display = 'flex';
            }
        }
    }
}

async function delete_instalation() {
    let access_token = localStorage.getItem('access_token');
    let numero_instalacao = document.getElementById('número-instalação-deletar').value;

    if (numero_instalacao != '') {

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let resposta = await axios.delete(
            'http://localhost:8000/instalations/' + numero_instalacao, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (resposta == '') {
            document.getElementById('container-instalacao-deletada').style.visibility = 'visible';
            document.getElementById('container-instalacao-deletada').style.display = 'grid';

            document.getElementById('container-delete-instalations').style.visibility = 'hidden';
            document.getElementById('container-delete-instalations').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else if (resposta == 'Error: Request failed with status code 404') {
            let arrayInstalacaoInexistente = document.getElementsByClassName('container-instalacao-inexistente');

            for (i = 0; i < arrayInstalacaoInexistente.length; i ++) {
                arrayInstalacaoInexistente[i].style.visibility = 'visible';
                arrayInstalacaoInexistente[i].style.display = 'flex';
            }
        }
    }
    
    else {
        let arrayCampos = document.getElementsByClassName('campo-obrigatorio-instalacoes');

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

//FUNÇÕES PARA A PÁGINA DE MÓDULOS
async function get_all_modules() {
    let access_token = localStorage.getItem('access_token');

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        localStorage.setItem('paginaAtualModulos', 0);

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodosModulos = await axios.get(
            'http://localhost:8000/modules/', config
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
        
        if (dadosTodosModulos != 'Error: Request failed with status code 401' & dadosTodosModulos != 'Error: Request failed with status code 404') {
            let arrayTD = document.getElementsByTagName('td')
            
            for (i = 0; i < 10; i++) {
                if (i < dadosTodosModulos.length) {
                    arrayTD[12 * i].innerHTML = dadosTodosModulos[i].modelo
                    arrayTD[12 * i].style.visibility = 'visible'
                    arrayTD[12 * i].style.display = 'table-cell'
                    arrayTD[12 * i + 1].innerHTML = dadosTodosModulos[i].fabricante
                    arrayTD[12 * i + 1].style.visibility = 'visible'
                    arrayTD[12 * i + 1].style.display = 'table-cell'
                    arrayTD[12 * i + 2].innerHTML = String(dadosTodosModulos[i].potencia).replace('.', ',') + ' Wp'
                    arrayTD[12 * i + 2].style.visibility = 'visible'
                    arrayTD[12 * i + 2].style.display = 'table-cell'
                    arrayTD[12 * i + 3].innerHTML = String(dadosTodosModulos[i].imp).replace('.', ',') + ' A'
                    arrayTD[12 * i + 3].style.visibility = 'visible'
                    arrayTD[12 * i + 3].style.display = 'table-cell'
                    arrayTD[12 * i + 4].innerHTML = String(dadosTodosModulos[i].isc).replace('.', ',') + ' A'
                    arrayTD[12 * i + 4].style.visibility = 'visible'
                    arrayTD[12 * i + 4].style.display = 'table-cell'
                    arrayTD[12 * i + 5].innerHTML = String(dadosTodosModulos[i].vmp).replace('.', ',') + ' V'
                    arrayTD[12 * i + 5].style.visibility = 'visible'
                    arrayTD[12 * i + 5].style.display = 'table-cell'
                    arrayTD[12 * i + 6].innerHTML = String(dadosTodosModulos[i].voc).replace('.', ',') + ' V'
                    arrayTD[12 * i + 6].style.visibility = 'visible'
                    arrayTD[12 * i + 6].style.display = 'table-cell'
                    arrayTD[12 * i + 7].innerHTML = String(dadosTodosModulos[i].comprimento) + ' mm'
                    arrayTD[12 * i + 7].style.visibility = 'visible'
                    arrayTD[12 * i + 7].style.display = 'table-cell'
                    arrayTD[12 * i + 8].innerHTML = String(dadosTodosModulos[i].largura) + ' mm'
                    arrayTD[12 * i + 8].style.visibility = 'visible'
                    arrayTD[12 * i + 8].style.display = 'table-cell'
                    arrayTD[12 * i + 9].innerHTML = String(dadosTodosModulos[i].espessura) + ' mm'
                    arrayTD[12 * i + 9].style.visibility = 'visible'
                    arrayTD[12 * i + 9].style.display = 'table-cell'
                    arrayTD[12 * i + 10].innerHTML = String(dadosTodosModulos[i].eficiencia).replace('.', ',') + '%'
                    arrayTD[12 * i + 10].style.visibility = 'visible'
                    arrayTD[12 * i + 10].style.display = 'table-cell'
                    arrayTD[12 * i + 11].innerHTML = dadosTodosModulos[i].tipo
                    arrayTD[12 * i + 11].style.visibility = 'visible'
                    arrayTD[12 * i + 11].style.display = 'table-cell'
                    
                    if (i == (dadosTodosModulos.length - 1)) {
                        arrayTD[12 * i].style.borderBottom = 0;
                        arrayTD[12 * i + 1].style.borderBottom = 0;
                        arrayTD[12 * i + 2].style.borderBottom = 0;
                        arrayTD[12 * i + 3].style.borderBottom = 0;
                        arrayTD[12 * i + 4].style.borderBottom = 0;
                        arrayTD[12 * i + 5].style.borderBottom = 0;
                        arrayTD[12 * i + 6].style.borderBottom = 0;
                        arrayTD[12 * i + 7].style.borderBottom = 0;
                        arrayTD[12 * i + 8].style.borderBottom = 0;
                        arrayTD[12 * i + 9].style.borderBottom = 0;
                        arrayTD[12 * i + 10].style.borderBottom = 0;
                        arrayTD[12 * i + 11].style.borderBottom = 0;
                    }
                }

                else {
                    arrayTD[12 * i].style.visibility = 'hidden'
                    arrayTD[12 * i].style.display = 'none'
                    arrayTD[12 * i + 1].style.visibility = 'hidden'
                    arrayTD[12 * i + 1].style.display = 'none'
                    arrayTD[12 * i + 2].style.visibility = 'hidden'
                    arrayTD[12 * i + 2].style.display = 'none'
                    arrayTD[12 * i + 3].style.visibility = 'hidden'
                    arrayTD[12 * i + 3].style.display = 'none'
                    arrayTD[12 * i + 4].style.visibility = 'hidden'
                    arrayTD[12 * i + 4].style.display = 'none'
                    arrayTD[12 * i + 5].style.visibility = 'hidden'
                    arrayTD[12 * i + 5].style.display = 'none'
                    arrayTD[12 * i + 6].style.visibility = 'hidden'
                    arrayTD[12 * i + 6].style.display = 'none'
                    arrayTD[12 * i + 7].style.visibility = 'hidden'
                    arrayTD[12 * i + 7].style.display = 'none'
                    arrayTD[12 * i + 8].style.visibility = 'hidden'
                    arrayTD[12 * i + 8].style.display = 'none'
                    arrayTD[12 * i + 9].style.visibility = 'hidden'
                    arrayTD[12 * i + 9].style.display = 'none'
                    arrayTD[12 * i + 10].style.visibility = 'hidden'
                    arrayTD[12 * i + 10].style.display = 'none'
                    arrayTD[12 * i + 11].style.visibility = 'hidden'
                    arrayTD[12 * i + 11].style.display = 'none'
                }
            }
        }

        else if (dadosTodosModulos == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosModulos);
            checar_autorizacao();
        }
    }
}

async function get_all_modules_skip(alterar) {
    let access_token = localStorage.getItem('access_token');

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        
        let pagina = parseInt(localStorage.getItem('paginaAtualModulos')) + parseInt(alterar);

        if (pagina < 0) {
            pagina = 0
        }

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodosModulos = await axios.get(
            'http://localhost:8000/modules/?pular=' + pagina, config
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
            let arrayTD = document.getElementsByTagName('td')
            
            if (pagina > dadosTodosModulos.length) {
                pagina = parseInt(dadosTodosModulos.length - dadosTodosModulos.length % 10)
            }
            
            localStorage.setItem('paginaAtualModulos', pagina);
            
            for (i = 0; i < 10; i++) {
                if (i < dadosTodosModulos.length) {
                    arrayTD[12 * i].innerHTML = dadosTodosModulos[i].modelo
                    arrayTD[12 * i].style.visibility = 'visible'
                    arrayTD[12 * i].style.display = 'table-cell'
                    arrayTD[12 * i + 1].innerHTML = dadosTodosModulos[i].fabricante
                    arrayTD[12 * i + 1].style.visibility = 'visible'
                    arrayTD[12 * i + 1].style.display = 'table-cell'
                    arrayTD[12 * i + 2].innerHTML = String(dadosTodosModulos[i].potencia).replace('.', ',') + ' Wp'
                    arrayTD[12 * i + 2].style.visibility = 'visible'
                    arrayTD[12 * i + 2].style.display = 'table-cell'
                    arrayTD[12 * i + 3].innerHTML = String(dadosTodosModulos[i].imp).replace('.', ',') + ' A'
                    arrayTD[12 * i + 3].style.visibility = 'visible'
                    arrayTD[12 * i + 3].style.display = 'table-cell'
                    arrayTD[12 * i + 4].innerHTML = String(dadosTodosModulos[i].isc).replace('.', ',') + ' A'
                    arrayTD[12 * i + 4].style.visibility = 'visible'
                    arrayTD[12 * i + 4].style.display = 'table-cell'
                    arrayTD[12 * i + 5].innerHTML = String(dadosTodosModulos[i].vmp).replace('.', ',') + ' V'
                    arrayTD[12 * i + 5].style.visibility = 'visible'
                    arrayTD[12 * i + 5].style.display = 'table-cell'
                    arrayTD[12 * i + 6].innerHTML = String(dadosTodosModulos[i].voc).replace('.', ',') + ' V'
                    arrayTD[12 * i + 6].style.visibility = 'visible'
                    arrayTD[12 * i + 6].style.display = 'table-cell'
                    arrayTD[12 * i + 7].innerHTML = String(dadosTodosModulos[i].comprimento) + ' mm'
                    arrayTD[12 * i + 7].style.visibility = 'visible'
                    arrayTD[12 * i + 7].style.display = 'table-cell'
                    arrayTD[12 * i + 8].innerHTML = String(dadosTodosModulos[i].largura) + ' mm'
                    arrayTD[12 * i + 8].style.visibility = 'visible'
                    arrayTD[12 * i + 8].style.display = 'table-cell'
                    arrayTD[12 * i + 9].innerHTML = String(dadosTodosModulos[i].espessura) + ' mm'
                    arrayTD[12 * i + 9].style.visibility = 'visible'
                    arrayTD[12 * i + 9].style.display = 'table-cell'
                    arrayTD[12 * i + 10].innerHTML = String(dadosTodosModulos[i].eficiencia).replace('.', ',') + '%'
                    arrayTD[12 * i + 10].style.visibility = 'visible'
                    arrayTD[12 * i + 10].style.display = 'table-cell'
                    arrayTD[12 * i + 11].innerHTML = dadosTodosModulos[i].tipo
                    arrayTD[12 * i + 11].style.visibility = 'visible'
                    arrayTD[12 * i + 11].style.display = 'table-cell'
                    
                    if (i == (dadosTodosModulos.length - 1)) {
                        arrayTD[12 * i].style.borderBottom = 0;
                        arrayTD[12 * i + 1].style.borderBottom = 0;
                        arrayTD[12 * i + 2].style.borderBottom = 0;
                        arrayTD[12 * i + 3].style.borderBottom = 0;
                        arrayTD[12 * i + 4].style.borderBottom = 0;
                        arrayTD[12 * i + 5].style.borderBottom = 0;
                        arrayTD[12 * i + 6].style.borderBottom = 0;
                        arrayTD[12 * i + 7].style.borderBottom = 0;
                        arrayTD[12 * i + 8].style.borderBottom = 0;
                        arrayTD[12 * i + 9].style.borderBottom = 0;
                        arrayTD[12 * i + 10].style.borderBottom = 0;
                        arrayTD[12 * i + 11].style.borderBottom = 0;
                    }
                }
                
                else {
                    arrayTD[12 * i].style.visibility = 'hidden'
                    arrayTD[12 * i].style.display = 'none'
                    arrayTD[12 * i + 1].style.visibility = 'hidden'
                    arrayTD[12 * i + 1].style.display = 'none'
                    arrayTD[12 * i + 2].style.visibility = 'hidden'
                    arrayTD[12 * i + 2].style.display = 'none'
                    arrayTD[12 * i + 3].style.visibility = 'hidden'
                    arrayTD[12 * i + 3].style.display = 'none'
                    arrayTD[12 * i + 4].style.visibility = 'hidden'
                    arrayTD[12 * i + 4].style.display = 'none'
                    arrayTD[12 * i + 5].style.visibility = 'hidden'
                    arrayTD[12 * i + 5].style.display = 'none'
                    arrayTD[12 * i + 6].style.visibility = 'hidden'
                    arrayTD[12 * i + 6].style.display = 'none'
                    arrayTD[12 * i + 7].style.visibility = 'hidden'
                    arrayTD[12 * i + 7].style.display = 'none'
                    arrayTD[12 * i + 8].style.visibility = 'hidden'
                    arrayTD[12 * i + 8].style.display = 'none'
                    arrayTD[12 * i + 9].style.visibility = 'hidden'
                    arrayTD[12 * i + 9].style.display = 'none'
                    arrayTD[12 * i + 10].style.visibility = 'hidden'
                    arrayTD[12 * i + 10].style.display = 'none'
                    arrayTD[12 * i + 11].style.visibility = 'hidden'
                    arrayTD[12 * i + 11].style.display = 'none'
                }
            }
        }

        else if (dadosTodosModulos == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosModulos);
            checar_autorizacao();
        }
    }
}

async function get_module() {
    let access_token = localStorage.getItem('access_token');

    let modelo = document.getElementById('modelo-módulo-buscar').value;
    let divSearchModule = document.getElementById('container-search-modules');

    if (modelo != '') {
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosModulo = await axios.get(
            'http://localhost:8000/modules/' + modelo, config
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
        
        if (dadosModulo != 'Error: Request failed with status code 401' & dadosModulo != 'Error: Request failed with status code 404') {
            divSearchModule.style.visibility = 'hidden';
            divSearchModule.style.display = 'none';

            document.getElementById('container-modulo-encontrado').style.visibility = 'visible';
            document.getElementById('container-modulo-encontrado').style.display = 'grid';
            
            let hora = dadosModulo.criado_em.split('T')[1].split('.')[0];
            let data = dadosModulo.criado_em.split('-')[2].split('T')[0] + '/' + dadosModulo.criado_em.split('-')[1] + '/' + dadosModulo.criado_em.split('-')[0];
            
            if (dadosModulo.modelo != '') {
                document.getElementById('module-model').innerHTML = dadosModulo.modelo;
                document.getElementById('title-module-model').style.visibility = 'visible';
                document.getElementById('title-module-model').style.display = 'grid';
                document.getElementById('module-model').style.visibility = 'visible';
                document.getElementById('module-model').style.display = 'grid';
            }

            if (dadosModulo.fabricante != '') {
                document.getElementById('module-manufacturer').innerHTML = dadosModulo.fabricante;
                document.getElementById('title-module-manufacturer').style.visibility = 'visible';
                document.getElementById('title-module-manufacturer').style.display = 'grid';
                document.getElementById('module-manufacturer').style.visibility = 'visible';
                document.getElementById('module-manufacturer').style.display = 'grid';
            }

            if (dadosModulo.potencia != 0) {
                document.getElementById('module-power').innerHTML = dadosModulo.potencia.toString() + " Wp";
                document.getElementById('title-module-power').style.visibility = 'visible';
                document.getElementById('title-module-power').style.display = 'grid';
                document.getElementById('module-power').style.visibility = 'visible';
                document.getElementById('module-power').style.display = 'grid';
            }
            
            if (dadosModulo.imp != 0) {
                document.getElementById('module-imp').innerHTML = dadosModulo.imp.toString().replace('.', ',') + " A";
                document.getElementById('title-module-imp').style.visibility = 'visible';
                document.getElementById('title-module-imp').style.display = 'grid';
                document.getElementById('module-imp').style.visibility = 'visible';
                document.getElementById('module-imp').style.display = 'grid';
            }
            
            if (dadosModulo.isc != 0) {
                document.getElementById('module-isc').innerHTML = dadosModulo.isc.toString().replace('.', ',') + " A";
                document.getElementById('title-module-isc').style.visibility = 'visible';
                document.getElementById('title-module-isc').style.display = 'grid';
                document.getElementById('module-isc').style.visibility = 'visible';
                document.getElementById('module-isc').style.display = 'grid';
            }

            if (dadosModulo.vmp != 0) {
                document.getElementById('module-vmp').innerHTML = dadosModulo.vmp.toString().replace('.', ',') + " V";
                document.getElementById('title-module-vmp').style.visibility = 'visible';
                document.getElementById('title-module-vmp').style.display = 'grid';
                document.getElementById('module-vmp').style.visibility = 'visible';
                document.getElementById('module-vmp').style.display = 'grid';
            }
            
            if (dadosModulo.voc != 0) {
                document.getElementById('module-voc').innerHTML = dadosModulo.voc.toString().replace('.', ',') + " V";
                document.getElementById('title-module-voc').style.visibility = 'visible';
                document.getElementById('title-module-voc').style.display = 'grid';
                document.getElementById('module-voc').style.visibility = 'visible';
                document.getElementById('module-voc').style.display = 'grid';
            }
            
            if (dadosModulo.comprimento != 0) {
                document.getElementById('module-width').innerHTML = dadosModulo.comprimento.toString() + " mm";
                document.getElementById('title-module-width').style.visibility = 'visible';
                document.getElementById('title-module-width').style.display = 'grid';
                document.getElementById('module-width').style.visibility = 'visible';
                document.getElementById('module-width').style.display = 'grid';
            }
            
            if (dadosModulo.largura != 0) {
                document.getElementById('module-length').innerHTML = dadosModulo.largura.toString() + " mm";
                document.getElementById('title-module-length').style.visibility = 'visible';
                document.getElementById('title-module-length').style.display = 'grid';
                document.getElementById('module-length').style.visibility = 'visible';
                document.getElementById('module-length').style.display = 'grid';
            }
            
            if (dadosModulo.espessura != 0) {
                document.getElementById('module-thickness').innerHTML = dadosModulo.espessura.toString() + " mm";
                document.getElementById('title-module-thickness').style.visibility = 'visible';
                document.getElementById('title-module-thickness').style.display = 'grid';
                document.getElementById('module-thickness').style.visibility = 'visible';
                document.getElementById('module-thickness').style.display = 'grid';
            }
            
            if (dadosModulo.eficiencia != 0) {
                document.getElementById('module-efficiency').innerHTML = dadosModulo.eficiencia.toString().replace('.', ',') + "%";
                document.getElementById('title-module-efficiency').style.visibility = 'visible';
                document.getElementById('title-module-efficiency').style.display = 'grid';
                document.getElementById('module-efficiency').style.visibility = 'visible';
                document.getElementById('module-efficiency').style.display = 'grid';
            }

            if (dadosModulo.temperatura_nominal != '') {
                document.getElementById('module-temperature').innerHTML = dadosModulo.temperatura_nominal.toString() + ' °C';
                document.getElementById('title-module-temperature').style.visibility = 'visible';
                document.getElementById('title-module-temperature').style.display = 'grid';
                document.getElementById('module-temperature').style.visibility = 'visible';
                document.getElementById('module-temperature').style.display = 'grid';
            }
            
            if (dadosModulo.tipo != '') {
                document.getElementById('module-type').innerHTML = dadosModulo.tipo;
                document.getElementById('title-module-type').style.visibility = 'visible';
                document.getElementById('title-module-type').style.display = 'grid';
                document.getElementById('module-type').style.visibility = 'visible';
                document.getElementById('module-type').style.display = 'grid';
            }
            
            if (dadosModulo.coeficiente_temperatura != 0) {
                document.getElementById('module-coefficient').innerHTML = dadosModulo.coeficiente_temperatura.toString().replace('.', ',') + "%/°C";
                document.getElementById('title-module-coefficient').style.visibility = 'visible';
                document.getElementById('title-module-coefficient').style.display = 'grid';
                document.getElementById('module-coefficient').style.visibility = 'visible';
                document.getElementById('module-coefficient').style.display = 'grid';
            }
            
            if (dadosModulo.criado_em != '') {
                document.getElementById('module-added-in').innerHTML = data + ' às ' + hora;
                document.getElementById('title-module-added-in').style.visibility = 'visible';
                document.getElementById('title-module-added-in').style.display = 'grid';
                document.getElementById('module-added-in').style.visibility = 'visible';
                document.getElementById('module-added-in').style.display = 'grid';
            }
        }

        else if (dadosModulo == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosModulo);
            checar_autorizacao();
        }

        else {
            let arrayModuloInexistente = document.getElementsByClassName('container-modulo-inexistente')

            for (i = 0; i < arrayModuloInexistente.length; i ++) {
                arrayModuloInexistente[i].style.visibility = 'visible';
                arrayModuloInexistente[i].style.display = 'flex';
            }
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-modulos')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

async function post_module() {
    let access_token = localStorage.getItem('access_token');

    let modelo = document.getElementById('modelo-módulo-adicionar').value
    let fabricante = document.getElementById('fabricante-módulo-adicionar').value.toUpperCase()
    let potencia = document.getElementById('potência-módulo-adicionar').value
    let imp = document.getElementById('imp-módulo-adicionar').value
    
    if (imp.includes(',') == true) {
        imp = imp.replace(',', '.')
    }

    let isc = document.getElementById('isc-módulo-adicionar').value

    if (isc.includes(',') == true) {
        isc = isc.replace(',', '.')
    }

    let vmp = document.getElementById('vmp-módulo-adicionar').value

    if (vmp.includes(',') == true) {
        vmp = vmp.replace(',', '.')
    }

    let voc = document.getElementById('voc-módulo-adicionar').value

    if (voc.includes(',') == true) {
        voc = voc.replace(',', '.')
    }

    let comprimento = document.getElementById('comprimento-módulo-adicionar').value
    let largura = document.getElementById('largura-módulo-adicionar').value
    let espessura = document.getElementById('espessura-módulo-adicionar').value
    let eficiencia = document.getElementById('eficiência-módulo-adicionar').value

    if (eficiencia.includes(',') == true) {
        eficiencia = eficiencia.replace(',', '.')
    }

    let temperatura_nominal = document.getElementById('temperatura-módulo-adicionar').value
    let tipo = document.getElementById('tipo-módulo-adicionar').value
    let coeficiente_temperatura = document.getElementById('coeficiente-módulo-adicionar').value

    if (coeficiente_temperatura.includes(',') == true) {
        coeficiente_temperatura = coeficiente_temperatura.replace(',', '.')
    }

    dicionario = {
        'modelo': modelo,
        'fabricante': fabricante,
        'potencia': potencia,
        'imp': imp,
        'isc': isc,
        'vmp': vmp,
        'voc': voc,
        'comprimento': comprimento,
        'largura': largura,
        'espessura': espessura,
        'eficiencia': eficiencia,
        'temperatura_nominal': temperatura_nominal,
        'tipo': tipo,
        'coeficiente_temperatura': coeficiente_temperatura
    }

    let config = {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
    }

    if (modelo != '' & fabricante != '' & potencia != '' & imp != '' & isc != '' & vmp != '' & voc != '' & comprimento != '' & largura != '' & espessura != '' & eficiencia != '' & temperatura_nominal != '' & tipo != '' & coeficiente_temperatura != ''){
        resposta = await axios.post(
            'http://localhost:8000/modules', dicionario, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )

        if (resposta != 'Error: Network Error' & resposta != 'Error: Request failed with status code 401') {
            document.getElementById('container-modulo-adicionado').style.visibility = 'visible';
            document.getElementById('container-modulo-adicionado').style.display = 'grid';
            
            document.getElementById('container-add-modules-general').style.visibility = 'hidden';
            document.getElementById('container-add-modules-general').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else {
            divExistentClient = document.getElementsByClassName('container-modulo-existente')
            divExistentClient[0].style.visibility = 'visible';
            divExistentClient[0].style.display = 'flex';
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-modulos')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

async function patch_module() {
    let access_token = localStorage.getItem('access_token');

    let id = document.getElementById('modelo-módulo-buscar-atualizar').value;

    let modelo = document.getElementById('modelo-módulo-atualizar').value
    let fabricante = document.getElementById('fabricante-módulo-atualizar').value.toUpperCase()
    let potencia = document.getElementById('potência-módulo-atualizar').value
    let imp = document.getElementById('imp-módulo-atualizar').value

    if (imp.includes(',') == true) {
        imp = imp.replace(',', '.')
    }

    let isc = document.getElementById('isc-módulo-atualizar').value

    if (isc.includes(',') == true) {
        isc = isc.replace(',', '.')
    }

    let vmp = document.getElementById('vmp-módulo-atualizar').value

    if (vmp.includes(',') == true) {
        vmp = vmp.replace(',', '.')
    }

    let voc = document.getElementById('voc-módulo-atualizar').value

    if (voc.includes(',') == true) {
        voc = voc.replace(',', '.')
    }

    let comprimento = document.getElementById('comprimento-módulo-atualizar').value
    let largura = document.getElementById('largura-módulo-atualizar').value
    let espessura = document.getElementById('espessura-módulo-atualizar').value
    let eficiencia = document.getElementById('eficiência-módulo-atualizar').value

    if (eficiencia.includes(',') == true) {
        eficiencia = eficiencia.replace(',', '.')
    }

    let temperatura_nominal = document.getElementById('temperatura-módulo-atualizar').value
    let tipo = document.getElementById('tipo-módulo-atualizar').value
    let coeficiente_temperatura = document.getElementById('coeficiente-módulo-atualizar').value

    if (coeficiente_temperatura.includes(',') == true) {
        coeficiente_temperatura = coeficiente_temperatura.replace(',', '.')
    }

    let dicionario = {}; // Create an empty array

    let config = {
        headers: {
        'Authorization': 'Bearer ' + access_token
        }
    }

    let dadosOriginais = await axios.get(
        'http://localhost:8000/modules/' + id.toString(), config
    ).then(
        function (response) {
            const dadosProjeto = response.data;
            return dadosProjeto;
        }
    ).catch(
        function (error) {
            console.log(error);
            return error;
        }
    )
    
    if (modelo != dadosOriginais.modelo.toString()){
        dicionario['modelo'] = modelo
    }

    if (fabricante != dadosOriginais.fabricante.toString()){
        dicionario['fabricante'] = fabricante
    }

    if (potencia != dadosOriginais.potencia.toString()){
        dicionario['potencia'] = potencia
    }

    if (imp != dadosOriginais.imp.toString()){
        dicionario['imp'] = imp
    }

    if (isc != dadosOriginais.isc.toString()){
        dicionario['isc'] = isc
    }

    if (vmp != dadosOriginais.vmp.toString()){
        dicionario['vmp'] = vmp
    }

    if (voc != dadosOriginais.voc.toString()){
        dicionario['voc'] = voc
    }
    
    if (comprimento != dadosOriginais.comprimento.toString()){
        dicionario['comprimento'] = comprimento
    }
    
    if (largura != dadosOriginais.largura.toString()){
        dicionario['largura'] = largura
    }
    
    if (espessura != dadosOriginais.espessura.toString()){
        dicionario['espessura'] = espessura
    }
    
    if (eficiencia != dadosOriginais.eficiencia.toString()){
        dicionario['eficiencia'] = eficiencia
    }

    if (temperatura_nominal != dadosOriginais.temperatura_nominal.toString()){
        dicionario['temperatura_nominal'] = temperatura_nominal
    }

    if (tipo != dadosOriginais.tipo.toString()){
        dicionario['tipo'] = tipo
    }
    
    if (coeficiente_temperatura != dadosOriginais.coeficiente_temperatura.toString()){
        dicionario['coeficiente_temperatura'] = coeficiente_temperatura
    }

    if (Object.keys(dicionario).length == 0){
        containerCamposNaoPreenchidos = document.getElementsByClassName('container-campos-nao-preenchidos')
        containerCamposNaoPreenchidos[0].style.visibility = "visible"
        containerCamposNaoPreenchidos[0].style.display = "flex"
    }

    else {
        url = 'http://localhost:8000/modules/' + id
        
        resposta = await axios.patch(
            url, dicionario, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (resposta != 'Error: Request failed with status code 404' & resposta != 'Error: Request failed with status code 401') {
            document.getElementById('container-modulo-atualizado').style.visibility = 'visible';
            document.getElementById('container-modulo-atualizado').style.display = 'grid';
                
            document.getElementById('container-update-modules-general').style.visibility = 'hidden';
            document.getElementById('container-update-modules-general').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else {
            let arrayModuloInexistente = document.getElementsByClassName('container-modulo-inexistente')

            for (i = 0; i < arrayModuloInexistente.length; i ++) {
                arrayModuloInexistente[i].style.visibility = 'visible'
                arrayModuloInexistente[i].style.display = 'flex'
            }
        }
    }
}

async function delete_module() {
    let access_token = localStorage.getItem('access_token');
    let id = document.getElementById('modelo-módulo-deletar').value;

    if (id != '') {

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let resposta = await axios.delete(
            'http://localhost:8000/modules/' + id, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (resposta == '') {
            document.getElementById('container-modulo-deletado').style.visibility = 'visible';
            document.getElementById('container-modulo-deletado').style.display = 'grid';

            document.getElementById('container-delete-modules').style.visibility = 'hidden';
            document.getElementById('container-delete-modules').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else if (resposta == 'Error: Request failed with status code 404') {
            let arrayModuloInexistente = document.getElementsByClassName('container-modulo-inexistente');

            for (i = 0; i < arrayModuloInexistente.length; i ++) {
                arrayModuloInexistente[i].style.visibility = 'visible';
                arrayModuloInexistente[i].style.display = 'flex';
            }
        }

    }
    
    else {
        let arrayCampos = document.getElementsByClassName('campo-obrigatorio-modulos');

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

//FUNÇÕES PARA A PÁGINA DE MÓDULOS
async function get_all_inverters() {
    let access_token = localStorage.getItem('access_token');

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        localStorage.setItem('paginaAtualInversores', 0);

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodosInversores = await axios.get(
            'http://localhost:8000/inverters/', config
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
            let arrayTD = document.getElementsByTagName('td')
            
            for (i = 0; i < 10; i++) {
                if (i < dadosTodosInversores.length) {
                    arrayTD[12 * i].innerHTML = dadosTodosInversores[i].modelo
                    arrayTD[12 * i].style.visibility = 'visible'
                    arrayTD[12 * i].style.display = 'table-cell'
                    arrayTD[12 * i + 1].innerHTML = dadosTodosInversores[i].fabricante
                    arrayTD[12 * i + 1].style.visibility = 'visible'
                    arrayTD[12 * i + 1].style.display = 'table-cell'
                    arrayTD[12 * i + 2].innerHTML = (dadosTodosInversores[i].potencia / 1000).toString().replace('.', ',') + ' kW'
                    arrayTD[12 * i + 2].style.visibility = 'visible'
                    arrayTD[12 * i + 2].style.display = 'table-cell'
                    arrayTD[12 * i + 3].innerHTML = (dadosTodosInversores[i].overload / 1000).toString().replace('.', ',') + ' kW'
                    arrayTD[12 * i + 3].style.visibility = 'visible'
                    arrayTD[12 * i + 3].style.display = 'table-cell'
                    arrayTD[12 * i + 4].innerHTML = dadosTodosInversores[i].n_mppt
                    arrayTD[12 * i + 4].style.visibility = 'visible'
                    arrayTD[12 * i + 4].style.display = 'table-cell'
                    arrayTD[12 * i + 5].innerHTML = dadosTodosInversores[i].n_entrada
                    arrayTD[12 * i + 5].style.visibility = 'visible'
                    arrayTD[12 * i + 5].style.display = 'table-cell'
                    arrayTD[12 * i + 6].innerHTML = (dadosTodosInversores[i].imp).toString().replace('.', ',') + ' A'
                    arrayTD[12 * i + 6].style.visibility = 'visible'
                    arrayTD[12 * i + 6].style.display = 'table-cell'
                    arrayTD[12 * i + 7].innerHTML = (dadosTodosInversores[i].isc).toString().replace('.', ',') + ' A'
                    arrayTD[12 * i + 7].style.visibility = 'visible'
                    arrayTD[12 * i + 7].style.display = 'table-cell'
                    arrayTD[12 * i + 8].innerHTML = dadosTodosInversores[i].v_min_mppt + '-' + dadosTodosInversores[i].v_max_mppt + ' V'
                    arrayTD[12 * i + 8].style.visibility = 'visible'
                    arrayTD[12 * i + 8].style.display = 'table-cell'
                    arrayTD[12 * i + 9].innerHTML = dadosTodosInversores[i].v_max + ' V'
                    arrayTD[12 * i + 9].style.visibility = 'visible'
                    arrayTD[12 * i + 9].style.display = 'table-cell'
                    arrayTD[12 * i + 10].innerHTML = dadosTodosInversores[i].i_saida + ' A'
                    arrayTD[12 * i + 10].style.visibility = 'visible'
                    arrayTD[12 * i + 10].style.display = 'table-cell'
                    arrayTD[12 * i + 11].innerHTML = dadosTodosInversores[i].v_saida + ' V'
                    arrayTD[12 * i + 11].style.visibility = 'visible'
                    arrayTD[12 * i + 11].style.display = 'table-cell'
                    
                    if (i == (dadosTodosInversores.length - 1)) {
                        arrayTD[12 * i].style.borderBottom = 0;
                        arrayTD[12 * i + 1].style.borderBottom = 0;
                        arrayTD[12 * i + 2].style.borderBottom = 0;
                        arrayTD[12 * i + 3].style.borderBottom = 0;
                        arrayTD[12 * i + 4].style.borderBottom = 0;
                        arrayTD[12 * i + 5].style.borderBottom = 0;
                        arrayTD[12 * i + 6].style.borderBottom = 0;
                        arrayTD[12 * i + 7].style.borderBottom = 0;
                        arrayTD[12 * i + 8].style.borderBottom = 0;
                        arrayTD[12 * i + 9].style.borderBottom = 0;
                        arrayTD[12 * i + 10].style.borderBottom = 0;
                        arrayTD[12 * i + 11].style.borderBottom = 0;
                    }
                }

                else {
                    arrayTD[12 * i].style.visibility = 'hidden'
                    arrayTD[12 * i].style.display = 'none'
                    arrayTD[12 * i + 1].style.visibility = 'hidden'
                    arrayTD[12 * i + 1].style.display = 'none'
                    arrayTD[12 * i + 2].style.visibility = 'hidden'
                    arrayTD[12 * i + 2].style.display = 'none'
                    arrayTD[12 * i + 3].style.visibility = 'hidden'
                    arrayTD[12 * i + 3].style.display = 'none'
                    arrayTD[12 * i + 4].style.visibility = 'hidden'
                    arrayTD[12 * i + 4].style.display = 'none'
                    arrayTD[12 * i + 5].style.visibility = 'hidden'
                    arrayTD[12 * i + 5].style.display = 'none'
                    arrayTD[12 * i + 6].style.visibility = 'hidden'
                    arrayTD[12 * i + 6].style.display = 'none'
                    arrayTD[12 * i + 7].style.visibility = 'hidden'
                    arrayTD[12 * i + 7].style.display = 'none'
                    arrayTD[12 * i + 8].style.visibility = 'hidden'
                    arrayTD[12 * i + 8].style.display = 'none'
                    arrayTD[12 * i + 9].style.visibility = 'hidden'
                    arrayTD[12 * i + 9].style.display = 'none'
                    arrayTD[12 * i + 10].style.visibility = 'hidden'
                    arrayTD[12 * i + 10].style.display = 'none'
                    arrayTD[12 * i + 11].style.visibility = 'hidden'
                    arrayTD[12 * i + 11].style.display = 'none'
                }
            }
        }

        else if (dadosTodosInversores == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosInversores);
            checar_autorizacao();
        }
    }
}

async function get_all_inverters_skip(alterar) {
    let access_token = localStorage.getItem('access_token');

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        
        let pagina = parseInt(localStorage.getItem('paginaAtualInversores')) + parseInt(alterar);

        if (pagina < 0) {
            pagina = 0
        }

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodosInversores = await axios.get(
            'http://localhost:8000/inverters/?pular=' + pagina, config
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
            let arrayTD = document.getElementsByTagName('td')
            
            if (pagina > dadosTodosInversores.length) {
                pagina = parseInt(dadosTodosInversores.length - dadosTodosInversores.length % 10)
            }
            
            localStorage.setItem('paginaAtualInversores', pagina);
            
            for (i = 0; i < 10; i++) {
                if (i < dadosTodosInversores.length) {
                    arrayTD[12 * i].innerHTML = dadosTodosInversores[i].modelo
                    arrayTD[12 * i].style.visibility = 'visible'
                    arrayTD[12 * i].style.display = 'table-cell'
                    arrayTD[12 * i + 1].innerHTML = dadosTodosInversores[i].fabricante
                    arrayTD[12 * i + 1].style.visibility = 'visible'
                    arrayTD[12 * i + 1].style.display = 'table-cell'
                    arrayTD[12 * i + 2].innerHTML = (dadosTodosInversores[i].potencia / 1000).toString().replace('.', ',') + ' kW'
                    arrayTD[12 * i + 2].style.visibility = 'visible'
                    arrayTD[12 * i + 2].style.display = 'table-cell'
                    arrayTD[12 * i + 3].innerHTML = (dadosTodosInversores[i].overload / 1000).toString().replace('.', ',') + ' kW'
                    arrayTD[12 * i + 3].style.visibility = 'visible'
                    arrayTD[12 * i + 3].style.display = 'table-cell'
                    arrayTD[12 * i + 4].innerHTML = dadosTodosInversores[i].n_mppt
                    arrayTD[12 * i + 4].style.visibility = 'visible'
                    arrayTD[12 * i + 4].style.display = 'table-cell'
                    arrayTD[12 * i + 5].innerHTML = dadosTodosInversores[i].n_entrada
                    arrayTD[12 * i + 5].style.visibility = 'visible'
                    arrayTD[12 * i + 5].style.display = 'table-cell'
                    arrayTD[12 * i + 6].innerHTML = (dadosTodosInversores[i].imp).toString().replace('.', ',') + ' A'
                    arrayTD[12 * i + 6].style.visibility = 'visible'
                    arrayTD[12 * i + 6].style.display = 'table-cell'
                    arrayTD[12 * i + 7].innerHTML = (dadosTodosInversores[i].isc).toString().replace('.', ',') + ' A'
                    arrayTD[12 * i + 7].style.visibility = 'visible'
                    arrayTD[12 * i + 7].style.display = 'table-cell'
                    arrayTD[12 * i + 8].innerHTML = dadosTodosInversores[i].v_min_mppt + '-' + dadosTodosInversores[i].v_max_mppt + ' V'
                    arrayTD[12 * i + 8].style.visibility = 'visible'
                    arrayTD[12 * i + 8].style.display = 'table-cell'
                    arrayTD[12 * i + 9].innerHTML = dadosTodosInversores[i].v_max + ' V'
                    arrayTD[12 * i + 9].style.visibility = 'visible'
                    arrayTD[12 * i + 9].style.display = 'table-cell'
                    arrayTD[12 * i + 10].innerHTML = dadosTodosInversores[i].i_saida + ' A'
                    arrayTD[12 * i + 10].style.visibility = 'visible'
                    arrayTD[12 * i + 10].style.display = 'table-cell'
                    arrayTD[12 * i + 11].innerHTML = dadosTodosInversores[i].v_saida + ' V'
                    arrayTD[12 * i + 11].style.visibility = 'visible'
                    arrayTD[12 * i + 11].style.display = 'table-cell'
                    
                    if (i == (dadosTodosInversores.length - 1)) {
                        arrayTD[12 * i].style.borderBottom = 0;
                        arrayTD[12 * i + 1].style.borderBottom = 0;
                        arrayTD[12 * i + 2].style.borderBottom = 0;
                        arrayTD[12 * i + 3].style.borderBottom = 0;
                        arrayTD[12 * i + 4].style.borderBottom = 0;
                        arrayTD[12 * i + 5].style.borderBottom = 0;
                        arrayTD[12 * i + 6].style.borderBottom = 0;
                        arrayTD[12 * i + 7].style.borderBottom = 0;
                        arrayTD[12 * i + 8].style.borderBottom = 0;
                        arrayTD[12 * i + 9].style.borderBottom = 0;
                        arrayTD[12 * i + 10].style.borderBottom = 0;
                        arrayTD[12 * i + 11].style.borderBottom = 0;
                    }
                }

                else {
                    arrayTD[12 * i].style.visibility = 'hidden'
                    arrayTD[12 * i].style.display = 'none'
                    arrayTD[12 * i + 1].style.visibility = 'hidden'
                    arrayTD[12 * i + 1].style.display = 'none'
                    arrayTD[12 * i + 2].style.visibility = 'hidden'
                    arrayTD[12 * i + 2].style.display = 'none'
                    arrayTD[12 * i + 3].style.visibility = 'hidden'
                    arrayTD[12 * i + 3].style.display = 'none'
                    arrayTD[12 * i + 4].style.visibility = 'hidden'
                    arrayTD[12 * i + 4].style.display = 'none'
                    arrayTD[12 * i + 5].style.visibility = 'hidden'
                    arrayTD[12 * i + 5].style.display = 'none'
                    arrayTD[12 * i + 6].style.visibility = 'hidden'
                    arrayTD[12 * i + 6].style.display = 'none'
                    arrayTD[12 * i + 7].style.visibility = 'hidden'
                    arrayTD[12 * i + 7].style.display = 'none'
                    arrayTD[12 * i + 8].style.visibility = 'hidden'
                    arrayTD[12 * i + 8].style.display = 'none'
                    arrayTD[12 * i + 9].style.visibility = 'hidden'
                    arrayTD[12 * i + 9].style.display = 'none'
                    arrayTD[12 * i + 10].style.visibility = 'hidden'
                    arrayTD[12 * i + 10].style.display = 'none'
                    arrayTD[12 * i + 11].style.visibility = 'hidden'
                    arrayTD[12 * i + 11].style.display = 'none'
                }
            }
        }

        else if (dadosTodosInversores == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosInversores);
            checar_autorizacao();
        }
    }
}

async function get_inverter() {
    let access_token = localStorage.getItem('access_token');

    let modelo = document.getElementById('modelo-inversor-buscar').value;
    let divSearchInverter = document.getElementById('container-search-inverters');

    if (modelo != '') {
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosInversor = await axios.get(
            'http://localhost:8000/inverters/' + modelo, config
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
        
        if (dadosInversor != 'Error: Request failed with status code 401' & dadosInversor != 'Error: Request failed with status code 404') {
            divSearchInverter.style.visibility = 'hidden';
            divSearchInverter.style.display = 'none';

            document.getElementById('container-inversor-encontrado').style.visibility = 'visible';
            document.getElementById('container-inversor-encontrado').style.display = 'grid';
            
            let hora = dadosInversor.criado_em.split('T')[1].split('.')[0];
            let data = dadosInversor.criado_em.split('-')[2].split('T')[0] + '/' + dadosInversor.criado_em.split('-')[1] + '/' + dadosInversor.criado_em.split('-')[0];

            if (dadosInversor.modelo != '') {
                document.getElementById('inverter-model').innerHTML = dadosInversor.modelo;
                document.getElementById('title-inverter-model').style.visibility = 'visible';
                document.getElementById('title-inverter-model').style.display = 'grid';
                document.getElementById('inverter-model').style.visibility = 'visible';
                document.getElementById('inverter-model').style.display = 'grid';
            }

            if (dadosInversor.fabricante != '') {
                document.getElementById('inverter-manufacturer').innerHTML = dadosInversor.fabricante;
                document.getElementById('title-inverter-manufacturer').style.visibility = 'visible';
                document.getElementById('title-inverter-manufacturer').style.display = 'grid';
                document.getElementById('inverter-manufacturer').style.visibility = 'visible';
                document.getElementById('inverter-manufacturer').style.display = 'grid';
            }

            if (dadosInversor.potencia != 0) {
                document.getElementById('inverter-power').innerHTML = (dadosInversor.potencia / 1000).toString().replace('.', ',') + " kW";
                document.getElementById('title-inverter-power').style.visibility = 'visible';
                document.getElementById('title-inverter-power').style.display = 'grid';
                document.getElementById('inverter-power').style.visibility = 'visible';
                document.getElementById('inverter-power').style.display = 'grid';
            }
            
            if (dadosInversor.overload != 0) {
                document.getElementById('inverter-overload').innerHTML = (dadosInversor.overload / 1000).toString().replace('.', ',') + " kW";
                document.getElementById('title-inverter-overload').style.visibility = 'visible';
                document.getElementById('title-inverter-overload').style.display = 'grid';
                document.getElementById('inverter-overload').style.visibility = 'visible';
                document.getElementById('inverter-overload').style.display = 'grid';
            }

            if (dadosInversor.n_mppt != 0) {
                document.getElementById('inverter-mppt').innerHTML = dadosInversor.n_mppt;
                document.getElementById('title-inverter-mppt').style.visibility = 'visible';
                document.getElementById('title-inverter-mppt').style.display = 'grid';
                document.getElementById('inverter-mppt').style.visibility = 'visible';
                document.getElementById('inverter-mppt').style.display = 'grid';
            }

            if (dadosInversor.n_entrada != 0) {
                document.getElementById('inverter-input').innerHTML = dadosInversor.n_entrada;
                document.getElementById('title-inverter-input').style.visibility = 'visible';
                document.getElementById('title-inverter-input').style.display = 'grid';
                document.getElementById('inverter-input').style.visibility = 'visible';
                document.getElementById('inverter-input').style.display = 'grid';
            }
            
            if (dadosInversor.imp != 0) {
                document.getElementById('inverter-imp').innerHTML = dadosInversor.imp.toString().replace('.', ',') + " A";
                document.getElementById('title-inverter-imp').style.visibility = 'visible';
                document.getElementById('title-inverter-imp').style.display = 'grid';
                document.getElementById('inverter-imp').style.visibility = 'visible';
                document.getElementById('inverter-imp').style.display = 'grid';
            }

            if (dadosInversor.isc != 0) {
                document.getElementById('inverter-isc').innerHTML = dadosInversor.isc.toString().replace('.', ',') + " A";
                document.getElementById('title-inverter-isc').style.visibility = 'visible';
                document.getElementById('title-inverter-isc').style.display = 'grid';
                document.getElementById('inverter-isc').style.visibility = 'visible';
                document.getElementById('inverter-isc').style.display = 'grid';
            }

            if (dadosInversor.v_max_mppt != 0 & dadosInversor.v_min_mppt != 0) {
                document.getElementById('inverter-vmp').innerHTML = dadosInversor.v_min_mppt.toString() + "-" + dadosInversor.v_max_mppt.toString() + " V";
                document.getElementById('title-inverter-vmp').style.visibility = 'visible';
                document.getElementById('title-inverter-vmp').style.display = 'grid';
                document.getElementById('inverter-vmp').style.visibility = 'visible';
                document.getElementById('inverter-vmp').style.display = 'grid';
            }
            
            if (dadosInversor.v_max != 0) {
                document.getElementById('inverter-voc').innerHTML = dadosInversor.v_max.toString() + " V";
                document.getElementById('title-inverter-voc').style.visibility = 'visible';
                document.getElementById('title-inverter-voc').style.display = 'grid';
                document.getElementById('inverter-voc').style.visibility = 'visible';
                document.getElementById('inverter-voc').style.display = 'grid';
            }
            
            if (dadosInversor.i_saida != 0) {
                document.getElementById('inverter-iout').innerHTML = dadosInversor.i_saida.toString().replace('.', ',') + " A";
                document.getElementById('title-inverter-iout').style.visibility = 'visible';
                document.getElementById('title-inverter-iout').style.display = 'grid';
                document.getElementById('inverter-iout').style.visibility = 'visible';
                document.getElementById('inverter-iout').style.display = 'grid';
            }

            if (dadosInversor.v_saida != 0) {
                document.getElementById('inverter-vout').innerHTML = dadosInversor.v_saida.toString() + " V";
                document.getElementById('title-inverter-vout').style.visibility = 'visible';
                document.getElementById('title-inverter-vout').style.display = 'grid';
                document.getElementById('inverter-vout').style.visibility = 'visible';
                document.getElementById('inverter-vout').style.display = 'grid';
            }
            
            if (dadosInversor.comprimento != 0) {
                document.getElementById('inverter-width').innerHTML = dadosInversor.comprimento.toString() + " mm";
                document.getElementById('title-inverter-width').style.visibility = 'visible';
                document.getElementById('title-inverter-width').style.display = 'grid';
                document.getElementById('inverter-width').style.visibility = 'visible';
                document.getElementById('inverter-width').style.display = 'grid';
            }

            if (dadosInversor.largura != 0) {
                document.getElementById('inverter-length').innerHTML = dadosInversor.largura.toString() + " mm";
                document.getElementById('title-inverter-length').style.visibility = 'visible';
                document.getElementById('title-inverter-length').style.display = 'grid';
                document.getElementById('inverter-length').style.visibility = 'visible';
                document.getElementById('inverter-length').style.display = 'grid';
            }

            if (dadosInversor.espessura != 0) {
                document.getElementById('inverter-thickness').innerHTML = dadosInversor.espessura.toString() + " mm";
                document.getElementById('title-inverter-thickness').style.visibility = 'visible';
                document.getElementById('title-inverter-thickness').style.display = 'grid';
                document.getElementById('inverter-thickness').style.visibility = 'visible';
                document.getElementById('inverter-thickness').style.display = 'grid';
            }
            
            if (dadosInversor.eficiencia != 0) {
                document.getElementById('inverter-efficiency').innerHTML = dadosInversor.eficiencia.toString().replace('.', ',') + "%";
                document.getElementById('title-inverter-efficiency').style.visibility = 'visible';
                document.getElementById('title-inverter-efficiency').style.display = 'grid';
                document.getElementById('inverter-efficiency').style.visibility = 'visible';
                document.getElementById('inverter-efficiency').style.display = 'grid';
            }

            if (dadosInversor.criado_em != 0) {
                document.getElementById('inverter-added-in').innerHTML = data + " ás " + hora;
                document.getElementById('title-inverter-added-in').style.visibility = 'visible';
                document.getElementById('title-inverter-added-in').style.display = 'grid';
                document.getElementById('inverter-added-in').style.visibility = 'visible';
                document.getElementById('inverter-added-in').style.display = 'grid';
            }
        }

        else if (dadosInversor == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosInversor);
            checar_autorizacao();
        }

        else {
            let arrayInversorInexistente = document.getElementsByClassName('container-inversor-inexistente')

            for (i = 0; i < arrayInversorInexistente.length; i ++) {
                arrayInversorInexistente[i].style.visibility = 'visible';
                arrayInversorInexistente[i].style.display = 'flex';
            }
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-modulos')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

async function post_inverter() {
    let access_token = localStorage.getItem('access_token');

    let modelo = document.getElementById('modelo-inversor-adicionar').value
    let fabricante = document.getElementById('fabricante-inversor-adicionar').value.toUpperCase()
    let potencia = document.getElementById('potência-inversor-adicionar').value
    let overload = document.getElementById('overload-inversor-adicionar').value
    let imp = document.getElementById('imp-inversor-adicionar').value
    
    if (imp.includes(',') == true) {
        imp = imp.replace(',', '.')
    }

    let isc = document.getElementById('isc-inversor-adicionar').value

    if (isc.includes(',') == true) {
        isc = isc.replace(',', '.')
    }

    let v_min_mppt = document.getElementById('vmin-mppt-inversor-adicionar').value
    let v_max_mppt = document.getElementById('vmax-mppt-inversor-adicionar').value
    let v_max = document.getElementById('voc-inversor-adicionar').value
    let n_mppt = document.getElementById('n-mppt-inversor-adicionar').value
    let n_entrada = document.getElementById('n-entrada-inversor-adicionar').value
    let v_saida = document.getElementById('v-saída-inversor-adicionar').value
    let i_saida = document.getElementById('i-saída-inversor-adicionar').value

    if (i_saida.includes(',') == true) {
        i_saida = i_saida.replace(',', '.')
    }

    let comprimento = document.getElementById('comprimento-inversor-adicionar').value
    let largura = document.getElementById('largura-inversor-adicionar').value
    let espessura = document.getElementById('espessura-inversor-adicionar').value
    let eficiencia = document.getElementById('eficiência-inversor-adicionar').value

    if (eficiencia.includes(',') == true) {
        eficiencia = eficiencia.replace(',', '.')
    }

    dicionario = {
        'modelo': modelo,
        'fabricante': fabricante,
        'potencia': potencia,
        'overload': overload,
        'imp': imp,
        'isc': isc,
        'v_min_mppt': v_min_mppt,
        'v_max_mppt': v_max_mppt,
        'v_max': v_max,
        'n_mppt': n_mppt,
        'n_entrada': n_entrada,
        'v_saida': v_saida,
        'i_saida': i_saida,
        'comprimento': comprimento,
        'largura': largura,
        'espessura': espessura,
        'eficiencia': eficiencia
    }

    let config = {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
    }

    if (modelo != '' & fabricante != '' & potencia != '' & overload != '' & imp != '' & isc != '' & v_min_mppt != '' & v_max_mppt != '' & v_max != '' & n_mppt != '' & n_entrada != '' & v_saida != '' & i_saida != '' & comprimento != '' & largura != '' & espessura != '' & eficiencia != ''){
        resposta = await axios.post(
            'http://localhost:8000/inverters', dicionario, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )

        if (resposta != 'Error: Network Error' & resposta != 'Error: Request failed with status code 401') {
            document.getElementById('container-inversor-adicionado').style.visibility = 'visible';
            document.getElementById('container-inversor-adicionado').style.display = 'grid';
            
            document.getElementById('container-add-inverters-general').style.visibility = 'hidden';
            document.getElementById('container-add-inverters-general').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else {
            divExistentInverter = document.getElementsByClassName('container-inversor-existente')
            divExistentInverter[0].style.visibility = 'visible';
            divExistentInverter[0].style.display = 'flex';
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-modulos')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

async function patch_inverter() {
    let access_token = localStorage.getItem('access_token');

    let id = document.getElementById('modelo-inversor-buscar-atualizar').value;
    
    let modelo = document.getElementById('modelo-inversor-atualizar').value
    let fabricante = document.getElementById('fabricante-inversor-atualizar').value.toUpperCase()
    let potencia = document.getElementById('potência-inversor-atualizar').value
    let overload = document.getElementById('overload-inversor-atualizar').value
    let imp = document.getElementById('imp-inversor-atualizar').value
    
    if (imp.includes(',') == true) {
        imp = imp.replace(',', '.')
    }

    let isc = document.getElementById('isc-inversor-atualizar').value

    if (isc.includes(',') == true) {
        isc = isc.replace(',', '.')
    }

    let v_min_mppt = document.getElementById('vmin-mppt-inversor-atualizar').value
    let v_max_mppt = document.getElementById('vmax-mppt-inversor-atualizar').value
    let v_max = document.getElementById('voc-inversor-atualizar').value
    let n_mppt = document.getElementById('n-mppt-inversor-atualizar').value
    let n_entrada = document.getElementById('n-entrada-inversor-atualizar').value
    let v_saida = document.getElementById('v-saída-inversor-atualizar').value
    let i_saida = document.getElementById('i-saída-inversor-atualizar').value

    if (i_saida.includes(',') == true) {
        i_saida = i_saida.replace(',', '.')
    }

    let comprimento = document.getElementById('comprimento-inversor-atualizar').value
    let largura = document.getElementById('largura-inversor-atualizar').value
    let espessura = document.getElementById('espessura-inversor-atualizar').value
    let eficiencia = document.getElementById('eficiência-inversor-atualizar').value

    if (eficiencia.includes(',') == true) {
        eficiencia = eficiencia.replace(',', '.')
    }

    let dicionario = {}; // Create an empty array

    let config = {
        headers: {
        'Authorization': 'Bearer ' + access_token
        }
    }

    let dadosOriginais = await axios.get(
        'http://localhost:8000/inverters/' + id.toString(), config
    ).then(
        function (response) {
            const dadosProjeto = response.data;
            return dadosProjeto;
        }
    ).catch(
        function (error) {
            console.log(error);
            return error;
        }
    )
    
    if (modelo != dadosOriginais.modelo.toString()){
        dicionario['modelo'] = modelo
    }

    if (fabricante != dadosOriginais.fabricante.toString()){
        dicionario['fabricante'] = fabricante
    }

    if (potencia != dadosOriginais.potencia.toString()){
        dicionario['potencia'] = potencia
    }

    if (overload != dadosOriginais.overload.toString()){
        dicionario['overload'] = overload
    }

    if (imp != dadosOriginais.imp.toString()){
        dicionario['imp'] = imp
    }

    if (isc != dadosOriginais.isc.toString()){
        dicionario['isc'] = isc
    }

    if (v_min_mppt != dadosOriginais.v_min_mppt.toString()){
        dicionario['v_min_mppt'] = v_min_mppt
    }

    if (v_max_mppt != dadosOriginais.v_max_mppt.toString()){
        dicionario['v_max_mppt'] = v_max_mppt
    }

    if (v_max != dadosOriginais.v_max.toString()){
        dicionario['v_max'] = v_max
    }

    if (n_mppt != dadosOriginais.n_mppt.toString()){
        dicionario['n_mppt'] = n_mppt
    }
    
    if (n_entrada != dadosOriginais.n_entrada.toString()){
        dicionario['n_entrada'] = n_entrada
    }
    
    if (i_saida != dadosOriginais.i_saida.toString()){
        dicionario['i_saida'] = i_saida
    }

    if (v_saida != dadosOriginais.v_saida.toString()){
        dicionario['v_saida'] = v_saida
    }

    if (comprimento != dadosOriginais.comprimento.toString()){
        dicionario['comprimento'] = comprimento
    }
    
    if (largura != dadosOriginais.largura.toString()){
        dicionario['largura'] = largura
    }
    
    if (espessura != dadosOriginais.espessura.toString()){
        dicionario['espessura'] = espessura
    }
    
    if (eficiencia != dadosOriginais.eficiencia.toString()){
        dicionario['eficiencia'] = eficiencia
    }

    if (Object.keys(dicionario).length == 0){
        containerCamposNaoPreenchidos = document.getElementsByClassName('container-campos-nao-preenchidos')
        containerCamposNaoPreenchidos[0].style.visibility = "visible"
        containerCamposNaoPreenchidos[0].style.display = "flex"
    }

    else {
        url = 'http://localhost:8000/inverters/' + id
        
        resposta = await axios.patch(
            url, dicionario, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (resposta != 'Error: Request failed with status code 404' & resposta != 'Error: Request failed with status code 401') {
            document.getElementById('container-inversor-atualizado').style.visibility = 'visible';
            document.getElementById('container-inversor-atualizado').style.display = 'grid';
                
            document.getElementById('container-update-inverters-general').style.visibility = 'hidden';
            document.getElementById('container-update-inverters-general').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else {
            let arrayInversorInexistente = document.getElementsByClassName('container-inversor-inexistente')

            for (i = 0; i < arrayInversorInexistente.length; i ++) {
                arrayInversorInexistente[i].style.visibility = 'visible'
                arrayInversorInexistente[i].style.display = 'flex'
            }
        }
    }
}

async function delete_inverter() {
    let access_token = localStorage.getItem('access_token');
    let id = document.getElementById('modelo-inversor-deletar').value;

    if (id != '') {

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let resposta = await axios.delete(
            'http://localhost:8000/inverters/' + id, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (resposta == '') {
            document.getElementById('container-inversor-deletado').style.visibility = 'visible';
            document.getElementById('container-inversor-deletado').style.display = 'grid';

            document.getElementById('container-delete-inverters').style.visibility = 'hidden';
            document.getElementById('container-delete-inverters').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else if (resposta == 'Error: Request failed with status code 404') {
            let arrayInversorInexistente = document.getElementsByClassName('container-inversor-inexistente');

            for (i = 0; i < arrayInversorInexistente.length; i ++) {
                arrayInversorInexistente[i].style.visibility = 'visible';
                arrayInversorInexistente[i].style.display = 'flex';
            }
        }

    }
    
    else {
        let arrayCampos = document.getElementsByClassName('campo-obrigatorio-inversores');

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

//FUNÇÕES PARA A PÁGINA DE PROJETOS
async function get_all_projects() {
    let access_token = localStorage.getItem('access_token');

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        localStorage.setItem('paginaAtualProjetos', 0);

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodosProjetos = await axios.get(
            'http://localhost:8000/projects/', config
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
            let arrayTD = document.getElementsByTagName('td')
            
            for (i = 0; i < 10; i++) {
                if (i < dadosTodosProjetos.length) {
                    cliente = await axios.get(
                            'http://localhost:8000/clients/' + dadosTodosProjetos[i].numero_cliente, config
                    ).then(
                        function (response) {
                            const cliente = response.data;
                            return cliente;
                        }
                    ).catch(
                        function (error) {
                            console.log(error);
                            return error;
                        }
                    )

                    arrayTD[9 * i].innerHTML = cliente.nome
                    arrayTD[9 * i].style.visibility = 'visible'
                    arrayTD[9 * i].style.display = 'table-cell'
                    
                    if (dadosTodosProjetos[i].ligacao_nova == true) {
                        iconeCheckmark = document.createElement('i')
                        iconeCheckmark.style.fontSize = '25px'
                        iconeCheckmark.setAttribute('class', 'uil uil-check')
                        arrayTD[9 * i + 1].innerHTML = ''
                        arrayTD[9 * i + 1].appendChild(iconeCheckmark);
                    }
                    
                    arrayTD[9 * i + 1].style.visibility = 'visible'
                    arrayTD[9 * i + 1].style.display = 'table-cell'

                    if (dadosTodosProjetos[i].aumento_carga == true) {
                        iconeCheckmark = document.createElement('i')
                        iconeCheckmark.style.fontSize = '25px'
                        iconeCheckmark.setAttribute('class', 'uil uil-check')
                        arrayTD[9 * i + 2].innerHTML = ''
                        arrayTD[9 * i + 2].appendChild(iconeCheckmark);
                    }

                    arrayTD[9 * i + 2].style.visibility = 'visible'
                    arrayTD[9 * i + 2].style.display = 'table-cell'

                    if (dadosTodosProjetos[i].aumento_usina == true) {
                        iconeCheckmark = document.createElement('i')
                        iconeCheckmark.style.fontSize = '25px'
                        iconeCheckmark.setAttribute('class', 'uil uil-check')
                        arrayTD[9 * i + 3].innerHTML = ''
                        arrayTD[9 * i + 3].appendChild(iconeCheckmark);
                    }

                    arrayTD[9 * i + 3].style.visibility = 'visible'
                    arrayTD[9 * i + 3].style.display = 'table-cell'
                    
                    if (dadosTodosProjetos[i].agrupamento == true) {
                        iconeCheckmark = document.createElement('i')
                        iconeCheckmark.style.fontSize = '25px'
                        iconeCheckmark.setAttribute('class', 'uil uil-check')
                        arrayTD[9 * i + 4].innerHTML = ''
                        arrayTD[9 * i + 4].appendChild(iconeCheckmark);
                    }

                    arrayTD[9 * i + 4].style.visibility = 'visible'
                    arrayTD[9 * i + 4].style.display = 'table-cell'
                    
                    textoQuantidadeModulo = dadosTodosProjetos[i].quantidade_modulo_1

                    if (dadosTodosProjetos[i].quantidade_modulo_2 != '') {
                        textoQuantidadeModulo = textoQuantidadeModulo + '<br>' + dadosTodosProjetos[i].quantidade_modulo_2
                    }

                    arrayTD[9 * i + 5].innerHTML = textoQuantidadeModulo
                    arrayTD[9 * i + 5].style.visibility = 'visible'
                    arrayTD[9 * i + 5].style.display = 'table-cell'
                   
                    textoModeloModulo = dadosTodosProjetos[i].modelo_modulo_1

                    if (dadosTodosProjetos[i].modelo_modulo_2 != '') {
                        textoModeloModulo = textoModeloModulo + '<br>' + dadosTodosProjetos[i].modelo_modulo_2
                    }

                    arrayTD[9 * i + 6].innerHTML = textoModeloModulo
                    arrayTD[9 * i + 6].style.visibility = 'visible'
                    arrayTD[9 * i + 6].style.display = 'table-cell'
                    
                    textoQuantidadeInversor = dadosTodosProjetos[i].quantidade_inversor_1

                    if (dadosTodosProjetos[i].quantidade_inversor_2 != '') {
                        textoQuantidadeInversor = textoQuantidadeInversor + '<br>' + dadosTodosProjetos[i].quantidade_inversor_2
                    }

                    if (dadosTodosProjetos[i].quantidade_inversor_3 != '') {
                        textoQuantidadeInversor = textoQuantidadeInversor + '<br>' + dadosTodosProjetos[i].quantidade_inversor_3
                    }

                    if (dadosTodosProjetos[i].quantidade_inversor_4 != '') {
                        textoQuantidadeInversor = textoQuantidadeInversor + '<br>' + dadosTodosProjetos[i].quantidade_inversor_4
                    }

                    arrayTD[9 * i + 7].innerHTML = textoQuantidadeInversor
                    arrayTD[9 * i + 7].style.visibility = 'visible'
                    arrayTD[9 * i + 7].style.display = 'table-cell'
                    
                    textoModeloInversor = dadosTodosProjetos[i].modelo_inversor_1

                    if (dadosTodosProjetos[i].modelo_inversor_2 != '') {
                        textoModeloInversor = textoModeloInversor + '<br>' + dadosTodosProjetos[i].modelo_inversor_2
                    }

                    if (dadosTodosProjetos[i].modelo_inversor_3 != '') {
                        textoModeloInversor = textoModeloInversor + '<br>' + dadosTodosProjetos[i].modelo_inversor_3
                    }

                    if (dadosTodosProjetos[i].modelo_inversor_4 != '') {
                        textoModeloInversor = textoModeloInversor + '<br>' + dadosTodosProjetos[i].modelo_inversor_4
                    }

                    arrayTD[9 * i + 8].innerHTML = textoModeloInversor
                    arrayTD[9 * i + 8].style.visibility = 'visible'
                    arrayTD[9 * i + 8].style.display = 'table-cell'
                    
                    if (i == (dadosTodosProjetos.length - 1)) {
                        arrayTD[9 * i].style.borderBottom = 0;
                        arrayTD[9 * i + 1].style.borderBottom = 0;
                        arrayTD[9 * i + 2].style.borderBottom = 0;
                        arrayTD[9 * i + 3].style.borderBottom = 0;
                        arrayTD[9 * i + 4].style.borderBottom = 0;
                        arrayTD[9 * i + 5].style.borderBottom = 0;
                        arrayTD[9 * i + 6].style.borderBottom = 0;
                        arrayTD[9 * i + 7].style.borderBottom = 0;
                        arrayTD[9 * i + 8].style.borderBottom = 0;
                    }
                }

                else {
                    arrayTD[9 * i].style.visibility = 'hidden'
                    arrayTD[9 * i].style.display = 'none'
                    arrayTD[9 * i + 1].style.visibility = 'hidden'
                    arrayTD[9 * i + 1].style.display = 'none'
                    arrayTD[9 * i + 2].style.visibility = 'hidden'
                    arrayTD[9 * i + 2].style.display = 'none'
                    arrayTD[9 * i + 3].style.visibility = 'hidden'
                    arrayTD[9 * i + 3].style.display = 'none'
                    arrayTD[9 * i + 4].style.visibility = 'hidden'
                    arrayTD[9 * i + 4].style.display = 'none'
                    arrayTD[9 * i + 5].style.visibility = 'hidden'
                    arrayTD[9 * i + 5].style.display = 'none'
                    arrayTD[9 * i + 6].style.visibility = 'hidden'
                    arrayTD[9 * i + 6].style.display = 'none'
                    arrayTD[9 * i + 7].style.visibility = 'hidden'
                    arrayTD[9 * i + 7].style.display = 'none'
                    arrayTD[9 * i + 8].style.visibility = 'hidden'
                    arrayTD[9 * i + 8].style.display = 'none'
                }
            }
        }

        else if (dadosTodosProjetos == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosProjetos);
            checar_autorizacao();
        }
    }
}

async function get_all_projects_skip(alterar) {
    let access_token = localStorage.getItem('access_token');

    if (access_token != 'Error: Request failed with status code 401' & access_token != 'Error: Request failed with status code 403' & access_token != 'Error: Request failed with status code 422' & access_token != 'Error: Network Error' & access_token != null) {
        
        let pagina = parseInt(localStorage.getItem('paginaAtualProjetos')) + parseInt(alterar);

        if (pagina < 0) {
            pagina = 0
        }

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosTodosProjetos = await axios.get(
            'http://localhost:8000/projects/?pular=' + pagina, config
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
            let arrayTD = document.getElementsByTagName('td')
            
            if (pagina > dadosTodosProjetos.length) {
                pagina = parseInt(dadosTodosProjetos.length - dadosTodosProjetos.length % 10)
            }
            
            localStorage.setItem('paginaAtualProjetos', pagina);
            
            for (i = 0; i < 10; i++) {
                if (i < dadosTodosProjetos.length) {
                    cliente = await axios.get(
                            'http://localhost:8000/clients/' + dadosTodosProjetos[i].numero_cliente, config
                    ).then(
                        function (response) {
                            const cliente = response.data;
                            return cliente;
                        }
                    ).catch(
                        function (error) {
                            console.log(error);
                            return error;
                        }
                    )

                    arrayTD[9 * i].innerHTML = cliente.nome
                    arrayTD[9 * i].style.visibility = 'visible'
                    arrayTD[9 * i].style.display = 'table-cell'
                    
                    if (dadosTodosProjetos[i].ligacao_nova == true) {
                        iconeCheckmark = document.createElement('i')
                        iconeCheckmark.style.fontSize = '25px'
                        iconeCheckmark.setAttribute('class', 'uil uil-check')
                        arrayTD[9 * i + 1].innerHTML = ''
                        arrayTD[9 * i + 1].appendChild(iconeCheckmark);
                    }
                    
                    arrayTD[9 * i + 1].style.visibility = 'visible'
                    arrayTD[9 * i + 1].style.display = 'table-cell'

                    if (dadosTodosProjetos[i].aumento_carga == true) {
                        iconeCheckmark = document.createElement('i')
                        iconeCheckmark.style.fontSize = '25px'
                        iconeCheckmark.setAttribute('class', 'uil uil-check')
                        arrayTD[9 * i + 2].innerHTML = ''
                        arrayTD[9 * i + 2].appendChild(iconeCheckmark);
                    }

                    arrayTD[9 * i + 2].style.visibility = 'visible'
                    arrayTD[9 * i + 2].style.display = 'table-cell'

                    if (dadosTodosProjetos[i].aumento_usina == true) {
                        iconeCheckmark = document.createElement('i')
                        iconeCheckmark.style.fontSize = '25px'
                        iconeCheckmark.setAttribute('class', 'uil uil-check')
                        arrayTD[9 * i + 3].innerHTML = ''
                        arrayTD[9 * i + 3].appendChild(iconeCheckmark);
                    }

                    arrayTD[9 * i + 3].style.visibility = 'visible'
                    arrayTD[9 * i + 3].style.display = 'table-cell'
                    
                    if (dadosTodosProjetos[i].agrupamento == true) {
                        iconeCheckmark = document.createElement('i')
                        iconeCheckmark.style.fontSize = '25px'
                        iconeCheckmark.setAttribute('class', 'uil uil-check')
                        arrayTD[9 * i + 4].innerHTML = ''
                        arrayTD[9 * i + 4].appendChild(iconeCheckmark);
                    }

                    arrayTD[9 * i + 4].style.visibility = 'visible'
                    arrayTD[9 * i + 4].style.display = 'table-cell'
                    
                    textoQuantidadeModulo = dadosTodosProjetos[i].quantidade_modulo_1

                    if (dadosTodosProjetos[i].quantidade_modulo_2 != '') {
                        textoQuantidadeModulo = textoQuantidadeModulo + '<br>' + dadosTodosProjetos[i].quantidade_modulo_2
                    }

                    arrayTD[9 * i + 5].innerHTML = textoQuantidadeModulo
                    arrayTD[9 * i + 5].style.visibility = 'visible'
                    arrayTD[9 * i + 5].style.display = 'table-cell'
                   
                    textoModeloModulo = dadosTodosProjetos[i].modelo_modulo_1

                    if (dadosTodosProjetos[i].quantidade_modulo_2 != '') {
                        textoModeloModulo = textoModeloModulo + '<br>' + textoModeloModulo[i].modelo_modulo_2
                    }

                    arrayTD[9 * i + 6].innerHTML = textoModeloModulo
                    arrayTD[9 * i + 6].style.visibility = 'visible'
                    arrayTD[9 * i + 6].style.display = 'table-cell'
                    
                    textoQuantidadeInversor = dadosTodosProjetos[i].quantidade_inversor_1

                    if (dadosTodosProjetos[i].quantidade_inversor_2 != '') {
                        textoQuantidadeInversor = textoQuantidadeInversor + '<br>' + dadosTodosProjetos[i].quantidade_inversor_2
                    }

                    if (dadosTodosProjetos[i].quantidade_inversor_3 != '') {
                        textoQuantidadeInversor = textoQuantidadeInversor + '<br>' + dadosTodosProjetos[i].quantidade_inversor_3
                    }

                    if (dadosTodosProjetos[i].quantidade_inversor_4 != '') {
                        textoQuantidadeInversor = textoQuantidadeInversor + '<br>' + dadosTodosProjetos[i].quantidade_inversor_4
                    }

                    arrayTD[9 * i + 7].innerHTML = textoQuantidadeInversor
                    arrayTD[9 * i + 7].style.visibility = 'visible'
                    arrayTD[9 * i + 7].style.display = 'table-cell'
                    
                    textoModeloInversor = dadosTodosProjetos[i].modelo_inversor_1

                    if (dadosTodosProjetos[i].modelo_inversor_2 != '') {
                        textoModeloInversor = textoModeloInversor + '<br>' + dadosTodosProjetos[i].modelo_inversor_2
                    }

                    if (dadosTodosProjetos[i].modelo_inversor_3 != '') {
                        textoModeloInversor = textoModeloInversor + '<br>' + dadosTodosProjetos[i].modelo_inversor_3
                    }

                    if (dadosTodosProjetos[i].modelo_inversor_4 != '') {
                        textoModeloInversor = textoModeloInversor + '<br>' + dadosTodosProjetos[i].modelo_inversor_4
                    }

                    arrayTD[9 * i + 8].innerHTML = textoModeloInversor
                    arrayTD[9 * i + 8].style.visibility = 'visible'
                    arrayTD[9 * i + 8].style.display = 'table-cell'
                    
                    if (i == (dadosTodosProjetos.length - 1)) {
                        arrayTD[9 * i].style.borderBottom = 0;
                        arrayTD[9 * i + 1].style.borderBottom = 0;
                        arrayTD[9 * i + 2].style.borderBottom = 0;
                        arrayTD[9 * i + 3].style.borderBottom = 0;
                        arrayTD[9 * i + 4].style.borderBottom = 0;
                        arrayTD[9 * i + 5].style.borderBottom = 0;
                        arrayTD[9 * i + 6].style.borderBottom = 0;
                        arrayTD[9 * i + 7].style.borderBottom = 0;
                        arrayTD[9 * i + 8].style.borderBottom = 0;
                    }
                }

                else {
                    arrayTD[9 * i].style.visibility = 'hidden'
                    arrayTD[9 * i].style.display = 'none'
                    arrayTD[9 * i + 1].style.visibility = 'hidden'
                    arrayTD[9 * i + 1].style.display = 'none'
                    arrayTD[9 * i + 2].style.visibility = 'hidden'
                    arrayTD[9 * i + 2].style.display = 'none'
                    arrayTD[9 * i + 3].style.visibility = 'hidden'
                    arrayTD[9 * i + 3].style.display = 'none'
                    arrayTD[9 * i + 4].style.visibility = 'hidden'
                    arrayTD[9 * i + 4].style.display = 'none'
                    arrayTD[9 * i + 5].style.visibility = 'hidden'
                    arrayTD[9 * i + 5].style.display = 'none'
                    arrayTD[9 * i + 6].style.visibility = 'hidden'
                    arrayTD[9 * i + 6].style.display = 'none'
                    arrayTD[9 * i + 7].style.visibility = 'hidden'
                    arrayTD[9 * i + 7].style.display = 'none'
                    arrayTD[9 * i + 8].style.visibility = 'hidden'
                    arrayTD[9 * i + 8].style.display = 'none'
                }
            }
        }

        else if (dadosTodosProjetos == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosTodosProjetos);
            checar_autorizacao();
        }
    }
}

async function get_project() {
    let access_token = localStorage.getItem('access_token');

    let id = document.getElementById('id-projeto-buscar').value;
    let divSearchProject = document.getElementById('container-search-projects');

    if (id != '') {
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let dadosProjeto = await axios.get(
            'http://localhost:8000/projects/' + id.toString(), config
        ).then(
            function (response) {
                const dadosProjeto = response.data;
                return dadosProjeto;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (dadosProjeto != 'Error: Request failed with status code 401' & dadosProjeto != 'Error: Request failed with status code 404') {
            divSearchProject.style.visibility = 'hidden';
            divSearchProject.style.display = 'none';

            document.getElementById('container-projeto-encontrado').style.visibility = 'visible';
            document.getElementById('container-projeto-encontrado').style.display = 'grid';
            console.log(dadosProjeto)
            let hora = dadosProjeto.criado_em.split('T')[1].split('.')[0];
            let data = dadosProjeto.criado_em.split('-')[2].split('T')[0] + '/' + dadosProjeto.criado_em.split('-')[1] + '/' + dadosProjeto.criado_em.split('-')[0];

            if (dadosProjeto.id != 0) {
                document.getElementById('project-id').innerHTML = dadosProjeto.id;
                document.getElementById('title-project-id').style.visibility = 'visible';
                document.getElementById('title-project-id').style.display = 'grid';
                document.getElementById('project-id').style.visibility = 'visible';
                document.getElementById('project-id').style.display = 'grid';
            }

            if (dadosProjeto.numero_instalacao != 0) {
                document.getElementById('project-instalation').innerHTML = dadosProjeto.numero_instalacao;
                document.getElementById('title-project-instalation').style.visibility = 'visible';
                document.getElementById('title-project-instalation').style.display = 'grid';
                document.getElementById('project-instalation').style.visibility = 'visible';
                document.getElementById('project-instalation').style.display = 'grid';
            }

            if (dadosProjeto.numero_cliente != 0) {
                document.getElementById('project-client').innerHTML = dadosProjeto.numero_cliente;
                document.getElementById('title-project-client').style.visibility = 'visible';
                document.getElementById('title-project-client').style.display = 'grid';
                document.getElementById('project-client').style.visibility = 'visible';
                document.getElementById('project-client').style.display = 'grid';
            }
            
            if (dadosProjeto.ligacao_nova == true) {
                document.getElementById('project-link').innerHTML = 'Sim';
                document.getElementById('title-project-link').style.visibility = 'visible';
                document.getElementById('title-project-link').style.display = 'grid';
                document.getElementById('project-link').style.visibility = 'visible';
                document.getElementById('project-link').style.display = 'grid';
            }

            if (dadosProjeto.aumento_carga == true) {
                document.getElementById('project-load').innerHTML = 'Sim';
                document.getElementById('title-project-load').style.visibility = 'visible';
                document.getElementById('title-project-load').style.display = 'grid';
                document.getElementById('project-load').style.visibility = 'visible';
                document.getElementById('project-load').style.display = 'grid';
            }

            if (dadosProjeto.aumento_usina == true) {
                document.getElementById('project-plant').innerHTML = 'Sim';
                document.getElementById('title-project-plant').style.visibility = 'visible';
                document.getElementById('title-project-plant').style.display = 'grid';
                document.getElementById('project-plant').style.visibility = 'visible';
                document.getElementById('project-plant').style.display = 'grid';
            }
            
            if (dadosProjeto.agrupamento == true) {
                document.getElementById('project-grouping').innerHTML = 'Sim';
                document.getElementById('title-project-grouping').style.visibility = 'visible';
                document.getElementById('title-project-grouping').style.display = 'grid';
                document.getElementById('project-grouping').style.visibility = 'visible';
                document.getElementById('project-grouping').style.display = 'grid';
            }

            if (dadosProjeto.n_fases != '') {
                document.getElementById('project-phases').innerHTML = dadosProjeto.n_fases;
                document.getElementById('title-project-phases').style.visibility = 'visible';
                document.getElementById('title-project-phases').style.display = 'grid';
                document.getElementById('project-phases').style.visibility = 'visible';
                document.getElementById('project-phases').style.display = 'grid';
            }

            if (dadosProjeto.disjuntor != '') {
                document.getElementById('project-breaker').innerHTML = dadosProjeto.disjuntor + ' A';
                document.getElementById('title-project-breaker').style.visibility = 'visible';
                document.getElementById('title-project-breaker').style.display = 'grid';
                document.getElementById('project-breaker').style.visibility = 'visible';
                document.getElementById('project-breaker').style.display = 'grid';
            }

            if (dadosProjeto.novo_n_fases != null) {
                document.getElementById('project-n-phases').innerHTML = dadosProjeto.novo_n_fases;
                document.getElementById('title-project-n-phases').style.visibility = 'visible';
                document.getElementById('title-project-n-phases').style.display = 'grid';
                document.getElementById('project-n-phases').style.visibility = 'visible';
                document.getElementById('project-n-phases').style.display = 'grid';
            }

            if (dadosProjeto.novo_disjuntor != 0) {
                document.getElementById('project-n-breaker').innerHTML = dadosProjeto.novo_disjuntor + ' A';
                document.getElementById('title-project-n-breaker').style.visibility = 'visible';
                document.getElementById('title-project-n-breaker').style.display = 'grid';
                document.getElementById('project-n-breaker').style.visibility = 'visible';
                document.getElementById('project-n-breaker').style.display = 'grid';
            }

            if (dadosProjeto.n_fases_agrupamento != null) {
                document.getElementById('project-g-phases').innerHTML = dadosProjeto.n_fases_agrupamento;
                document.getElementById('title-project-g-phases').style.visibility = 'visible';
                document.getElementById('title-project-g-phases').style.display = 'grid';
                document.getElementById('project-g-phases').style.visibility = 'visible';
                document.getElementById('project-g-phases').style.display = 'grid';
            }

            if (dadosProjeto.disjuntor_agrupamento != 0) {
                document.getElementById('project-g-breaker').innerHTML = dadosProjeto.disjuntor_agrupamento;
                document.getElementById('title-project-g-breaker').style.visibility = 'visible';
                document.getElementById('title-project-g-breaker').style.display = 'grid';
                document.getElementById('project-g-breaker').style.visibility = 'visible';
                document.getElementById('project-g-breaker').style.display = 'grid';
            }

            if (dadosProjeto.modulo_anterior_1 == true) {
                document.getElementById('project-o-modules-1').innerHTML = 'Sim';
                document.getElementById('title-project-o-modules-1').style.visibility = 'visible';
                document.getElementById('title-project-o-modules-1').style.display = 'grid';
                document.getElementById('project-o-modules-1').style.visibility = 'visible';
                document.getElementById('project-o-modules-1').style.display = 'grid';
            }

            if (dadosProjeto.quantidade_modulo_1 != 0) {
                document.getElementById('project-q-modules-1').innerHTML = dadosProjeto.quantidade_modulo_1;
                document.getElementById('title-project-q-modules-1').style.visibility = 'visible';
                document.getElementById('title-project-q-modules-1').style.display = 'grid';
                document.getElementById('project-q-modules-1').style.visibility = 'visible';
                document.getElementById('project-q-modules-1').style.display = 'grid';
            }
            
            if (dadosProjeto.modelo_modulo_1 != '') {
                document.getElementById('project-m-modules-1').innerHTML = dadosProjeto.modelo_modulo_1;
                document.getElementById('title-project-m-modules-1').style.visibility = 'visible';
                document.getElementById('title-project-m-modules-1').style.display = 'grid';
                document.getElementById('project-m-modules-1').style.visibility = 'visible';
                document.getElementById('project-m-modules-1').style.display = 'grid';
            }

            if (dadosProjeto.modulo_anterior_2 == true) {
                document.getElementById('project-o-modules-2').innerHTML = 'Sim';
                document.getElementById('title-project-o-modules-2').style.visibility = 'visible';
                document.getElementById('title-project-o-modules-2').style.display = 'grid';
                document.getElementById('project-o-modules-2').style.visibility = 'visible';
                document.getElementById('project-o-modules-2').style.display = 'grid';
            }

            if (dadosProjeto.quantidade_modulo_2 != 0) {
                document.getElementById('project-q-modules-2').innerHTML = dadosProjeto.quantidade_modulo_2;
                document.getElementById('title-project-q-modules-2').style.visibility = 'visible';
                document.getElementById('title-project-q-modules-2').style.display = 'grid';
                document.getElementById('project-q-modules-2').style.visibility = 'visible';
                document.getElementById('project-q-modules-2').style.display = 'grid';
            }
            
            if (dadosProjeto.modelo_modulo_2 != '') {
                document.getElementById('project-m-modules-2').innerHTML = dadosProjeto.modelo_modulo_2;
                document.getElementById('title-project-m-modules-2').style.visibility = 'visible';
                document.getElementById('title-project-m-modules-2').style.display = 'grid';
                document.getElementById('project-m-modules-2').style.visibility = 'visible';
                document.getElementById('project-m-modules-2').style.display = 'grid';
            }
            
            if (dadosProjeto.inversor_anterior_1 == true) {
                document.getElementById('project-o-inverter-1').innerHTML = 'Sim';
                document.getElementById('title-project-o-inverter-1').style.visibility = 'visible';
                document.getElementById('title-project-o-inverter-1').style.display = 'grid';
                document.getElementById('project-o-inverter-1').style.visibility = 'visible';
                document.getElementById('project-o-inverter-1').style.display = 'grid';
            }

            if (dadosProjeto.quantidade_inversor_1 != 0) {
                document.getElementById('project-q-inverter-1').innerHTML = dadosProjeto.quantidade_inversor_1;
                document.getElementById('title-project-q-inverter-1').style.visibility = 'visible';
                document.getElementById('title-project-q-inverter-1').style.display = 'grid';
                document.getElementById('project-q-inverter-1').style.visibility = 'visible';
                document.getElementById('project-q-inverter-1').style.display = 'grid';
            }
            
            if (dadosProjeto.modelo_inversor_1 != '') {
                document.getElementById('project-m-inverter-1').innerHTML = dadosProjeto.modelo_inversor_1;
                document.getElementById('title-project-m-inverter-1').style.visibility = 'visible';
                document.getElementById('title-project-m-inverter-1').style.display = 'grid';
                document.getElementById('project-m-inverter-1').style.visibility = 'visible';
                document.getElementById('project-m-inverter-1').style.display = 'grid';
            }
            
            if (dadosProjeto.inversor_anterior_2 == true) {
                document.getElementById('project-o-inverter-2').innerHTML = 'Sim';
                document.getElementById('title-project-o-inverter-2').style.visibility = 'visible';
                document.getElementById('title-project-o-inverter-2').style.display = 'grid';
                document.getElementById('project-o-inverter-2').style.visibility = 'visible';
                document.getElementById('project-o-inverter-2').style.display = 'grid';
            }

            if (dadosProjeto.quantidade_inversor_2 != 0) {
                document.getElementById('project-q-inverter-2').innerHTML = dadosProjeto.quantidade_inversor_2;
                document.getElementById('title-project-q-inverter-2').style.visibility = 'visible';
                document.getElementById('title-project-q-inverter-2').style.display = 'grid';
                document.getElementById('project-q-inverter-2').style.visibility = 'visible';
                document.getElementById('project-q-inverter-2').style.display = 'grid';
            }
            
            if (dadosProjeto.modelo_inversor_2 != '') {
                document.getElementById('project-m-inverter-2').innerHTML = dadosProjeto.modelo_inversor_2;
                document.getElementById('title-project-m-inverter-2').style.visibility = 'visible';
                document.getElementById('title-project-m-inverter-2').style.display = 'grid';
                document.getElementById('project-m-inverter-2').style.visibility = 'visible';
                document.getElementById('project-m-inverter-2').style.display = 'grid';
            }
            
            if (dadosProjeto.inversor_anterior_3 == true) {
                document.getElementById('project-o-inverter-3').innerHTML = 'Sim';
                document.getElementById('title-project-o-inverter-3').style.visibility = 'visible';
                document.getElementById('title-project-o-inverter-3').style.display = 'grid';
                document.getElementById('project-o-inverter-3').style.visibility = 'visible';
                document.getElementById('project-o-inverter-3').style.display = 'grid';
            }

            if (dadosProjeto.quantidade_inversor_3 != 0) {
                document.getElementById('project-q-inverter-3').innerHTML = dadosProjeto.quantidade_inversor_3;
                document.getElementById('title-project-q-inverter-3').style.visibility = 'visible';
                document.getElementById('title-project-q-inverter-3').style.display = 'grid';
                document.getElementById('project-q-inverter-3').style.visibility = 'visible';
                document.getElementById('project-q-inverter-3').style.display = 'grid';
            }
            
            if (dadosProjeto.modelo_inversor_3 != '') {
                document.getElementById('project-m-inverter-3').innerHTML = dadosProjeto.modelo_inversor_3;
                document.getElementById('title-project-m-inverter-3').style.visibility = 'visible';
                document.getElementById('title-project-m-inverter-3').style.display = 'grid';
                document.getElementById('project-m-inverter-3').style.visibility = 'visible';
                document.getElementById('project-m-inverter-3').style.display = 'grid';
            }
            
            if (dadosProjeto.inversor_anterior_4 == true) {
                document.getElementById('project-o-inverter-4').innerHTML = 'Sim';
                document.getElementById('title-project-o-inverter-4').style.visibility = 'visible';
                document.getElementById('title-project-o-inverter-4').style.display = 'grid';
                document.getElementById('project-o-inverter-4').style.visibility = 'visible';
                document.getElementById('project-o-inverter-4').style.display = 'grid';
            }

            if (dadosProjeto.quantidade_inversor_4 != 0) {
                document.getElementById('project-q-inverter-4').innerHTML = dadosProjeto.quantidade_inversor_4;
                document.getElementById('title-project-q-inverter-4').style.visibility = 'visible';
                document.getElementById('title-project-q-inverter-4').style.display = 'grid';
                document.getElementById('project-q-inverter-4').style.visibility = 'visible';
                document.getElementById('project-q-inverter-4').style.display = 'grid';
            }
            
            if (dadosProjeto.modelo_inversor_4 != '') {
                document.getElementById('project-m-inverter-4').innerHTML = dadosProjeto.modelo_inversor_4;
                document.getElementById('title-project-m-inverter-4').style.visibility = 'visible';
                document.getElementById('title-project-m-inverter-4').style.display = 'grid';
                document.getElementById('project-m-inverter-4').style.visibility = 'visible';
                document.getElementById('project-m-inverter-4').style.display = 'grid';
            }

            if (dadosProjeto.criado_em != '') {
                document.getElementById('project-added-in').innerHTML = data + ' às ' + hora;
                document.getElementById('title-project-added-in').style.visibility = 'visible';
                document.getElementById('title-project-added-in').style.display = 'grid';
                document.getElementById('project-added-in').style.visibility = 'visible';
                document.getElementById('project-added-in').style.display = 'grid';
            }
        }

        else if (dadosInversor == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', dadosInversor);
            checar_autorizacao();
        }

        else {
            let arrayInversorInexistente = document.getElementsByClassName('container-inversor-inexistente')

            for (i = 0; i < arrayInversorInexistente.length; i ++) {
                arrayInversorInexistente[i].style.visibility = 'visible';
                arrayInversorInexistente[i].style.display = 'flex';
            }
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-modulos')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

async function post_project() {
    let access_token = localStorage.getItem('access_token');

    let numero_instalacao = document.getElementById('número-instalação-adicionar').value;
    let numero_cliente = document.getElementById('número-cliente-adicionar').value;
    let ligacao_nova = document.getElementById('checkbox-ligacao-1').checked.toString();
    let aumento_carga = document.getElementById('checkbox-aumento-carga-1').checked.toString();
    let aumento_usina = document.getElementById('checkbox-aumento-usina-1').checked.toString();
    let agrupamento = document.getElementById('checkbox-agrupamento-1').checked.toString();
    let n_fases = document.getElementById('n-fases-adicionar').value;
    let disjuntor = document.getElementById('disjuntor-adicionar').value;
    let novo_n_fases = document.getElementById('novo-n-fases-adicionar').value;
    let novo_disjuntor = document.getElementById('novo-disjuntor-adicionar').value;
    let n_fases_agrupamento = document.getElementById('n-fases-agrupamento-adicionar').value;
    let disjuntor_agrupamento = document.getElementById('disjuntor-agrupamento-adicionar').value;
    let tensao = document.getElementById('tensão-adicionar').value;
    let modulo_anterior_1 = document.getElementById('modulo-anterior-1-adicionar').checked.toString();
    let quantidade_modulo_1 = document.getElementById('quantidade-módulo-1-adicionar').value;
    let modelo_modulo_1 = document.getElementById('modelo-módulo-1-adicionar').value;
    let modulo_anterior_2 = document.getElementById('modulo-anterior-2-adicionar').checked.toString();
    let quantidade_modulo_2 = document.getElementById('quantidade-módulo-2-adicionar').value;
    let modelo_modulo_2 = document.getElementById('modelo-módulo-2-adicionar').value;
    let inversor_anterior_1 = document.getElementById('inversor-anterior-1-adicionar').checked.toString();
    let quantidade_inversor_1 = document.getElementById('quantidade-inversor-1-adicionar').value;
    let modelo_inversor_1 = document.getElementById('modelo-inversor-1-adicionar').value;
    let inversor_anterior_2 = document.getElementById('inversor-anterior-2-adicionar').checked.toString();
    let quantidade_inversor_2 = document.getElementById('quantidade-inversor-2-adicionar').value;
    let modelo_inversor_2 = document.getElementById('modelo-inversor-2-adicionar').value;
    let inversor_anterior_3 = document.getElementById('inversor-anterior-3-adicionar').checked.toString();
    let quantidade_inversor_3 = document.getElementById('quantidade-inversor-3-adicionar').value;
    let modelo_inversor_3 = document.getElementById('modelo-inversor-3-adicionar').value;
    let inversor_anterior_4 = document.getElementById('inversor-anterior-4-adicionar').checked.toString();
    let quantidade_inversor_4 = document.getElementById('quantidade-inversor-4-adicionar').value;
    let modelo_inversor_4 = document.getElementById('modelo-inversor-4-adicionar').value;
    let dicionario = {};
    
    dicionario = {
        'numero_instalacao': numero_instalacao,
        'numero_cliente': numero_cliente,
        'ligacao_nova': ligacao_nova,
        'aumento_carga': aumento_carga,
        'aumento_usina': aumento_usina,
        'agrupamento': agrupamento,
        'n_fases': n_fases,
        'disjuntor': disjuntor,
        'tensao': tensao,
        'modulo_anterior_1': modulo_anterior_1,
        'quantidade_modulo_1': quantidade_modulo_1,
        'modelo_modulo_1': modelo_modulo_1,
        'inversor_anterior_1': inversor_anterior_1,
        'quantidade_inversor_1': quantidade_inversor_1,
        'modelo_inversor_1': modelo_inversor_1
    }

    if (aumento_carga == 'true') {
        dicionario['novo_n_fases'] = novo_n_fases;
        dicionario['novo_disjuntor'] = novo_disjuntor;
    }

    if (agrupamento == 'true') {
        dicionario['n_fases_agrupamento'] = n_fases_agrupamento;
        dicionario['disjuntor_agrupamento'] = disjuntor_agrupamento;
    }
    
    if (aumento_usina == 'true') {
        dicionario['modulo_anterior_2'] = modulo_anterior_2;
        dicionario['quantidade_modulo_2'] = quantidade_modulo_2;
        dicionario['modelo_modulo_2'] = modelo_modulo_2;
    }

    if (quantidade_inversor_2 != '' & quantidade_inversor_2 != '0') {
        dicionario['inversor_anterior_2'] = inversor_anterior_2;
        dicionario['quantidade_inversor_2'] = quantidade_inversor_2;
        dicionario['modelo_inversor_2'] = modelo_inversor_2;
    }
    
    if (quantidade_inversor_3 != '' & quantidade_inversor_3 != '0') {
        dicionario['inversor_anterior_3'] = inversor_anterior_3;
        dicionario['quantidade_inversor_3'] = quantidade_inversor_3;
        dicionario['modelo_inversor_3'] = modelo_inversor_3;
    }
    
    if (quantidade_inversor_4 != '' & quantidade_inversor_4 != '0') {
        dicionario['inversor_anterior_4'] = inversor_anterior_4;
        dicionario['quantidade_inversor_4'] = quantidade_inversor_4;
        dicionario['modelo_inversor_4'] = modelo_inversor_4;
    }

    let config = {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
    }

    if (numero_instalacao != '' & numero_cliente != '' & n_fases != '' & disjuntor != '' & tensao != '' & quantidade_modulo_1 != '' & modelo_modulo_1 != '' & quantidade_inversor_1 != '' & modelo_inversor_1 != ''){
        resposta = await axios.post(
            'http://localhost:8000/projects', dicionario, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )

        if (resposta != 'Error: Network Error' & resposta != 'Error: Request failed with status code 401') {
            document.getElementById('container-projeto-adicionado').style.visibility = 'visible';
            document.getElementById('container-projeto-adicionado').style.display = 'grid';
            
            document.getElementById('container-add-projects-general').style.visibility = 'hidden';
            document.getElementById('container-add-projects-general').style.display = 'none';

            localStorage.setItem('projeto_atual', resposta.id)
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else {
            divExistentProject = document.getElementsByClassName('container-projeto-existente')
            divExistentProject[0].style.visibility = 'visible';
            divExistentProject[0].style.display = 'flex';
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-projetos')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

async function patch_project() {
    let access_token = localStorage.getItem('access_token');

    let id = document.getElementById('id-projeto-buscar-atualizar').value;
    
    let numero_instalacao = document.getElementById('número-instalação-atualizar').value;
    let numero_cliente = document.getElementById('número-cliente-atualizar').value;
    let ligacao_nova = document.getElementById('checkbox-ligacao-2').checked.toString();
    let aumento_carga = document.getElementById('checkbox-aumento-carga-2').checked.toString();
    let aumento_usina = document.getElementById('checkbox-aumento-usina-2').checked.toString();
    let agrupamento = document.getElementById('checkbox-agrupamento-2').checked.toString();
    let n_fases = document.getElementById('n-fases-atualizar').value;
    let disjuntor = document.getElementById('disjuntor-atualizar').value;
    let novo_n_fases = document.getElementById('novo-n-fases-atualizar').value;
    let novo_disjuntor = document.getElementById('novo-disjuntor-atualizar').value;
    let n_fases_agrupamento = document.getElementById('n-fases-agrupamento-atualizar').value;
    let disjuntor_agrupamento = document.getElementById('disjuntor-agrupamento-atualizar').value;
    let tensao = document.getElementById('tensão-atualizar').value;
    let modulo_anterior_1 = document.getElementById('modulo-anterior-1-atualizar').checked.toString();
    let quantidade_modulo_1 = document.getElementById('quantidade-módulo-1-atualizar').value;
    let modelo_modulo_1 = document.getElementById('modelo-módulo-1-atualizar').value;
    let modulo_anterior_2 = document.getElementById('modulo-anterior-2-atualizar').checked.toString();
    let quantidade_modulo_2 = document.getElementById('quantidade-módulo-2-atualizar').value;

    if (quantidade_modulo_2 == '') {
        quantidade_modulo_2 = '0'
    }

    let modelo_modulo_2 = document.getElementById('modelo-módulo-2-atualizar').value;
    let inversor_anterior_1 = document.getElementById('inversor-anterior-1-atualizar').checked.toString();
    let quantidade_inversor_1 = document.getElementById('quantidade-inversor-1-atualizar').value;
    let modelo_inversor_1 = document.getElementById('modelo-inversor-1-atualizar').value;
    let inversor_anterior_2 = document.getElementById('inversor-anterior-2-atualizar').checked.toString();
    let quantidade_inversor_2 = document.getElementById('quantidade-inversor-2-atualizar').value;
    
    if (quantidade_inversor_2 == '') {
        quantidade_inversor_2 == '0'
    }

    let modelo_inversor_2 = document.getElementById('modelo-inversor-2-atualizar').value;
    let inversor_anterior_3 = document.getElementById('inversor-anterior-3-atualizar').checked.toString();
    let quantidade_inversor_3 = document.getElementById('quantidade-inversor-3-atualizar').value;
    
    if (quantidade_inversor_2 == '') {
        quantidade_inversor_2 == '0'
    }

    let modelo_inversor_3 = document.getElementById('modelo-inversor-3-atualizar').value;
    let inversor_anterior_4 = document.getElementById('inversor-anterior-4-atualizar').checked.toString();
    let quantidade_inversor_4 = document.getElementById('quantidade-inversor-4-atualizar').value;
    
    if (quantidade_inversor_2 == '') {
        quantidade_inversor_2 == '0'
    }

    let modelo_inversor_4 = document.getElementById('modelo-inversor-4-atualizar').value;

    let dicionario = {}; // Create an empty array

    let config = {
        headers: {
        'Authorization': 'Bearer ' + access_token
        }
    }

    let dadosOriginais = await axios.get(
        'http://localhost:8000/projects/' + id.toString(), config
    ).then(
        function (response) {
            const dadosProjeto = response.data;
            return dadosProjeto;
        }
    ).catch(
        function (error) {
            console.log(error);
            return error;
        }
    )

    if (numero_instalacao != dadosOriginais.numero_instalacao.toString()){
        dicionario['numero_instalacao'] = numero_instalacao
    }

    if (numero_cliente != dadosOriginais.numero_cliente.toString()){
        dicionario['numero_cliente'] = numero_cliente
    }

    if (ligacao_nova != dadosOriginais.ligacao_nova.toString()){
        dicionario['ligacao_nova'] = ligacao_nova
    }

    if (aumento_carga != dadosOriginais.aumento_carga.toString()){
        dicionario['aumento_carga'] = aumento_carga
    }

    if (aumento_usina != dadosOriginais.aumento_usina.toString()){
        dicionario['aumento_usina'] = aumento_usina
    }

    if (agrupamento != dadosOriginais.agrupamento.toString()){
        dicionario['agrupamento'] = agrupamento
    }

    if (n_fases != dadosOriginais.n_fases.toString()){
        dicionario['n_fases'] = n_fases
    }

    if (disjuntor != dadosOriginais.disjuntor.toString()){
        dicionario['disjuntor'] = disjuntor
    }

    if (novo_n_fases != dadosOriginais.novo_n_fases.toString()){
        dicionario['novo_n_fases'] = novo_n_fases
    }

    if (novo_disjuntor != dadosOriginais.novo_disjuntor.toString()){
        dicionario['novo_disjuntor'] = novo_disjuntor
    }
    
    if (n_fases_agrupamento != dadosOriginais.n_fases_agrupamento.toString()){
        dicionario['n_fases_agrupamento'] = n_fases_agrupamento
    }
    
    if (disjuntor_agrupamento != dadosOriginais.disjuntor_agrupamento.toString()){
        dicionario['disjuntor_agrupamento'] = disjuntor_agrupamento
    }

    if (tensao != dadosOriginais.tensao.toString()){
        dicionario['tensao'] = tensao
    }

    if (modulo_anterior_1 != dadosOriginais.modulo_anterior_1.toString()){
        dicionario['modulo_anterior_1'] = modulo_anterior_1
    }
    
    if (quantidade_modulo_1 != dadosOriginais.quantidade_modulo_1.toString()){
        dicionario['quantidade_modulo_1'] = quantidade_modulo_1
    }
    
    if (modelo_modulo_1 != dadosOriginais.modelo_modulo_1.toString()){
        dicionario['modelo_modulo_1'] = modelo_modulo_1
    }

    if (modulo_anterior_2 != dadosOriginais.modulo_anterior_2.toString()){
        dicionario['modulo_anterior_2'] = modulo_anterior_2
    }

    if (quantidade_modulo_2 != dadosOriginais.quantidade_modulo_2.toString()){
        dicionario['quantidade_modulo_2'] = quantidade_modulo_2
    }
    
    if (modelo_modulo_2 != dadosOriginais.modelo_modulo_2.toString()){
        dicionario['modelo_modulo_2'] = modelo_modulo_2
    }

    if (inversor_anterior_1 != dadosOriginais.inversor_anterior_1.toString()){
        dicionario['inversor_anterior_1'] = inversor_anterior_1
    }

    if (quantidade_inversor_1 != dadosOriginais.quantidade_inversor_1.toString()){
        dicionario['quantidade_inversor_1'] = quantidade_inversor_1
    }

    if (modelo_inversor_1 != dadosOriginais.modelo_inversor_1.toString()){
        dicionario['modelo_inversor_1'] = modelo_inversor_1
    }

    if (inversor_anterior_2 != dadosOriginais.inversor_anterior_2.toString()){
        dicionario['inversor_anterior_2'] = inversor_anterior_2
    }

    if (quantidade_inversor_2 != dadosOriginais.quantidade_inversor_2.toString()){
        dicionario['quantidade_inversor_2'] = quantidade_inversor_2
    }

    if (modelo_inversor_2 != dadosOriginais.modelo_inversor_2.toString()){
        dicionario['modelo_inversor_2'] = modelo_inversor_2
    }

    if (inversor_anterior_3 != dadosOriginais.inversor_anterior_3.toString()){
        dicionario['inversor_anterior_3'] = inversor_anterior_3
    }

    if (quantidade_inversor_3 != dadosOriginais.quantidade_inversor_3.toString()){
        dicionario['quantidade_inversor_3'] = quantidade_inversor_3
    }

    if (modelo_inversor_3 != dadosOriginais.modelo_inversor_3.toString()){
        dicionario['modelo_inversor_3'] = modelo_inversor_3
    }

    if (inversor_anterior_4 != dadosOriginais.inversor_anterior_4.toString()){
        dicionario['inversor_anterior_4'] = inversor_anterior_4
    }

    if (quantidade_inversor_4 != dadosOriginais.quantidade_inversor_4.toString()){
        dicionario['quantidade_inversor_4'] = quantidade_inversor_4
    }

    if (modelo_inversor_4 != dadosOriginais.modelo_inversor_4.toString()){
        dicionario['modelo_inversor_4'] = modelo_inversor_4
    }

    if (Object.keys(dicionario).length == 0){
        containerCamposNaoPreenchidos = document.getElementsByClassName('container-campos-nao-preenchidos')
        containerCamposNaoPreenchidos[0].style.visibility = "visible"
        containerCamposNaoPreenchidos[0].style.display = "flex"
    }

    else {
        url = 'http://localhost:8000/projects/' + id.toString()
        console.log(dicionario)
        resposta = await axios.patch(
            url, dicionario, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (resposta != 'Error: Request failed with status code 404' & resposta != 'Error: Request failed with status code 401') {
            document.getElementById('container-projeto-atualizado').style.visibility = 'visible';
            document.getElementById('container-projeto-atualizado').style.display = 'grid';
                
            document.getElementById('container-update-projects-general').style.visibility = 'hidden';
            document.getElementById('container-update-projects-general').style.display = 'none';

            localStorage.setItem('projeto_atual', id)
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else {
            let arrayInversorInexistente = document.getElementsByClassName('container-inversor-inexistente')

            for (i = 0; i < arrayInversorInexistente.length; i ++) {
                arrayInversorInexistente[i].style.visibility = 'visible'
                arrayInversorInexistente[i].style.display = 'flex'
            }
        }
    }
}

async function delete_project() {
    let access_token = localStorage.getItem('access_token');
    let id = document.getElementById('id-projeto-deletar').value;

    if (id != '') {

        let config = {
            headers: {
              'Authorization': 'Bearer ' + access_token
            }
        }

        let resposta = await axios.delete(
            'http://localhost:8000/projects/' + id, config
        ).then(
            function (response) {
                const resposta = response.data;
                return resposta;
            }
        ).catch(
            function (error) {
                console.log(error);
                return error;
            }
        )
        
        if (resposta == '') {
            document.getElementById('container-projeto-deletado').style.visibility = 'visible';
            document.getElementById('container-projeto-deletado').style.display = 'grid';

            document.getElementById('container-delete-projects').style.visibility = 'hidden';
            document.getElementById('container-delete-projects').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else if (resposta == 'Error: Request failed with status code 404') {
            let arrayInversorInexistente = document.getElementsByClassName('container-projeto-inexistente');

            for (i = 0; i < arrayInversorInexistente.length; i ++) {
                arrayInversorInexistente[i].style.visibility = 'visible';
                arrayInversorInexistente[i].style.display = 'flex';
            }
        }

    }
    
    else {
        let arrayCampos = document.getElementsByClassName('campo-obrigatorio-projetos');

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

async function print_project() {
    let divPrintProjects = document.getElementById('container-print-projects')
    let visibilidade = window.getComputedStyle(divPrintProjects).visibility

    let idProjeto;

    if (visibilidade == "hidden") {
        idProjeto = localStorage.getItem('projeto_atual')
    }

    else {
        idProjeto = document.getElementById('id-projeto-imprimir').value
    }

    let access_token = localStorage.getItem('access_token');

    if (idProjeto != '') {
        let config = {
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        }

        let resposta = await axios.get(
                'http://localhost:8000/projects/' + idProjeto + '/print', config
            ).then(
                function (response) {
                    const resposta = response;
                    return resposta;
                }
            ).catch(
                function (error) {
                    console.log(error);
                    return error;
                }
            )

        if (resposta != 'Error: Request failed with status code 404' & resposta != 'Error: Request failed with status code 401') {
            document.getElementById('container-projeto-impresso').style.visibility = 'visible';
            document.getElementById('container-projeto-impresso').style.display = 'grid';
                
            document.getElementById('container-print-projects').style.visibility = 'hidden';
            document.getElementById('container-print-projects').style.display = 'none';
        }

        else if (resposta == 'Error: Request failed with status code 401') {
            localStorage.setItem('access_token', resposta);
            checar_autorizacao();
        }

        else {
            let arrayProjetoInexistente = document.getElementsByClassName('container-projeto-inexistente')

            for (i = 0; i < arrayProjetoInexistente.length; i ++) {
                arrayProjetoInexistente[i].style.visibility = 'visible'
                arrayProjetoInexistente[i].style.display = 'flex'
            }
        }
    }
    
    else {
        let arrayCampos = document.getElementsByClassName('campo-obrigatorio-projetos');

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
        
}