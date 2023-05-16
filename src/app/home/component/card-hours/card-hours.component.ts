import { data } from './../../../statistic/model/statistic';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Regulations } from '../../model/home';

@Component({
  selector: 'app-card-hours',
  templateUrl: './card-hours.component.html',
  styleUrls: ['./card-hours.component.css']
})
export class CardHoursComponent implements OnInit{
  dateCurrent = new Date();
  checked = false;
  dates: Regulations[] = [];
  // dates: Regulations[] = [
  //   {
  //     id: 1,
  //     hourStart: '08:00',
  //     quantityGrams: 100,
  //   },
  //   {
  //     id: 2,
  //     hourStart: '12:00',
  //     quantityGrams: 100,
  //   }
  // ]
  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.homeService.getRegulation().subscribe(
      (data) => {
        this.dates = data;
      }
    );
  }


}
