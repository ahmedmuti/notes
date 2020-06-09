import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
declare var $: any
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  invalidStyle = { 'background-color': 'gray', 'border-color': 'gray' }
  validStyle = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' }
  isClicked = false
  isSuccess=false
  ResponseMessage=""
  isEmailUnique=false
  constructor(private _AuthService: AuthService ,private _Router:Router) {

    if(localStorage.getItem("TOKEN"))
    {
      this._Router.navigate(['/profile'])
      
    }
   }

  signUp = new FormGroup({

    first_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])
  })

  formData() {

    if (this.signUp.valid) {
      this.isClicked = true
      this.isSuccess=false
      this._AuthService.signUp(this.signUp.value).subscribe(response => {
        if (response.message == "success") {
          this.isClicked = false
          this.isSuccess=true
          this.isEmailUnique=false
          this.signUp.reset()

        }else 
        {
            this.ResponseMessage=response.errors.email.message
            this.isEmailUnique=true
          this.isClicked = false

        }
        console.log(response)
      })
    } else {

      console.log('etl3 bara ya dog');
    }

  }

  ngOnInit() {
    $('#signup').particleground();
  }

}
