import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#signup').particleground();


  //   $('#your-element').particleground({
  //     dotColor: '#ff0000',
  //     lineColor: '#ff0000'
  // });
  }

}
