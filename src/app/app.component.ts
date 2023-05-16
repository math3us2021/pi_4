import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pi_4';
  menu: boolean = false;


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.menuEmitter.subscribe((menu) => {
      this.menu = menu;
    });
  }

  statistics(){
    this.router.navigate(['/statistics']);
  }
}

