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
            containerAdministrador[0].style.display = 'grid'
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
            divExistentUser = document.getElementsByClassName('container-senha-divergente')
            divExistentUser[0].style.visibility = 'visible';
            divExistentUser[0].style.display = 'flex';
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

            if (dadosCliente.numero_cliente != '') {
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
    
    if (numero_instalacao == '' & numero_cliente == '' & logradouro == '' & numero_predial == '' & complemento == '' & bairro == '' & cidade == '' & cep == '' & classificacao == '' & latitude == '' & cep == '' & coordenadas_decimais == ''){
        containerCamposNaoPreenchidos = document.getElementsByClassName('container-campos-nao-preenchidos');
        containerCamposNaoPreenchidos[0].style.visibility = "visible";
        containerCamposNaoPreenchidos[0].style.display = "flex";
    }

    else {
        if (numero_instalacao != ''){
            dicionario['numero_instalacao'] = numero_instalacao;
        }

        if (numero_cliente != ''){
            dicionario['numero_cliente'] = numero_cliente;
        }

        if (logradouro != ''){
            dicionario['logradouro'] = logradouro;
        }

        if (numero_predial != ''){
            dicionario['numero_predial'] = numero_predial;
        }

        if (complemento != ''){
            dicionario['complemento'] = complemento;
        }

        if (cep != ''){
            dicionario['cep'] = cep;
        }

        if (classificacao != ''){
            dicionario['classificacao'] = classificacao;
        }
        
        if (latitude != ''){
            dicionario['latitude'] = latitude;
        }
        
        if (longitude != ''){
            dicionario['longitude'] = longitude;
        }

        if (coordenadas_decimais != ''){
            dicionario['coordenadas_decimais'] = coordenadas_decimais;
        }

        let config = {
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        }
        
        
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
                    arrayTD[12 * i + 2].innerHTML = dadosTodosModulos[i].potencia
                    arrayTD[12 * i + 2].style.visibility = 'visible'
                    arrayTD[12 * i + 2].style.display = 'table-cell'
                    arrayTD[12 * i + 3].innerHTML = dadosTodosModulos[i].imp
                    arrayTD[12 * i + 3].style.visibility = 'visible'
                    arrayTD[12 * i + 3].style.display = 'table-cell'
                    arrayTD[12 * i + 4].innerHTML = dadosTodosModulos[i].isc
                    arrayTD[12 * i + 4].style.visibility = 'visible'
                    arrayTD[12 * i + 4].style.display = 'table-cell'
                    arrayTD[12 * i + 5].innerHTML = dadosTodosModulos[i].vmp
                    arrayTD[12 * i + 5].style.visibility = 'visible'
                    arrayTD[12 * i + 5].style.display = 'table-cell'
                    arrayTD[12 * i + 6].innerHTML = dadosTodosModulos[i].voc
                    arrayTD[12 * i + 6].style.visibility = 'visible'
                    arrayTD[12 * i + 6].style.display = 'table-cell'
                    arrayTD[12 * i + 7].innerHTML = dadosTodosModulos[i].comprimento
                    arrayTD[12 * i + 7].style.visibility = 'visible'
                    arrayTD[12 * i + 7].style.display = 'table-cell'
                    arrayTD[12 * i + 8].innerHTML = dadosTodosModulos[i].largura
                    arrayTD[12 * i + 8].style.visibility = 'visible'
                    arrayTD[12 * i + 8].style.display = 'table-cell'
                    arrayTD[12 * i + 9].innerHTML = dadosTodosModulos[i].espessura
                    arrayTD[12 * i + 9].style.visibility = 'visible'
                    arrayTD[12 * i + 9].style.display = 'table-cell'
                    arrayTD[12 * i + 10].innerHTML = dadosTodosModulos[i].eficiencia
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

            if (dadosModulo.potencia != '') {
                document.getElementById('module-power').innerHTML = dadosModulo.potencia.toString() + " Wp";
                document.getElementById('title-module-power').style.visibility = 'visible';
                document.getElementById('title-module-power').style.display = 'grid';
                document.getElementById('module-power').style.visibility = 'visible';
                document.getElementById('module-power').style.display = 'grid';
            }
            
            if (dadosModulo.imp != '') {
                document.getElementById('module-imp').innerHTML = dadosModulo.imp.toString().replace('.', ',') + " A";
                document.getElementById('title-module-imp').style.visibility = 'visible';
                document.getElementById('title-module-imp').style.display = 'grid';
                document.getElementById('module-imp').style.visibility = 'visible';
                document.getElementById('module-imp').style.display = 'grid';
            }
            
            if (dadosModulo.isc != '') {
                document.getElementById('module-isc').innerHTML = dadosModulo.isc.toString().replace('.', ',') + " A";
                document.getElementById('title-module-isc').style.visibility = 'visible';
                document.getElementById('title-module-isc').style.display = 'grid';
                document.getElementById('module-isc').style.visibility = 'visible';
                document.getElementById('module-isc').style.display = 'grid';
            }

            if (dadosModulo.vmp != '') {
                document.getElementById('module-vmp').innerHTML = dadosModulo.vmp.toString().replace('.', ',') + " V";
                document.getElementById('title-module-vmp').style.visibility = 'visible';
                document.getElementById('title-module-vmp').style.display = 'grid';
                document.getElementById('module-vmp').style.visibility = 'visible';
                document.getElementById('module-vmp').style.display = 'grid';
            }
            
            if (dadosModulo.voc != '') {
                document.getElementById('module-voc').innerHTML = dadosModulo.voc.toString().replace('.', ',') + " V";
                document.getElementById('title-module-voc').style.visibility = 'visible';
                document.getElementById('title-module-voc').style.display = 'grid';
                document.getElementById('module-voc').style.visibility = 'visible';
                document.getElementById('module-voc').style.display = 'grid';
            }
            
            if (dadosModulo.comprimento != '') {
                document.getElementById('module-width').innerHTML = dadosModulo.comprimento.toString() + " mm";
                document.getElementById('title-module-width').style.visibility = 'visible';
                document.getElementById('title-module-width').style.display = 'grid';
                document.getElementById('module-width').style.visibility = 'visible';
                document.getElementById('module-width').style.display = 'grid';
            }
            
            if (dadosModulo.largura != '') {
                document.getElementById('module-length').innerHTML = dadosModulo.largura.toString() + " mm";
                document.getElementById('title-module-length').style.visibility = 'visible';
                document.getElementById('title-module-length').style.display = 'grid';
                document.getElementById('module-length').style.visibility = 'visible';
                document.getElementById('module-length').style.display = 'grid';
            }
            
            if (dadosModulo.espessura != '') {
                document.getElementById('module-thickness').innerHTML = dadosModulo.espessura.toString() + " mm";
                document.getElementById('title-module-thickness').style.visibility = 'visible';
                document.getElementById('title-module-thickness').style.display = 'grid';
                document.getElementById('module-thickness').style.visibility = 'visible';
                document.getElementById('module-thickness').style.display = 'grid';
            }
            
            if (dadosModulo.eficiencia != '') {
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
            
            if (dadosModulo.coeficiente_temperatura != '') {
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

    if (modelo == '' & fabricante == '' & potencia == '' & imp == '' & isc == '' & vmp == '' & voc == '' & comprimento == '' & largura == '' & espessura == '' & eficiencia == '' & temperatura_nominal == '' & tipo != '' & coeficiente_temperatura == ''){
        containerCamposNaoPreenchidos = document.getElementsByClassName('container-campos-nao-preenchidos')
        containerCamposNaoPreenchidos[0].style.visibility = "visible"
        containerCamposNaoPreenchidos[0].style.display = "flex"
    }

    else {
        if (modelo != ''){
            dicionario['modelo'] = modelo
        }

        if (fabricante != ''){
            dicionario['fabricante'] = fabricante
        }

        if (potencia != ''){
            dicionario['potencia'] = potencia
        }

        if (imp != ''){
            dicionario['imp'] = imp
        }

        if (isc != ''){
            dicionario['isc'] = isc
        }

        if (vmp != ''){
            dicionario['vmp'] = vmp
        }

        if (voc != ''){
            dicionario['voc'] = voc
        }
        
        if (comprimento != ''){
            dicionario['comprimento'] = comprimento
        }
        
        if (largura != ''){
            dicionario['largura'] = largura
        }
        
        if (espessura != ''){
            dicionario['espessura'] = espessura
        }
        
        if (eficiencia != ''){
            dicionario['eficiencia'] = eficiencia
        }

        if (temperatura_nominal != ''){
            dicionario['temperatura_nominal'] = temperatura_nominal
        }

        if (tipo != ''){
            dicionario['tipo'] = tipo
        }
        
        if (coeficiente_temperatura != ''){
            dicionario['coeficiente_temperatura'] = coeficiente_temperatura
        }
        
        let config = {
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        }
        
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

            if (dadosInversor.potencia != '') {
                document.getElementById('inverter-power').innerHTML = (dadosInversor.potencia / 1000).toString().replace('.', ',') + " kW";
                document.getElementById('title-inverter-power').style.visibility = 'visible';
                document.getElementById('title-inverter-power').style.display = 'grid';
                document.getElementById('inverter-power').style.visibility = 'visible';
                document.getElementById('inverter-power').style.display = 'grid';
            }
            
            if (dadosInversor.overload != '') {
                document.getElementById('inverter-overload').innerHTML = (dadosInversor.overload / 1000).toString().replace('.', ',') + " kW";
                document.getElementById('title-inverter-overload').style.visibility = 'visible';
                document.getElementById('title-inverter-overload').style.display = 'grid';
                document.getElementById('inverter-overload').style.visibility = 'visible';
                document.getElementById('inverter-overload').style.display = 'grid';
            }

            if (dadosInversor.n_mppt != '') {
                document.getElementById('inverter-mppt').innerHTML = dadosInversor.n_mppt;
                document.getElementById('title-inverter-mppt').style.visibility = 'visible';
                document.getElementById('title-inverter-mppt').style.display = 'grid';
                document.getElementById('inverter-mppt').style.visibility = 'visible';
                document.getElementById('inverter-mppt').style.display = 'grid';
            }

            if (dadosInversor.n_entrada != '') {
                document.getElementById('inverter-input').innerHTML = dadosInversor.n_entrada;
                document.getElementById('title-inverter-input').style.visibility = 'visible';
                document.getElementById('title-inverter-input').style.display = 'grid';
                document.getElementById('inverter-input').style.visibility = 'visible';
                document.getElementById('inverter-input').style.display = 'grid';
            }
            
            if (dadosInversor.imp != '') {
                document.getElementById('inverter-imp').innerHTML = dadosInversor.imp.toString().replace('.', ',') + " A";
                document.getElementById('title-inverter-imp').style.visibility = 'visible';
                document.getElementById('title-inverter-imp').style.display = 'grid';
                document.getElementById('inverter-imp').style.visibility = 'visible';
                document.getElementById('inverter-imp').style.display = 'grid';
            }

            if (dadosInversor.isc != '') {
                document.getElementById('inverter-isc').innerHTML = dadosInversor.isc.toString().replace('.', ',') + " A";
                document.getElementById('title-inverter-isc').style.visibility = 'visible';
                document.getElementById('title-inverter-isc').style.display = 'grid';
                document.getElementById('inverter-isc').style.visibility = 'visible';
                document.getElementById('inverter-isc').style.display = 'grid';
            }

            if (dadosInversor.v_max_mppt != '' & dadosInversor.v_min_mppt != '') {
                document.getElementById('inverter-vmp').innerHTML = dadosInversor.v_min_mppt.toString() + "-" + dadosInversor.v_max_mppt.toString() + " V";
                document.getElementById('title-inverter-vmp').style.visibility = 'visible';
                document.getElementById('title-inverter-vmp').style.display = 'grid';
                document.getElementById('inverter-vmp').style.visibility = 'visible';
                document.getElementById('inverter-vmp').style.display = 'grid';
            }
            
            if (dadosInversor.v_max != '') {
                document.getElementById('inverter-voc').innerHTML = dadosInversor.v_max.toString() + " V";
                document.getElementById('title-inverter-voc').style.visibility = 'visible';
                document.getElementById('title-inverter-voc').style.display = 'grid';
                document.getElementById('inverter-voc').style.visibility = 'visible';
                document.getElementById('inverter-voc').style.display = 'grid';
            }
            
            if (dadosInversor.i_saida != '') {
                document.getElementById('inverter-iout').innerHTML = dadosInversor.i_saida.toString().replace('.', ',') + " A";
                document.getElementById('title-inverter-iout').style.visibility = 'visible';
                document.getElementById('title-inverter-iout').style.display = 'grid';
                document.getElementById('inverter-iout').style.visibility = 'visible';
                document.getElementById('inverter-iout').style.display = 'grid';
            }

            if (dadosInversor.v_saida != '') {
                document.getElementById('inverter-vout').innerHTML = dadosInversor.v_saida.toString() + " V";
                document.getElementById('title-inverter-vout').style.visibility = 'visible';
                document.getElementById('title-inverter-vout').style.display = 'grid';
                document.getElementById('inverter-vout').style.visibility = 'visible';
                document.getElementById('inverter-vout').style.display = 'grid';
            }
            
            if (dadosInversor.comprimento != '') {
                document.getElementById('inverter-width').innerHTML = dadosInversor.comprimento.toString() + " mm";
                document.getElementById('title-inverter-width').style.visibility = 'visible';
                document.getElementById('title-inverter-width').style.display = 'grid';
                document.getElementById('inverter-width').style.visibility = 'visible';
                document.getElementById('inverter-width').style.display = 'grid';
            }

            if (dadosInversor.largura != '') {
                document.getElementById('inverter-length').innerHTML = dadosInversor.largura.toString() + " mm";
                document.getElementById('title-inverter-length').style.visibility = 'visible';
                document.getElementById('title-inverter-length').style.display = 'grid';
                document.getElementById('inverter-length').style.visibility = 'visible';
                document.getElementById('inverter-length').style.display = 'grid';
            }

            if (dadosInversor.espessura != '') {
                document.getElementById('inverter-thickness').innerHTML = dadosInversor.espessura.toString() + " mm";
                document.getElementById('title-inverter-thickness').style.visibility = 'visible';
                document.getElementById('title-inverter-thickness').style.display = 'grid';
                document.getElementById('inverter-thickness').style.visibility = 'visible';
                document.getElementById('inverter-thickness').style.display = 'grid';
            }
            
            if (dadosInversor.eficiencia != '') {
                document.getElementById('inverter-efficiency').innerHTML = dadosInversor.eficiencia.toString().replace('.', ',') + "%";
                document.getElementById('title-inverter-efficiency').style.visibility = 'visible';
                document.getElementById('title-inverter-efficiency').style.display = 'grid';
                document.getElementById('inverter-efficiency').style.visibility = 'visible';
                document.getElementById('inverter-efficiency').style.display = 'grid';
            }

            if (dadosInversor.temperatura_nominal != '') {
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

    if (modelo == '' & fabricante == '' & potencia == '' & overload == '' & imp == '' & isc == '' & v_min_mppt == '' & v_max_mppt == '' & v_max == '' & n_mppt == '' & n_entrada == '' & v_saida == '' & i_saida == '' & comprimento == '' & largura == '' & espessura == '' & eficiencia == ''){
        containerCamposNaoPreenchidos = document.getElementsByClassName('container-campos-nao-preenchidos')
        containerCamposNaoPreenchidos[0].style.visibility = "visible"
        containerCamposNaoPreenchidos[0].style.display = "flex"
    }

    else {
        if (modelo != ''){
            dicionario['modelo'] = modelo
        }

        if (fabricante != ''){
            dicionario['fabricante'] = fabricante
        }

        if (potencia != ''){
            dicionario['potencia'] = potencia
        }

        if (overload != ''){
            dicionario['overload'] = overload
        }

        if (imp != ''){
            dicionario['imp'] = imp
        }

        if (isc != ''){
            dicionario['isc'] = isc
        }

        if (v_min_mppt != ''){
            dicionario['v_min_mppt'] = v_min_mppt
        }

        if (v_max_mppt != ''){
            dicionario['v_max_mppt'] = v_max_mppt
        }

        if (v_max != ''){
            dicionario['v_max'] = v_max
        }

        if (n_mppt != ''){
            dicionario['n_mppt'] = n_mppt
        }
        
        if (n_entrada != ''){
            dicionario['n_entrada'] = n_entrada
        }
        
        if (i_saida != ''){
            dicionario['i_saida'] = i_saida
        }

        if (v_saida != ''){
            dicionario['v_saida'] = v_saida
        }

        if (comprimento != ''){
            dicionario['comprimento'] = comprimento
        }
        
        if (largura != ''){
            dicionario['largura'] = largura
        }
        
        if (espessura != ''){
            dicionario['espessura'] = espessura
        }
        
        if (eficiencia != ''){
            dicionario['eficiencia'] = eficiencia
        }

        let config = {
            headers: {
            'Authorization': 'Bearer ' + access_token
            }
        }
        
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