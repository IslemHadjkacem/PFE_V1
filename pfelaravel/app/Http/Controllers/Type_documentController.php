<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type_document;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class Type_documentController extends Controller
{
   
    public function getType_document()
{
    try {
        return response()->json(Type_document::all(), 200);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    }
}



    public function getType_documentById($id)
{
    try {
        $type_document = Type_document::findOrFail($id);
        return response()->json(['data' => $type_document, 'status' => 'success']);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
    }
}

  
    public function addType_document(Request $request)
{
    try {
        $validator = Validator::make($request->all(), [
            'id' => 'nullable|integer',
            'form' => 'required|string',
            'nom_type_document' => 'required|string',
            'description' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }

        $type_documentData = Type_document::create($validator->validated());

        return response()->json(['message' => "type_document ajoutee", 'data' => $type_documentData, 'status' => 'success'], 201);
    } catch (\Exception $e) {
        \Log::error('Error in addType_document: ' . $e->getMessage());
        \Log::error('Request data: ' . json_encode($request->all()));

        return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    }
}

public function updateType_document(Request $request, $id)
{
    try {
        
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer' ,
            'form' => 'required|integer',
            'nom_type_document' => 'required|string',
            'description' => 'required|string',
            
        ]);

       
        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], 400);
        }
        
        $type_document = Type_document::findOrFail($id);
        $type_document->update($request->all());

        return response()->json(['message' => 'Type_document modifié avec succès', 'data' => $type_document, 'status' => 'success']);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
    }
}

    public function deleteType_document(Request $request, $id)
    {
        try {
            $type_document = Type_document::findOrFail($id);
            $type_document->delete();
            return response()->json(['message' => "type_document supprime", 'data' => $type_document, 'status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function store(Request $request)
{
    try {
        $type_document = new Type_document();
        $type_document->form = $request->input('form');
        $type_document->nom_type_document = $request->input('nom_type_document');
        $type_document->description = $request->input('description');

        $type_document->save();

        return response()->json(['message' => 'Type_document ajouté avec succès', 'data' => $type_document, 'status' => 'success'], 201);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
    }
}

   
} 


