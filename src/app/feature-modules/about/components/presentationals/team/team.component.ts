import { Component, OnInit } from '@angular/core';
import { PONTUAL_TEAM, PontualTeam } from '@core/mock/team.mock';
import { AboutDataCenter } from '../../../../../core/services/data/datacenter.service';
import { pontualTeamDataTransformer } from '../../../services/transformer/team';

@Component({
  selector: 'pontual-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  pontualTeam: PontualTeam[] = [];

  constructor(
    private aboutDataCenter: AboutDataCenter
  ) {}

  ngOnInit(): void {
    this.aboutDataCenter.team.subscribe({
      next: (team: any[]) => {
        this.pontualTeam = pontualTeamDataTransformer(team);
      }
    });
  }

}
