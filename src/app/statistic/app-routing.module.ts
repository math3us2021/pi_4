import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './container/chart.component';

const routes: Routes = [
  {
      path: '',
      component: ChartComponent,
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class StatisticRouterModule { }
