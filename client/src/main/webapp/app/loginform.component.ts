import { Component } from '@angular/core';
import { ControlGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService }    from './authentication.service';

@Component({
    selector: 'signIn-form',
    templateUrl: `pages/login.component.html`
})

export class LoginFormComponent {

    loginForm: ControlGroup;

    serverResponse: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {
        this.loginForm = formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    doLogin(event) {
        this.authService.login(this.loginForm.controls['login'].value, this.loginForm.controls['password'].value)
            .subscribe(result => {
                if (result) {
                    this.router.navigate(['secured']);
                }
            }
        );

        event.preventDefault();
    }

}