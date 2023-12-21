import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/container/about.component';
import { EditoralStatusComponent } from './components/presentationals/editoral-status/editoral-status.component';
import { ContactsComponent } from './components/presentationals/contacts/contacts.component';
import { TeamComponent } from './components/presentationals/team/team.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      { path: 'editoral-status', component: EditoralStatusComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'team', component: TeamComponent }
    ],
  },
  // {
  //   path: '', redirectTo: '/editoral-status', pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
