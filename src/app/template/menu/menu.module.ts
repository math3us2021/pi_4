import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './component/menu/menu.component';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
