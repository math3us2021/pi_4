import { Component, Output} from '@angular/core';
import { StatisticService } from '../services/services.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Food, Pet } from '../model/statistic';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.reduce';
import {FormGroup, FormControl} from '@angular/forms';
interface Foods {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  // @ViewChild('myDatepicker') myDatepicker!: MatDatepicker<Date>;
  selectedDate!: Date;
  // suces!: number;
  // erro!: number;
  @Output() sucess = 10;
  // public chart: any;
  public bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',
    useUtc: true,
    rangeInputFormat: 'DD/MM/YYYY'
  };

  // char: boolean = false;
  // teste = '';
  selected = 'pets';
  selectedValue!: string;
  selectedFood!: string;

  dogs: Pet[] = [];
  cats: Pet[] = [];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  start = '';
  end = '';
  dataStatistic: Food[] = []

  pet: Food[] = [];
  dog: Food[] = [];
  filterDog: boolean = false;
  filterCat: boolean = false;

  constructor(
    private statisticServices : StatisticService,
    private store: Store<{app: IAppState}>,
  ) { }

  ngOnInit(): void {}

  getFood(){
    console.log(this.selected);
    console.log(this.selectedValue);
    console.log(this.selectedFood);
  }
  onFoodSelectionChange() {
    console.log(this.selectedFood);
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
    this.statisticServices.getAllPet('dog').subscribe((data) => {
      this.filterCat = false;
      this.dogs = data;
      this.filterDog = true;
      console.log(data);
    })
  }

  getCat(){
    this.statisticServices.getAllPet('cat').subscribe((data) => {
      this.filterDog = false;
      this.cats = data;
      this.filterCat = true;
      console.log(data);
    })
  }

}







