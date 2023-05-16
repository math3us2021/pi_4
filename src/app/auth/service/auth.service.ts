import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription, catchError, map } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  mySubscription: Subscription | undefined;
  url = 'http://localhost:3001/users';

  menuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {

  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user)
    .pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  errorHandler(e: any): Observable<any> {
    alert('Ocorreu um erro!');
    return EMPTY; //Observable vazio
  }

  showMenu(email: string, password: string){
    this.menuEmitter.emit(true);
    this.router.navigate(['/home']);
  }

}
