<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\Niveau;
use App\Models\Etat;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
class DocumentController extends Controller
{
       
public function getTypeByClassedoc($type_document)
{
    try {
        
        $Documents = Document::where('type_document', $type_document)
                         ->leftjoin('type_document', 'document.type_document', '=', 'type_document.id')
                         ->select('document.*', 'type_document.nom_type_document as type_document')
                         ->get();

        return response()->json($Documents, 200);
    } catch (\Exception $e) {
        \Log::error('Erreur dans le contrôleur DocumentController : ' . $e->getMessage());
        return response()->json(['message' => 'Erreur interne du serveur.'], 500);
    }
}


public function getutilisateur($utilisateur)
{
    try {
        $documents = Document::where('utilisateur', $utilisateur)
            ->leftJoin('utilisateur', 'document.utilisateur', '=', 'utilisateur.id')
            ->select('document.*', 'utilisateur.nom as utilisateur') 
            ->get();

        return response()->json($documents, 200);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    }
}

public function getUtilisateurByDocumentId($documentId)
{
    try {
        // Récupérer le document par son ID
        $document = Document::findOrFail($documentId);
        
        // Récupérer l'utilisateur associé au document
        $utilisateur = $document->utilisateur;

        return response()->json($utilisateur);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Utilisateur non trouvé pour ce document.'], 404);
    }
}


public function getdocuments()
{
    try {
        return response()->json(Document::all(), 200);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    }
}

public function getdocumentById($id)
{
    try {
        $document = Document::findOrFail($id);
        return response()->json(['message' => "document", 'data' => $document, 'status' => 'success']);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    }
}


// public function add(Request $request)
// {
//     $validator = Validator::make($request->all(), [
//         'id' => [
//             'required',
//             'integer',
//             function ($attribute, $value, $fail) use ($request) {
//                 $document = Document::where('id', $request['id'])->first();
//                 if ($document) {
//                     $fail("ID existe déjà.");
//                 }
//             }
//         ],
//         'type_document' => 'required',
//         'utilisateur' => 'required|string',
//         'donnees' => 'required|string',
//     ]);

//     if ($validator->fails()) {
//         return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
//     }

//     try {
//         $data = $validator->validated();
//         $documentData = Document::create($data);
//         return response()->json(['message' => "Document ajouté", 'data' => $documentData, 'status' => 'success'], 201);
//     } catch (\Exception $e) {
//         return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
//     }
// }




// //déclare une propriété $WorkflowsController 
// //qui sera utilisée pour stocker une instance de la classe WorkflowsController.
// protected $WorkflowsController;

// // le constructeur de la classe DocumentController. Il reçoit en paramètre une instance
// // de la classe WorkflowsController et la stocke dans la propriété $WorkflowsController.
// public function __construct(WorkflowsController $WorkflowsController)
// {
//     $this->WorkflowsController = $WorkflowsController;
// }

public function add($typeDoc,Request $request ,  WorkflowsController $workflowsController)
{
    $validator = Validator::make($request->all(), [
        'type_document' => 'required', // Champ type_document requis
        'utilisateur' => 'required', // Champ utilisateur requis
        'donnees' => 'required', // Champ données requis
        // Ajoutez d'autres règles de validation au besoin
    ]);

    // if ($validator->fails()) {
    //     return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
    // }

    try {
        $id_niveau_defaut = Niveau::where('type_document', $typeDoc)->value('id');

        if (!$id_niveau_defaut) {
            throw new \Exception("Niveau par défaut introuvable pour le type de document sélectionné.");
        }

        // Récupérer l'état par défaut pour le niveau par défaut
        $id_etat_defaut = Etat::where('niveau_id', $id_niveau_defaut)->where('par_defaut', true)->value('id');

        if (!$id_etat_defaut) {
            throw new \Exception("État par défaut introuvable pour le niveau par défaut.");
        }
        // Créer un nouvel objet Document et définir le champ 'donnees'
        $document = new Document();
        $document->type_document =$typeDoc;


        // Ajouter les champs id_niveau, id_etat et id_doc s'ils sont présents dans la requête
        $document->id_niveau = $request->input('id_niveau');
        $document->id_etat = $request->input('id_etat');
        $document->id_doc = $request->input('id_doc');
        // $document->utilisateur =$utilisateur;


         // Vérifier si les champs id_niveau_defaut et id_etat_defaut sont présents dans la requête
         if ($request->has('id_niveau_defaut')) {
            $document->id_niveau = $request->input('id_niveau_defaut');
        }

        if ($request->has('id_etat_defaut')) {
            $document->id_etat = $request->input('id_etat_defaut');
        }


        $document->donnees = json_encode($request->all()); // Convertir les données en JSON si nécessaire
        $document->save();

        $workflowResponse = $workflowsController->store($request);
        // Appeler la méthode store du WorkflowsController
        // $this->WorkflowsController->store($request);

        return response()->json(['message' => 'Document ajouté avec succès', 'data' => ['document' => $document, 
        'workflow' => $workflowResponse['data']], 'status' => 'success'], 201);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    }
}


// public function update(Request $request, $id,$typeDoc)
// {
//     // $validator = Validator::make($request->all(), [
//     //     // 'utilisateur' => 'required|string',
//     //     'donnees' => 'required|string',
//     // ]);

//     if ($validator->fails()) {
//         return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
//     }

//     try {
//         $document = Document::findOrFail($id);
//         $document->type_document =$typeDoc;
//         $document->donnees = json_encode($request->all()); // Convertir les données en JSON si nécessaire
//         $document->save();

//         $document->update($validator->validated());
//         return response()->json(['message' => 'Document modifié avec succès', 'data' => $document, 'status' => 'success']);
//     } catch (\Exception $e) {
//         return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
//     }
// }
public function update(Request $request, $idDocument)
{
    $validator = Validator::make($request->all(), [
       
    ]);

    if ($validator->fails()) {
        return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
    }
    try {
        $document = Document::findOrFail($idDocument);
       // $document->type_document = $typeDoc;
        $document->donnees = json_encode($request->all()); // Convertir les données en JSON si nécessaire
        $document->save();

        return response()->json(['message' => 'Document modifié avec succès', 'data' => $document, 'status' => 'success']);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    }
}



public function deletedocument(Request $request, $idDocument)
{
    try {
        $document = Document::findOrFail($idDocument);
        $document->delete();
        return response()->json(['message' => "document supprime", 'data' => $document, 'status' => 'success']);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    }
}
// public function store(Request $request)
// {
//     try {

//         $document = new Document();
//         $document->document = json_encode($request->input('document'));

//         $document->save();
//     } catch (\Exception $e) {
//         return redirect()->back()->with('error', 'Une erreur est survenue lors de l\'etat.');
//     }
// }


// public function updatedocument(Request $request, $id)
// {
//     try {
//     $document = Document::findOrFail($id);

//     $validator = Validator::make($request->all(), [
//         'id' => 'required|integer',
//         'utilisateur' => 'required|string'
//     ]);

//     if ($validator->fails()) {
//         return response()->json(['status' => 'error', 'message' => $validator->errors()], 400);
//     }

//     $document->update($validator->validated());

//     return response()->json(['message' => 'document modifié avec succès', 'data' => $document, 'status' => 'success']);
//     } catch (\Exception $e) {
//       return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
//     }
// }
}









