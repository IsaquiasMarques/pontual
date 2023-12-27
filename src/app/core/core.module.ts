import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/presentationals/header/header.component';
import { NavigationComponent } from './components/presentationals/navigation/navigation.component';

import { TranslatorPipe } from './pipes/date/translator.pipe';
import { SharedModule } from '@shared/shared.module';
import { CoreFacade } from './facades/core.facade';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApiService } from './api/api.service';
import { TwoDigitsFormaterPipe } from './pipes/two-digits/two-digits-formater.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutDataCenter } from './services/data/datacenter.service';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    TranslatorPipe,
    TwoDigitsFormaterPipe
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CoreFacade,
    ApiService,
    AboutDataCenter
  ]
})
export class CoreModule { }
