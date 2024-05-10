<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Approbateur;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;


class ApprobateurController extends Controller
{
    public function getAllApprobateurs()
    {
        try {
            $approbateurs = Approbateur::all();
            return response()->json(['message' => "Liste de tous les utilisateurs", 'data' => $approbateurs, 'status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

         public function getApprobateur($idNiveau)
        {
            try {
                return response()->json(Approbateur::where('id_niveau','=',$idNiveau)->select('utilisateur.*')
                ->leftjoin('utilisateur','utilisateur.id','=','approbateur.utilisateur')->get(), 200);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
        
        public function getApprobateurById($id)
        {
            try {
                $approbateur =Approbateur::findOrFail($id);
                return response()->json(['message' => "approbateur", 'data' => $approbateur, 'status' => 'success']);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
    
    
        public function addApprobateur(Request $request)
        {
    
            try {
                $validator = Validator::make($request->all(), [
                    'id' => [
                        'required',
                        'integer',
                        function ($attribute, $value, $fail) use ($request) {
                            $approbateur = Approbateur::where('id', $request['id'])->first();
                            if ($approbateur) {
                                $fail("id Already Exists");
                            }
                        }
                    ],
                    'utilisateur' => 'required|string',
                   
                ]);
                if ($validator->fails()) {
                    return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
                }
                $data = $validator->validated();
                $approbateurData = Approbateur::create($data);
                return response()->json(['message' => "approbateur Added", 'data' => $approbateurData, 'status' => 'success'], 201);
    
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
    

    
        public function deleteApprobateur(Request $request, $id)
        {
            try {
                $approbateur = Approbateur::findOrFail($id);
                $approbateur->delete();
                return response()->json(['message' => "approbateur supprime", 'data' => $approbateur, 'status' => 'success']);
            } 
            catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
    
        public function updateApprobateur(Request $request, $idNiveau)
        {
            try {
                $validator = Validator::make($request->all(), [
                    'approbateurs' => 'required|array',
                    'approbateurs.*' => 'integer|exists:utilisateur,id', // Vérifie si chaque ID d'utilisateur existe
                ]);
        
                if ($validator->fails()) {
                    return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
                }
        
                $approbateurs = $request->input('approbateurs');
        
                // Supprimer les approbateurs existants liés à l'idNiveau
                Approbateur::where('id_niveau', $idNiveau)->delete();
        
                // Ajouter les nouveaux approbateurs
                foreach ($approbateurs as $approbateur) {
                    Approbateur::create([
                        'id_niveau' => $idNiveau,
                        'utilisateur' => $approbateur,
                    ]);
                }
        
                return response()->json(['message' => "Liste d'approbateurs mise à jour avec succès", 'status' => 'success']);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
        
    
        

}


