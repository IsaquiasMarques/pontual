import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/container/about.component';
import { EditoralStatusComponent } from './components/presentationals/editoral-status/editoral-status.component';
import { ContactsComponent } from './components/presentationals/contacts/contacts.component';
import { TeamComponent } from './components/presentationals/team/team.component';


@NgModule({
  declarations: [
    AboutComponent,
    EditoralStatusComponent,
    ContactsComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
