import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StatisticService } from '../../services/services.service';
import { Food } from '../../model/statistic';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.reduce';
import { take } from 'rxjs';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent {
  public chart: any;
  public char: any;

  coinPrice: any;
  coinName: any;
  binomialResponse: number[] = [];
  @Input() sucess!: number;
  @Input() error!: number;

  suc!: number;
  err!: number;



  constructor(
    private statisticServices: StatisticService,
    private store: Store<{ app: IAppState }>,
  ) {
    Chart.register(...registerables);

    this.store.select('app').subscribe((data) => {
      this.suc = data.sucess
      this.err = data.error
    })
    // this.coinPrice = [65, 59, 80, 81, 56, 55, 40];
    this.statisticServices.getAllPet().subscribe((data) => {
      console.log("age",data)
      this.coinPrice = data.map((item) => {
        // console.log("age",item.age)
        return item
      })
    })
    this.coinName = 'Bitcoin';
  }


  ngOnInit(): void {
    this.binomialResponse = []
    this.createChart();
    this.barra();

  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'red'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  ///update chart
  updateChart(){
    this.chart.data.datasets[0].data = ['1','1', '1', '1', '1',
                  '574', '573', '576'];
    this.chart.data.datasets[1].data = ['542', '542', '536', '327', '17',
                  '0.00', '538', '541'];
    this.chart.data.datasets[2].data = ['542', '542', '536', '327', '17',
                  '0.00', '538', '541'];
    this.chart.update();
  }


  teste() {
    this.store.select('app').subscribe((data) => {
      console.log("redux", data.sucess)
    })
  }

  binomial() {
    // const sucess = data.filter((food) => food === true).length
    // const fail = data.filter((food) => food === false).length
    // this.binomialResponse = [ this.sucess, this.error]

    this.chart = new Chart('p', {
      type: 'pie',
      data: {
        labels: ['Sucesso', 'Falha'],
        datasets: [{
          label: "Binomial",
          data: [this.suc, this.err],
          // data: [this.sucess, this.error],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          // borderColor: 'rgba(255, 99, 132, 1)'
        }]
      },
    });
  }
updateBarra(){
  this.char.data.datasets[0].data = [{
    x: 1,
    y: 2
  }, {
    x: 5,
    y: 1
  }, {
    x: 6,
    y: 9

  }];
  this.char.update();
}

  barra() {
    this.char = new Chart('bar', {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March',],
        datasets: [{
          label: "Teste",
          data: [{
            x: 10,
            y: 20
          }, {
            x: 15,
            y: 10
          }, {
            x: 20,
            y: 25

          }],
          backgroundColor: 'rgba(25, 99, 132, 0.2)',
          borderColor: 'rgba(25, 99, 132, 1)'
        }]
      },
    });
  }

  // pizza() {
  //   this.chart = new Chart('pie', {
  //     type: 'pie',
  //     data: {
  //       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //       datasets: [{
  //         label: this.coinName,
  //         data: this.coinPrice,
  //         backgroundColor: [
  //           'rgb(255, 99, 132)',
  //           'rgb(54, 162, 235)',
  //           'rgb(255, 205, 86)',
  //           'rgb(75, 192, 192)',
  //           'rgb(153, 102, 255)',
  //           'rgb(255, 159, 64)',
  //           'rgb(255, 99, 13)'
  //         ],

  //         borderColor: 'rgba(255, 99, 132, 1)'
  //       }]
  //     },
  //   });
  // }


  line() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: this.coinName,
          data: this.coinPrice,
          borderWidth: 1,
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
        }]
      },
    });
  }
}


