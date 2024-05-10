
import { DocumentService } from 'src/app/shared/services/document.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormDynamicService } from 'src/app/shared/services/form-dynamic.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Formulaire } from 'src/app/shared/models/formulaires';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventEmitter, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-form-dynamic',
  templateUrl: './form-dynamic.component.html',
  providers: [MessageService, ConfirmationService,FormDynamicService],
  styleUrls: ['./form-dynamic.component.scss']
})
export class FormDynamicComponent implements OnInit {
  // @Output() dialogClosedSuccessfully: EventEmitter<any> = new EventEmitter<any>();
// Déclaration de l'événement
@Output() formSubmittedSuccessfully: EventEmitter<any> = new EventEmitter<any>();
  @Input() formId: string; 
  form_dynamic: FormGroup;
  formSchema:any ={components: []}
  formdata
  idDocument
 
  // formSchema:any = {
  //   components: [
  //     {
  //       "type": "email",
  //       "key": "email",
  //       "label": "Email",
  //       "placeholder": "Enter your email",
  //       "input": true,
  //       "validate": {
  //       "required": true,
  //       "email": true
  //       }
  //     },
      // {
      //   "type": "textfield",
      //   "key": "firstName",
      //   "label": "First Name",
      //   "placeholder": "Enter your first name",
      //   "input": true,
      //   "validate": {
      //     "required": true
      //   }
      // },
      
      // {
      //   "type": "textfield",
      //   "key": "lastName",
      //   "label": "Last Name",
      //   "placeholder": "Enter your last name",
      //   "input": true,
      //   "validate": {
      //     "required": true
      //   }
      // },
   
  //     {
  //       "type": "textarea",
  //       "key": "message",
  //       "label": "Message",
  //       "placeholder": "Enter your message",
  //       "input": true,
  //       "rows": 5,
  //       "validate": {
  //         "required": true
  //       }

  //     },
  //        {
  //         "type": "checkbox",
  //         "key": "agree",
  //         "label": "Agree to terms",
  //         "validate": {
  //           "required": true
  //       }
        
  //       // Valeur par défaut (non cochée)
  //      },
  //         {
  //       "type": "checkbox",
  //       "key": "subscribe",
  //       "label": "Subscribe to newsletter",
  //       "validate": {
  //         "required": false
  //       }
  //     },
  //     {
  //       "type": "dropdown",
  //       "key": "dropdown",
  //       "label": "dropdown",
  //       "options": [
  //         { "value": "USA", "label": "Type document" },
  //         { "value": "UK", "label": "etat " },
  //         { "value": "CA", "label": "niveau" }
  //         // Ajoutez d'autres options selon vos besoins
  //       ],
  //       "validate": {
  //         "required": true
  //       }
  //     },
  //     {
  //       "type": "multiselect",
  //       "key": "interests",
  //       "label": "Select Interests",
  //       "options": [
  //         { "label": "Apple", "value": "apple" },
  //         { "label": "Banana", "value": "banana" },
  //         { "label": "Orange", "value": "orange" }
  //       ], // Initialiser les options comme un tableau vide
  //       "validate": {
  //         "required": true
  //       }
  //     },
      
  //     {
  //       "type": "button",
  //       "action": "submit",
  //       "label": "Submit",
  //       "theme": "primary"
  //     }
  //   ]
  // };
// Définir la variable formSchema ici
// {
      //   "type": "textfield",
      //   "key": "first name",
      //   "label": "First Name ",
      //   "placeholder": "Enter your first name",
      //   "input": true,
      //   "validate": {
      //     "required": false
      //   }
      // },
      //  {
      // "type": "checkbox",
      //  "key": "agree",
      //   "label": "",
      //   "input": true,
      //   "validate": {
      //     "required": true
      //   }
      //   // Valeur par défaut (non cochée)
      //  },
  constructor(private fb: FormBuilder,
    private formService: FormDynamicService,
    private config: DynamicDialogConfig,
    public dialogService: DialogService,
    public messageService:MessageService,
    private documentService: DocumentService,
    private ref: DynamicDialogRef) 
    {
    this.formId=config.data.formId
    config.data.editData?this.formdata=config.data.editData:this.formdata=undefined
    config.data.idDocument?this.idDocument=config.data.idDocument:this.idDocument=undefined
    console.log(this.formdata)
    console.log(config.data)
   }

