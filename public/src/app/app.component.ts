import { Component } from '@angular/core';
import { GithubService } from './github.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  constructor(private _service: GithubService){
    this.fetctUser()
  }

  fetctUser() {
    this._service.getUserInfo('qnguyen3411').then(data => {
      console.log(data)
    }).catch(err => {
      console.log("NOPE")
    })
  }
}
