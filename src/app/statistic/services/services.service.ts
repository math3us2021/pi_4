import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { Food, Pet, PetTotal } from '../model/statistic';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  getAllPet(type?: string): Observable<Pet[]> {
    let params = {};
    if (type) {
      params = { type: type };
    }
    return this.http.get<Pet[]>('http://localhost:3001/pet', {
      params: { ...params },
    });
  }

  getAllFoot(): Observable<Food[]> {
    return this.http.get<Food[]>('http://localhost:3001/food', {});
  }

  getFood(startDate?: string, endDate?: string): Observable<Food[]> {
    let params = {};
    if (startDate && endDate) {
      params = {
        dateAliment_gte: startDate,
        dateAliment_lte: endDate,
      };
    }
    return this.http.get<Food[]>('http://localhost:3001/food', {
      params: { ...params },
    });
  }

  getDogTotal(): Observable<PetTotal[]> {
    return this.http.get<PetTotal[]>('http://localhost:3001/dogTotal');
  }
  getCatTotal(): Observable<PetTotal[]> {
    return this.http.get<PetTotal[]>('http://localhost:3001/catTotal');
  }
}