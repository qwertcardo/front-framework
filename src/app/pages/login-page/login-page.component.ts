import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/interfaces/auth-request.interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {
    this.authService.observeAuthChanges().subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/main']);
        }
      }
    );
  }

  ngOnInit(): void {
  }

  login(): void {
    const request: AuthRequest = {
      username: this.username,
      password: this.password
    }

    this.authService.login(request);
  }
}
