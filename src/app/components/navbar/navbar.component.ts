import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public _AuthService: AuthService, private _Router: Router) {
  }


  logout() {
    localStorage.clear();
    this._AuthService.signOut(localStorage.getItem('TOKEN'))
    this._Router.navigate(['/signin'])
  }
  ngOnInit() {
  }

}
