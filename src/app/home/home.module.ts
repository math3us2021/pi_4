import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './component/component.component';
import { CardComponent } from './component/card/card/card.component';
import { HomeRoutingModule } from './product-routing.module';
import { CardHoursComponent } from './component/card-hours/card-hours.component';

import { ModalComponent } from './component/modal/modal.component';

import { ModalModule } from 'ngx-bootstrap/modal'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ReminderHoursComponent } from './component/reminder-hours/reminder-hours.component';

@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    CardHoursComponent,
    ModalComponent,
    ReminderHoursComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    TimepickerModule.forRoot(),
  ]
})
export class HomeModule { }
