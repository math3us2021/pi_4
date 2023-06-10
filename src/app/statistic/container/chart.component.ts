import { Router } from '@angular/router';
import { Component, Output} from '@angular/core';
import { StatisticService } from '../services/services.service';
import { Food, Pet } from '../model/statistic';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.reduce';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Output() sucess = 10;

  public petInfo?: Pet;
  selected = 'pets';

  dogs: Pet[] = [];
  cats: Pet[] = [];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  pet: Food[] = [];
  dog: Food[] = [];
  filterDog: boolean = false;
  filterCat: boolean = false;

  constructor(
    private statisticServices : StatisticService,
    private store: Store<{app: IAppState}>,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getDogs();
    this.getCat();
  }

  getFood(){
    console.log(this.petInfo?.id);
    this.route.navigate([`/statistics/dog/${this.petInfo?.id}`])
  }


  onSelectionChange(event: string) {

    switch (this.selected) {
      case 'dog':
        this.getDogs();
        break;
      case 'cat':
        this.getCat();
        break;
      case 'pets':
        this.filterDog = false;
  }
}

  getDogs(){
    this.statisticServices.getAllPet({
      params: 'dog'
    }).subscribe((data) => {
      this.filterCat = false;
      this.dogs = data;
      this.filterDog = true;
      console.log(data);
    })
  }

  getCat(){
    this.statisticServices.getAllPet({params: 'cat'}).subscribe((data) => {
      this.filterDog = false;
      this.cats = data;
      this.filterCat = true;
      console.log(data);
    })
  }

}







