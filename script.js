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

// FUNÇÕES PARA MOSTRAR CONTEÚDO DA PÁGINA DE MÓDULOS
function buscar_modulo() {
    let divSearchModule = document.getElementById('container-search-modules');
    let divAddModule = document.getElementById('container-add-modules-general');
    let divUpdateModule = document.getElementById('container-update-modules-general');
    let divDeleteModule = document.getElementById('container-delete-modules');
    
    divSearchModule.style.visibility = "visible";
    divSearchModule.style.display = "grid";
    divAddModule.style.visibility = "hidden";
    divAddModule.style.display = "none";
    divUpdateModule.style.visibility = "hidden";
    divUpdateModule.style.display = "none";
    divDeleteModule.style.visibility = "hidden";
    divDeleteModule.style.display = "none";
}

function adicionar_modulo() {
    let divSearchModule = document.getElementById('container-search-modules');
    let divAddModule = document.getElementById('container-add-modules-general');
    let divUpdateModule = document.getElementById('container-update-modules-general');
    let divDeleteModule = document.getElementById('container-delete-modules');
    
    divSearchModule.style.visibility = "hidden";
    divSearchModule.style.display = "none";
    divAddModule.style.visibility = "visible";
    divAddModule.style.display = "grid";
    divUpdateModule.style.visibility = "hidden";
    divUpdateModule.style.display = "none";
    divDeleteModule.style.visibility = "hidden";
    divDeleteModule.style.display = "none";
}

function atualizar_modulo() {
    let divSearchModule = document.getElementById('container-search-modules');
    let divAddModule = document.getElementById('container-add-modules-general');
    let divUpdateModule = document.getElementById('container-update-modules-general');
    let divDeleteModule = document.getElementById('container-delete-modules');
    
    divSearchModule.style.visibility = "hidden";
    divSearchModule.style.display = "none";
    divAddModule.style.visibility = "hidden";
    divAddModule.style.display = "none";
    divUpdateModule.style.visibility = "visible";
    divUpdateModule.style.display = "grid";
    divDeleteModule.style.visibility = "hidden";
    divDeleteModule.style.display = "none";
}

function deletar_modulo() {
    let divSearchModule = document.getElementById('container-search-modules');
    let divAddModule = document.getElementById('container-add-modules-general');
    let divUpdateModule = document.getElementById('container-update-modules-general');
    let divDeleteModule = document.getElementById('container-delete-modules');
    
    divSearchModule.style.visibility = "hidden";
    divSearchModule.style.display = "none";
    divAddModule.style.visibility = "hidden";
    divAddModule.style.display = "none";
    divUpdateModule.style.visibility = "hidden";
    divUpdateModule.style.display = "none";
    divDeleteModule.style.visibility = "visible";
    divDeleteModule.style.display = "grid";
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