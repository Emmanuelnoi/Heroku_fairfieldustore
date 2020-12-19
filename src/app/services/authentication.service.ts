import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../models/User';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private urL: string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.urL = `https://fairfieldustorebackend-env.eba-bz9f98sd.us-east-1.elasticbeanstalk.com/api/v1`;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http.post<any>(`${this.urL}/login`, { username, password })
      .pipe(map(user => {
        if (user !== 0){
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
      }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
