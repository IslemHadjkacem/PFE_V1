
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormDynamicService } from 'src/app/shared/services/form-dynamic.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss']
})
export class AuthorisationComponent implements OnInit {


  
  

    @Input() formId: string; // Identifiant pour le formulaire
  //  form_dynamic: FormGroup;
  formulaire: FormGroup;
  formSchema: any = {
    components: [
      {
        "type": "textfield",
        "key": "employee",
        "label": "Employé",
        "placeholder": "Entrez le nom de l'employé",
        "input": true,
        "validate": {
          "required": true
        }
      },
      {
        "type": "dropdown",
        "key": "department",
        "label": "Département",
        "placeholder": "Sélectionnez le département",
        "options": [
          {"label": "Département 1", "value": "department_1"},
          {"label": "Département 2", "value": "department_2"},
          {"label": "Département 3", "value": "department_3"}
          // Ajoutez d'autres options selon vos besoins
        ],
        "validate": {
          "required": true
        }
      },
      {
        "type": "textfield",
        "key": "authorizationType",
        "label": "Type d'autorisation",
        "placeholder": "Entrez le type d'autorisation",
        "input": true,
        "validate": {
          "required": true
        }
      },
      {
        "type": "date",
        "key": "authorizationDate",
        "label": "Date d'autorisation",
        "placeholder": "Entrez la date d'autorisation",
        "input": true,
        "validate": {
          "required": true
        }
      },
      {
        "type": "time",
        "key": "startTime",
        "label": "Heure de début",
        "placeholder": "Entrez l'heure de début",
        "input": true,
        "validate": {
          "required": true
        }
      },
      {
        "type": "time",
        "key": "endTime",
        "label": "Heure de fin",
        "placeholder": "Entrez l'heure de fin",
        "input": true,
        "validate": {
          "required": true
        }
      },
      {
        "type": "numeric",
        "key": "numberOfHours",
        "label": "Nombre d'heures",
        "placeholder": "Entrez le nombre d'heures",
        "input": true,
        "validate": {
          "required": true
        }
      },
      {
        "type": "button",
        "action": "submit",
        "label": "Soumettre",
        "theme": "primary"
      }
    ]
};
    // formSchema: any = {
    //   components: [
    //     {
    //       "type": "textfield",
    //       "key": "employee",
    //       "label": "Employee",
    //       "placeholder": "Enter employee name",
    //       "input": true,
    //       "validate": {
    //         "required": true
    //       }
    //     },
    //     {
    //       "type": "dropdown",
    //       "key": "department",
    //       "label": "Department",
    //       "placeholder": "Select department",
    //       "options": [
    //         {"label": "Department 1", "value": "department_1"},
    //         {"label": "Department 2", "value": "department_2"},
    //         {"label": "Department 3", "value": "department_3"}
    //         // Ajoutez d'autres options selon vos besoins
    //       ],
    //       "validate": {
    //         "required": true
    //       }
    //     },
    //     {
    //       "type": "textfield",
    //       "key": "authorizationType",
    //       "label": "Authorization Type",
    //       "placeholder": "Enter authorization type",
    //       "input": true,
    //       "validate": {
    //         "required": true
    //       }
    //     },
    //     {
    //       "type": "date",
    //       "key": "authorizationDate",
    //       "label": "Authorization Date",
    //       "placeholder": "Enter authorization date",
    //       "input": true,
    //       "validate": {
    //         "required": true
    //       }
    //     },
    //     {
    //       "type": "time",
    //       "key": "startTime",
    //       "label": "Start Time",
    //       "placeholder": "Enter start time",
    //       "input": true,
    //       "validate": {
    //         "required": true
    //       }
    //     },
    //     {
    //       "type": "time",
    //       "key": "endTime",
    //       "label": "End Time",
    //       "placeholder": "Enter end time",
    //       "input": true,
    //       "validate": {
    //         "required": true
    //       }
    //     },
    //     {
    //       "type": "numeric",
    //       "key": "numberOfHours",
    //       "label": "Number of Hours",
    //       "placeholder": "Enter number of hours",
    //       "input": true,
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
  
    constructor(private fb: FormBuilder, private formservice: FormDynamicService) { }
  
    ngOnInit(): void {
      this.formulaire = this.createFormGroup(this.formSchema);
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
  
    onSubmit(): void {
      if (this.formulaire.valid) {
        const formData = this.formulaire.value;
        console.log(formData);
        // Gérer la soumission du formulaire, par exemple, envoyer formData à un serveur backend
      }
    }
  }

