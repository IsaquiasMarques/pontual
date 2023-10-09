import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogotypeComponent } from './components/logotype/logotype.component';

@NgModule({
  declarations: [
    LogotypeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    LogotypeComponent
  ]
})
export class SharedModule { }
