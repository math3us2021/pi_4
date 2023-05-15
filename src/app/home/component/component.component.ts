import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.sass']
})
export class HomeComponent {
  nameCard = {
    text: 'Detalhes do Pet',
    text2: 'Recomendações',
    text3: 'Horários de Alimentação',
    text4: 'Programar Alimentador',
  };

  constructor(
    private router: Router,
  ) { }


  description(){
    this.router.navigate(['/description']);
  }

  registerPet(){
    this.router.navigate(['/product']);
  }

  feeder(){
    this.router.navigate(['/feeder']);
  }
}
