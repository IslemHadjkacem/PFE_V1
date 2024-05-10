import { Component, Input, NgZone, OnChanges, OnInit, SimpleChanges ,EventEmitter, Output } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Niveau } from 'src/app/shared/models/niveau.model';
import { NiveauService } from 'src/app/shared/services/niveau.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApprobateurComponent } from '../approbateur/approbateur.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  providers: [MessageService, ConfirmationService, NiveauService,DialogService],
  styleUrls: ['./niveau.component.scss']
})
export class NiveauComponent implements OnInit,OnChanges {
  ref: DynamicDialogRef | undefined;
  @Input() typeDocSelected;
  @Output() niveauSelected=new EventEmitter<any>()
  id: any;
  header=''
  niveauform!: FormGroup;
  operation:'add' | 'update' | 'consult'=null
  niveaux: any;
  niveau: any;
  cols: any[];
  selectedNiveaux: Niveau[];
  niveauDialog = false;
  deleteNiveauDialog = false;
  deleteNiveauxDialog = false;
  submitted: boolean;
  dialogRef: any;
  
  selectedTypeDocument: any;
  constructor(
    // public dialogRef: MatDialog,
    private formBuilder: FormBuilder,
    private niveauService: NiveauService,
    private ngzone: NgZone,
    private router: Router,
    public dialogService: DialogService,
    public messageService:MessageService,
  ) {
    this.niveauform = this.formBuilder.group({
      id: [''],
      type_document: ['', Validators.required],
      nom: ['', Validators.required],
      parDefaut: [false],
    });


  }
  ngOnInit(): void {
    this.getNiveauData();
    this.getNiveauByClassedoc();
    }
  selectNiveau(niveau){
    console.log(niveau)
    this.niveauSelected.emit(niveau)
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['typeDocSelected'])
    console.log(this.typeDocSelected)
      this.getNiveauByClassedoc();
      this.niveauform.patchValue({type_document:this.typeDocSelected?.id})
  }
 
   
  getNiveauByClassedoc() {
      this.niveauService.getNiveauByClassedoc(this.typeDocSelected?.id).subscribe(
        (data: any) => {
          console.log('Données récupérées:', data);
          this.niveaux = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des données:', error);
        }
      );
  }
  openDialog(niveau): void {
    this.dialogService.open(ApprobateurComponent, {
        header: 'Liste des approbateurs',
        width: '250px',
        height:   '280px',
        data:{niveau:niveau},
    });
}

  hideDialog() {
    this.niveauDialog = false;
}
getNiveaux() {
  this.niveauService.getNiveauById(this.id).subscribe(
    (res: any) => {
      this.niveauform.patchValue(res);
    },
    (error) => {
      this.messageService.add(
        { severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la récupération des données du niveau', life: 3000 }
        );
        console.error('Erreur du côté client :', error);
    }
  );
}
updateNiveau() {
  if (this.niveauform.valid) {
    const formData = { ...this.niveauform.value, parDefaut: this.niveauform.get('parDefaut').value };
    const niveauId = this.niveau.id; // Assurez-vous que vous avez un moyen de récupérer l'ID du niveau à mettre à jour
    this.niveauService.updateNiveau(niveauId, formData).subscribe(
      (response) => {
        console.log('Réponse du serveur :', response);
        this.getNiveauData();
        this.niveauDialog = false;
        this.niveauform.reset();
      },
      (error) => {
        console.error('Erreur lors de la modification du niveau :', error);
        // Gérer l'erreur ici
      }
    );
  } else {
    console.error('Formulaire invalide. Veuillez remplir tous les champs requis.');
    // Gérer le cas où le formulaire n'est pas valide
  }
}
  // updateNiveau() {
   
  //   if (this.niveauform.valid) {
  //     const Niveau = { ...this.niveauform.value };
  //     this.niveauService.updateNiveau(Niveau.id, Niveau).subscribe(
  //       (res: any) => {
  //         if (res && res.status === 'success') {
          
  //           this.messageService.add({severity: 'success', summary: 'Succes', detail: 'Niveau modifié', life: 3000});
  //           this.niveauDialog=false
  //           this.getNiveauData();

  //         } else {
  //           this.messageService.add({severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la modification du niveau', life: 3000});
          
  //         }
  //       },
  //       (error) => {
  //         this.messageService.add({severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la modification du niveau', life: 3000});
  //         console.error('Erreur du côté client :', error);
  //       }
  //     );
  //   } else {
  //     this.messageService.add({severity: 'erreur', summary: 'Erreur', detail: 'Veuillez remplir correctement tous les champs obligatoires', life: 3000});
  //   }
  // }

  openAddDialog()
   {this.niveauform.reset(); 
     this.niveauform.patchValue({type_document:this.typeDocSelected?.id});
     this.operation='add';
     this.niveauDialog=true,
     this.header='Ajouter niveau'}

  // addNiveau() {
  //   this.niveauService.addNiveau(this.niveauform.value)
  // }

  addNiveau() {
    if (this.niveauform.valid) {
      const formData = { ...this.niveauform.value, parDefaut: this.niveauform.get('parDefaut').value };
      this.niveauService.addNiveau(formData).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          this.getNiveauData();
          this.niveauDialog = false;
          this.niveauform.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du niveau :', error);
          // Gérer l'erreur ici
        }
      );
    } else {
      console.error('Formulaire invalide. Veuillez remplir tous les champs requis.');
      // Gérer le cas où le formulaire n'est pas valide
    }
  }
  openNiveauxDialog(niveau){
    this.niveau=niveau
    this.niveauform.patchValue({
      id: niveau.id,
      type_document: niveau.type_document,
      nom: niveau.nom,
      parDefaut: niveau.parDefaut
    
    });
    ; this.operation='update'; 
    this.niveauDialog=true;
    this.header='modifier niveau '+niveau.id
  }
  onSubmit() {
if(this.operation=='add'){
  this.insertData()
}
else if(this.operation=='update'){
  this.updateNiveau()
}
  }

  updateNiveauDialog(niveau: any) {
  
    this.niveauform.patchValue({
      id: niveau.id,
      type_document: niveau.type_document,
      nom: niveau.nom,
    
    });

    this.niveauDialog = true;
  }



  getNiveauData() {
    console.log('Liste des niveaux');
    this.niveauService.getNiveaux().subscribe((res: any) => {
      console.log(res);
      this.niveaux = res;
    });
  }

  insertData() {
    if (this.niveauform.valid) {
      console.log('Données envoyées au serveur :', this.niveauform.value);
      this.niveauService.addNiveau(this.niveauform.value).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          this.getNiveauData();
          this.niveauDialog = false;
          this.niveauform.reset();
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
    this.niveauService.deleteData(id).subscribe(
      res => {
        this.getNiveauData();
      },
      error => {
        console.error('Erreur lors de la suppression de niveau', error);
      }
    );
  }

  updateData(niveau: any) {
    this.ngzone.run(() => {
      this.router.navigate(['/update_niveau', niveau.id]);
    });
  }

  // getNomTypeDoc(): void {
  //   const idTypeDoc = 1; // Remplacez 1 par l'ID du type de document que vous souhaitez récupérer
  //   this.niveauService.getNomTypeDoc(idTypeDoc).subscribe(
  //     (data) => {
  //       this.nom_type_document = data[0].type_document;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

}











 