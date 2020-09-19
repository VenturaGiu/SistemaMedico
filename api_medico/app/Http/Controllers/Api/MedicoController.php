<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Medico;

class MedicoController extends Controller
{
    //retorna todos os médicos
    public function listar(){
        return Medico::all();
    } 
    //retorna o médico de um id específico
    
    /**  
     * @param string $crm
     * 
     * 
       */
    public function listarId(Request $request, $crm){
        $medico = Medico::Where('crm', $crm)->first();
        // return $crm;
        return $medico;
    }

    public function add(Request $request){
        try {
            $MedicoData = $request->all();
            Medico::create($MedicoData);
            return response()->json(['msg' => 'Médico cadastrado com sucesso!'], 201);
        } catch (\Exception $e) {
            return $e;
        }
    } 

    /**  
     * @param string $crm
     * 
     * 
       */
    public function update(Request $request, $crm){
        try {
            $MedicoData = $request->all();
            $medico = Medico::Where('crm', $crm)->first();
            $medico->update($MedicoData);
            return response()->json(['msg' => 'Dados atualizados com sucesso!'], 201);
        } catch (\Exception $e) {
            return $e;
        }
    } 

    /**  
     * @param string $crm
     * 
     * 
       */
    public function delete(Request $request, $crm){
        try {
            $medico = Medico::Where('crm', $crm)->first();
            $medico->delete();
            return response()->json(['msg' => 'Produto médico deletado com sucesso!'], 201);
        } catch (\Exception $e) {
            return $e;
        }
    } 
}