import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './container/chart.component';
import { DogComponent } from './components/dog/dog.component';

const routes: Routes = [
  {
      path: '',
      component: ChartComponent,
  },
  {
      path: 'dog/:id',
      component: DogComponent,
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class StatisticRouterModule { }
