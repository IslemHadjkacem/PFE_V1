import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParametrageComponent } from './parametrage.component';
import { EtatComponent } from './etat/etat.component';
import { NiveauComponent } from './niveau/niveau.component';
import { TypeDocumentComponent } from './type-document/type-document.component';
import { ApprobateurComponent } from './approbateur/approbateur.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
// import { ParametrageModule } from './parametrage.module';
const routes: Routes = [
  {path:'',component:ParametrageComponent},

{ path: 'etat', component: EtatComponent },
{path:'niveau',component:NiveauComponent},
{path:'type_document',component:TypeDocumentComponent},
{path:'approbateur',component:ApprobateurComponent},
{path:'utilisateur',component:UtilisateurComponent}

];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrageRoutingModule { }
