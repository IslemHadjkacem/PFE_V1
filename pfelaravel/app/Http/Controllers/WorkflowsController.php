<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WorkflowsController extends Controller
{
   
    public function store(Request $request)
    {
        $workflow = Workflow::create([
            'id_niveau' => $request->input('id_niveau'),
            'id_etat' => $request->input('id_etat'),
            'id_doc' => $request->input('id_doc'),
            'message' => 'required|string',
        ]);

        return response()->json(['message' => 'Workflow créé avec succès', 'data' => $workflow], 201);
    }

    ///changerrr niveauuu(update)
    ////changer etatttt






    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'id_niveau' => 'required',
    //         'id_etat' => 'required',
    //         'id_doc' => 'required',
    //         'status' => 'required',
    //         'message' => 'required|string',
    //     ]);
    
    //     if ($validator->fails()) {
    //         return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
    //     }
    
    //     try {
    //         $workflow = Workflow::create([
    //             'id_niveau' => $request->input('id_niveau'),
    //             'id_etat' => $request->input('id_etat'),
    //             'id_doc' => $request->input('id_doc'),
    //             'status' => $request->input('status'),
    //             'message' => $request->input('message'),
    //         ]);
    
    //         return response()->json(['message' => 'Workflow créé avec succès', 'data' => $workflow], 201);
    //     } catch (\Exception $e) {
    //         return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    //     }
    // }
    
    // Vous pouvez ajouter d'autres méthodes comme update, delete, etc., selon vos besoins
}
