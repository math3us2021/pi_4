import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { ReminderHoursComponent } from './reminder-hours/reminder-hours.component';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.sass']
})
export class HomeComponent {
  @ViewChild('modalCard') modalCard!: ModalComponent;
  @ViewChild('modalReminder') modalReminder!: ReminderHoursComponent;

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

  register(){
    this.modalReminder.openModal();
  }

  feeder(){
    this.router.navigate(['/feeder']);
  }

  statistics(){
    this.router.navigate(['/statistics']);
  }
}
