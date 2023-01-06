import { Component } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loggedInData: AppUser;
  userMessage: string = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loggedInData = {
        id: 0,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    })
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  submitLogin = () => {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value)
    .subscribe((resp) => {
      if (JSON.stringify(resp).length > 2) {
        this.loggedInData = JSON.parse(JSON.stringify(resp).substring(1, JSON.stringify(resp).length - 1));
        if (this.loggedInData.username === this.loginForm.value.username) {
          localStorage.setItem('appUser', this.loggedInData.username);
          this.loginForm.reset();
          console.log('login', localStorage.getItem('appUser'));
          this.router.navigate(['/']);
        }
      }
      else {
        this.loginForm.reset();
        this.userMessage = 'Invalid credentials!';
      }
    });
  }
}
