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