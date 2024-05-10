import { Component } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Router } from '@angular/router';
import { ProfileService } from './shared/services/profile.service';
import { UtilisateurService } from './shared/services/utilisateur.service';
import { SeConnecterService } from './shared/services/se-connecter.service';
@Component({
	selector: 'app-topbar',
	template: `
        <div class="layout-topbar">
			<div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
					<div class="layout-topbar-logo-wrapper">
						<a href="#" class="layout-topbar-logo">
						<img alt="logo" src="assets/layout/images/logoo v.png" style="width: 60px; height: auto; margin-top:20px" 
            />
							<span class="app-name">AdmiTrack</span>
						</a>
					</div>

					<a href="#" class="sidebar-menu-button" (click)="appMain.onMenuButtonClick($event)">
						<i class="pi pi-bars"></i>
					</a>

					<a href="#" class="megamenu-mobile-button" (click)="appMain.onMegaMenuMobileButtonClick($event)">
						<i class="pi pi-align-right megamenu-icon"></i>
					</a>

					<a href="#" class="topbar-menu-mobile-button" (click)="appMain.onTopbarMobileMenuButtonClick($event)">
						<i class="pi pi-ellipsis-v"></i>
					</a>

					
                </div>
                <div class="layout-topbar-right fadeInDown">
					<ul class="layout-topbar-actions">
						<li #search class="search-item topbar-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === search}">
							<a href="#" class="topbar-search-mobile-button" (click)="appMain.onTopbarItemClick($event,search)">
								<i class="topbar-icon pi pi-search"></i>
							</a>
							<ul class="search-item-submenu fadeInDown" (click)="appMain.topbarItemClick = true">
								<li>
                                    <span class="md-inputfield search-input-wrapper">
                                        <input pInputText placeholder="Search..."/>
                                        <i class="pi pi-search"></i>
                                    </span>
                                </li>
                            </ul>
                        </li>
						
						
						<li #message class="topbar-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === message}">
							<a href="#" (click)="appMain.onTopbarItemClick($event,message)">
								<i class="topbar-icon pi pi-inbox"></i>
							</a>
							<ul class="fadeInDown">
								<li class="layout-submenu-header">
									<h1>Messages</h1>
									<span>Today, you have new 4 messages</span>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-cayla.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>Override the digital divide</p>
										<span>Cayla Brister</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-gabie.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>Nanotechnology immersion</p>
										<span>Gabie Sheber</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-gaspar.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>User generated content</p>
										<span>Gaspar Antunes</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-tatiana.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>The holistic world view</p>
										<span>Tatiana Gagelman</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
							</ul>
						</li>

						<li #gift class="topbar-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === gift}">
							<a href="#" (click)="appMain.onTopbarItemClick($event,gift)">
								<i class="topbar-icon pi pi-envelope"></i>
							</a>
							<ul class="fadeInDown">
								<li class="layout-submenu-header">
									<h1>Deals</h1>
								</li>

								<li class="deals">
									<ul>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-sapphire.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Sapphire</p>
												<span>Angular</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-roma.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Roma</p>
												<span>Minimalism</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-babylon.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Babylon</p>
												<span>Powerful</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
									</ul>
									<ul>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-harmony.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Harmony</p>
												<span>USWDS</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-prestige.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Prestige</p>
												<span>Elegancy</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-ultima.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Ultima</p>
												<span>Material</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
									</ul>
								</li>
							</ul>
						</li>

						<li #profile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === profile}">
							<a href="#" (click)="appMain.onTopbarItemClick($event,profile)">
                            <span class="profile-image-wrapper">
                                <img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout" />
                            </span>
								<!-- <span class="profile-info-wrapper">
								<h3>{{ profileName }}</h3>
								 <h3>Hadj Kacem Islem</h3> 
                                <span>Design</span>
                            </span> -->
							</a>
							<ul class="profile-item-submenu fadeInDown">
								<li class="profile-submenu-header">
									<div class="performance">
										<span>Weekly Performance</span>
										<!-- <img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout" /> -->
									</div>
									<div class="profile">
										<!-- <img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout"
														width="40" /> -->
										<!-- <h1>Hadj Kacem Islem</h1> -->
										<!-- <span>Design</span> -->


										<!-- <div *ngIf="utilisateur">
										<span>Bienvenue, {{ user.nom }}</span> -->

										<li *ngIf="user" class="topbar-item profile-item">
              <a href="#" (click)="appMain.onTopbarItemClick($event)">
                <!-- <span>Bienvenue, {{ username }}</span> -->
				<div *ngIf="utilisateur">
  <p>Bienvenue, {{ utilisateur.nom }}</p>

</div>		
              </a>
            </li>
				

										</div>
								
								
								<li class="layout-submenu-footer">
								<button class="signout-button" (click)="onLogoutClick()">Déconnexion</button>
									
								</li>
						
						<li>
							<a href="#" class="layout-rightpanel-button" (click)="appMain.onRightPanelButtonClick($event)">
								<i class="pi pi-arrow-left"></i>
							</a>
						</li>
                    

					<ul class="profile-mobile-wrapper">
						<li #mobileProfile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === mobileProfile}">
							<a href="#" (click)="appMain.onTopbarItemClick($event,mobileProfile)">
                            <span class="profile-image-wrapper">
                                <img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout" />
                            </span>
								<span class="profile-info-wrapper">
                                <h3>Olivia Eklund</h3>
                                <span>Design</span>
                            </span>
							</a>
							<ul class="fadeInDown">
								<li class="profile-submenu-header">
									<div class="performance">
										<span>Weekly Performance</span>
										<img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout" />
									</div>
									<div class="profile">
										<img src="assets/layout/images/topbar/avatar-eklund.png" alt="mirage-layout" width="45" />
										<h1>Olivia Eklund</h1>
										<span>Design</span>
									</div>
								</li>
								<li>
									<i class="pi pi-list icon icon-1"></i>
									<div class="menu-text">
										<p>Tasks</p>
										<span>3 open issues</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li>
									<i class="pi pi-shopping-cart icon icon-2"></i>
									<div class="menu-text">
										<p>Payments</p>
										<span>24 new</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li>
									<i class="pi pi-users icon icon-3"></i>
									<div class="menu-text">
										<p>Clients</p>
										<span>+80%</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-footer">
									<button class="signout-button">Sign Out</button>
									<button class="buy-mirage-button">Buy Mirage</button>
								</li>
							</ul>
						</li>
					</ul>
                
           
       
    `
})
export class AppTopBarComponent {
	currentUser: any;
	activeItem: number;
	profileName: string;
	utilisateur: any;
	//user: string;
	user:any;
	constructor(public appMain: AppMainComponent,
		private router: Router,
		private utilisateurService: UtilisateurService,
		private profileService: ProfileService,
		private seconnecterservice:SeConnecterService
	) { }
	ngOnInit(): void {
		// 	this.currentUser = this.utilisateurService.getUserConnected();
		// this.getUtilisateurs();
		// Récupérez les informations de l'utilisateur lors du chargement du composant
		 //this.utilisateur = this.utilisateurService.getUtilisateur();
	

		this.utilisateurService.getUserInfo().subscribe(
			(data: any) => {
				this.user = data;
				// this.user = data.utilisateur; // Supposez que votre API renvoie un objet avec une propriété 'username'
			},
			error => {
				console.error(error);
			}
		);
	}


	mobileMegaMenuItemClick(index) {
		this.appMain.megaMenuMobileClick = true;
		this.activeItem = this.activeItem === index ? null : index;
	}
	//namel get ustilsateur f .ts w bad f html namel user.name
	//get user nejbedhaa m back nhawl tjib token m login 



	onLogoutClick() {
		this.utilisateurService.logout().subscribe(
			(response) => {
				console.log('Déconnexion réussie');
				this.router.navigate(['/se-connecter']);

			},
			(error) => {
				console.error('Erreur lors de la déconnexion : ', error);
				// Gérez les erreurs de déconnexion ici
			}
		);
	}
	fetchProfile(email: string) {
		this.profileService.getProfile(email).subscribe(
			(data: any) => {
				this.profileName = data.nom; // Supposez que votre API renvoie un objet avec une propriété 'name'
			},
			error => {
				console.error(error);
			}
		);
	}

}
