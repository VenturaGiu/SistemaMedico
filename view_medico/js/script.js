$(document).ready(function() {
    listarTudo();
});
//var id médico para editar e excluir conteúdo
var $id = 0;

//var para verificação das CheckBox já cadastradas
var especialidadesMarcadas = [];
var especialidade;

//função para verificação das CheckBox cadastradas
function verificarEspecialidades(especialidade) {
    var listaMarcados = document.getElementsByName("especialidade");
    especialidadeArray = especialidade.split(',');
    for (i = 0; i < listaMarcados.length; i++) {
        for (let espec of especialidadeArray) {
            if (espec == listaMarcados[i].value && $id != 0) {
                listaMarcados[i].checked = true;
            }
        }
    }

}

//função para cadastro das CheckBox
function obterMarcados() {
    var listaMarcados = document.getElementsByName("especialidade");
    for (i = 0; i < listaMarcados.length; i++) {
        var item = listaMarcados[i];
        if (item.type == "checkbox" && item.checked) {
            especialidadesMarcadas.push(item.value);
        }
    }

    especialidade = especialidadesMarcadas.toString();
}

// mask do telefone
$(document).ready(function() {
    $('#txtTelefone').mask('(00) 0000-0000');
});

//eventos
$("#btnCadastrar").click(function() {
    abrirModalCadastrar(true);
});

$("#formCadastrar").submit(function(e) {
    enviarCadastro();
    e.preventDefault();
});

//funções
function editar(id) {

    if (id <= 0)
        return;

    lerPeloId(id, false);
}

//modal para cadastro
function abrirModalCadastrar(reset = true) {
    $('#modalNovoMedico').modal('show');

    if (reset)
        limparForm();
}

function fecharModalCadastrar() {
    $('#modalNovoMedico').modal('hide');
}

//recuperar valores dos input para GET de elementos específicos
function pegarIdPesquisa() {
    var crmMedico = document.getElementById("inputPesquisar").value;
    var nomeMedico = document.getElementById("inputPesquisarNome").value;
    if (crmMedico != "" && nomeMedico != "") {
        alert("Pesquise um campo por vez!")
    } else if (crmMedico == "" && nomeMedico == "") {
        window.location.reload();
    } else if (crmMedico != "") {
        abrirPeloCrm(crmMedico);
    } else if (nomeMedico != "") {
        abrirPeloNome(nomeMedico);
    }
}

function deletarMedico(id) {
    if (!confirm("Deseja excluir esse médico?"))
        return;

    deletar(id)
}

//envios
function enviarCadastro() {
    obterMarcados();
    var medico = {
        id: $id,
        crm: $("#txtCrm").val(),
        nome: $("#txtNome").val(),
        telefone: $("#txtTelefone").val(),
        especialidade: especialidade,
    };

    if ($id == 0) {
        cadastrar(medico);
    } else {
        alterar(medico);
    }
}

function alterar(medico) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/medicos/" + medico.id,
        type: "PUT",
        data: medico,
        dataType: "json",
        beforeSend: function() {
            $("#btnSalvar").attr("disabled", true);
        },
        success: function(data) {
            if (data.result = "Dados atualizados com sucesso!") {
                fecharModalCadastrar();
                window.location.reload();
            } else {
                alert("Houve um erro ao atualizar as informações :(");
            }
        },
        error: function(error) {
            console.log(error);
            alert("Houve um erro ao tentar atualizar as informações :(");
        },
        complete: function() {
            $("#btnSalvar").attr("disabled", false);
        },

    });
}

//limpar os valores do input ao abrir o modal para novo cadastro
function limparForm() {
    $("#id").val("0");
    $("#txtCrm").val("");
    $("#txtNome").val("");
    $("#txtTelefone").val("");
    $("#txtEspecialidades").val("");
    $("#btnSalvar").attr("disabled", false);
}

function cadastrar(medico) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/medicos",
        type: "POST",
        data: medico,
        dataType: "json",
        beforeSend: function() {
            $("#btnSalvar").attr("disabled", true);
        },
        success: function(data) {
            if (data.result = "Médico cadastrado com sucesso!") {
                fecharModalCadastrar();
                window.location.reload();
            } else {
                alert("Houve um erro ao cadastrar na api :(");
            }
        },
        error: function(error) {
            console.log(error);
            alert("Houve um erro ao cadastrar interface:(");
        },
        complete: function() {
            $("#btnSalvar").attr("disabled", false);
        },

    });
}

