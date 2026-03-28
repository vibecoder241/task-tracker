import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://task-tracker-e823.onrender.com/api/auth'
  constructor(private http: HttpClient) { }

  register(data: any){
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any){
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
  }
}
