import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  modalRef?: BsModalRef;
  userForm!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private authServes : AuthService
    ) {
    this.createForm();
  }

  openModal(template: TemplateRef<any>) {
    console.log("🚀 ~ file: modal.component.ts:14 ~ ModalComponent ~ openModal ~ template:", template)
    this.modalRef = this.modalService.show(template);
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', [Validators.required,
        // Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
      ]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  onSubmit(data: User, close: any) {
    // this.authServes.saveUser(data).subscribe()
    console.log("🚀 ~ file: modal.component.ts:35 ~ ModalComponent ~ onSubmit ~ data:", data)
    close();
  }
}
