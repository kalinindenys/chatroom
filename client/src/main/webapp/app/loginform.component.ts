import { Component }                from 'angular2/core';
import {
    FORM_DIRECTIVES, FormBuilder, ControlGroup, ControlArray, Validators, NgForm, Control,
    AbstractControl
} from 'angular2/common';

import { AuthenticationService }    from 'authentication.service';

@Component({
    selector: 'login-form',
    templateUrl: `components/login.component.html`,
    directives: [FORM_DIRECTIVES]
    // providers: [AuthenticationService]
})

export class LoginFormComponent {

    // loginForm: FormGroup;

    serverResponse: string;

// , authService: AuthenticationService

    constructor(formBuilder: FormBuilder) {
        this.loginForm = formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    doLogin(event) {
        // this.authService.login().subscribe(
        //     data => this.serverResponse = JSON.stringify(data), // put the data returned from the server in our variable
        //     error => console.log("Error HTTP GET Service"), // in case of failure show this message
        //     () => console.log("Job Done Get !")//run this code in all cases
        // );

        console.log(this.loginForm.value);
        // console.log(this.loginForm.controls.login.value);
        // console.log(this.loginForm.cotrols.password.value);
        event.preventDefault();
    }

}