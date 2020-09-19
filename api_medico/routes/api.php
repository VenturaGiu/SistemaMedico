<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MedicoController;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::namespace('Api')->name('api.')->group(function(){
    //Rota para listar todos os médicos
    Route::get('/medicos', [MedicoController::class, 'listar'])->name('medicos');
    //Rota para listar apenas os médicos de determinado id
    Route::get('/medicos/{crm}', [MedicoController::class, 'listarId'])->name('id_medico');
    //Rota para add um médico
    Route::post('/medicos', [MedicoController::class, 'add'])->name('add_medico');
    //Rota para Update pelo id
    Route::put('/medicos/{crm}', [MedicoController::class, 'update'])->name('update_medico');
    //Rota para deletar 
    Route::delete('/medicos/{crm}', [MedicoController::class, 'delete'])->name('delete_medico');
});