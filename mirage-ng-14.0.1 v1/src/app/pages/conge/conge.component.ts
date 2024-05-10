import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {


 
    conges: FormGroup; // Déclaration de votre formulaire FormGroup
  
    formSchema: any = {
      components: [
          {
              "type": "textfield",
              "key": "employee",
              "label": "Employee",
              "placeholder": "Enter employee name",
              "validate": {
                  "required": true
              }
          },
          {
              "type": "dropdown",
              "key": "department",
              "label": "Department",
              "placeholder": "Select department",
              "options": [
                  {"label": "Department 1", "value": "department_1"},
                  {"label": "Department 2", "value": "department_2"},
                  {"label": "Department 3", "value": "department_3"}
              ],
              "validate": {
                  "required": true
              }
          },
          {
              "type": "date",
              "key": "startDate",
              "label": "Start Date",
              "placeholder": "Select start date",
              "validate": {
                  "required": true
              }
          },
          {
              "type": "date",
              "key": "endDate",
              "label": "End Date",
              "placeholder": "Select end date",
              "validate": {
                  "required": true
              }
          },
          {
              "type": "button",
              "action": "submit",
              "label": "Submit",
              "theme": "primary"
          }
      ]
  };
  
  
    constructor(private fb: FormBuilder) {}
  
    ngOnInit(): void {
      this.conges = this.createFormGroup(this.formSchema);
    }
  
    createFormGroup(schema: any): FormGroup {
      const group: any = {};
      schema.components.forEach((component: any) => {
        if (component.type === 'dropdown') {
          group[component.key] = this.fb.control('', Validators.required);
        } else if (component.type === 'date') {
          group[component.key] = this.fb.control('', Validators.required);
        } else {
          group[component.key] = this.fb.control('', Validators.required);
        }
      });
      return this.fb.group(group);
    }
  
    onSubmit(): void {
      if (this.conges.valid) {
        const formData = this.conges.value;
        console.log(formData);
        // Gérer la soumission du formulaire, par exemple, envoyer formData à un serveur backend
      }
    }
  }

