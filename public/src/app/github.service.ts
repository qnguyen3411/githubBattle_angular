import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';

const token = "3f64a3ad12bec88fe361213b786e8209c93bd5ca"

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  cachedUsers = [];

  constructor(private _http: HttpClient){}

  cacheUser(user) {
    if (this.cachedUsers.length < 2) {
      this.cachedUsers.push(user)
    }
  }

  uncacheUser() {
    return this.cachedUsers.pop();
  }

  getUserInfo(userName) {
    return this._http.get(`https://api.github.com/users/${userName}`).toPromise()
      .then(data => {
        return {
          username: data['login'],
          avatarUrl: data['avatar_url'],
          numRepos: data['public_repos'],
          numFollowers: data['followers']
        }
      })
  }

  saveUser(userData) {
    return this._http.post('/api/users', userData)
  }

  getLeaderBoard() {
    return this._http.get('/api/users')
  }
}
