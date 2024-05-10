


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApprobateurService } from 'src/app/shared/services/approbateur.service';
import { Approbateur } from 'src/app/shared/models/approbateur';

import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
@Component({
  selector: 'app-approbateur',
  templateUrl: './approbateur.component.html',
  providers: [MessageService, ConfirmationService, ApprobateurService],
  styleUrls: ['./approbateur.component.scss']
})
export class ApprobateurComponent implements OnInit {
  utilisateurs: any[] = [];
  utilisateurNiveau = [];
  value: any;
  id: any;
  header = '';
  approbateurform!: FormGroup;
  operation: 'add' | 'consult' = null;
  approbateur: any;
  cols: any[] = [];
  selectedApprobateurs: Approbateur[] = [];
  approbateurDialog = false;
  deleteApprobateurDialog = false;
  deleteApprobateursDialog = false;
  submitted: boolean;
  idNiveau: any;
utilisateur:any;
  constructor(
    private formBuilder: FormBuilder,
    private approbateurService: ApprobateurService,
    public messageService: MessageService,
    private config: DynamicDialogConfig,
    private utilisateurService :UtilisateurService
  ) {
    console.log(config.data);
    this.idNiveau=config.data.niveau.id
    this.approbateurform = this.formBuilder.group({
      id: [''],
      approbateurs: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.getApprobateurs();
    this.getApprobateurData();
  }



  getApprobateurs() {
    this.utilisateurService.getUtilisateurs().subscribe(
      (utilisateurs: any) => {
        this.utilisateurs = utilisateurs.data;
        console.log(this.utilisateurs)
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }


  openAddDialog() {
    this.approbateurform.reset();
    this.operation = 'add';
    this.approbateurDialog = true;
    this.header = 'Ajouter un approbateur';
  }

  addApprobateur() {
    this.approbateurService.addApprobateur(this.approbateurform.value);
  }

  openNiveauxDialog(approbateur) {
    this.approbateur = approbateur;
    this.approbateurform.patchValue({
      id: approbateur.id,
      utilisateur: approbateur.utilisateur,
    });
  }
  

  insertData() {
    if (this.approbateurform.valid) {
      console.log('Données envoyées au serveur :', this.approbateurform.value);
      this.approbateurService.addApprobateur(this.approbateurform.value).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          this.getApprobateurData();
          this.approbateurDialog = false;
          this.approbateurform.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout :', error);

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
    this.approbateurService.deleteData(id).subscribe(
      () => {
        this.getApprobateurData();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'approbateur', error);
      }
    );
  }

  getApprobateurData() {
    console.log('Liste des approbateurs');
    this.approbateurService.getApprobateurs(this.idNiveau).subscribe(
      (res: Approbateur[]) => {
        console.log(res);
        this.approbateurform.patchValue({approbateurs:res})
      },
      (error) => {
        console.error('Erreur lors de la récupération des données des approbateurs :', error);
      }
    );
  }


  getData() {
    this.approbateurService.getApprobateurs(this.idNiveau).subscribe(
      (res: any) => {
        this.approbateurform.patchValue(res);
      },
      (error) => {
        this.messageService.add({ severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la récupération des données de l\'approbateur', life: 3000 });
        console.error('Erreur du côté client :', error);
      }
      
    );
    
  }

  onSubmit() {
    console.log(this.operation)
      this.updateData();
  }
  updateData() {
    console.log(this.approbateurform.valid)
    if (this.approbateurform.valid) {
      const approbateurs = this.approbateurform.get('approbateurs').value.map(({id})=>id);
      this.approbateurService.updateApprobateurs(this.idNiveau, approbateurs).subscribe(
        (response) => {
          console.log('Liste d\'approbateurs mise à jour avec succès:', response);
          this.getApprobateurData(); // Met à jour la liste des approbateurs après la mise à jour
          this.approbateurDialog = false; // Ferme le dialogue d'édition
          this.approbateurform.reset(); // Réinitialise le formulaire
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la liste des approbateurs:', error);
        }
      );
    } else {
      console.error('Formulaire invalide. Veuillez sélectionner au moins un approbateur.');
    }
  }
  

 
  // onSubmit() {
  //   if (this.operation == 'add') {
  //     this.insertData()
  //   }
   
  // }




   // onSubmit() {
  //   // if (this.operation === 'add') {
  //   //   this.insertData();
  //   if (this.operation !== 'add') {
  //     return; 
  //   } else {
  //     if (this.approbateurform.valid) {
  //       const formData = {
  //         id_niveau: this.approbateurform.value.id_niveau,
  //         utilisateur: this.approbateurform.value.utilisateur
  //       };
  
  //       this.approbateurService.addApprobateur(formData).subscribe(
  //         () => {
  //           this.messageService.add({ severity: 'success', summary: 'Enregistrement réussi', detail: 'Les données ont été enregistrées avec succès.' });
  //         },
  //         (error) => {
  //           console.error('Erreur lors de l\'enregistrement :', error);
  //           this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de l\'enregistrement.' });
  //         }
  //       );
  //     } else {
  //       this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir tous les champs requis.' });
  //     }
  //   }
  // }
  // onSubmit() {
  //   if (this.operation === 'add') {
  //     this.insertData();
  //   }


  //   if (this.approbateurform.valid) {
  //     // Récupérer les valeurs du formulaire
  //     const idNiveau = this.approbateurform.value.id_niveau;
  //     const utilisateur = this.approbateurform.value.utilisateur;

  //     // Appeler le service pour enregistrer les données
  //     this.approbateurService.addApprobateur(idNiveau, utilisateur).subscribe(
  //       () => {
  //         // Succès : afficher un message de succès ou rediriger l'utilisateur
  //         this.messageService.add({ severity: 'success', summary: 'Enregistrement réussi', detail: 'Les données ont été enregistrées avec succès.' });
  //       },
  //       (error) => {
  //         // Erreur : afficher un message d'erreur
  //         console.error('Erreur lors de l\'enregistrement :', error);
  //         this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de l\'enregistrement.' });
  //       }
  //     );
  //   } else {
  //     // Afficher un message d'erreur si le formulaire n'est pas valide
  //     this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir tous les champs requis.' });
  //   }
  // }

  
  
}










