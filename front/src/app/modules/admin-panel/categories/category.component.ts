import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseCategoryService } from 'src/app/core/services/course-category.service';
import { CourseCategory } from 'src/app/core/interfaces/courseCategory';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: CourseCategory[] = [];
  id:number=0;
  admin: boolean = false;
  constructor(private courseCategoryService: CourseCategoryService, private router: Router,private loginSvc: LoginService,) { 
    this.getCategories();
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
  getCategories() {
    this.courseCategoryService.getCourseCategory().subscribe(
      (res) => {
        this.categories = <any>res;
      },
      (err) => console.log(err)
    );
  }

  deleteCourseCategory() {
    this.courseCategoryService.deleteCourseCategory(this.id).subscribe(
      (res) => {
        window.location.reload();
      },
      (err) => console.log(err)
    );
  }
  selectId(id: number){
    this.id = id
  }
}
