import { Component, OnInit } from '@angular/core';
import { AboutUsService } from 'src/app/core/services/about-us.service';
import { AboutUS } from 'src/app/core/interfaces/about-us';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-add-about-us',
  templateUrl: './add-about-us.component.html',
  styleUrls: ['./add-about-us.component.css']
})
export class AddAboutUsComponent {
  form: FormGroup;
  id: number;
  aboutus: AboutUS = {
    id: 0,
    title: '',
    subtitle: '',
    description: '',
    image: '',
    priority: 0,
    active: false,
  };
  admin: boolean = false;
  constructor(
    private fb: FormBuilder,
    private aboutusService: AboutUsService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private loginSvc: LoginService,
  ) {
    this.form = this.fb.group({
      title: '',
      subtitle: '',
      description: ['', Validators.required],
      image: '',
      priority: '',
      active: ['', Validators.required],
    });
    this.form.setValue({
      title: '',
      subtitle: '',
      description: '',
      image: '',
      priority: 0,
      active: false,
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
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

  add() {
    this.aboutus = {
      id: this.id,
      description: this.form.value.description,
      image: this.form.value.image,
      title: this.form.value.title,
      subtitle: this.form.value.subtitle,
      active: this.form.value.active,
      priority: this.form.value.priority,
    };
    this.aboutusService.postAbout(this.aboutus).subscribe(
      (data) => {
        this.router.navigate(['/admin/panel/about-us']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}