import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginData } from '../interfaces/login';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:4001/api/auth"
  token = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.token.next(localStorage.getItem('token'));
  }

  login(data:LoginData) {
    this.http.post<any>(this.url, data).subscribe(
      (userData) => {
        this.token.next(userData.token);
        localStorage.setItem('token', userData.token);
        return userData
      },
      (errorData) => {
        throw errorData
      },
    )
  }



  
  

  
}
