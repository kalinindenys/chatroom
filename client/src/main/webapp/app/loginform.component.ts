import { Component }                from 'angular2/core';
import {ControlGroup,FormBuilder, Validators } from 'angular2/common';
import {CORE_DIRECTIVES} from 'angular2/common';
import {FORM_DIRECTIVES} from 'angular2/common';

import { AuthenticationService }    from './authentication.service';

@Component({
    selector: 'login-form',
    templateUrl: `pages/login.component.html`,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [AuthenticationService]
})

export class LoginFormComponent {

    loginForm: ControlGroup;

    serverResponse: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) {
        this.loginForm = formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    doLogin(event) {
        this.authService.login(this.loginForm.login, this.loginForm.password).subscribe(
            data => this.serverResponse = JSON.stringify(data), // put the data returned from the server in our variable
            error => console.log("Error HTTP GET Service"), // in case of failure show this message
            () => console.log("Job Done Get !")//run this code in all cases
        );

        console.log(this.loginForm.value);
        event.preventDefault();
    }

}