import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TeacherPageRoutingModule } from './teacher-routing.module';
import { TeacherPage } from './teacher.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [TeacherPage]
})
export class TeacherPageModule {}
