import { Component, OnInit } from '@angular/core';
import { AboutDataCenter } from '../../../../../core/services/data/datacenter.service';

@Component({
  selector: 'pontual-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(
    public aboutDataCenter: AboutDataCenter
  ) {}

  ngOnInit(): void {
    
  }

}
