import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Subscription} from "rxjs";
import {SpinnerService} from "../../spinner-cp/spinner.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // disableField: boolean = false;
  authSubscription: Subscription;
  _response;
  hidePass = true;
  password: String

  constructor(private router: Router, private spinnerService : SpinnerService ,private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  onLogin(form: NgForm) {
    this.spinnerService.requestStarted();
    this.authService.authenticateUser({
      username: form.value.username,
      password: form.value.password,
    });
    
    this.authSubscription = this.authService.authData.subscribe(data => {
      this._response = data;
      if(this._response.error){
        this._response = data.error;
        console.log(this._response)
        this.router.navigate(['/login'])
        this.spinnerService.requestEnded();
      }else{
        this.authService.getWalletBalance(this._response.data.wallet.address);
        this.router.navigate(['/'])
        this.spinnerService.requestEnded();
      }
    });

  }

  // checkTextArea(usernameInput: NgModel, emailInput: NgModel) {
  //   console.log(usernameInput.value)
  //   if (usernameInput.value !== '' && emailInput.value !== '') {
  //     console.log('in login ...')
  //     this.disableField = true;
  //   }
  // }

  ngOnDestroy() {
    if (this.authSubscription !== undefined)
      this.authSubscription.unsubscribe();
  }
}
