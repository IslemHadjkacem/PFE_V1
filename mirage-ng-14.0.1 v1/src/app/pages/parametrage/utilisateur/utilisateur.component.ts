
import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/shared/models/utilisateur';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss'],
  providers: [MessageService, ConfirmationService, UtilisateurService, DialogService],
})
export class UtilisateurComponent implements OnInit {
  @Output() utilisateurSelected = new EventEmitter<any>()
  ref: DynamicDialogRef | undefined;
  id: any;
  header = ''
  utilisateurform!: FormGroup;
  operation: 'add' | 'update' | 'consult' = null
  utilisateurs: any;
  utilisateur: any;
  cols: any[];
  selectedutilisateur: Utilisateur[];
  utilisateurDialog = false;
  deleteutilisateurDialog = false;
  deleteutilisateursDialog = false;
  selectedutilisateurs: Utilisateur[];
  submitted: boolean;
  UtilisateurData: any;
  username: string = ''; 

  constructor(
    private formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService,
    private ngzone: NgZone,
    private router: Router,
    public messageService: MessageService,
    public dialogService: DialogService,
  ) {
    this.utilisateurform = this.formBuilder.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      password:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUtilisateurData();
    this.username = 'UtilisateurConnecté123';
  }
  selectTypeDoc(utilisateur) {
    console.log(utilisateur)
    this.utilisateurSelected.emit(utilisateur)
  }
  onSubmit() {
    if (this.operation == 'add') {
      this.insertData()
    }
    else if (this.operation == 'update') {
      this.updateUtilisateur()
    }
  }

  hideDialog() {
    this.utilisateurDialog = false;
  }
  openAddDialog() {
    this.utilisateurform.reset();
    this.utilisateurform.patchValue;
    this.operation = 'add';
    this.utilisateurDialog = true,
      this.header = 'Ajouter utilisateur'
  }

  addutilisateur() {
    this.utilisateurService.addUtilisateur(this.utilisateurform.value)
  }
  openutilisateursDialog(utilisateur) {
    this.utilisateur = utilisateur
    this.utilisateurform.patchValue({
      id: utilisateur.id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.email,
      password:utilisateur.password,

    });
    ; this.operation = 'update';
    this.utilisateurDialog = true;
    this.header = 'modifier utilisateur ' + utilisateur.id
  }


  updateutilisateurDialog(utilisateur: any) {

    this.utilisateurform.patchValue({
      id: utilisateur.id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.email,
      password:utilisateur.password,

    });

    this.utilisateurDialog = true;
  }
  updateUtilisateur() {

    if (this.utilisateurform.valid) {
      const Utilisateur = { ...this.utilisateurform.value };
      this.utilisateurService.updateUtilisateur(Utilisateur.id, Utilisateur).subscribe(
        (res: any) => {
          if (res && res.status === 'success') {

            this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Utilisateur modifié', life: 3000 });
            this.utilisateurDialog = false
            this.getUtilisateurData();

          } else {
            this.messageService.add({ severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la modification d\ utilisateur', life: 3000 });

          }
        },
        (error) => {
          this.messageService.add({ severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la modification d\ utilisateur ', life: 3000 });
          console.error('Erreur du côté client :', error);
        }
      );
    } else {
      this.messageService.add({ severity: 'erreur', summary: 'Erreur', detail: 'Veuillez remplir correctement tous les champs obligatoires', life: 3000 });
    }
  }

  updateData(utilisateur: any) {
    this.ngzone.run(() => {
      this.router.navigate(['/update_utilisateur', utilisateur.id]);
    });
  }
  getUtilisateurData() {
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


  insertData() {
    console.log(this.utilisateurform.getRawValue);
    if (this.utilisateurform.valid) {
      console.log('Données envoyées au serveur :', this.utilisateurform.value);
      this.utilisateurService.addUtilisateur(this.utilisateurform.value).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          this.getUtilisateurData();
          this.utilisateurDialog = false;
          this.utilisateurform.reset();
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
    this.utilisateurService.deleteData(id).subscribe(
      res => {
        this.getUtilisateurData();
      },
      error => {
        console.error('Erreur lors de la suppression de utilisateur', error);
      }
    );
  }
  
  getUtilisateurs() {
    this.utilisateurService.getUtilisateurById(this.id).subscribe(
      (res: any) => {
        this.utilisateurform.patchValue(res);
      },
      (error) => {
        this.messageService.add(
          { severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la récupération des données du utilisateur', life: 3000 }
        );
        console.error('Erreur du côté client :', error);
      }
    );
  }

}


