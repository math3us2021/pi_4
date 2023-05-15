import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/component.component';
import { CardComponent } from './component/card/card/card.component';
import { HomeRoutingModule } from './product-routing.module';
import { CardHoursComponent } from './component/card-hours/card-hours.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    CardHoursComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCheckboxModule
  ]
})
export class HomeModule { }
