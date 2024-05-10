import { Component, OnInit,Input, SimpleChanges, OnChanges } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TypeDocService } from 'src/app/shared/services/type-doc.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormulaireService } from 'src/app/shared/services/formulaire.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TypeDoc } from 'src/app/shared/models/typeDocument.model';
@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  providers: [MessageService, ConfirmationService ,DialogService,FormulaireService],
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit,OnChanges  {
  ref: DynamicDialogRef | undefined;
  @Input() typeDocSelected;
  documents: any;
  id: any;
  header = ''
 formulaireform: FormGroup;

  operation: 'add' | 'Update' | 'consult' = null
  formulaires: any;
  formulaire: any;
  cols: any[];
  selectedformulaire: [];
  formulaireDialog = false;
  deleteformulaireDialog = false;
  deleteformulairesDialog = false;
  type_document:TypeDoc[] =[];
  idForm
  constructor(private route: ActivatedRoute,  private TypeDocservice: TypeDocService, 
    private formulaireService:FormulaireService,
    private formBuilder: FormBuilder,
    
    //private ngzone: NgZone,
    private router: Router,
    public dialogService: DialogService,
    public messageService:MessageService,) { 
      this.formulaireform = this.formBuilder.group({
        id: [''],
        type_document: ['', Validators.required],
        nom_utilisateur: ['', Validators.required],
        donnees: ['', Validators.required]
      });
    }

  ngOnInit(): void {
   // this.getTypeByClassedoc();
   
    this.route.params.subscribe(params => {
      const id = params['id']; 
      console.log(id)
      this.getType_documentById(id);
      this.getTypeByClassedoc(id);
  });
  }
  getType_documentById(id: number): void {
    this.TypeDocservice.getType_documentById(id).subscribe(type_document => {
      this.type_document = type_document.id;
     this.idForm=type_document.form
    });
}


ngOnChanges(changes: SimpleChanges): void {
  if(changes['typeDocSelected'])
  console.log(this.typeDocSelected)
   // this.getTypeByClassedoc();
    this.formulaireform.patchValue({type_document:this.typeDocSelected?.id})
}

 
getTypeByClassedoc(idTypeDoc) {
    this.formulaireService.getTypeByClassedoc(idTypeDoc).subscribe(
      (data: any) => {
        console.log('Données récupérées:', data);
        this.formulaires = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
}




















// ngOnChanges(changes: SimpleChanges): void {

//   if(changes['typeDocSelected'])
//   console.log(this.typeDocSelected)
//     this.getTypeByClassedoc();
//     this.formulaireform.patchValue({type_document:this.typeDocSelected?.id})
// }

// ngOnChanges(changes: SimpleChanges): void {
//   if (changes['typeDocSelected']) {
//     this.getTypeByClassedoc(this.typeDocSelected?.id);
//   }
// }

// getTypeByClassedoc(typeDocumentId: number): void {
//   this.formulaireService.getTypeByClassedoc(typeDocumentId).subscribe(
//     (data: any) => {
//       console.log('Documents récupérés:', data);
//       this.documents = data;
//     },
//     (error) => {
//       console.error('Erreur lors de la récupération des documents:', error);
//     }
//   );
// }
// getTypeByClassedoc() {
//   this.formulaireService.getTypeByClassedoc(this.typeDocSelected?.id).subscribe(
//     (data: any) => {
//       console.log('Données récupérées:', data);
//       this.formulaires = data;
//     },
//     (error) => {
//       console.error('Erreur lors de la récupération des données:', error);
//     }
//   );
// }
}