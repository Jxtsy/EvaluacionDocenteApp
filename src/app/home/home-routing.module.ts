import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'teacher',
        loadChildren: () => import('../page/teacher/teacher.module').then(m => m.TeacherPageModule)
      },
      {
        path: 'chart',
        loadChildren: () => import('../page/chart/chart.module').then(m => m.ChartPageModule)
      },
      {
        path: 'votes',
        loadChildren: () => import('../page/votes/votes.module').then(m => m.VotesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
