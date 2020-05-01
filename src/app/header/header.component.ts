import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSearch: boolean;
  user$ = this.authService.afUser$;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  search() {
    if (this.isSearch) {
      this.isSearch = false;
    } else if (!this.isSearch) {
      this.isSearch = true;
    }
  }

}
