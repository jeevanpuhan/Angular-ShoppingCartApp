import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerData: AppUser;
  userMessage: string = ''
  
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerData = {
        id: 0,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    }

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.minLength(3), Validators.maxLength(32)],
      firstName: ['', Validators.required, Validators.minLength(3), Validators.maxLength(32)],
      lastName: ['', Validators.required, Validators.minLength(3), Validators.maxLength(32)],
      email: ['', Validators.required, Validators.minLength(5), Validators.maxLength(255)],
      phone: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      password: ['', Validators.required, Validators.minLength(5), Validators.maxLength(32)],
    })
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(''),
    })
  }

  submitRegister = () => {
    this.registerData = this.registerForm.value;
    console.log(this.registerForm.value);
    this.userService.findByUsername(this.registerForm.value.username)
    .subscribe(resp => {
      if (JSON.stringify(resp).length > 2) {
        let temp = JSON.parse(JSON.stringify(resp).substring(1, JSON.stringify(resp).length - 1));

        if (temp.username == this.registerForm.value.username) {
          this.userMessage = 'Username already exists!';
        }
      } else {
        this.userService.register(this.registerForm.value)
        .subscribe(resp => {
          console.log(resp.valueOf());
          alert(`${this.registerForm.value.userName} registered successfully! Please login now.`)
          this.registerForm.reset();
          this.router.navigate(['login']);
        })
      }
    })
  }

}
