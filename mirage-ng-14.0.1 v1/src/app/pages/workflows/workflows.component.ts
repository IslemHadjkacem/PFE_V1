import { Component, OnInit } from '@angular/core';
import { Workflow } from 'src/app/shared/models/workflows';
import { WorkflowsService } from 'src/app/shared/services/workflows.service';
// import { Etat } from './etat.model'; // Importez votre modèle Etat
// import { EtatService } from '../etat.service';
@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss']
})
export class WorkflowsComponent implements OnInit {


  workflows: Workflow[];

  constructor(private workflowsService: WorkflowsService) { }

  ngOnInit(): void {
   // this.getWorkflows();
  }

  // getWorkflows(): void {
  //   this.workflowsService.getWorkflows()
  //     .subscribe(workflows => this.workflows = workflows);
  // }

  // Ajoutez les autres méthodes CRUD (ajout, modification, suppression) ici
}
 