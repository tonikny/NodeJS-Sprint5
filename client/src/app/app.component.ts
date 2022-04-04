import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(public authService: AuthService) {}
  
  logout() {
    const token = this.authService.getUserTokenData();
    this.authService.doLogout(token.userId);
  }
  

}
