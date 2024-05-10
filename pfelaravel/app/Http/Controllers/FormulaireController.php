<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formulaire;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
class FormulaireController extends Controller

    {
        
         
        //  public function updateformulaire(Request $request, $id)
        //  {
        //      try {
        //      $formulaire = Formulaire::findOrFail($id);
 
        //      $validator = Validator::make($request->all(), [
        //         'id' => 'required|integer',
        //          'titre' => 'required|string',
        //          'donnees' => 'nullable|json',
        //      ]);
 
        //      if ($validator->fails()) {
        //          return response()->json(['status' => 'error', 'message' => $validator->errors()], 400);
        //      }
 
        //      $formulaire->update($validator->validated());
 
        //      return response()->json(['message' => 'formulaire modifié avec succès', 'data' => $formulaire, 'status' => 'success']);
        //      } catch (\Exception $e) {
        //        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        //      }
        //  }
       
    
        public function show($id)
        {
            return Formulaire::findOrFail($id);
        }
   
        public function getFormSchema($id)
        {
            $formulaire = Formulaire::findOrFail($id);
        //    return ( $formulaire->donnees);
            return response()->json($formulaire->donnees);
        }
         

        public function getFormulaire()
        {
            try {
                return response()->json(Formulaire::all(), 200);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
            }
        }
//         public function addform(Request $request)
// {
//     try {
//         $validator = Validator::make($request->all(), [
//             'id' => 'nullable|integer',
//             'firstName' => 'required|string',
//             'lastName' => 'required|string',
//             'message' => 'required|string',
//             'titre' =>'required|string',
          
//         ]);

//         if ($validator->fails()) {
//             return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
//         }

//         $formulaireData = Formulaire::create($validator->validated());

//         return response()->json(['message' => "type_document ajoutee", 'data' => $formulaireData, 'status' => 'success'], 201);
//     } catch (\Exception $e) {
//         \Log::error('Error in addform: ' . $e->getMessage());
//         \Log::error('Request data: ' . json_encode($request->all()));

//         return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
//     }
// }



/**
         * Store a newly created resource in storage.
         */
        
        //  public function addFormulaire(Request $request)
        //  {
     
        //      try {
        //          $validator = Validator::make($request->all(), [
        //              'id' => [
        //                  'required',
        //                  'integer',
        //                  function ($attribute, $value, $fail) use ($request) {
        //                      $formulaire = Formulaire::where('id', $request['id'])->first();
        //                      if ($formulaire) {
        //                          $fail("id Already Exists");
        //                      }
        //                  }
        //              ],
        //               'type_document' => 'required',
        //              'nom' => 'required|string',
        //              'parDefaut' => 'nullable|boolean',
                    
        //          ]);
        //          if ($validator->fails()) {
        //              return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        //          }
        //          $data = $validator->validated();
        //          $formulaireData = Formulaire::create($data);
        //          return response()->json(['message' => "niveau Added", 'data' => $formulaireData, 'status' => 'success'], 201);
     
        //      } catch (\Exception $e) {
        //          return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        //      }
        //  }
 // public function store(Request $request)
        // {
        //     $request->validate([
        //         'titre' => 'required|string',
        //         'donnees' => 'required|array',
        //     ]);
           
        //     $formulaire = new Formulaire();
        //     $formulaire->titre = $request->titre;
        //     $formulaire->donnees = json_encode($request->donnees);
        //     $formulaire->save();
    
        //     return response()->json($formulaire, 201);
        // }
    
        // public function getFormSchema($id)
        // {
        //     $formulaire = Formulaire::findOrFail($id);
        //     return response()->json($formulaire->donnees);
        // }
    //     public function save(Request $request)
    //     {
    //     $validator = Validator::make($request->all(), [
    //         'titre' => 'required|string',
    //         'donnees' => 'required|array',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['error' => $validator->errors()], 400);
    //     }

    //     try {
    //         $formulaire = new Formulaire();
    //         $formulaire->titre = $request->titre;
    //         $formulaire->donnees = json_encode($request->donnees);
    //         $formulaire->save();

    //         return response()->json($formulaire, 201);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'titre' => 'required|string',
    //         'donnees' => 'required|array',
    //     ]);

    //     try {
    //         $formulaire = Formulaire::findOrFail($id);
    //         $formulaire->titre = $request->titre;
    //         $formulaire->donnees = json_encode($request->donnees);
    //         $formulaire->save();

    //         return response()->json($formulaire, 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    //     }
    // }

//     public function addFormulaire(Request $request)
// {
//     $request->validate([
//         //'id'=>'required',
//        'titre' => 'required|string',
//         'donnees' => 'required|array',
//     ]);
    
//     $formulaire = new Formulaire();
//     $formulaire->titre = $request->titre;
//     $formulaire->donnees = json_encode($request->donnees);
//     $formulaire->type_document = 1; // Définir l'id de type document à 1
//     $formulaire->save();

//     return response()->json($formulaire, 201);
// }

    // public function addFormulaire(Request $request)
    // {
    //     $request->validate([
    //         'titre' => 'required|string',
    //         'donnees' => 'required|array',
    //     ]);

    //     $formulaire = new Formulaire();
    //     $formulaire->titre = $request->titre;
    //     $formulaire->donnees = json_encode($request->donnees);
    //     $formulaire->save();

    //     return response()->json($formulaire, 201);
    // }

    // public function saveFormData(Request $request)
    // {
    //     try {
    //         // Créez un nouveau document avec les données du formulaire
    //         $document = new Document();
    //         $document->donnees = json_encode($request->all()); // Assurez-vous que votre champ "donnees" est de type JSON
    //         $document->save();
            
    //         return response()->json(['message' => 'Données du formulaire sauvegardées avec succès !'], 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Erreur lors de la sauvegarde des données du formulaire.'], 500);
    //     }
    // }
    }