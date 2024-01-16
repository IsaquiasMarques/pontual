import { Component, OnInit } from '@angular/core';
import { AboutDataCenter } from '../../../../../core/services/data/datacenter.service';

@Component({
  selector: 'pontual-editoral-status',
  templateUrl: './editoral-status.component.html',
  styleUrls: ['./editoral-status.component.css']
})
export class EditoralStatusComponent implements OnInit {

  constructor(
    public aboutDatacenter: AboutDataCenter
  ) {}

  ngOnInit(): void {
    
  }

}
