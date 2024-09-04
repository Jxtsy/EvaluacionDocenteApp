import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartPageRoutingModule } from './chart-routing.module';

import { ChartPage } from './chart.page';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartPageRoutingModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
  ],
  declarations: [ChartPage]
})
export class ChartPageModule {}
