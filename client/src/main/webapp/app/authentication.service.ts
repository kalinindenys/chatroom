import {Injectable}                 from '@angular/core';
import {Http, Response}             from '@angular/http';
import {Headers, RequestOptions}    from '@angular/http';
import {Observable}                 from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

    private loggedIn = false;

    constructor(private http: Http) {

    }

    public login(login: string, password: string) {
        let loginUrl = "/login";

        let body = JSON.stringify({ "login": login, "password": password });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        return this.http.post(loginUrl, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    public isLoggedIn() {
        return this.loggedIn;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }

}