function deletar(id) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/medicos/" + id,
        dataType: "json",
        type: "delete",
        success: function(data) {
            if (data.result = "Médico deletado com sucesso!") {
                window.location.reload();
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function editarModal(data) {
    if (data == null)
        return;

    $id = data.id,
        $("#txtCrm").val(data.crm),
        $("#txtNome").val(data.nome),
        $("#txtTelefone").val(data.telefone),
        $especialidade = data.especialidade,

        verificarEspecialidades(data.especialidade);
    abrirModalCadastrar(false);
}

//pesquisar médico pelo crm
function abrirPeloCrm(crmMedico) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/medicos/crm/" + crmMedico,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            visualizarPesquisaCrm(data);
        }
    });
}

//pesquisar médico pelo nome
function abrirPeloNome(nomeMedico) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/medicos/nome/" + nomeMedico,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {

            visualizarPesquisaNome(data);

        }
    });
}

//listando todo o conteúdo da API
function listarTudo() {
    $.ajax({
        url: "http://127.0.0.1:8000/api/medicos",
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            visualizarTodosMedicos(data);
        },
        error: function() {
            alert("deu errado");
        }
    });

}

//retorna as informações de cada id, auxiliando na edição e criação de médicos
function lerPeloId(id, view) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/medicos/" + id,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            if (view) {
                abrirModalCadastrar(data);
            } else {
                editarModal(data);
            }
        }
    });
}

//imprime na tela apenas o registro de determinado CRM
function visualizarPesquisaCrm(data) {
    console.log(data);
    document.getElementById("tbodyId").innerHTML =
        "<tbody id='tbodyId'><tr>" +
        "<th scope='row'></th>" +
        "<td>" + data.crm + "</td>" +
        "<td>" + data.nome + "</td>" +
        "<td id='phone_with_ddd'>" + data.telefone + "</td>" +
        "<td>" + data.especialidade + "</td>" +
        "<td><button type='button' class='btn btn-info' id='' onclick='editar()'>Editar</button></td>" +
        "<td><button type='button' class='btn btn-danger' onclick='deletarMedico()'>Excluir</button></td>" +
        "</tr>" +
        "</tbody>";

}

//imprime na tela apenas os registros de determinada letra ou nome
function visualizarPesquisaNome(data) {
    var table = document.getElementById("tbodyId");
    table.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        page =
            "<tbody id='tbodyId'><tr>" +
            "<th scope='row'></th>" +
            "<td>" + data[i].crm + "</td>" +
            "<td>" + data[i].nome + "</td>" +
            "<td id='phone_with_ddd'>" + data[i].telefone + "</td>" +
            "<td>" + data[i].especialidade + "</td>" +
            "<td><button type='button' class='btn btn-info' id='' onclick='editar()'>Editar</button></td>" +
            "<td><button type='button' class='btn btn-danger' onclick='deletarMedico()'>Excluir</button></td>" +
            "</tr>" +
            "</tbody>";
        table.innerHTML += page;
    }
}

//imprime todos médicos da API
function visualizarTodosMedicos(data) {
    if (data.length < 1)
        return;

    var nomeMedico = document.getElementById("inputPesquisarNome").value;
    var crmMedico = document.getElementById("inputPesquisar").value;
    var table = document.getElementById("tbodyId");
    table.innerHTML = "";

    if (crmMedico == "" && nomeMedico == "") {
        for (var i = 0; i < data.length; i++) {
            var page =
                "<tbody id='tbodyId'><tr>" +
                "<th scope='row'></th>" +
                "<td>" + data[i].crm + "</td>" +
                "<td>" + data[i].nome + "</td>" +
                "<td id='phone_with_ddd'>" + data[i].telefone + "</td>" +
                "<td>" + data[i].especialidade + "</td>" +
                "<td><button type='button' class='btn btn-info' id='' onclick='editar(" + data[i].id + ")'>Editar</button></td>" +
                "<td><button type='button' class='btn btn-danger' onclick='deletarMedico(" + data[i].id + ")'>Excluir</button></td>" +
                "</tr>" +
                "</tbody>";
            table.innerHTML += page;
        }
    } else if (crmMedico != "") {
        visualizarPesquisaCrm();
    } else if (nomeMedico != "") {
        visualizarPesquisaNome();
    }

}