import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { User } from 'src/app/interfaz/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form:any) {
    const user: User = {
      correo: form.value.correo,
      clave: form.value.clave
    }
    this.authService.login(user).subscribe(res => {
      this.router.navigateByUrl('/home')
    })
  }

}
