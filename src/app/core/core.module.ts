import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/presentationals/header/header.component';
import { NavigationComponent } from './components/presentationals/navigation/navigation.component';

import { TranslatorPipe } from './pipes/date/translator.pipe';
import { SharedModule } from '@shared/shared.module';
import { CoreFacade } from './facades/core.facade';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    TranslatorPipe
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    NavigationComponent
  ],
  providers: [
    CoreFacade
  ]
})
export class CoreModule { }