  ngOnInit(): void {
    // this.getAllForm();
    this.formService.getFormSchema(this.formId).subscribe(data => {
      this.formSchema = JSON.parse( data); 
      this.form_dynamic = this.createFormGroup(this.formSchema);
      console.log(this.formdata)
      if(this.formdata)
      this.form_dynamic.patchValue(JSON.parse(this.formdata))
    });
  }

  
  getAllForm() {
    console.log('Liste des formulaires');
    this.formService.getFormulaires().subscribe((res: any) => {
      console.log(res);
      this.form_dynamic = res;
    });
  }

  createFormGroup(schema: any): FormGroup {
    const group: any = {};
    schema.components.forEach((component: any) => {
      if (component.type === 'multiselect') {
        group[component.key] = this.fb.control([], Validators.required); // Initialiser comme un tableau vide
      } else if (component.type === 'checkbox') {
        group[component.key] = this.fb.control(false);
      } else {
        group[component.key] = this.fb.control('');
      }
    });
    return this.fb.group(group);
  }

  onSubmit() {
    if (this.form_dynamic.valid) {
      const formdata = this.form_dynamic.value;
  
      if (this.idDocument) {
        this.documentService.update(this.idDocument, formdata).subscribe(
          (response) => {
            console.log('Document mis à jour avec succès !', response);
            // Émettre l'événement de soumission réussie avec les données du formulaire
            this.formSubmittedSuccessfully.emit(formdata);
            // Fermer le dialogue après la soumission réussie
            this.ref.close('success');
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du document :', error);
          }
        );
      } else {
        this.documentService.save(formdata, this.formId).subscribe(
          (response) => {
            console.log('Document ajouté avec succès !', response);
            // Émettre l'événement de soumission réussie avec les données du formulaire
            this.formSubmittedSuccessfully.emit(formdata);
            // Fermer le dialogue après la soumission réussie
            this.ref.close('success');
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du document :', error);
          }
        );
      }
    }
  }
  

  // onSubmit() {
  //   if (this.form_dynamic.valid) {
  //           const formdata = this.form_dynamic.value;
  //           this.formId
  //           console.log(formdata)
  //   if (this.idDocument) {
      
  //     this.documentService.update(this.idDocument, formdata).subscribe(
  //       (response) => {
  //         console.log('Document mis à jour avec succès !', response);
         
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la mise à jour du document :', error);
          
  //       }
  //     );
  //   } else {
      
