
import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TypeDocService } from 'src/app/shared/services/type-doc.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeDoc } from 'src/app/shared/models/typeDocument.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-type-document',
  templateUrl: './type-document.component.html',
  providers: [MessageService, ConfirmationService, TypeDocService,DialogService],
  styleUrls: ['./type-document.component.scss']
})
export class TypeDocumentComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  @Output() typeDocSelected = new EventEmitter<any>()
  id: any;
  header = ''
  type_documentform!: FormGroup;

  operation: 'add' | 'Update' | 'consult' = null
  type_documents: any;
  type_document: any;
  cols: any[];
  selectedtype_document: TypeDoc[];
  type_documentDialog = false;
  deletetype_documentDialog = false;
  deletetype_documentsDialog = false;
  // selectedtype_documents: TypeDoc[];
  submitted: boolean;
  typedocData: any;
  selectedtype_documents: TypeDoc[] = []; 
  constructor(
    private formBuilder: FormBuilder,
    private TypeDocservice: TypeDocService,
    private ngzone: NgZone,
    private router: Router,
    public messageService: MessageService,
  
  ) {
    this.type_documentform = this.formBuilder.group({
      id: [''],
      form: ['', Validators.required],
      nom_type_document: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.gettype_documentData();
  }
  selectTypeDoc(type_document) {
    console.log(type_document)
    this.typeDocSelected.emit(type_document)
  }

  getType_documents() {
    this.TypeDocservice.getType_documentById(this.id).subscribe(
      (res: any) => {
        this.type_documentform.patchValue(res);
      },
      (error) => {
        this.messageService.add(
          { severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la récupération des données de type document', life: 3000 }
          );
          console.error('Erreur du côté client :', error);
      }
    );
  }
 
  updateType_document() {
   
    if (this.type_documentform.valid) {
      const TypeDoc = { ...this.type_documentform.value };
      this.TypeDocservice.updateType_document(TypeDoc.id, TypeDoc).subscribe(
        (res: any) => {
          if (res && res.status === 'success') {
          
            this.messageService.add({severity: 'success', summary: 'Succes', detail: 'Type document modifié', life: 3000});
            this.type_documentDialog=false
            this.gettype_documentData();

          } else {
            this.messageService.add({severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la modification de type document', life: 3000});
          
          }
        },
        (error) => {
          this.messageService.add({severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la modification de type document', life: 3000});
          console.error('Erreur du côté client :', error);
        }
      );
    } else {
      this.messageService.add({severity: 'erreur', summary: 'Erreur', detail: 'Veuillez remplir correctement tous les champs obligatoires', life: 3000});
    }
  }
  updatetype_documentDialog(type_document: any) {
  
    this.type_documentform.patchValue({
      id: type_document.id,
      form: type_document.form,
      nom_type_document: type_document.nom_type_document,
      description: type_document.description,
    
    });

    this.type_documentDialog = true;
  }
  updateData(type_document: any) {
    this.ngzone.run(() => {
      this.router.navigate(['/update', type_document.id]);
    });
  }

  openAddDialog() {
    this.type_documentform.reset();
    this.operation = 'add';
    this.type_documentDialog = true,
      this.header = 'Ajouter type document'
  }

  
  opentype_documentDialog(type_document){
    this.type_document=type_document
    this.type_documentform.patchValue({
      id: type_document.id,
      form: type_document.form,
      nom_type_document: type_document.nom_type_document,
      description: type_document.description,
    });
    ; this.operation='Update'; 
    this.type_documentDialog=true;
    this.header='modifier type document '+type_document.id
  }


  addtype_document() {
    this.TypeDocservice.addTypeDocument(this.type_documentform.value)

  }
  onSubmit() {
    if (this.operation == 'add') {
      this.insertData()
    }
    else if (this.operation == 'Update') {
      this.updateType_document()
    }
  }
  hideDialog() {
    this.type_documentDialog = false;
    this.submitted = false;
}
  
  gettype_documentData() {
    console.log('Liste des type_documents');
    this.TypeDocservice.getType_documents().subscribe((res: any) => {
      console.log(res);
      this.type_documents = res;
    });
  }

  insertData() {
    if (this.type_documentform.valid) {
      console.log('Données envoyées au serveur :', this.type_documentform.value);
      this.TypeDocservice.addTypeDocument(this.type_documentform.value).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          this.gettype_documentData();
          this.type_documentDialog = false;
          this.type_documentform.reset();
        },
        (error) => {
          console.error('Erreur d\'ajout de ', error);

          if (error && error.error && error.error.message) {
            console.error('Message d\'erreur du serveur :', error.error.message);
          }

          if (error && error.error && error.error.errors) {
            console.error('Erreurs détaillées du serveur :', error.error.errors);
          }
        }
      );
    } else {
      console.error('Formulaire invalide. Veuillez remplir tous les champs requis.');
    }
  }

  deleteData(id: any) {
    this.TypeDocservice.deleteData(id).subscribe(
      res => {
        this.gettype_documentData();
      },
      error => {
        console.error('Erreur lors de la suppression de type document', error);
      }
    );
  }

  
}


  // deleteSelectedtype_document() {
  //   if (this.selectedtype_documents && this.selectedtype_documents.length > 0) {
  //     const selectedIds = this.selectedtype_documents.map(doc => doc.id); // Assurez-vous que doc.id est un number
  //     this.TypeDocservice.deleteSelectedTypeDocuments(selectedIds).subscribe(
  //       () => {
  //         this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Les documents sélectionnés ont été supprimés avec succès.' });
  //       },
  //       error => {
  //         console.error(error);
  //         this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la suppression des documents sélectionnés.' });
  //       }
  //     );
  //   } else {
  //     this.messageService.add({ severity: 'warn', summary: 'Avertissement', detail: 'Veuillez sélectionner au moins un document à supprimer.' });
  //   }
  // }



