import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  @ViewChild('form', {static: true}) form!: NgForm;
  wrongConfirmation = false;

  username = '';
  password = '';
  confirmation = '';
  name = '';
  email = '';
  age = 0;

  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.form.form.valueChanges.subscribe(
      (value) => {
        this.wrongConfirmation = value.password !== value.confirmation;
      }
    )
  }

  register(): void {
    const user: User = new User(null, this.username, this.password, this.name, this.age, this.email);
    this.userService.register(user).subscribe(
      (_: User) => {
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {

      }
    );
  }
}
