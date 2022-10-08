import { Injectable } from '@angular/core';
import { User } from '../interfaz/user';
import { JwtResponse } from '../interfaz/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER: string = 'localhost:3000/usuarios';
  authSubject = new BehaviorSubject(false);
  private token:string = "";


  constructor(private httpClient: HttpClient) { }

  register(user:User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/register`, 
    user).pipe(tap(
      (res:JwtResponse) => {
          if(res){
            //guardar
           this.saveToken(res.accessToken, res.expiresIn)
          }
        })
      )
  }

  login(datos:any): Observable<JwtResponse> {
    const user: User = {
      correo: datos.correo,
      clave: datos.clave
    }
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/login`, 
    user).pipe(tap(
      (res:JwtResponse) => {
          if(res){
            //guardar
            console.log(res)
            this.saveToken(res.accessToken, res.expiresIn)
          }
        })
      )
  }

  logout(){
    this.token = ""
    localStorage.removeItem("ACCESS_TOKEN")
    localStorage.removeItem("EXPIRES_IN")
  }

  private saveToken(token:string, expiresIn: string){
    localStorage.setItem("ACCESS_TOKEN", token)
    localStorage.setItem("EXPIRES_IN", expiresIn)
    this.token = token
  }

  private getToken() {
    let acceso = localStorage.getItem("ACCESS_TOKEN")
    if(!this.token && acceso !== null){
      this.token = acceso
    }
    return this.token;
  }
}
