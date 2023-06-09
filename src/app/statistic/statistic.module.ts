import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './container/chart.component';
import { StatisticRouterModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { CardTotalComponent } from './components/card-total/card-total.component';
import { GraphicComponent } from './components/graphic/graphic.component';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DogComponent } from './components/dog/dog.component';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    ChartComponent,
    GraphicComponent,
    CardTotalComponent,
    DogComponent

  ],
  imports: [
    CommonModule,
    StatisticRouterModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    
  ],
})
export class StatisticModule { }
