import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { Interval, Regulations } from '../../model/home';

@Component({
  selector: 'app-reminder-hours',
  templateUrl: './reminder-hours.component.html',
  styleUrls: ['./reminder-hours.component.css']
})
export class ReminderHoursComponent {
  @ViewChild('template') modal!: TemplateRef<any>;
  modalRef?: BsModalRef;
  userForm!: FormGroup;
  mytime: Date = new Date();

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private homeServes: HomeService
  ) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      hourStart: ['', Validators.required],
      quantity: ['', [Validators.required]],
    });
  }

  foods: Interval[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  openModal() {
    console.log('openModal')
    this.modalRef = this.modalService.show(this.modal);
  }
  closeModal() {
    console.log('closeModal');
    this.modalRef?.hide();
  }

  onSubmit(data: Regulations) {
    const hoursFood = new Date(data.hourStart);
    const hour = hoursFood.getHours().toString().padStart(2, '0') + ':' +
    hoursFood.getMinutes().toString().padStart(2, '0') + ':' +
    hoursFood.getSeconds().toString().padStart(2, '0');

    this.homeServes.createRegulation({
      hourStart: hour,
      quantityGrams: data.quantityGrams,
    }).subscribe((res) => {
    this.modalRef?.hide();
      alert('Pet cadastrado com sucesso!');
    })
  }
}
