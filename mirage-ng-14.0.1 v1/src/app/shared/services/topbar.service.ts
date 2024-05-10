import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
@Injectable({
  providedIn: 'root'
})
export class TopbarService {
  profileName: string;
  constructor(private profileService: ProfileService) { }



  fetchProfile(email: string) {
    this.profileService.getProfile(email).subscribe(
      (data: any) => {
        this.profileName = data.name; // Supposez que votre API renvoie un objet avec une propriété 'name'
      },
      error => {
        console.error(error);
      }
    );
  }
}
