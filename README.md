# SistemaMedico
<h1>Instruções de Instalação</h1>
<hr>
1- Coloque a pasta "view_medico" no htdocs do XAMPP ou no WWW do WAMP, e abra como localhost/view_medico<br>
2- Deixe as portas 80 (Apache) e 3306 (MySql) do servidor reservadas<br>
3- Import o banco de dados para uma ferramenta com suporte MySql<br>
4- Start o servidor do Laravel (php artisan serve), geralmente o link fica assim: http://127.0.0.1:8000/api/medicos, (só adicione o /api/medicos para ter acesso ao JSon)<br>
5- Para cadastrar/editar/alterar/excluir um novo médico você poderá usar tanto a interface como um programa para request (utilizei o Insomnia por exemplo)<br>
6- Utilizei o Visual Studio Code como ambiente de desenvolvimento, phpMyAdmin como banco (MySql) e servidor XAMPP

<h1>Testes</h1>
1- Realizei dois testes unitários, um para verificar os campos disponibilizados pela Modal e outro para testar o GET de todos os médicos<br>
Entrada: php artisan test<br>
Saída:<br>
   PASS  Tests\Unit\ApiTest<br>
  ✓ listar tudo medico  <br>   
  ✓ verificar medico  <br>     
<br>
  Tests:  2 passed<br>
  Time:   0.28s<br>


