import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {user_verifyModel} from '../model/user_verify.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user_verification',
  templateUrl: './user_verification.component.html',
  styleUrls: ['./user_verification.component.css']
})
export class UserVerificationComponent implements OnInit {
  msgEr: any;
  userInfo = false;
  disabled = false;
  name;
  surName;
  codiceFiscaletext: string;
  msg;
  user_verifymodel: user_verifyModel;


  constructor(private http: HttpClient, private router: ActivatedRoute,  private rrouter: Router) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem('userName')) {
      this.rrouter.navigate(['/login'])
    }
  }

  onSubmit(form: NgForm) {
    this.user_verification(form);
  }

  on_ChangeInput() {
    this.disabled = false;
  }

  user_verification(form: NgForm) {
    this.user_verifymodel = {
      codiceFiscale: form.value.codiceFiscale
    };
    let httpOptions = {
      withCredentials: true
    };
    this.http.put<any>('/user/verify', this.user_verifymodel,httpOptions).subscribe({
      next: data => {
        this.msgEr = '';
        this.userInfo = true;
        this.name = data.data.name;
        this.surName = data.data.sureName;
        this.codiceFiscaletext = data.data.codiceFiscale;
        this.msg = data.data.msg;

      },
      error: error => {

        this.disabled = true;
        this.userInfo = false;
        this.msgEr = error.error.message;
      }
    });


  }


}
