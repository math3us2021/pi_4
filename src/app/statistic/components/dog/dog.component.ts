import { Food } from '../../model/statistic';
import { Component, Input } from '@angular/core';
import { calcularRegressao } from 'src/app/utils/regres';
import { StatisticService } from '../../services/services.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.reduce';
import { Observable } from 'rxjs';
import { Pet, Static, WeightMonth } from '../../model/statistic';
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
  @Input() petId?: Pet;
  public weightMonth: WeightMonth[] = [];

  regressionResponse: number = 0;
  weightResponse: number[] = [];
  birthDateMonth: number = 0;

  regressionResult = {
    regressionX1: 0,
    regressionX2: 0,
    regressionY: 0
  }
  petId$?: Observable<Pet>;


  ////////statistic Peso
  weightPetStatistic: Static = {
    meanResponse: 0,
    modeResponse: 0,
    medianResponse: 0,
    stdeviationResponse: 0,
  };

  ///////statistic ração
  foodPetStatistic: Static = {
    meanResponse: 0,
    modeResponse: 0,
    medianResponse: 0,
    stdeviationResponse: 0,
  };
  ////BINOMIAL
  sucessBinomialPorcent: string = '';
  errorBinomialPorcent: string = '';
  binomialTotal: number = 0;

  chartPizza: any;
  chartLineDog: any;
  chartLineDogWeight: any;

  ngOnInit(): void {
    this.differenceInMonths();
    this.getWeightMonth();
    this.getFood();

  }

  constructor(
    private serviceStatistic: StatisticService,
    private store: Store<{ app: IAppState }>,

  ) {
    Chart.register(...registerables);
    this.petId$ = this.store.pipe(select((state) => state.app.consultpetId))
  }

  differenceInMonths() {
    this.petId$ = this.store.pipe(
      select((state) => state.app.consultpetId)
    )
  }

  regression() {

    // const x1 = this.weightMonth.map((item) => item.weight);
    // const x2 = this.weightMonth.map((item) => item.age);
    // const y = this.weightMonth.map((item) => item.foodMonth);

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
    // console.log(regressao(2, 4)); // 5.000000000000001

    // // Imprimindo os resultados
    // console.log('Coeficiente de intercepto:', coefficients[0]);
    // console.log('Coeficiente de x1:', coefficients[1]);
    // console.log('Coeficiente de x2:', coefficients[2]);
    // console.log('Coeficiente de determinação (R²):', rSquared);

  }

  getWeightMonth() {
    this.serviceStatistic.getWeigthMonth(this.petId?.id).subscribe((data) => {
      this.weightMonth = data;
      this.regression();

      this.lineDogWeight(data);
      this.lineDog(data);
      this.weightPetStatistic.meanResponse = mean(data.map((item) => item.weight));
      this.weightPetStatistic.modeResponse = mode(data.map((item) => item.weight));
      this.weightPetStatistic.medianResponse = median(data.map((item) => item.weight));
      this.weightPetStatistic.stdeviationResponse = standardDeviation(data.map((item) => item.weight));
    });
  }

  getFood() {
    this.serviceStatistic.getFood(this.petId?.id).subscribe((data) => {
      this.foodPetStatistic.meanResponse = mean(data.map((item) => item.quantity));
      this.foodPetStatistic.modeResponse = mode(data.map((item) => item.quantity));
      this.foodPetStatistic.medianResponse = median(data.map((item) => item.quantity));
      this.foodPetStatistic.stdeviationResponse = standardDeviation(data.map((item) => item.quantity));
      this.pizza(data);
    });
  }

  pizza(data: Food[]) {
    this.binomialTotal = data.length;
    const sucess = data.filter((item) => item.sucess === true).length;
    const error = data.filter((item) => item.sucess === false).length;
    this.sucessBinomialPorcent = this.porcento(sucess, this.binomialTotal);
    this.errorBinomialPorcent = this.porcento(error, this.binomialTotal);
    this.chartPizza = new Chart('pie', {
      type: 'pie',
      data: {
        labels: ['Sucesso', 'Erro'],
        datasets: [
          {
            label: 'Total de Cachorro',
            // data: [this.cat.length, this.dog.length],
            data: [sucess, error],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 13)'],

            borderColor: 'rgba(25, 99, 132, 1)',
          },
        ],
      },
    });
  }


  lineDogWeight(petTotal: WeightMonth[]) {
    const month = petTotal.map(item => item.date);
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

  lineDog(weightMont?: WeightMonth[]) {
    this.chartLineDog = new Chart('lineDog', {
      type: 'line',
      data: {
        labels: weightMont?.map(item => item.date),
        datasets: [{
          label: 'Peso do Pet',
          data: weightMont?.map(item => item.weight),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Idade (em meses)',
          data: weightMont?.map(item => item.age),
          fill: false,
          borderColor: 'rgb(765, 196, 19)',
          tension: 0.2
        }]
      },

    });
  }

  porcento(value: number, total: number): string {
    const res = (value / total) * 100;
    const result = `` + res.toFixed() + `%`;
    return result;
  }
}
