import {Injectable}                 from 'angular2/core';
import {Http, Response}             from 'angular2/http';
import {Headers, RequestOptions}    from 'angular2/http';
import {Observable}                 from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {

    }

    public login(login: string, password: string) {
        let loginUrl = "/login";

        let body = JSON.stringify({ "login": login, "password": password });
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        return this.http.post(loginUrl, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }

}