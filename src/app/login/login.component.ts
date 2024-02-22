import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreService } from '../core/core.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent{
    title = 'eblatask';
    apiLink: string = "https://dummyjson.com/auth/login"

    constructor(private _http: HttpClient, private router: Router, private _message: CoreService) { }
    loginform = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    })

    public login() {
        let header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        let body = {
            username: this.loginform.value.username,
            password: this.loginform.value.password,
            // username: 'kminchelle',
            // password: '0lelplR',
        }

        this._http.post(this.apiLink, body, { headers: header, observe: 'response' }).subscribe(
            (response: HttpResponse<any>) => {
                console.log('Status code:', response.status);
                if (response.status == 200) {
                    this.goToHome();
                } else {
                    this._message.openSnackBar('login fail and status is' + response.status);
                }
            }, (error) => {
                console.error('Error:', error);
                this._message.openSnackBar('login fail');
        });
    }

    public goToHome() {
        this.router.navigate(['home']);
    }
}
