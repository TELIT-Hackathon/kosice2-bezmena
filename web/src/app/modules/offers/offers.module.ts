import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';

@NgModule({
  declarations: [OffersComponent],
  imports: [CommonModule, SharedModule, OffersRoutingModule],
})
export class OffersModule {}
