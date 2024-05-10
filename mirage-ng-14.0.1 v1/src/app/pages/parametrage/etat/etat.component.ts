
import { Component,OnChanges,  SimpleChanges, NgZone, OnInit,Input } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtatService } from 'src/app/shared/services/etat.service';
import { Etat } from 'src/app/shared/models/etat.model';

@Component({
  selector: 'app-etat',
    templateUrl: './etat.component.html',
    providers: [MessageService, ConfirmationService,EtatService],
    styleUrls: ['./etat.component.scss']
  })
export class EtatComponent implements OnInit, OnChanges{
  @Input() niveauSelected;
  id: any;
  header=''
  etatform!: FormGroup;
  operation:'add' | 'update' | 'consult'=null
 
  etats: any;
  etat: any;
  cols: any[];
  selectedEtats: Etat[];
  etatDialog = false;
  deleteEtatDialog = false;
  deleteEtatsDialog = false;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private etatService :EtatService,
    private ngzone: NgZone,
    private router: Router,
    public messageService:MessageService
   
  ) {
    this.etatform = this.formBuilder.group({
      id: [''],
      id_niveau:['', Validators.required],
      nom_etat: ['', Validators.required],
      parDefaut: [false],
    });
  }

  ngOnInit(): void {
    this.getEtatData();
    this.getEtatByClassedoc();
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['niveauSelected']){
    console.log(this.niveauSelected)
    console.log(this.etatform)
      this.getEtatByClassedoc();
      this.etatform.patchValue({id_niveau:this.niveauSelected?.id})}
  }

  getEtatByClassedoc() {
      this.etatService.getEtatByClassedoc(this.niveauSelected?.id).subscribe(
        (data:any) => {
          console.log('Données récupérées:',data);
          this.etats = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des données:', error);
        }
      );
    }
  
  getData() {
    this.etatService.getEtatById(this.id).subscribe(
      (res: any) => {
        this.etatform.patchValue(res);
      },
      (error) => {
        this.messageService.add({ severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la récupération des données du l\etat', life: 3000 });
       
      }
    );
  }
 

  openAddDialog(){
    this.etatform.reset();
    this.etatform.patchValue({id_niveau:this.niveauSelected?.id});
    this.operation='add';
    this.etatDialog=true,
    this.header='Ajouter etat'
  }
 
  // addEtat() {
  //   this.etatService.addEtat(this.etatform.value)
  // }
  addEtat() {
    if (this.etatform.valid) {
      const formData = { ...this.etatform.value, parDefaut: this.etatform.get('parDefaut').value };
      this.etatService.addEtat(formData).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          this.getEtatData();
          this.etatDialog = false;
          this.etatform.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du etat :', error);
          // Gérer l'erreur ici
        }
      );
    } else {
      console.error('Formulaire invalide. Veuillez remplir tous les champs requis.');
      // Gérer le cas où le formulaire n'est pas valide
    }
  }
  updateData(etat: any) {
    this.ngzone.run(() => {
      this.router.navigate(['/update_etat', etat.id]);
    });
  }
  updateEtat() {
   
    if (this.etatform.valid) {
      const formData = { ...this.etatform.value, parDefaut: this.etatform.get('parDefaut').value };
      const Etat = { ...this.etatform.value };
      this.etatService.updateEtat(Etat.id, Etat).subscribe(
        (res: any) => {
          if (res && res.status === 'success') {
          
            this.messageService.add({severity: 'success', summary: 'Succes', detail: 'Etat modifié', life: 3000});
            this.etatDialog=false
            this.getEtatData();

          } else {
            this.messageService.add({severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la modification du l\etat', life: 3000});
          
          }
        },
        (error) => {
          this.messageService.add({severity: 'erreur', summary: 'Erreur', detail: 'Erreur lors de la modification du  l\etat', life: 3000});
          console.error('Erreur du côté client :', error);
        }
      );
    } else {
      this.messageService.add({severity: 'erreur', summary: 'Erreur', detail: 'Veuillez remplir correctement tous les champs obligatoires', life: 3000});
    }
  }
  
  updateEtatDialog(etat: any) {
  
    this.etatform.patchValue({
      id: etat.id,
      id_niveau: etat.id_niveau,
      nom_etat: etat.nom_etat,
    
    });

    this.etatDialog = true;
  }

  openEtatsDialog(etat){
    this.etat=etat
    this.etatform.patchValue({
      id: etat.id,
      id_niveau: etat.id_niveau,
      nom_etat: etat.nom_etat,
      parDefaut: etat.parDefaut
    
    });
    ; this.operation='update'; 
    this.etatDialog=true;
    this.header='Modifier etat '+etat.id

    
  }

  hideDialog() {
    this.etatDialog = false;
    this.submitted = false;
}


  onSubmit() { 
    if(this.operation=='add'){
  this.insertData()
}
else if(this.operation=='update'){
  this.updateEtat()
}

  }

  getEtatData() {
    console.log('Liste des etats');
    this.etatService.getData().subscribe((res: any) => {
      console.log(res);
      this.etats = res;
    });
  }

  insertData() {

    if (this.etatform.valid) {
      console.log('Données envoyées au serveur :', this.etatform.value);
      this.etatService.addEtat(this.etatform.value).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          this.getEtatData();
          this.etatDialog = false;
          this.etatform.reset();
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
      console.error('Formulaire invalide.Veuillez remplir tous les champs requis.');
    }
  }

  deleteData(id: any) {
    this.etatService.deleteData(id).subscribe(
      res => {
        this.getEtatData();
      },
      error => {
        console.error('Erreur lors de la suppression de type document', error);
      }
    );
  }

 
}











 