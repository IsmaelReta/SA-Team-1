import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from 'src/app/core/interfaces/schedule';
import { LoginService } from 'src/app/core/services/login.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
  form: FormGroup;
  id: number;
  admin: boolean = false;
  schedules: Schedule = {
    id: 0,
    where: "",
    course:"",
    day:"",
    schedule:"",
    active: true,
  };
  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private loginSvc: LoginService,
  ) {
    this.form = this.fb.group({
      where:  ['', Validators.required],
      day: ['', Validators.required],
      schedule: ['', Validators.required],
      active:  ['', Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    this.getById(this.id);
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
  getById(id: number) {
    this.scheduleService.getScheduleById(id).subscribe((data) => {
      this.form.setValue({
        where: data.where,
        day:data.day,
        schedule:data.schedule,
        active: data.active,
      });
    });
  }
  update() {
    this.schedules = {
      id: this.id,
      where: this.form.value.where,
      day:this.form.value.day,
      course:"",
      schedule:this.form.value.schedule,
      active: this.form.value.active,
    };
      this.scheduleService.putSchedule(this.schedules, this.id)
      .subscribe(
        (data) => {
          this.router.navigate(['/admin/panel/schedules']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
