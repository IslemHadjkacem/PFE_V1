<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etat;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;


class EtatController extends Controller
{
    public function getEtat()
    {
        try {
            return response()->json(Etat::all(), 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
        public function getEtatById($id)
        {
            try {
                $etat = Etat::findOrFail($id);
                return response()->json(['message' => "etat", 'data' => $etat, 'status' => 'success']);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
    
    
        public function addEtat(Request $request)
        {
    
            try {
                $validator = Validator::make($request->all(), [
                    'id' => [
                        'required',
                        'integer',
                        function ($attribute, $value, $fail) use ($request) {
                            $etat = Etat::where('id', $request['id'])->first();
                            if ($etat) {
                                $fail("id Already Exists");
                            }
                        }
                    ],
                    'id_niveau' => 'required',

                    'nom_etat' => 'required',
                    'parDefaut' => 'nullable|boolean',
                ]);
                if ($validator->fails()) {
                    return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
                }
                $data = $validator->validated();
                $etatData = Etat::create($data);
                return response()->json(['message' => "etat Added", 'data' => $etatData, 'status' => 'success'], 201);
    
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
    


                
    //     public function updateEtat(Request $request, $id)
    //     {
    //         try {
    //         $etat = Etat::findOrFail($id);

    //         $validator = Validator::make($request->all(), [
    //             'id' => 'required|integer',
    //             'nom_etat' => 'required|string'
        
    //         ]);

    //         if ($validator->fails()) {
    //             return response()->json(['status' => 'error', 'message' => $validator->errors()], 400);
    //         }

    //         $etat->update($validator->validated());

    //         return response()->json(['message' => 'Etat modifié avec succès', 'data' => $niveau, 'status' => 'success']);
    //     } catch (\Exception $e) {
    //         return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
    //     }
    // }



    public function updateEtat(Request $request, $id)
    {
        try {
            $etat = Etat::findOrFail($id);
    
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer',
                'nom_etat' => 'required|string',
                'parDefaut' => 'nullable|boolean',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['status' => 'error', 'message' => $validator->errors()], 400);
            }
    
            $etat->update($validator->validated());
    
            return response()->json(['message' => 'Etat modifié avec succès', 'data' => $etat, 'status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }
    

        public function deleteEtat(Request $request, $id)
        {
            try {
                $etat = Etat::findOrFail($id);
                $etat->delete();
                return response()->json(['message' => "etat supprime", 'data' => $etat, 'status' => 'success']);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
    
        public function getEtatByClassedoc($niveau)
        {
            try {
    
                
              return  $etat = Etat::where('id_niveau', $niveau)->get();
    
            } catch (\Exception $e) {
              
                \Log::error('Erreur dans le contrôleur EtatController : ' . $e->getMessage());
                return response()->json(['message' => 'Erreur interne du serveur.'], 500);
            }
        }
}
