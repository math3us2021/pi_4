import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pet } from 'src/app/auth/model/user';
import { HomeService } from '../../services/home.service';
// import { User } from '../../model/user';
// import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @ViewChild('template') modal!: TemplateRef<any>;
  modalRef?: BsModalRef;
  userForm!: FormGroup;
  selected = 'option2';
  public bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',
    useUtc: true,
    rangeInputFormat: 'DD/MM/YYYY'
  };


  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private homeServes : HomeService
    ) {
    this.createForm();
  }

  onSelectionChange(event: any) {}

  openModal() {
    // console.log("🚀 ~ file: modal.component.ts:14 ~ ModalComponent ~ openModal ~ template:", template)
    this.modalRef = this.modalService.show(this.modal);
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', [Validators.required]],
      breed: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      weight: ['']
    });
  }

  onSubmit(data: Pet, close: any) {
    this.homeServes.createPet(data).subscribe((res) => {
      close();
      alert('Pet cadastrado com sucesso!');
    })
  }
}
