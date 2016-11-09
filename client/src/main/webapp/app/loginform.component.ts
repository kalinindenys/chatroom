import { Component }                from '@angular/core';
import {ControlGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService }    from './authentication.service';

@Component({
    selector: 'signIn-form',
    templateUrl: `pages/login.component.html`,
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
        this.authService.login(this.loginForm.controls['login'].value, this.loginForm.controls['password'].value).subscribe(
            data => this.serverResponse = JSON.stringify(data), // put the data returned from the server in our variable
            error => console.log("Service response error"), // in case of failure show this message
            () => console.log("Job Done Get !")//run this code in all cases
        );

        event.preventDefault();
    }

}