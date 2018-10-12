import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  users = []
  constructor( private _service: GithubService ){}

  ngOnInit() {
    this._service.getLeaderBoard().toPromise()
    .then(response => {
      this.users = (response['data'] as Array<Object>)
        .map(user => ({
          username: user['username'],
          avatarUrl: user['avatarUrl'],
          score: (user['numRepos'] + user['numFollowers']) * 12 })
        ).sort((a , b) => a['score'] < b['score'] ? 1 : -1)

      console.log(this.users)
    }).catch(err => {
      console.log(err)
    })
  }

}
