// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE CLIENTES
function buscar_cliente() {
    let divSearchClient = document.getElementById('container-search-clients');
    let divAddClient = document.getElementById('container-add-clients');
    let divUpdateClient = document.getElementById('container-update-clients');
    let divDeleteClient = document.getElementById('container-delete-clients');
    
    divSearchClient.style.visibility = "visible";
    divSearchClient.style.display = "grid";
    divAddClient.style.visibility = "hidden";
    divAddClient.style.display = "none";
    divUpdateClient.style.visibility = "hidden";
    divUpdateClient.style.display = "none";
    divDeleteClient.style.visibility = "hidden";
    divDeleteClient.style.display = "none";
}

function adicionar_cliente() {
    let divSearchClient = document.getElementById('container-search-clients')
    let divAddClient = document.getElementById('container-add-clients')
    let divUpdateClient = document.getElementById('container-update-clients')
    let divDeleteClient = document.getElementById('container-delete-clients')

    divSearchClient.style.visibility = "hidden"
    divSearchClient.style.display = "none"
    divAddClient.style.visibility = "visible"
    divAddClient.style.display = "grid"
    divUpdateClient.style.visibility = "hidden"
    divUpdateClient.style.display = "none"
    divDeleteClient.style.visibility = "hidden"
    divDeleteClient.style.display = "none"
}

function atualizar_cliente() {
    let divSearchClient = document.getElementById('container-search-clients')
    let divAddClient = document.getElementById('container-add-clients')
    let divUpdateClient = document.getElementById('container-update-clients')
    let divDeleteClient = document.getElementById('container-delete-clients')

    divSearchClient.style.visibility = "hidden"
    divSearchClient.style.display = "none"
    divAddClient.style.visibility = "hidden"
    divAddClient.style.display = "none"
    divUpdateClient.style.visibility = "visible"
    divUpdateClient.style.display = "grid"
    divDeleteClient.style.visibility = "hidden"
    divDeleteClient.style.display = "none"
}

function deletar_cliente() {
    let divSearchClient = document.getElementById('container-search-clients')
    let divAddClient = document.getElementById('container-add-clients')
    let divUpdateClient = document.getElementById('container-update-clients')
    let divDeleteClient = document.getElementById('container-delete-clients')

    divSearchClient.style.visibility = "hidden"
    divSearchClient.style.display = "none"
    divAddClient.style.visibility = "hidden"
    divAddClient.style.display = "none"
    divUpdateClient.style.visibility = "hidden"
    divUpdateClient.style.display = "none"
    divDeleteClient.style.visibility = "visible"
    divDeleteClient.style.display = "grid"
}

// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE INSTALAÇÕES
function buscar_instalacao() {
    let divSearchInstalation = document.getElementById('container-search-instalations');
    let divAddInstalation = document.getElementById('container-add-instalations');
    let divUpdateInstalation = document.getElementById('container-update-instalations');
    let divDeleteInstalation = document.getElementById('container-delete-instalations');
    
    divSearchInstalation.style.visibility = "visible";
    divSearchInstalation.style.display = "grid";
    divAddInstalation.style.visibility = "hidden";
    divAddInstalation.style.display = "none";
    divUpdateInstalation.style.visibility = "hidden";
    divUpdateInstalation.style.display = "none";
    divDeleteInstalation.style.visibility = "hidden";
    divDeleteInstalation.style.display = "none";
}

function adicionar_instalacao() {
    let divSearchInstalation = document.getElementById('container-search-instalations');
    let divAddInstalation = document.getElementById('container-add-instalations');
    let divUpdateInstalation = document.getElementById('container-update-instalations');
    let divDeleteInstalation = document.getElementById('container-delete-instalations');
    
    divSearchInstalation.style.visibility = "hidden";
    divSearchInstalation.style.display = "none";
    divAddInstalation.style.visibility = "visible";
    divAddInstalation.style.display = "grid";
    divUpdateInstalation.style.visibility = "hidden";
    divUpdateInstalation.style.display = "none";
    divDeleteInstalation.style.visibility = "hidden";
    divDeleteInstalation.style.display = "none";
}

function atualizar_instalacao() {
    let divSearchInstalation = document.getElementById('container-search-instalations');
    let divAddInstalation = document.getElementById('container-add-instalations');
    let divUpdateInstalation = document.getElementById('container-update-instalations');
    let divDeleteInstalation = document.getElementById('container-delete-instalations');
    
    divSearchInstalation.style.visibility = "hidden";
    divSearchInstalation.style.display = "none";
    divAddInstalation.style.visibility = "hidden";
    divAddInstalation.style.display = "none";
    divUpdateInstalation.style.visibility = "visible";
    divUpdateInstalation.style.display = "grid";
    divDeleteInstalation.style.visibility = "hidden";
    divDeleteInstalation.style.display = "none";
}

function deletar_instalacao() {
    let divSearchInstalation = document.getElementById('container-search-instalations');
    let divAddInstalation = document.getElementById('container-add-instalations');
    let divUpdateInstalation = document.getElementById('container-update-instalations');
    let divDeleteInstalation = document.getElementById('container-delete-instalations');
    
    divSearchInstalation.style.visibility = "hidden";
    divSearchInstalation.style.display = "none";
    divAddInstalation.style.visibility = "hidden";
    divAddInstalation.style.display = "none";
    divUpdateInstalation.style.visibility = "hidden";
    divUpdateInstalation.style.display = "none";
    divDeleteInstalation.style.visibility = "visible";
    divDeleteInstalation.style.display = "grid";
}