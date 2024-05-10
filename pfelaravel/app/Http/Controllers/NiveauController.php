<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Niveau;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class NiveauController extends Controller
{
        public function getNiveau()
        {
            try {
                return response()->json(Niveau::all(), 200);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
    
        public function getNiveauById($id)
        {
            try {
                $niveau = Niveau::findOrFail($id);
                return response()->json(['message' => "niveau", 'data' => $niveau, 'status' => 'success']);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
    
    
        public function addNiveau(Request $request)
        {
    
            try {
                $validator = Validator::make($request->all(), [
                    'id' => [
                        'required',
                        'integer',
                        function ($attribute, $value, $fail) use ($request) {
                            $niveau = Niveau::where('id', $request['id'])->first();
                            if ($niveau) {
                                $fail("id Already Exists");
                            }
                        }
                    ],
                     'type_document' => 'required',
                    'nom' => 'required|string',
                    'parDefaut' => 'nullable|boolean',
                   
                ]);
                if ($validator->fails()) {
                    return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
                }
                $data = $validator->validated();
                $niveauData = Niveau::create($data);
                return response()->json(['message' => "niveau Added", 'data' => $niveauData, 'status' => 'success'], 201);
    
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
        
        public function updateNiveau(Request $request, $id)
        {
            try {
            $niveau = Niveau::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'id' => 'required|integer',
                'nom' => 'required|string',
                'parDefaut' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => 'error', 'message' => $validator->errors()], 400);
            }

            $niveau->update($validator->validated());

            return response()->json(['message' => 'Niveau modifié avec succès', 'data' => $niveau, 'status' => 'success']);
            } catch (\Exception $e) {
              return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
            }
        }
        public function deleteNiveau(Request $request, $id)
        {
            try {
                $niveau = Niveau::findOrFail($id);
                $niveau->delete();
                return response()->json(['message' => "niveau supprime", 'data' => $niveau, 'status' => 'success']);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
        public function store(Request $request)
        {
            try {
    
                $niveau = new Niveau();
                $niveau->niveau = json_encode($request->input('niveau'));
    
                $niveau->save();
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Une erreur est survenue lors de l\'etat.');
            }
        }

        //  public function getNiveauByClassedoc($type_document)
        // {
        //     try {

                
        //     return  $niveau = Niveau::where('type_document', $type_document)->get();

        //     } catch (\Exception $e) {
            
        //         \Log::error('Erreur dans le contrôleur NiveauController : ' . $e->getMessage());
        //         return response()->json(['message' => 'Erreur interne du serveur.'], 500);
        //     }
        // }


public function getNiveauByClassedoc($type_document)
{
    try {
        // Effectuez une jointure entre les tables niveau et type_document
        $niveaux = Niveau::where('type_document', $type_document)
                         ->join('type_document', 'niveau.type_document', '=', 'type_document.id')
                         ->select('niveau.*', 'type_document.nom_type_document as type_document')
                         ->get();

        return response()->json($niveaux, 200);
    } catch (\Exception $e) {
        \Log::error('Erreur dans le contrôleur NiveauController : ' . $e->getMessage());
        return response()->json(['message' => 'Erreur interne du serveur.'], 500);
    }
}






}

