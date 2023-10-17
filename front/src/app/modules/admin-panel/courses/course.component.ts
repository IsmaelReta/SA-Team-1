import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/core/interfaces/course';
import { CourseService } from 'src/app/core/services/course.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  id : number= 0;
  admin: boolean = false;
  constructor(private courseService: CourseService, private router: Router,private loginSvc: LoginService,) {
    this.getCourses();
  }
  ngOnInit(): void {
  this.loginSvc.isAdmin.subscribe(
    (isAdmin)=>{
      this.admin = isAdmin
      if(this.admin === false){
        
        this.router.navigateByUrl('');
      }
    }
  )}
  getCourses() {
    this.courseService.getCourses().subscribe(
      (res) => {
        this.courses = <any>res;
      },
      (err) => console.log(err)
    );
  }

  deleteCourse() {
    this.courseService.deleteCourse(this.id).subscribe(
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
