import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  users: User[] = [];
  userId: number = 0;
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    active: true,
    admin: false,
    Registereds: [
      {
        User: [],
        id: 0,
        idCourse: 0,
        idUser: 0,
      },
    ],
  };
  admin: boolean = false;
  constructor(private userService: UserService,private loginSvc: LoginService,private router: Router) {
    this.getUsers();
  }
  ngOnInit(): void {
    this.loginSvc.isAdmin.subscribe(
      (isAdmin)=>{
        this.admin = isAdmin
        if(this.admin === false){
          
          this.router.navigateByUrl('');
        }
      }
    )
    }
  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = <any>data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
 /*  getUser(id: number) {
    this.userService.getUser(id).subscribe(
      (data) => {
        this.user = <any>data;
        console.log(this.user)
      },
      (error) => {
        console.log(error);
      }
    );
  } */

  patchAdmins() {
    this.userService.patchAdmins(this.userId).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteAdmins() {
    this.userService.deleteAdmins(this.userId).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  selectId(userId: number) {
    this.userId = userId;
  }
}
