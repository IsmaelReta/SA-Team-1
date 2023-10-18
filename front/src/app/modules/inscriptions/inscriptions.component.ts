import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.css'],
})
export class InscriptionsComponent implements OnInit {
  id: number = 0;
  token: string | null = localStorage.getItem('token');
  userData: any = {};
  inscriptions: [] = [];
  isRegistered: boolean = false;
  constructor(private userService: UserService,private loginSvc: LoginService,private router : Router,) {
    this.getToken();
    
    
  }
  
  ngOnInit(): void {
    this.loginSvc.isRegistered.subscribe(
      (isRegistered)=>{
        this.isRegistered = isRegistered
        if(this.isRegistered == false ){
          this.router.navigateByUrl('');
        }
      }
    )
  }
  getToken() {
    if (this.token) {
      try {
        const tokenPayload = JSON.parse(atob(this.token.split('.')[1]));

        this.userData.email = tokenPayload.email;
        this.userService.getUserByEmail(this.userData.email).subscribe(
          (data) => {
            this.userData = data;
            this.inscriptions = this.userData.Registereds;
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }
  deleteInscription() {
    this.userService.removeCourseRegistration(this.id, this.userData.id).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => console.log(err)
    );
  }
  selectId(id: number) {
    this.id = id;
  }
}
