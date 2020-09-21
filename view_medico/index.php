<?php
//url api
    $url = "http://127.0.0.1:8000/api/medicos";
    $medicos = json_decode(file_get_contents($url));
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS e Style -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <linK rel="stylesheet" href="css/style.css" type="text/css">
        <title>Lista de Médicos</title>
    </head>

    <body>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text"></span>
            </div>
            <input id="inputPesquisar" type="text" class="form-control"  placeholder="Pesquise um Médico pelo CRM" aria-label="Recipient's username" aria-describedby="button-addon2">
            <input id="inputPesquisarNome" type="text" class="form-control"  placeholder="Pesquise um Médico pelo nome" aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="btnPesquisar" onclick="pegarIdPesquisa()">Pesquisar</button>
                <button class="btn btn-success" type="button" id="btnCadastrar">Cadastrar Novo</button>
            </div>
        </div>
        <!-- Div Geral -->
        <div class="divGeralCentro" id="divIndex">
            <!-- Barra de pesquisa -->
            <!-- Tabela com lista de Médicos -->
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">CRM</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Especialidade</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Excluir</th>
                    </tr>
                </thead>
                <tbody id="tbodyId">
                <?php
                    if(count($medicos)) {
                    $i = 0;
                    foreach($medicos as $Medico) {
                        $i++;
                    ?>
                    <?php if($i % 3 == 1) { ?>
                    <tr>
                    <?php } ?>
                        <th scope="row"><?=$i?></th>
                        <td><?=$Medico->crm?></td>
                        <td><?=$Medico->nome?></td>
                        <td id="phone_with_ddd"><?=$Medico->telefone?></td>
                        <td><?=$Medico->especialidade?></td>
                        <td><button type="button" class="btn btn-info" id="<?=$Medico->id?>" onclick="editar(<?=$Medico->id?>)">Editar</button></td>
                        <td><button type="button" class="btn btn-danger" onclick="deletarMedico(<?=$Medico->id?>)">Excluir</button></td>
                    </tr>
                <?php if($i % 3 == 0) { ?>
                </tbody>
                <?php } } } else { ?>
                    <strong>Nenhum Médico retornado pela API</strong>
                <?php } ?>
            </table>
            
            <!-- Modal para cadastrar e editar um médico-->
            <div class="modal fade" id="modalNovoMedico" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                <form id="formCadastrar" method="post">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cadastrar/Editar um Médico</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div class="modal-body">
                        <div class="centralizarElementos">
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">CRM</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="txtCrm">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Nome</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="txtNome">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Telefone</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="txtTelefone">
                                </div>
                            </div>
                        </div>
                        <div id="centralizarCheckbox">Selecione a(s) Especialidade(s):</div>
                        <div id="centralizarCheckboxOpcoes" class="form-group row">
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Alergologia" type="checkbox" id="Alergologia">
                                    <label class="form-check-label" for="Alergologia">Alergologia</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Angiologia" type="checkbox" id="Angiologia">
                                    <label class="form-check-label" for="Angiologia">Angiologia</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Buco Maxilo" type="checkbox" id="BucoMaxilo">
                                    <label class="form-check-label" for="BucoMaxilo">Buco Maxilo</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Cardiologia Clínica" type="checkbox" id="CardiologiaClinica">
                                    <label class="form-check-label" for="CardiologiaClinica">Cardiologia Clínica</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Cardiologia Infantil" type="checkbox" id="CardiologiaInfantil">
                                    <label class="form-check-label" for="CardiologiaInfantil">Cardiologia Infantil</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Cirurgia Cabeça e Pescoço" type="checkbox" id="CirurgiaCabeçaEPescoço">
                                    <label class="form-check-label" for="CirurgiaCabeçaEPescoço">Cirurgia Cabeça e Pescoço</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Cirurgia Cardíaca" type="checkbox" id="CirurgiaCardiaca">
                                    <label class="form-check-label" for="CirurgiaCardiaca">Cirurgia Cardíaca</label>
                                </div>
                            </div>
                        </div>
                        <div id="centralizarCheckboxOpcoes" class="form-group row">
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Cirurgia Geral" type="checkbox" id="CirurgiaGeral">
                                    <label class="form-check-label" for="CirurgiaGeral">Cirurgia Geral</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Cirurgia Pediátrica" type="checkbox" id="CirurgiaPediatrica">
                                    <label class="form-check-label" for="CirurgiaPediatrica">Cirurgia Pediátrica</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Cirurgia Plástica" type="checkbox" id="CirurgiaPlastica">
                                    <label class="form-check-label" for="CirurgiaPlastica">Cirurgia Plástica</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Cirurgia Torácica" type="checkbox" id="CirurgiaToracica">
                                    <label class="form-check-label" for="CirurgiaToracica">Cirurgia Torácica</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Cirurgia Vascular" type="checkbox" id="CirurgiaVascular">
                                    <label class="form-check-label" for="CirurgiaVascular">Cirurgia Vascular</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" name="especialidade" value="Clínica Médica" type="checkbox" id="ClinicaMedica">
                                    <label class="form-check-label" for="ClinicaMedica">Clínica Médica</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-success" id="btnSalvar">Salvar</button>
                    </div>
                </form>
            </div>
            </div>
            </div>

            <!-- modal de visualização da pesquisa -->
            <div class="modal fade" id="modalPesquisaMedico" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="informacoesPesquisa" class="modal-body">
                        
                    
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- jQuery e Ajax, Popper.js, Bootstrap JS e Script -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.js" integrity="sha512-0XDfGxFliYJPFrideYOoxdgNIvrwGTLnmK20xZbCAvPfLGQMzHUsaqZK8ZoH+luXGRxTrS46+Aq400nCnAT0/w==" crossorigin="anonymous"></script>
        <script src="js/script.js"></script>           
    </body>
</html>