import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Regulations } from '../model/home';
import { HttpClient } from '@angular/common/http';
import { Pet } from 'src/app/auth/model/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = 'http://localhost:3001/RegulationAliment';
  urlCreatePet = 'http://localhost:3001/pet';

  constructor(
    private http: HttpClient,
  ) { }

  getRegulation() : Observable<Regulations[]> {
    return this.http.get<Regulations[]>(this.url)
    .pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  createPet(data: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.urlCreatePet, data)
    .pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    alert('Ocorreu um erro!');
    return EMPTY; //Observable vazio
  }
}
