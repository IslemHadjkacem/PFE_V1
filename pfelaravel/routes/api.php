<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Type_documentController;
use App\Http\Controllers\NiveauController;
use App\Http\Controllers\EtatController;
use App\Http\Controllers\ApprobateurController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\Se_ConnecterController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FormulaireController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\WorkflowsController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'type_document'], function () {
    Route::get('getAll', [Type_documentController::class, 'getType_document']);
    Route::get('getById/{id}', [Type_documentController::class, 'getType_documentById']);
    Route::post('add', [Type_documentController::class, 'addType_document']);
    Route::put('update/{id}', [Type_documentController::class, 'updateType_document']);
    Route::delete('delete/{id}', [Type_documentController::class, 'deleteType_document']);

});


    Route::group(['prefix'=>'niveau'], function(){
    Route::get('getAll', [NiveauController::class, 'getNiveau']);
    Route::get('getById/{id}', [NiveauController::class, 'getNiveauById']);
    Route::post('add', [NiveauController::class, 'addNiveau']);
    Route::put('update_niveau/{id}', [NiveauController::class, 'updateNiveau']);
    Route::delete('delete/{id}', [NiveauController::class, 'deleteNiveau']);
    Route::get('/getNiveauByClassedoc/{type_document}', [NiveauController::class, 'getNiveauByClassedoc']);
    Route::get('getAll/{Type_Doc}', [NiveauController::class, 'getNomTypeDoc']);
});
Route::group(['prefix'=>'etat'], function(){
    Route::get('getAll', [EtatController::class, 'getEtat']);
    Route::get('getById/{id}', [EtatController::class, 'getEtatById']);
    Route::post('add', [EtatController::class, 'addEtat']);
    Route::put('update_etat/{id}', [EtatController::class, 'updateEtat']);
    Route::delete('delete/{id}', [EtatController::class, 'deleteEtat']);
    Route::get('/getEtatByClassedoc/{niveau}', [EtatController::class, 'getEtatByClassedoc']);
});

Route::group(['prefix'=>'approbateur'], function(){
    Route::get('getAll', [ApprobateurController::class, 'getAllApprobateurs']);
    Route::get('/utilisateurs', [ApprobateurController::class, 'getUtilisateurs']);
    Route::get('/utilisateur-niveau', [ApprobateurController::class, 'getUtilisateurNiveau']);
    Route::get('getAll/{idNiveau}', [ApprobateurController::class, 'getApprobateur']);
    Route::get('getById/{id}', [ApprobateurController::class, 'getApprobateurById']);
    Route::post('add', [ApprobateurController::class, 'addApprobateur']);
    Route::delete('delete/{id}', [ApprobateurController::class, 'deleteApprobateur']);
    Route::put('update/{idNiveau}', [ApprobateurController::class, 'updateApprobateur']);
});

Route::group(['prefix'=>'utilisateur'], function(){
    Route::get('getAll', [UtilisateurController::class, 'getUtilisateurs']);
    Route::get('getById/{id}', [UtilisateurController::class, 'getUtilisateurById']);
    Route::post('add', [UtilisateurController::class, 'addUtilisateur']);
    Route::put('update_utilisateur/{id}', [UtilisateurController::class, 'updateUtilisateur']);
    Route::delete('delete/{id}', [UtilisateurController::class, 'deleteUtilisateur']);
   
    Route::get('user', [UtilisateurController::class, 'user']);

    

    Route::put('update-password/{id}', [UtilisateurController::class, 'updatePass']);

});


Route::middleware('auth:sanctum')->group(function () {
   // Route::get('user', [UtilisateurController::class, 'user']);
   // Route::get('userinfo', UtilisateurController::class, 'userinfo');
    //Route::post('logout', [UtilisateurController::class, 'logout']);
});
Route::post('register', [UtilisateurController::class, 'register']);
Route::post('login', [UtilisateurController::class, 'login']);
Route::post('logout', [UtilisateurController::class, 'logout']);
Route::get('user', [UtilisateurController::class, 'user']);
Route::get('send-email/{email}', [EmailController::class, 'sendEmail']);


Route::group(['prefix' => 'formulaires'], function () {
    Route::get('getAll', [FormulaireController::class, 'getFormulaire']);
    Route::get('/{id}', [FormulaireController::class, 'show']);
    
    Route::get('/getSchema/{id}', [FormulaireController::class, 'getFormSchema']);
    
    Route::post('add', [FormulaireController::class, 'addFormulaire']);
    Route::put('update_form/{id}', [FormulaireController::class, 'updateformulaire']);
    // Route::post('addform', [FormulaireController::class, 'addform']);
//Route::post('/', [FormulaireController::class, 'addFormulaire']);
    //Route::put('update/{id}', [FormulaireController::class, 'update']); 
    //Route::post('/', [FormulaireController::class, 'save']);
   // Route::get('save', [FormulaireController::class, 'save']);
});


Route::group(['prefix'=>'document'], function(){
    Route::get('/getTypeByClassedoc/{type_document}', [DocumentController::class, 'getTypeByClassedoc']);
    Route::get('getAll', [DocumentController::class, 'getdocuments']);
    Route::get('getById/{id}', [DocumentController::class, 'getdocumentById']);
   
    Route::delete('delete/{idDocument}', [DocumentController::class, 'deletedocument']);
    Route::get('getutilisateur/{utilisateur}', [DocumentController::class, 'getutilisateur']);
    
    Route::post('add/{typeDoc}', [DocumentController::class, 'add']);
    // Route::post('add/{typeDoc}/{utilisateur}', [DocumentController::class, 'add']);

    
    Route::put('update/{idDocument}', [DocumentController::class, 'update']);
   
});

Route::group(['prefix'=>'workflows'], function(){

Route::post('/workflows', [WorkflowController::class, 'store']);


});












// Route::group(['prefix'=>'formulaire'], function(){
//     Route::get('/getTypeByClassedoc/{type_document}', [FormulaireController::class, 'getTypeByClassedoc']);
//     Route::get('getAll', [FormulaireController::class, 'getformulaire']);
//     Route::get('getById/{id}', [FormulaireController::class, 'getformulaireById']);
//     Route::post('add', [FormulaireController::class, 'addformulaire']);
//     Route::put('update_niveau/{id}', [FormulaireController::class, 'updateformulaire']);
//     Route::delete('delete/{id}', [FormulaireController::class, 'deleteformulaire']);
  
//     //Route::get('getAll/{Type_Doc}', [FormulaireController::class, 'getNomTypeDoc']);
// });


// Route::post('forgot',[Mot_de_passeController::class,'forgot']);
// Route::post('reset',[Mot_de_passeController::class,'reset']);





// Route::group(['prefix' => 'se_connecter'], function () {
//     Route::post('login', [Se_ConnecterController::class, 'login']);
    
    
// });
