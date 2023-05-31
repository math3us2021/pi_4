import { Component } from '@angular/core';
import { calcularRegressao } from 'src/app/utils/regres';
import { StatisticService } from '../../services/services.service';
import { differenceInMonths } from 'date-fns';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.reduce';
import { Observable } from 'rxjs';
import { PetTotal, Static, WeightMonth } from '../../model/statistic';
import { Chart, registerables } from 'chart.js';
import {
  mean,
  median,
  mode,
  standardDeviation,
} from 'simple-statistics';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent {
  regressionResponse: number = 0;
  weightResponse: number[] = [];
  birthDateMonth: number = 0;
  regressionResult = {
    regressionX1: 0,
    regressionX2: 0,
    regressionY: 0
  }
  petId$?: Observable<string>;


 ////////statistic Peso
 staticFood: Static = {
  meanResponse: 0,
  modeResponse: 0,
  medianResponse: 0,
  stdeviationResponse: 0,
};
///////statistic ração
meanResponse!: number;
modeResponse: number = 0;
medianResponse: number = 0;
stdeviationResponse!: number;
assimetricResponse: number = 0;
kurtosisResponse: number = 0;
binomialResponse: number[] = [];

chartBarra: any;
chartBarraTotal = 'Total de Cachorro';

chartLineDog: any;
chartLineDogLabel = 'Peso do cachorro';

chartLineDogWeight: any;
chartLineDogWeightLabel = 'Peso do Pet';

  ngOnInit(): void {
    this.differenceInMonths();
    this.regression();
    this.getWeightMonth();
  }

  constructor(
    private serviceStatistic: StatisticService,
    private store: Store<{ app: IAppState }>,

  ) {Chart.register(...registerables);}

  differenceInMonths(){
    this.petId$ = this.store.pipe(select((state) => state.app.consultpetId))
    this.petId$.subscribe((data) => {
      this.serviceStatistic.getAllPet({
      id: data
    }).subscribe((data) => {
      data.map((item) => {
    })

        // this.weightResponse.push(item.weight)
      });
    })
      // this.birthDateMonth = differenceInMonths(new Date(), new Date(item.birthdate))

  }

  regression() {
    this.serviceStatistic.getWeigthMonth().subscribe((data) => {
      const weightY = data.map((item) => {
        item.weight;
      });
    });

    const x1: number[] = [1, 2, 3, 4, 5]; //peso do pet
    const x2: number[] = [2, 4, 5, 4, 5]; //idade do pet
    const y: number[] = [3, 5, 6, 6, 7]; //qtd de comida


    // const { coefficients, rSquared } = calcularRegressaoMultiple(x1, x2, y);
    const coefficients = calcularRegressao(x1, x2, y);
    this.regressionResult.regressionY = coefficients[0]
    this.regressionResult.regressionX1 = coefficients[1]
    this.regressionResult.regressionX2 = coefficients[2]

    ///função de regressão
    const regressao = (x1: number, x2: number) => {
      return coefficients[0] + coefficients[1] * x1 + coefficients[2] * x2;
    };
    this.regressionResponse = regressao(2, this.birthDateMonth);
    console.log(regressao(2, 4)); // 5.000000000000001

    // Imprimindo os resultados
    console.log('Coeficiente de intercepto:', coefficients[0]);
    console.log('Coeficiente de x1:', coefficients[1]);
    console.log('Coeficiente de x2:', coefficients[2]);
    // console.log('Coeficiente de determinação (R²):', rSquared);

  }

  getWeightMonth() {
    this.serviceStatistic.getWeigthMonth().subscribe((data: WeightMonth[]) => {
      data.map((item) => {
        const weights = data.map(item => item.weight);
        this.staticFood.meanResponse = mean(weights);
        this.staticFood.modeResponse = mode(weights);
        this.staticFood.medianResponse = median(weights);
        this.staticFood.stdeviationResponse = standardDeviation(weights);
      });
      this.lineDog();
      this.lineDogWeight(data);
    })
  }

  barraDog(petTotal: PetTotal[]) {
    console.log(
      '🚀 ~ file: card-total.component.ts:114 ~ CardTotalComponent ~ barra ~ petTotal:',
      petTotal
    );

    this.chartBarra = new Chart('bar', {
      type: 'bar',
      data: {
        labels: petTotal.map((item) => item.name),
        datasets: [
          {
            label: this.chartBarraTotal,
            data: petTotal.map((item) => item.quantity),
            backgroundColor: 'rgba(2, 99, 13, 0.2)',
            borderColor: 'rgba(25, 99, 13, 1)',
          },
        ],
      },
    });
  }

  updateBarraDog() {
    this.chartBarra.data.datasets[0].data = [2, 6, 7, 5, 2];
    this.chartBarra.update();
  }

  lineDogWeight(petTotal: WeightMonth[]) {
    const month = petTotal.map(item => item.date);
    const weights = petTotal.map(item => item.weight);
    const width = petTotal.map(item => item.width);
    const height = petTotal.map(item => item.height);
    this.chartLineDogWeight = new Chart('lineDogWeight', {
      type: 'line',
      data: {
        labels: month,
        datasets: [{
          label: 'Comprimento do Pet',
          data: width,
          fill: false,
          borderColor: 'rgb(7, 19, 192)',
          tension: 0.1
        }, {
          label: 'Largura do Pet',
          data: height,
          fill: false,
          borderColor: 'rgb(7, 19, 19)',
          tension: 0.2
        }

        ]
      },
    });
  }

  lineDog(petTotal?: PetTotal[]) {
    this.chartLineDog = new Chart('lineDog', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: this.chartLineDogLabel,
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
    });
  }
}
