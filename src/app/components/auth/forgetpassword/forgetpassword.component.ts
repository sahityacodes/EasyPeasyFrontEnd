import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  msgEr: any;
  msg: any;
  email: string;
  Sfrom = true;
  ShowMsg = false;
  imageAlt = 'Image not found'
  imageSrc = '../../../assets/assert/Emails.png'
  authSubscription: Subscription;

  constructor(private authService: AuthService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    this.forget_password(form);
  }


  forget_password(form: NgForm) {


    this.authService.forgetPassword({email: form.value.email})

    this.authSubscription = this.authService.authData.subscribe(data => {
      if (!data.data) {
        this.msgEr = data.message
        this.msg = ''
        this.Sfrom = true
        this.ShowMsg = false

      } else {

        this.msg = data.data.message
        this.msgEr = ''
        this.Sfrom = false
        this.ShowMsg = true
      }
    });
  }


}
