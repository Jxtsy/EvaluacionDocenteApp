import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EvaluacionPageRoutingModule } from './evaluacion-routing.module';
import { EvaluacionPage } from './evaluacion.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluacionPageRoutingModule,
    HttpClientModule
  ],
  declarations: [EvaluacionPage]
})
export class EvaluacionPageModule {}
