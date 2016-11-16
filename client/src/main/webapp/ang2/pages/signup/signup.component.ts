import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {AuthenticationService} from "../../app/authentication.service";

@Component({
    selector: 'sign-up',
    templateUrl: './signup.component.html',
})
export class SignupComponent {

    form: FormGroup;
    login: FormControl;
    password: FormControl;
    passwordConfirmation: FormControl;

    public SignupComponent(authService: AuthenticationService, router: Router) {

    }

    private signUp() {

    }

    private initForm() {
        this.login = new FormControl('', Validators.compose([
            Validators.required,
        ]));
        this.password = new FormControl('', Validators.compose([
            Validators.required,
        ]));
        this.passwordConfirmation = new FormControl('', Validators.compose([
            Validators.required,
        ]));

        this.form = new FormGroup({
            login: this.login,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation,
        }, );
    }

    private passwordsMatch() {

    }


}