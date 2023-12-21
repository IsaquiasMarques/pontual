import { Component, OnInit } from '@angular/core';
import { PONTUAL_TEAM, PontualTeam } from '@core/mock/team.mock';

@Component({
  selector: 'pontual-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  pontualTeam: PontualTeam[] = [];

  ngOnInit(): void {
    this.pontualTeam = PONTUAL_TEAM;
  }

}
