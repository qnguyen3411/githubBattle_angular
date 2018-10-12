import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  user1: Object;
  user2: Object;

  user1NameField = "";
  user2NameField = "";

  error1 = false;
  error2 = false;

  constructor(
    private _service: GithubService,
    private _router: Router){}

  ngOnInit() {
  }

  searchUser(userName, userNum) {
    this._service.getUserInfo(userName).then(data => {
      this[`user${userNum}`] = data;
      this[`error${userNum}`] = false;
    }).catch(err => {
      this[`error${userNum}`] = true;
    })
  }

  startBattle() {
    this._service.cacheUser(this.user1);
    this._service.cacheUser(this.user2);
    console.log(this._service.cachedUsers);
    this._router.navigate(['/results']);
  }

}