// public function getutilisateur($type_document)
// {
//     try {
//         return response()->json(Document::where('type_document','=',$type_document)->select('utilisateur.*')
//         ->leftjoin('utilisateur','utilisateur.id','=','document.utilisateur')->get(), 200);
//     } catch (\Exception $e) {
//         return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
//     }
// }
    //    public function  getTypeByClassedoc($type_document)
    //     {
    //         try {

                
    //         return  $formulaire = Formulaire::where('type_document', $type_document)->get();

    //         } catch (\Exception $e) {
            
    //             \Log::error('Erreur dans le contrôleur NiveauController : ' . $e->getMessage());
    //             return response()->json(['message' => 'Erreur interne du serveur.'], 500);
    //         }
    //     }







// }
// public function save(Request $request)
// {
// $validator = Validator::make($request->all(), [
//     'titre' => 'required|string',
//     'donnees' => 'required|array',
// ]);

// if ($validator->fails()) {
//     return response()->json(['error' => $validator->errors()], 400);
// }

// try {
//     $formulaire = new Formulaire();
//     $formulaire->titre = $request->titre;
//     $formulaire->donnees = json_encode($request->donnees);
//     $formulaire->save();

//     return response()->json($formulaire, 201);
// } catch (\Exception $e) {
//     return response()->json(['error' => $e->getMessage()], 500);
// }
// }