  //     this.documentService.save(formdata,this.formId).subscribe(
  //       (response) => {
  //         console.log('Document ajouté avec succès !', response);
          
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'ajout du document :', error);
        
  //       }
  //     );
  //   }
  // }
  // // Émettre l'événement de soumission réussie avec les données du formulaire
  // this.formSubmittedSuccessfully.emit(formdata);
  //  // Fermer le dialogue après la soumission réussie
  //  this.ref.close('success');
  // // this.dialogClosedSuccessfully.emit('success');
  // // this.dialogClosedSuccessfully.emit(true);
  // }
  }
  // updateformualire() {
  //     const formdata = { ...this.form_dynamic.value};
    
  //     this.formService.updateformualire(this.idDocument, formdata).subscribe(
  //       (response) => {
  //         console.log('Réponse du serveur :', response);
  //         this.getAllForm();
  //         this.form_dynamic.reset();
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la modification du niveau :', error);
  //         // Gérer l'erreur ici
  //       }
  //     );
  // }
  // addFormulaire() {
  
  //   // Vérifier la validité du formulaire
  //     const formdata = { ...this.form_dynamic.value };
  //     this.formService.addFormulaire(formdata).subscribe(
  //       (response) => {
  //         console.log('Réponse du serveur :', response);
  //         this.getAllForm();
  //         this.form_dynamic.reset();
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'ajout du niveau :', error);
  //         // Gérer l'erreur ici
  //       }
  //     );
  // }

  
  

  // onSubmit(): void {
  //   if (this.form_dynamic.valid) {
  //       const formdata = this.form_dynamic.value;
  //       this.formId
  //       console.log(formdata)
  //       if(this.formdata){
  //   this.updateformualire()
  //        //////ediiiiiiiiiiiiiiiiiiiiiiiiiiiiit
  //       }else{
  //   this.addFormulaire()
  //   //adddddddddddddddddddddddddddddddddddddddd}
  //        console.log(formdata)
        
  //       } 
  //     } else {
  //       console.error('Formulaire invalide. Veuillez remplir tous les champs requis.');
  //       // Gérer le cas où le formulaire n'est pas valide
  //     }
  //  }
  // onSubmit() {
  //   if (this.form_dynamic.valid) {
  //           const formdata = this.form_dynamic.value;
  //           this.formId
  //           console.log(formdata)
  //   // Appelez la méthode save de DocumentService pour ajouter le nouveau document
  //   this.documentService.save(formdata).subscribe(
  //     (response) => {
  //       console.log('Document ajouté avec succès !', response);
  //       // Traitez la réponse ou redirigez l'utilisateur si nécessaire
  //     },
  //     (error) => {
  //       console.error('Erreur lors de l\'ajout du document :', error);
  //       // Gérez l'erreur
  //     }
  //   );
  // }
  //   }

















































































































    
  // insertData() {
  //   if (this.form_dynamic.valid) {
  //     console.log('Données envoyées au serveur :', this.form_dynamic.value);
  //     this.formService.addFormulaire(this.form_dynamic.value).subscribe(
  //       (response) => {
  //         console.log('Réponse du serveur :', response);
  //         this.getAllForm();
  //        // this.niveauDialog = false;
  //         this.form_dynamic.reset();
  //       },
  //       (error) => {
  //         console.error('Erreur d\'ajout de ', error);

  //         if (error && error.error && error.error.message) {
  //           console.error('Message d\'erreur du serveur :', error.error.message);
  //         }

  //         if (error && error.error && error.error.errors) {
  //           console.error('Erreurs détaillées du serveur :', error.error.errors);
  //         }
  //       }
  //     );
  //   } else {
  //     console.error('Formulaire invalide. Veuillez remplir tous les champs requis.');
  //   }
  // }
  

  // addFormulaire() {
  //   if (this.form_dynamic.valid) {
  //     const formdata = { ...this.form_dynamic.value };
  //     this.formService.addFormulaire(formdata).subscribe(
  //       (response) => {
  //         console.log('Réponse du serveur :', response);
  //         this.getAllForm();
  //         //this.niveauDialog = false;
  //         this.form_dynamic.reset();
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'ajout du niveau :', error);
  //         // Gérer l'erreur ici
  //       }
  //     );
  //   } else {
  //     console.error('Formulaire invalide. Veuillez remplir tous les champs requis.');
  //     // Gérer le cas où le formulaire n'est pas valide
  //   }
  // }
    
 
  // }
  // onSubmit(): void {
  //   if (this.form_dynamic.valid) {
  //     const formdata = {
  //       titre: 'gestion de congee', // Récupérez le titre à partir du formulaire ou utilisez une valeur par défaut
  //       donnees: this.form_dynamic.value // Envoyez toutes les données du formulaire
  //     };
      
  //     // Appelez le service pour sauvegarder les données du formulaire
  //     this.formService.saveFormData(formdata).subscribe(
  //       (response) => {
  //         console.log('Données du formulaire sauvegardées avec succès !', response);
  //         // Réinitialisez le formulaire après la sauvegarde réussie si nécessaire
  //         this.form_dynamic.reset();
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la sauvegarde des données du formulaire :', error);
  //       }
  //     );
  //   }
  // }

  // onSubmit(): void {
  //   if (this.form_dynamic.valid) {
  //     const formData = this.form_dynamic.value;
  
  //     if (this.formdata) {
  //       // Opération de modification
  //       this.formService.editFormData(this.formId, formData).subscribe(
  //         (response) => {
  //           // Afficher un message de succès
  //           this.messageService.add({severity:'success', summary:'Success', detail:'Data updated successfully'});
  //           // Effectuer d'autres actions après la modification réussie
  //         },
  //         (error) => {
  //           // Gérer l'erreur en affichant un message d'erreur
  //           this.messageService.add({severity:'error', summary:'Error', detail:'Failed to update data'});
  //         }
  //       );
  //     } else {
  //       // Opération d'ajout
  //       this.formService.addFormData(formData).subscribe(
  //         (response) => {
  //           // Afficher un message de succès
  //           this.messageService.add({severity:'success', summary:'Success', detail:'Data added successfully'});
  //           // Effectuer d'autres actions après l'ajout réussi
  //         },
  //         (error) => {
  //           // Gérer l'erreur en affichant un message d'erreur
  //           this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add data'});
  //         }
  //       );
  //     }
  //   }
  // }
  // onSubmit(): void {
  //   if (this.form_dynamic.valid) {
  //     const formData = this.form_dynamic.value;
  //     // Utilisez addFormData pour ajouter les données du formulaire
  //     this.formService.addFormData(formData).subscribe(
  //       (response) => {
  //         // Gérez la réponse de l'API ici, par exemple afficher un message de succès
  //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form data added successfully' });
  //       },
  //       (error) => {
  //         // Gérez les erreurs ici, par exemple afficher un message d'erreur
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add form data' });
  //         console.error(error); // Affichez l'erreur dans la console pour le débogage
  //       }
  //     );
  //   }
  // }
