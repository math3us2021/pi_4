import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.sass']
})
export class HomeComponent {
  @ViewChild('modalCard') modalCard!: ModalComponent;

  nameCard = {
    text: 'Cadastro do Pet',
    text2: 'Recomendações',
    text3: 'Horários de Alimentação',
    text4: 'Estatísticas para Administrador',
  };

  constructor(
    private router: Router,
  ) { }


  description(){
    this.modalCard.openModal();
  }

  registerPet(){
    this.router.navigate(['/product']);
  }

  feeder(){
    this.router.navigate(['/feeder']);
  }

  statistics(){
    this.router.navigate(['/statistics']);
  }
}
