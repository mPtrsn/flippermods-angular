import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChartComponent} from './chart/chart.component';
import {StartMenuComponent} from './start-menu/start-menu.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'chart/:id', component: ChartComponent},
  {path: 'home', component: StartMenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
