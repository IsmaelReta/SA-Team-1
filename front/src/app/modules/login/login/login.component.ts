import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/interfaces/login';
import { LoginService } from 'src/app/core/services/login.service';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError = "";

  form: FormGroup 

  loginData: LoginData = {
    email: '',
    password: '',
  };

  constructor(private formBuilder: FormBuilder, private userSvc: UserService ,private loginSvc: LoginService, private router: Router) { 

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    
    this.register()
  }

  ngOnInit(): void {
  }

    // get email () {
    //   return this.loginForm.controls.email;
    // }
    
    // get password () {
    //   return this.loginForm.controls.password;
    // }


    register(){
      this.form.setValue({
        email: "",
        password:"",
      })
    }
  
    login () {
        this.loginData = {
          email: this.form.value.email,
          password: this.form.value.password,
        }
        try {
          this.loginSvc.login(this.loginData);

        } catch {
          this.loginError = "Email o contraseña incorrecta.";
        }
        this.router.navigateByUrl('');
            this.form.reset();
      }};
