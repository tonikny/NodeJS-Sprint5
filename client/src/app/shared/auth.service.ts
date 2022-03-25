import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = environment.REST_SERVER_URL;
  //headers = new HttpHeaders().set('Content-Type', 'application/json');
  tokenData: any;

  constructor(private http: HttpClient, public router: Router) {}

  // Register
  register(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Login
  login(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        sessionStorage.setItem('access_token', res.token);
        // this.getUser(res.id).subscribe((res) => {
        this.tokenData = this.decodeToken(res.token);
        // console.log('currentUserData', this.tokenData);
        console.log('login:', res);

        // sessionStorage.setItem('userId', res.id);
        // sessionStorage.setItem('nom', res.nom);
        this.router.navigate(['xat/']); // + res.id]);
        // });
      });
  }

  getUserTokenData() {
    // const { nom } = this.tokenData;
    const token = sessionStorage.getItem('access_token')!;
    this.tokenData = this.decodeToken(token);
    console.log(this.tokenData);
    return this.tokenData;
  }

  getToken() {
    return sessionStorage.getItem('access_token');
  }

  decodeToken(token: string): Object {
    const _decodeToken = (token: string) => {
      try {
        return JSON.parse(atob(token));
      } catch {
        return;
      }
    };
    return token
      .split('.')
      .map((token) => _decodeToken(token))
      .reduce((acc, curr) => {
        if (!!curr) acc = { ...acc, ...curr };
        return acc;
      }, Object.create(null));
  }

  get isLoggedIn(): boolean {
    //let authToken = sessionStorage.getItem('access_token');
    let authToken = sessionStorage.getItem('access_token');
    //console.log('isLoggedIn:', authToken);
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = sessionStorage.removeItem('access_token');
    //let removeToken = sessionStorage.removeItem('userId');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  // User profile
  getUser(id: any): Observable<any> {
    let api = `${this.endpoint}/users/${id}`;
    return this.http.get(api).pipe(
      map((res) => {
        // console.log('res', res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(error);

    return throwError(() => new Error(msg));
  }
}
