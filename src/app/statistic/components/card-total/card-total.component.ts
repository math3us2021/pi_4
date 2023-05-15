import { PetTotal, data } from './../../model/statistic';
import { Component } from '@angular/core';
import { Food, Pet } from '../../model/statistic';
import { mean, median, mode, standardDeviation, sampleKurtosis, binomialDistribution } from 'simple-statistics';
import { StatisticService } from '../../services/services.service';
import { Chart, registerables } from 'chart.js';
import { filter, map, take } from 'rxjs';

interface Static {
  meanResponse: number;
  modeResponse: number;
  medianResponse: number;
  stdeviationResponse: number;
}

@Component({
  selector: 'app-card-total',
  templateUrl: './card-total.component.html',
  styleUrls: ['./card-total.component.css']
})
export class CardTotalComponent {
  staticFood: Static = {
    meanResponse: 0,
    modeResponse: 0,
    medianResponse: 0,
    stdeviationResponse: 0,
  };

  meanResponse!: number;
  modeResponse: number = 0;
  medianResponse: number = 0;
  stdeviationResponse!: number;
  assimetricResponse: number = 0;
  kurtosisResponse: number = 0;
  binomialResponse: number[] = [];
  modeCard = {
    dog: 0,
    cat: 0,
  }

  petTotal: number;
  pet: Food[] = [];

  dog: Pet[] = [];
  dogPorcent: string = '';
  dogTotal: number = 0;
  dogBreed: PetTotal[] = [];

  cat: Pet[] = [];
  catPorcent: string = '';
  catTotal: number = 0;
  catBreed: PetTotal[] = [];

  food: Food[] = [];
  foodSucess: Food[] = [];
  foodTotal: number = 0;

  chartBinomial: any;
  sucessBinomialPorcent: string = '';
  errorBinomialPorcent: string = '';

  chartPizza: any;
  chartPizzaTotal = 'Total de PET';

  chartBarra: any;
  chartBarraTotal = 'Total de Cachorro';

  chartCatBarra: any;
  chartCatBarraTotal = 'Total de Cachorro';

  constructor(
    private statisticServices: StatisticService,

  ) {
    Chart.register(...registerables);
    this.petTotal = this.pet.length;
  }

  ngOnInit(): void {
    this.statisticServices.getAllPet().subscribe((data) => {
      this.petTotal = data.length;
      data.map((item) => {
        item.type === 'cat' ? this.cat.push(item) : this.dog.push(item)
      })
      this.pizza(this.dog.length, this.cat.length);

      this.dogTotal = this.dog.length;
      this.catTotal = this.cat.length;

      this.dogPorcent = this.porcento(this.dog.length, this.petTotal);
      this.catPorcent = this.porcento(this.cat.length, this.petTotal);
    })

    this.statisticServices.getDogTotal().subscribe((data) => {
      this.dogBreed = data;
      this.modeCard.dog = this.maxArray(data);
      this.barraDog(data);
    })

    this.statisticServices.getCatTotal().subscribe((data) => {
      this.catBreed = data;
      this.modeCard.cat = this.maxArray(data);
      this.barraCat(data);
    })
    this.getFoot();
  }

  maxArray(pets: PetTotal[]) {
    const array = pets.map((item) => {
      return item.quantity;
    })
    return Math.max(...array);
  }

getFoot() {
  this.statisticServices.getFood().pipe(
    map((data) => {
      data.map((item) => {
        item.sucess === true ? this.foodSucess.push(item) : null;
        this.food = data;
        this.foodTotal = data.length;
      })
      return data;
    })
  ).subscribe((data) => {
    const error = this.foodTotal - this.foodSucess.length;
    const sucess = this.foodSucess.length;
    this.binomialSucess(sucess, error);
    this.sucessBinomialPorcent = this.porcento(sucess, this.foodTotal);
    this.errorBinomialPorcent = this.porcento(error, this.foodTotal);
  })
  }

