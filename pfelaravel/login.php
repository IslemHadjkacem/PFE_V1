<?php
// include_once("database.php");

// // Récupération des données postées depuis le formulaire Angular
// $postdata = file_get_contents("php://input");


// if(isset($postdata) && !empty($postdata)) {
//     $request = json_decode($postdata);
//     $mot_de_passe = mysqli_real_escape_string($mysqli, trim($request->mot_de_passe));
//     $nom = mysqli_real_escape_string($mysqli, trim($request->nom));
//     $prenom = mysqli_real_escape_string($mysqli, trim($request->prenom));



//     $mot_de_passe = mysqli_real_escape_string($mysqli, trim($request->mot_de_passe));
//     $nom = mysqli_real_escape_string($mysqli, trim($request->nom));
//     $prenom = mysqli_real_escape_string($mysqli, trim($request->prenom));

//     // Requête SQL pour vérifier les informations d'identification
//     $sql = "SELECT * FROM utilisateur WHERE nom='$nom' AND prenom='$prenom' AND mot_de_passe='$mot_de_passe'";
//     $nums=mysqli_num_rows($result);
    // if($result = mysqli_query($mysqli, $sql)) {
    //     $rows = array();
    //     while($row = mysqli_fetch_assoc($result)) {
    //         $rows[] = $row;
    //     }

    //     echo json_encode($rows);
    // } else {
    //     http_response_code(404);
    // }
//     if($nums>0){
//         $data=array('message'=>'succès');
//         echo json_encode($data);
//     }
//     else{
//         $data=array('message'=>'erreur');
//         echo json_encode($data);
//     }
// }
?>
