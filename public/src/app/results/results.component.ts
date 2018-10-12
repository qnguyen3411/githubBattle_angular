import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  winner: Object;
  loser: Object;
  constructor(
    private _service: GithubService,
    private _router: Router){}

  ngOnInit() {
    console.log(this._service.cachedUsers);
    const user2 = this._service.uncacheUser()
    const user1 = this._service.uncacheUser()
    if (user1 && user2) {
      this.resolveBattle(user1, user2);
    } else {
      this._router.navigate(['/'])
    }
  }

  resolveBattle(user1, user2) {
    const user1Score = this.getScore(user1)
    const user2Score = this.getScore(user2)
    this.winner = (user1Score > user2Score) ? user1 : user2;
    this.loser = (user1Score > user2Score) ? user2 : user1;

    this._service.saveUser(this.winner).subscribe()
    this._service.saveUser(this.loser).subscribe()
  }

  getScore(user) {
    return (user['numRepos'] + user['numFollowers']) * 12;
  }

}
