import { Component, OnInit ,EventEmitter, Output,} from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { TypeDocService } from 'src/app/shared/services/type-doc.service';
// import { RouterLink } from '@angular/router';
// import { FormGroup } from '@angular/forms';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    //@Output() typeDocSelected = new EventEmitter<any>()
    model: any[];
     listDocument=[]
     selectedTypeDocument: any;
    //  formGroup: FormGroup; 
   
    constructor(public appMain: AppMainComponent, private TypeDocservice: TypeDocService,) { }

    ngOnInit() {
        this.listDocument = [];
        this.TypeDocservice.getType_documents().subscribe(data =>{
            const documentsItems =data.map(typedoc => ({
                label: typedoc.nom_type_document,
                icon: 'pi pi-fw pi-pencil',
               // command: (event) => this.selectTypeDoc(typedoc), // Appeler la fonction selectTypeDocument avec le type de document sélectionné
                routerLink: ['/document', typedoc.id] // Adjust the routerLink to include the typedoc IDTypeDoc => ({
                
            }))
            this.listDocument=documentsItems;
            console.log(documentsItems)
       
        
           
        this.model = [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },

            {
                label: 'UI Kit', icon: 'pi pi-fw pi-star-fill', routerLink: ['/uikit'],
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon' },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc'] }
                ]
            },
            // {
            //     label: 'Prime Blocks', icon: 'pi pi-fw pi-prime', routerLink: ['/blocks'],
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'] },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            {
                label: 'exemple', icon: 'pi pi-fw pi-copy',
                items: [
                    { label: 'authorisation', icon: 'pi pi-fw pi-copy', routerLink: ['/authorisation'] },
                    { label: 'conge', icon: 'pi pi-fw pi-pencil', routerLink: ['/conge'] },
                ]
            },

            {
                label: 'Liste classe Document', icon: 'pi pi-fw pi-list', 
                items: documentsItems 
            },
            {
                label: 'workflow', icon: 'pi pi-fw pi-copy',
                items: [
                    { label: 'workflow', icon: 'pi pi-fw pi-copy', routerLink: ['/workflows'] },
                   
                ]
            },
            // {
            //     label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['/utilities'],
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
            {
                label: 'Parametrage', icon: 'pi pi-fw pi-copy', routerLink: ['/parametrage'],
                items: [
                    { label: 'Parametrage', icon: 'pi pi-fw pi-copy', routerLink: ['/parametrage'] },
                    { label: 'Niveau', icon: 'pi pi-fw pi-pencil', routerLink: ['/parametrage/niveau'] },
                    { label: 'Type document', icon: 'pi pi-fw pi-pencil', routerLink: ['/parametrage/type_document'] },
                    { label: 'Etat', icon: 'pi pi-fw pi-pencil', routerLink: ['/parametrage/etat'] },
                    { label: 'Utilisateur', icon: 'pi pi-fw pi-pencil', routerLink: ['/parametrage/utilisateur'] }
                ]
            },

            {
                label: 'Accès', icon: 'pi pi-fw pi-sign-in', routerLink: ['/se-connecter'],
                items: [
                    { label: 'bienvenue', icon: 'pi pi-fw pi-sign-in', routerLink: ['/bienvenue'], target: '_blank' },
                    { label: 'Se connecter', icon: 'pi pi-fw pi-sign-in', routerLink: ['/se-connecter'], target: '_blank' },

                    { label: 'Mot de passe oublié', icon: 'pi pi-fw pi-sign-in', routerLink: ['/mdp-oubliee'], target: '_blank' },

                   
                ]
            },

            {
                label: 'Pages', icon: 'pi pi-fw pi-copy', routerLink: ['/pages'],
                items: [
                    { label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud'] },
                    { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline'] },
                    { label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                    { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'], target: '_blank' },
                    { label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', routerLink: ['/error'], target: '_blank' },
                    { label: '404', icon: 'pi pi-fw pi-times', routerLink: ['/404'], target: '_blank' },
                    { label: 'Access Denied', icon: 'pi pi-fw pi-ban', routerLink: ['/accessdenied'], target: '_blank' },
                    { label: 'Empty', icon: 'pi pi-fw pi-clone', routerLink: ['/pages/empty'] },
                ]
            },
            // {
            //     label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            
            // {
            //     label: 'Docs', icon: 'pi pi-fw pi-file', routerLink: ['/documentation']
            // },
            // {
            //     label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
            // }
        ];
       
      

// let i=this.model.findIndex(el=>el.label=='Liste classe Document')
// console.log(i)
// this.listDocument.forEach(el=>
// {
//     this.model[i].items.push(
//         { label: el.nom_type_document, icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/formulaire/'+el.id] }
//     )
// }
// )
})
// this.formGroup = this.fb.group({
//     type_document: [''] // Ajoutez un contrôle pour le champ type_document
//     // Autres contrôles de formulaire ici...
// });
    }

    selectTypeDocument(typeDocument: any) {
        // Définir la valeur du champ "type_document" avec le nom du type de document sélectionné
       // this.formGroup.get('type_document').setValue(typeDocument?.nom_type_document);
    }
    // selectTypeDoc(type_document) {
    //     console.log(type_document)
    //     this.typeDocSelected.emit(type_document)
    //   }
  
    // selectTypeDocument(typeDocument: any) {
    //     this.selectedTypeDocument = typeDocument; // Stocker les détails du type de document sélectionné
    // }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
