import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {
  aba: string = 'home';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  toggleProduct() {
    this.aba = 'product';
    this.router.navigate(['/storePet']);
  }

  toggleExit() {
    this.authService.menuEmitter.emit(false);
    this.router.navigate(['/']);
    localStorage.removeItem('owner');
  }

  toggleHome() {
    this.aba = 'home';
    this.router.navigate(['/home']);
  }

  toggleOwner() {
    this.aba = 'owner';
    this.router.navigate(['/owner']);
  }
}
