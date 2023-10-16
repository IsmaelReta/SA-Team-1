import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private courseCategoryService: CourseCategoryService, private loginSvc: LoginService) {
    
    this.getCourseCategory();
   }

  ngOnInit(): void {
    this.loginSvc.token.subscribe(
      (token) => {
        this.token = token;
        this.getToken();
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
  getToken(){
    if (this.token) {
      try {
        const tokenPayload = JSON.parse(atob(this.token.split('.')[1]));
        this.dates.isAdmin = tokenPayload.isAdmin;
        this.logueado = true;
        this.register = false;
        if(this.dates.isAdmin){
          this.admin = true
        }
      } catch (error) {
        
      }
    }else{
      this.register = true
      this.admin = false
    }
  }
  logOut(){
    localStorage.clear();
    window.location.reload();
  }
}
