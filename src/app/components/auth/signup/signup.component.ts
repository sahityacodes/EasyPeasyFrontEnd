import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Subscription} from "rxjs";
import {User_roles} from "../model/user_roles";
import {DatePipe} from "@angular/common";

interface countryCode {
  code: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  // roles: string[] = ['user', 'admin', 'help desk']
  selected_roles: string[];
  userRolesModel: User_roles = new class implements User_roles {
    role_admin: boolean;
    role_helpdesk: boolean;
    role_user: boolean;
  }

  public account = {
    password: null
  }
  selectedCode: string;
  maxDate;
  public barLabel: string = 'Password strength:';
  _response;
  authSubscription: Subscription;
  hidePass = true;
  hidePass1 = true;
msgEmail:string;
  msgPass:string;
  msgUserName:string;
  msgMobile:string;
  msgName:string;
  msgFis:string;
  constructor(private authService: AuthService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.selected_roles = new Array<string>();
    this.userRolesModel.role_helpdesk = false;
    this.userRolesModel.role_admin = false;
    this.userRolesModel.role_user = false;
    this.msgEmail=""
    this.msgPass=""
    this.msgUserName=""
    this.msgMobile=""
    this.msgName=""
    this.msgFis=""
  }
  validation(   res ){

 if(res.result == 'fail'){



   (res.message=="codiceFiscale Length is 16 and Only Number and alphabet")? this.msgFis=res.message:this.msgFis="";
    (res.message== "codiceFiscale Already Taken")? this.msgFis=res.message:this.msgFis="";
    (res.message== "email format is not valid" )? this.msgEmail=res.message:this.msgEmail="";
    (res.message=="email Already Taken")? this.msgEmail=res.message:this.msgEmail="";
    (res.message==  "password is not valid (Must have upper/lower case , specific char)")? this.msgPass=res.message:this.msgPass="";
    (res.message=="user is not valid (just alphabet,number._, max length is 16)" )? this.msgUserName=res.message:this.msgUserName="";
    (res.message== "userName Already Taken")? this.msgUserName=res.message:this.msgUserName="";
    (res.message=="mobile is not valid (minimum length is 10)")? this.msgMobile=res.message:this.msgMobile="";
    (res.message=="name is not valid (just alphabet)")? this.msgName=res.message:this.msgName="";





 }








  }
  onSubmit(form: NgForm) {

    if (form.value.password === form.value.confirmPassword) {
      let birthDate = this.datePipe.transform(form.value.birthDate, "yyyy-MM-dd");
      this._response = this.authService.registerUser({
        name: form.value.firstName,
        surename: form.value.lastName,
        userName: form.value.userName,
        codiceFiscale: form.value.fiscalCode,
        email: form.value.email,
        password: form.value.password,
        birthDay: birthDate,
        role_user: true,
        role_admin: false,
        role_helpdesk: false,
        mobile: form.value.phoneNumber,
        confirmed: false,
        verified: false
      });
    }else{
      this.msgPass="Password Not Equal"
    }

    this.authSubscription = this.authService.authData.subscribe(data => {
      this._response = data;
      this.validation( this._response )
    })
  }



  ngOnDestroy() {
    if (this.authSubscription !== undefined)
      this.authSubscription.unsubscribe();
  }

}
