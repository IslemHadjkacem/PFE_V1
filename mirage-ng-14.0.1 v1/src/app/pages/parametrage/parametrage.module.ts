import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastModule} from 'primeng/toast';
import { ParametrageRoutingModule } from './parametrage-routing.module';
import { ParametrageComponent } from './parametrage.component';
import { EtatComponent } from './etat/etat.component';
import { NiveauComponent } from './niveau/niveau.component';
import {ButtonModule} from 'primeng/button';
import { TypeDocumentComponent } from './type-document/type-document.component';
import { ApprobateurComponent } from './approbateur/approbateur.component';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {RippleModule} from 'primeng/ripple';
import {InputTextModule} from 'primeng/inputtext';
import {TabMenuModule} from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import {TabViewModule} from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule } from '@angular/material/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';


@NgModule({
  declarations: [
    ParametrageComponent,
    EtatComponent,
    NiveauComponent,
    TypeDocumentComponent,
    ApprobateurComponent,
    UtilisateurComponent
  ],
  imports: [
    
    MultiSelectModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    ParametrageRoutingModule,
    RadioButtonModule,
    CheckboxModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    RippleModule,
    InputTextModule,
    TabViewModule,
    TabMenuModule

  ],
  // exports: [
  //   ParametrageComponent,
  //   EtatComponent,
  //   NiveauComponent,
  //   TypeDocumentComponent,
  //   ApprobateurComponent
  // ]
})
export class ParametrageModule { 

}
