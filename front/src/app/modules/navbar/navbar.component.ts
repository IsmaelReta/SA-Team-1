import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseCategory } from 'src/app/core/interfaces/courseCategory';
import { CourseCategoryService } from 'src/app/core/services/course-category.service';
import { LoginService } from 'src/app/core/services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  coursesCategory: CourseCategory[]= [];
  dates: any={};
  token: string | null = null;
  admin : boolean = false;
  logueado : boolean = false;
  register : boolean = false;
  constructor(private courseCategoryService: CourseCategoryService, private loginSvc: LoginService, private router: Router) {
    
    this.getCourseCategory();
   }

  ngOnInit(): void {
    this.loginSvc.token.subscribe(
      (token) => {
        this.token = token;
      }
    )
    this.loginSvc.isAdmin.subscribe(
      (isAdmin)=>{
        this.admin = isAdmin
      }
    )
    this.loginSvc.isRegistered.subscribe(
      (isRegistered)=>{
        this.register = isRegistered
      }
    )
    
    
  }
  getCourseCategory(){
    this.courseCategoryService.getCourseCategory().subscribe(
      (res) => {
        this.coursesCategory = <any>res;
      },
      (err) => console.log(err)
    );
  }

  logOut(){
    localStorage.clear();
    window.location.reload();
  }

}
