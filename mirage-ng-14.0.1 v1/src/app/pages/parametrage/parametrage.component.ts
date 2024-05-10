import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss']
})
export class ParametrageComponent implements OnInit {
  typeDocSelected
  niveauSelected
  constructor() { }

  ngOnInit(): void {
  }
  changeTypeDoc(event){

    this.typeDocSelected=event
    console.log(this.typeDocSelected)
  }

  changeNiveau(event: any) {
    this.niveauSelected=event
    console.log(this.niveauSelected)
    }
}
