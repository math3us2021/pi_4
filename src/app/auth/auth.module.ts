import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthComponent } from './component/auth/auth.component';
import { ModalComponent } from './component/modal/modal.component';

import { ModalModule } from 'ngx-bootstrap/modal'
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AuthComponent,
    ModalComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ModalModule.forRoot(),


  ],
  providers: [],
})
export class AuthModule { }
