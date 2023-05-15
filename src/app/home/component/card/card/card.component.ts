import {Component,Input, ElementRef} from '@angular/core';
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  @Input() text = '';

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll(".card"), { max: 25, speed: 300, scale: 1.30 }
    );}
}
