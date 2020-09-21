//var id médico 
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

function abrirModalCadastrar(reset = true) {
    $('#modalNovoMedico').modal('show');

    if (reset)
        limparForm();
}

function pegarIdPesquisa() {
    var crmMedico = document.getElementById("inputPesquisar").value;
    abrirPeloCrm(crmMedico);
}

function abrirModalPesquisa(data) {
    $('#modalPesquisaMedico').modal('show');
    visualizarModalPesquisa(data);
}

function fecharModalCadastrar() {
    $('#modalNovoMedico').modal('hide');
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

function abrirPeloCrm(crmMedico) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/medicos/crm/" + crmMedico,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {

            abrirModalPesquisa(data);

        }
    });
}

function abrirPeloNome(crmMedico) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/medicos/nome/" + crmMedico,
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {

            abrirModalPesquisa(data);

        }
    });
}

function listarTudo() {
    $.ajax({
        url: "http://127.0.0.1:8000/api/medicos",
        type: "get",
        data: {},
        dataType: "json",
        success: function(data) {
            // console.log(data);
            // visualizarModalPesquisa(data);
        },
        error: function() {
            alert("deu errado");
        }
    });

}

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

function visualizarModalPesquisa(data) {
    console.log(data);
    document.getElementById("informacoesPesquisa").innerHTML = "<table class='table table-hover'>" +
        "<thead>" +
        "<tr>" +
        "<th scope='col'>#</th>" +
        "<th scope='col'>CRM</th>" +
        "<th scope='col'>Nome</th>" +
        "<th scope='col'>Telefone</th>" +
        "<th scope='col'>Especialidade</th>" +
        "<th scope='col'>Editar</th>" +
        "<th scope='col'>Excluir</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody id='tbodyId'><tr>" +
        "<th scope='row'></th>" +
        "<td>" + data.crm + "</td>" +
        "<td>" + data.nome + "</td>" +
        "<td id='phone_with_ddd'>" + data.telefone + "</td>" +
        "<td>" + data.especialidade + "</td>" +
        "<td><button type='button' class='btn btn-info' id='' onclick='editar()'>Editar</button></td>" +
        "<td><button type='button' class='btn btn-danger' onclick='deletarMedico()'>Excluir</button></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>";

}