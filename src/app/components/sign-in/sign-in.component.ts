import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
declare var $: any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) { 
    if(localStorage.getItem("TOKEN"))
    {
      this._Router.navigate(['/profile'])
      
    }
  }
  isClicked = false;
  isEmail = false;
  isValidPassword = false
  ResponseMessage = ""
  signIn = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  formData() {

    if (this.signIn.valid) {
      this.isClicked = true
      this._AuthService.signIn(this.signIn.value).subscribe(response => {
        if (response.message == "success") {
          this.isClicked = false
          this.isValidPassword = false
          this.isEmail = false
          localStorage.setItem("TOKEN", response.token)
          localStorage.setItem("id", response.user._id)
          this._Router.navigate(['/profile'])

        } else if (response.message == "email doesn't exist") {
          this.isEmail = true
          this.isClicked = false;
          this.isValidPassword = false
          this.ResponseMessage = response.message
        } else {
          this.isEmail = false
          this.isClicked = false;
          this.isValidPassword = true
          this.ResponseMessage = response.message

        }
        // console.log(response);

      })
      // console.log(this.signIn.value);

    } else {
      console.log('etl3 bara ya dog');
      return false
    }

  }

  ngOnInit() {
    $('#signin').particleground();

  }




}
