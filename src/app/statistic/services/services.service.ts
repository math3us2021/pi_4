import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { Food, Pet, PetParams, PetTotal, WeightMonth } from '../model/statistic';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) { }

  getAllPet(item?: PetParams): Observable<Pet[]> {
    console.log("🚀 ~ file: services.service.ts:13 ~ StatisticService ~ getAllPet ~ item:", item)
    let params = {};
    if (item?.params) {
      params = { type: item.params };
    }
    if (item?.id) {
      return this.http.get<Pet[]>(`http://localhost:3001/pet/${item.id}`);
    } else {
      return this.http.get<Pet[]>('http://localhost:3001/pet', {
        params: { ...params },
      });
    }
  }

  getAllFoot(): Observable<Food[]> {
    return this.http.get<Food[]>('http://localhost:3001/food', {});
  }

  getFood(petId?:string): Observable<Food[]> {
    let params = {};
    if (petId) {
      params = { petId: petId };
    }
    // if (startDate && endDate) {
    //   params = {
    //     dateAliment_gte: startDate,
    //     dateAliment_lte: endDate,
    //   };
    // }

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

  getWeigthMonth(id?:string): Observable<WeightMonth[]> {
    if (id) {
      console.log("entrei no getID")
      return this.http.get<WeightMonth[]>(`http://localhost:3001/weightMonth/${id}`);
    }
    return this.http.get<WeightMonth[]>('http://localhost:3001/weightMonth');
  }
}
