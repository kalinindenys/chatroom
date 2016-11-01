import { Component }                from 'angular2/core';
import { ControlGroup }             from 'angular2/common';
import { FormBuilder, Validators }  from 'angular2/common';
import { CORE_DIRECTIVES }          from 'angular2/common';
import { FORM_DIRECTIVES }          from 'angular2/common';

import { AuthenticationService }    from 'authentication.service';

@Component({
    selector: 'login-form',
    templateUrl: `components/login.component.html`,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    // providers: [AuthenticationService]
})

export class LoginFormComponent {

    loginFormGroup: ControlGroup;

    serverResponse: string;

// , authService: AuthenticationService

    constructor(private formBuilder: FormBuilder) {
        this.loginFormGroup = formBuilder.group({
            login: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    doLogin(event) {
        // this.authService.login().subscribe(
        //     data => this.serverResponse = JSON.stringify(data), // put the data returned from the server in our variable
        //     error => console.log("Error HTTP GET Service"), // in case of failure show this message
        //     () => console.log("Job Done Get !")//run this code in all cases
        // );

        console.log(this.loginFormGroup.value);
        event.preventDefault();
    }

}