  statisticDescriptionDog(){
    
  }


  porcent() {
    //total de cachorro
    ///qtd de raça utilizada
    ///array de raça
    ///qtd de raça utilizada / total de cachorro
  }

  updatePizza() {
    console.log("🚀 ~ file: card-total.component.ts:77 ~ CardTotalComponent ~ updatePizza ~ this.cat.length", this.cat.length, this.dog.length)
    this.chartPizza.data.datasets[0].data = [this.cat.length, this.dog.length];
    this.chartPizza.update();
  }

  pizza(dog: number, cat: number) {
    this.chartPizza = new Chart('pie', {
      type: 'pie',
      data: {
        // labels: ['Cachorro', 'Gato'],
        datasets: [{
          label: "this.chartPizzaTotal",
          // data: [this.cat.length, this.dog.length],
          data: [cat, dog],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 13)'
          ],

          borderColor: 'rgba(25, 99, 132, 1)'
        }]
      },
    });
  }

  binomialSucess(sucess: number, error: number) {
    console.log("🚀 ~ file: card-total.component.ts:160 ~ CardTotalComponent ~ binomialSucess ~ sucess:", sucess)

    this.chartBinomial = new Chart('binomial', {
      type: 'pie',
      data: {
        // labels: ['Cachorro', 'Gato'],
        datasets: [{
          label: "this.chartPizzaTotal",
          // data: [this.cat.length, this.dog.length],
          data: [sucess, error],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 13)'
          ],

          borderColor: 'rgba(25, 99, 132, 1)'
        }]
      },
    });
  }

  barraCat(petTotal: PetTotal[]) {
    console.log("🚀 ~ file: card-total.component.ts:117 ~ CardTotalComponent ~ barra ~ petTotal:", petTotal)

    this.chartCatBarra = new Chart('barCat', {
      type: 'bar',
      data: {
        labels: petTotal.map((item) => item.name),
        datasets: [{
          label: this.chartBarraTotal,
          data: petTotal.map((item) => item.quantity),
          backgroundColor: 'rgba(2, 99, 13, 0.2)',
          borderColor: 'rgba(25, 99, 13, 1)'
        }]
      },
    });
  }

  barraDog(petTotal: PetTotal[]) {
    console.log("🚀 ~ file: card-total.component.ts:114 ~ CardTotalComponent ~ barra ~ petTotal:", petTotal)

    this.chartBarra = new Chart('bar', {
      type: 'bar',
      data: {
        labels: petTotal.map((item) => item.name),
        datasets: [{
          label: this.chartBarraTotal,
          data: petTotal.map((item) => item.quantity),
          backgroundColor: 'rgba(2, 99, 13, 0.2)',
          borderColor: 'rgba(25, 99, 13, 1)'
        }]
      },
    });
  }

  updateBarraDog() {
    this.chartBarra.data.datasets[0].data = [2,6,7,5,2];
    this.chartBarra.update();
  }

  porcento(value: number, total: number): string {
    const res = (value / total) * 100
    const result = `` + res.toFixed() + `%`
    return result
  }


  mean(dataStatictis: Food[]) {
    this.meanResponse = mean(dataStatictis.map((food) => food.quantity)
    )
  }

  mode(dataStatictis: Food[]) {
    this.modeResponse = mode(dataStatictis.map((food) => food.quantity))
  }

  median(dataStatictis: Food[]) {
    this.medianResponse = median(dataStatictis.map((food) => food.quantity))
  }

  stdeviation(dataStatictis: Food[]) {
    this.stdeviationResponse = standardDeviation(dataStatictis.map((food) => food.quantity))
  }

  kurtosis(dataStatictis: Food[]) {
    const data = dataStatictis.map((food) => food.quantity)
    console.log("🚀 ~ file: chart.component.ts:149 ~ ChartComponent ~ kurtosis ~ data:", data)
    this.kurtosisResponse = sampleKurtosis(data)
  }



}
