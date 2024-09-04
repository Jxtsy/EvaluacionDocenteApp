import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotesPageRoutingModule } from './votes-routing.module';

import { VotesPage } from './votes.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotesPageRoutingModule,
    HttpClientModule
  ],
  declarations: [VotesPage]
})
export class VotesPageModule {}