//   onSubmit(): void {
//   if (this.form_dynamic.valid) {
//     const formData = this.form_dynamic.value;
    
//     // Appelez le service pour sauvegarder les données du formulaire
//     this.formService.saveFormData(formData).subscribe(
//       (response) => {
//         console.log('Données du formulaire sauvegardées avec succès !', response);
//         // Réinitialisez le formulaire après la sauvegarde réussie si nécessaire
//         this.form_dynamic.reset();
//       },
//       (error) => {
//         console.error('Erreur lors de la sauvegarde des données du formulaire :', error);
//       }
//     );
//   }
// }

//   onSubmit(): void {
//   if (this.form_dynamic.valid) {
//     const formData = {
//       titre: this.form_dynamic.get('titre').value,
//       donnees: JSON.stringify(this.form_dynamic.value), // Convertir les données du formulaire en JSON
//     };

//     this.formService.addFormData(formData).subscribe(
//       (response) => {
//         console.log('Données enregistrées avec succès:', response);
//         // Réinitialiser le formulaire ou faire d'autres actions si nécessaire
//       },
//       (error) => {
//         console.error('Erreur lors de l\'enregistrement des données:', error);
//         // Gérer l'erreur de manière appropriée
//       }
//     );
//   }
// }}

// onSubmit(): void {
//   if (this.form_dynamic.valid) {
//     const formData = this.form_dynamic.value;
//     if (this.formdata) {
//       // Logique pour la mise à jour des données existantes
//     } else {
//       this.formService.submitFormData(this.formId, formData).subscribe(
//         (response) => {
//           // Gérer la réponse de l'API après l'enregistrement des données
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully' });
//         },
//         (error) => {
//           // Gérer les erreurs en cas d'échec de la soumission du formulaire
//           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit form' });
//         }
//       );
//     }
//   } else {
//     // Afficher des messages d'erreur si le formulaire est invalide
//     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
//   }
// }
