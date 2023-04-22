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
        
        let nomePagina = String(location.pathname.split("/").slice(-1))
            
        if (nomePagina != 'index.html') {
            setTimeout(window.location.replace('../index.html'), 5000);
        }
    
        else {
            setTimeout(window.location.reload(), 5000);
        }
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-usuarios')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
    
    localStorage.setItem('username', usuario);
    localStorage.setItem('access_token', token_acesso);
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
    access_token = localStorage.getItem('access_token');
    username = localStorage.getItem('username');
    
    if (access_token != 'Error: Request failed with status code 403' & access_token != null & access_token != 'Error: Request failed with status code 422') {
        nomeUsuario = document.getElementsByClassName('nome-usuario')
        nomeUsuario[0].innerHTML = username
    }
}

//FUNÇÕES PARA A PÁGINA DE USUÁRIO
async function get_user() {
    access_token = localStorage.getItem('access_token');
    username = localStorage.getItem('username');

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
        
        hora = dadosUsuario.criado_em.split('T')[1].split('.')[0]
        console.log(hora)
        data = dadosUsuario.criado_em.split('-')[2].split('T')[0] + '/' + dadosUsuario.criado_em.split('-')[1] + '/' + dadosUsuario.criado_em.split('-')[0]
        document.getElementById('username').innerHTML = dadosUsuario.nome
        document.getElementById('user-role').innerHTML = dadosUsuario.cargo
        document.getElementById('user-created-at').innerHTML = data  + ' às ' + hora
        document.getElementById('titulo-pagina').innerHTML = "Usuário"
    }
}

// FUNÇÕES PARA A PÁGINA DE CLIENTES
async function get_client() {
    access_token = localStorage.getItem('access_token');

    let numero_cliente = document.getElementById('número-cliente-buscar').value;

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

        console.log(dadosCliente)
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-clientes')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}

function post_client() {
    access_token = localStorage.getItem('access_token');

    let numero_cliente = document.getElementById('número-cliente-adicionar').value;
    let nome = document.getElementById('nome-cliente-adicionar').value;
    let cpf = document.getElementById('cpf-adicionar').value;
    let rg = document.getElementById('rg-adicionar').value;
    let nascimento = document.getElementById('data-nascimento-adicionar').value;
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
        axios.post(
            'http://localhost:8000/clients', dicionario, config
        )

        document.getElementById('container-cliente-adicionado').style.visibility = 'visible';
        document.getElementById('container-cliente-adicionado').style.display = 'grid';
        
        document.getElementById('container-add-clients').style.visibility = 'hidden';
        document.getElementById('container-add-clients').style.display = 'none';
    }

    else {
        arrayCampos = document.getElementsByClassName('campo-obrigatorio-clientes')

        for (i = 0; i < arrayCampos.length; i ++) {
            arrayCampos[i].style.visibility = "visible";
            arrayCampos[i].style.display = "grid";
        }
    }
}