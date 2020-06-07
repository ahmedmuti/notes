import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#signin').particleground();


  //   $('#signin').particleground({
  //     dotColor: '#ff0000',
  //     lineColor: '#ff0000'
  // });
  
  }




}
