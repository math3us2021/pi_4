import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Regulations } from '../model/home';
import { HttpClient } from '@angular/common/http';
import { Pet } from 'src/app/auth/model/user';
import { Food } from 'src/app/statistic/model/statistic';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = 'http://localhost:3001/RegulationAliment';
  urlCreatePet = 'http://localhost:3001/pet';
  urlCreateRegulation = 'http://localhost:3001/RegulationAliment';

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
  createRegulation(data: Regulations): Observable<Regulations> {
    return this.http.post<Regulations>(this.urlCreateRegulation, data)
    .pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getFood(startDate?: string, endDate?: string): Observable<Food[]> {
    const dataCurrentStart = new Date();
    const dif = dataCurrentStart.getTimezoneOffset();
    dataCurrentStart.setHours(0 - 3, 0, 0, 0);
    const dateCurrent = dataCurrentStart.toISOString();
    const dataCurrentEnd = new Date();
    dataCurrentEnd.setHours(23 - 3, 59, 59, 999);
    const dateCurrentEnd = dataCurrentEnd.toISOString();
    
    return EMPTY;
  }

  errorHandler(e: any): Observable<any> {
    alert('Ocorreu um erro!');
    return EMPTY; //Observable vazio
  }
}
