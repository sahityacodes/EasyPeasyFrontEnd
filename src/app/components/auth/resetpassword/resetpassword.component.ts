import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  msgEr: any;
  msg: any
  token: any;
  password
  authSubscription: Subscription;
  hidePass = true;
  hidePass1 = true;
  public barLabel: string = 'Password strength:';

  constructor(private http: HttpClient, private authService: AuthService, private router: ActivatedRoute) {
    this.token = this.router.snapshot.params.token
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    this.resetPassword(form);
  }


  resetPassword(form: NgForm) {


    this.authService.resetPassword({
      token: this.token,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword
    })

    this.authSubscription = this.authService.authData.subscribe(data => {

      if (!data.status) {
        this.msgEr = data.message
        this.msg = ''
      }
      form.resetForm()
    });


  }


}
