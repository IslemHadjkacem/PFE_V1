// import { Component, OnInit } from '@angular/core';
import { Component, OnInit,Input, SimpleChanges, OnChanges } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TypeDocService } from 'src/app/shared/services/type-doc.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FormulaireService } from 'src/app/shared/services/formulaire.service';
import { DocumentService } from 'src/app/shared/services/document.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TypeDoc } from 'src/app/shared/models/typeDocument.model';
import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { FormDynamicComponent } from '../form-dynamic/form-dynamic.component';
import { Formulaire } from 'src/app/shared/models/formulaires';
import { WorkflowsComponent } from '../workflows/workflows.component';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  providers: [MessageService, ConfirmationService ,DialogService,DocumentService],

  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  @Input() typeDocSelected;
  @Input() utilisateurSelected;
  documents: any;
  id: any;
  utilisateurs: any[] = [];
  utilisateurNiveau = [];
  header = ''
  documentform: FormGroup;
  operation: 'add' | 'Update' | 'consult' = null
  document: any;
  cols: any[];
  selectedformulaire: [];
  documentDialog = false;
  deletedocumentDialog = false;
  deletedocumentsDialog = false;
  type_document:TypeDoc[] =[];
  utilisateur:Utilisateur[] =[];
  idForm
  
  constructor(private route: ActivatedRoute, 
    private TypeDocservice: TypeDocService, 
    private documentService:DocumentService,
    private formBuilder: FormBuilder,
    private utilisateurService :UtilisateurService,
    private router: Router,
    public dialogService: DialogService,
    public messageService:MessageService,) { 
      this.documentform = this.formBuilder.group({
        id: [''],
        type_document: ['', Validators.required],
        utilisateur: ['', Validators.required],
        donnees: ['', Validators.required],
      });
    }
    ngOnInit(): void {
      this.route.params.subscribe(params => {
          const id = params['id']; 
          this.idForm=id
          console.log(this.idForm);
          // this.idDocument
          this.getType_documentById();
          this.getTypeByClassedoc(id);
          this.idForm=id
          console.log(this.idForm)
          // Vérifiez si l'utilisateur sélectionné existe avant de le passer à la méthode
          if (this.utilisateurSelected) {
              this.getutilisateur(this.utilisateurSelected.id);
          }
      });

  }
  

  openDialog(document): void {
    this.dialogService.open(WorkflowsComponent, {
        header: 'workflows',
        width: '550px',
        height:   '580px',
        data:{document:document},
    });
}
  opendocumentDialog(data){
    console.log(data.donnees)
    console.log(this.idForm)
    this.ref = this.dialogService.open(FormDynamicComponent, {
     // header: 'Ajouter un document',
      width: '60%',
      contentStyle: { "max-height": "800px", 
      "overflow": "auto" },
      data:{formId:this.idForm,
        idDocument:data.id,
        editData:data.donnees}
    });
    
    //this.ref.onClose(()=>{this.getType_documentById()})
    this.ref.onClose.subscribe((result) => {
      console.log('Dialogue fermé avec le résultat :', result);

      this.getType_documentById();
    });
  }
  addDocument(formdata: any) {
    this.documentService.save(formdata,this.idForm).subscribe(
      (response) => {
        console.log('Document ajouté avec succès !', response);
        // Traitez la réponse ou redirigez l'utilisateur si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du document :', error);
        // Gérez l'erreur
      }
    );
  }





// addDocument(formdata: any) {
//   this.documentService.save(formdata, this.idForm).subscribe(
//     (documentResponse) => {
//       console.log('Document ajouté avec succès !', documentResponse);

//       // Maintenant que le document est ajouté avec succès,
//       // vous pouvez appeler la méthode pour ajouter au workflow
//       const workflowData = {
//         documentId: documentResponse.data.id, // Utilisez l'ID du document nouvellement ajouté
//         // Ajoutez d'autres données de workflow si nécessaire
//       };

//       this.workflowsService.add(workflowData).subscribe(
//         (workflowResponse) => {
//           console.log('Workflow ajouté avec succès !', workflowResponse);
//           // Traitez la réponse ou redirigez l'utilisateur si nécessaire
//         },
//         (workflowError) => {
//           console.error('Erreur lors de l\'ajout du workflow :', workflowError);
//           // Gérez l'erreur
//         }
//       );
//     },
//     (documentError) => {
//       console.error('Erreur lors de l\'ajout du document :', documentError);
//       // Gérez l'erreur
//     }
//   );
// }



  updateDocument(idDocument: number, formdata: any) {
    this.documentService.update(idDocument, formdata).subscribe(
      (response) => {
        console.log('Document mis à jour avec succès !', response);
        // Traitez la réponse ou redirigez l'utilisateur si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du document :', error);
        // Gérez l'erreur
      }
    );
  }
  
  getType_documentById(): void {
      this.TypeDocservice.getType_documentById(this.idForm).subscribe(type_document => {
      this.type_document = type_document.id;
    //  this.idForm=type_document.form
    });
    
}
openDynamicForm() {
  console.log(this.idForm)
  this.ref = this.dialogService.open(FormDynamicComponent, {
    //header: 'Ajouter un document',
    width: '60%',
    contentStyle: { "max-height": "800px", "overflow": "auto" },
    data:{formId:this.idForm}
  });
}


getuserByid(iduser:number):void{
  this.utilisateurService.getUtilisateurById(iduser).subscribe(utilisateur => {
    this.utilisateur = utilisateur.id;
  });
}
ngOnChanges(changes: SimpleChanges): void {
  if(changes['typeDocSelected'])
  console.log(this.typeDocSelected)
   // this.getTypeByClassedoc();
    this.documentform.patchValue({type_document:this.typeDocSelected?.id});
    if (changes['utilisateurSelected']) {
      console.log('Utilisateur sélectionné :', this.utilisateurSelected);
      // this.getTypeByClassedoc();
      this.documentform.patchValue({ utilisateur: this.utilisateurSelected?.id });
    }

}



getTypeByClassedoc(idTypeDoc) {
  this.documentService.getTypeByClassedoc(idTypeDoc).subscribe(
    (data: any) => {
      console.log('Données récupérées:', data);
      // Ajoutez le code ici pour afficher les ID des utilisateurs
      data.forEach((document: any) => {
        console.log('ID de l\'utilisateur:', document.utilisateur);
      });
      this.documents = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération des données:', error);
    }
  );
}
getutilisateur(iduser: number){
  this.utilisateurService.getUtilisateurById(iduser).subscribe(
    (utilisateurs: any) => {
      this.utilisateurs = utilisateurs.data;
      console.log(this.utilisateurs)
    },
    (error) => {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
  );
}

deleteData(idDocument: any) {
  this.documentService.deleteData(idDocument).subscribe(
    response => {
      console.log('Document supprimé avec succès !', response);
      // Traitez la réponse ou redirigez l'utilisateur si nécessaire
      this.getdocuments(); // Met à jour la liste des documents après la suppression
    },
    error => {
      console.error('Erreur lors de la suppression du document :', error);
      // Gérez l'erreur
    }
  );
}

  getdocuments() {
   
      console.log('Liste des documents');
      this.documentService.getdocuments().subscribe((res: any) => {
        console.log(res);
        this.documents = res;
      });
    
  }





}
