import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/service/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  httpOptions = {
    withCredentials: true,
  };
  res: any;
  url: string = '/user/update';

  formData = new FormData();

  editingEmail: Boolean = false;
  editingMobile: Boolean = false;
  editingAddress: Boolean = false;

  username: String = localStorage.getItem('userName');
  name: String = localStorage.getItem('name');
  lastname: String = localStorage.getItem('sureName');
  email: String = localStorage.getItem('email');
  cf: String = localStorage.getItem('codiceFiscale');
  phoneNumber: String = localStorage.getItem('mobile');
  birthdate: Date = new Date(localStorage.getItem('birthDay'));
  email_msg: string;
  mobile_msg: string;

  //address
  street: String = localStorage.getItem('street');
  number: String = localStorage.getItem('number');
  city: String = localStorage.getItem('city');
  country: String = localStorage.getItem('country');
  zip: String = localStorage.getItem('zip');

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/login']);
    }

    this.username = localStorage.getItem('userName');
  }

  editEmail() {
    this.editingEmail = !this.editingEmail;
  }

  editMobile() {
    this.editingMobile = !this.editingMobile;
  }

  editAddress() {
    this.editingAddress = !this.editingAddress;
  }

  validationEmail(emailform: NgForm) {
    let flag = true;
    if (localStorage.getItem('email') == emailform.value.email) {
      flag = false;
      this.email_msg = 'Please enter a new email';
    }
    return flag;
  }

  onChangeEmail(form: NgForm) {
    if (this.validationEmail(form)) {
      this.formData.append(
        'userdata',
        JSON.stringify({ email: form.value.email })
      );
      this.http.post<any>(this.url, this.formData, this.httpOptions).subscribe({
        next: (data) => {
          data.status = true;
          if (data.result == 'success') {
            Swal.fire({
              title: 'Please Check your Phone for the OTP code',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off',
              },
              showCancelButton: true,
              confirmButtonText: 'Submit',
              showLoaderOnConfirm: true,
              allowOutsideClick: false,
              showCloseButton: true,
              preConfirm: (otpcode) => {
                try {
                  this.http
                    .post(
                      '/user/update/confirm',
                      { otp: otpcode },
                      this.httpOptions
                    )
                    .subscribe(
                      (res) => {
                        this.res = res;
                        Swal.fire({
                          icon: 'success',
                          title: 'account updated succesfully',
                          showConfirmButton: true,
                          allowOutsideClick: false,
                        });
                        localStorage.setItem('email', form.value.email);
                        window.location.reload();
                      },
                      (err: HttpErrorResponse) => {
                        if (err.status == 400) {
                          Swal.fire({
                            icon: 'error',
                            title: 'Invalid OTP',
                            showConfirmButton: true,
                          });
                          window.location.reload();
                        }
                      }
                    );
                } catch (error: any) {}
              },
            });
          }
        },
        error: (error) => {
          this.res = error.error;
          this.email_msg = 'Invalid Email';
        },
      });
    }
  }

  validationMobile(form) {
    let flag = true;
    if (localStorage.getItem('mobile') == form.value.mobile) {
      flag = false;
      this.mobile_msg = 'Please enter a new phone';
    }
    return flag;
  }

  onChangeMobile(form : NgForm) {
    if (this.validationMobile(form)) {
      this.formData.append('userdata', JSON.stringify({ mobile: form.value.mobile }));
      this.http.post<any>(this.url, this.formData, this.httpOptions).subscribe({
        next: (data) => {
          data.status = true;
          if (data.result == 'success') {
            Swal.fire({
              title: 'Please Check your email for the OTP code',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off',
              },
              showCancelButton: true,
              confirmButtonText: 'Submit',
              showLoaderOnConfirm: true,
              allowOutsideClick: false,
              showCloseButton: true,
              preConfirm: (otpcode) => {
                try {
                  this.http
                    .post(
                      '/user/update/confirm',
                      { otp: otpcode },
                      this.httpOptions
                    )
                    .subscribe(
                      (response) => {
                        this.res = response;
                        Swal.fire({
                          icon: 'success',
                          title: 'Phone Number updated succesfully',
                          showConfirmButton: true,
                          allowOutsideClick: false,
                        });
                        localStorage.setItem('mobile', form.value.mobile);
                        window.location.reload();
                      },
                      (err: HttpErrorResponse) => {
                        if (err.status == 400) {
                          Swal.fire({
                            icon: 'error',
                            title: 'Invalid OTP',
                            showConfirmButton: true,
                            timer: 3000
                          }).then(() => {
                            window.location.reload();
                          }
                          );
          
                        }
                      }
                    );
                } catch (error: any) {
                  console.log('Error in Account Details Component : ', error);
                }
              },
            });
          }
        },
        error: (error) => {
          this.res = error.error;
        },
      });
    }
  }

  validationAddress(form: NgForm) {}
  onChangeAddress(form: NgForm) {
    //todo prevent form submitting with blank fields
    this.formData.append(
      'userdata',
      JSON.stringify({
        username: this.username,
        street: form.value.street,
        number: form.value.number,
        city: form.value.city,
        country: form.value.country,
        zip: form.value.zip,
      })
    );
    this.http.post<any>(this.url, this.formData, this.httpOptions).subscribe({
      next: (data) => {
        data.status = true;
        localStorage.setItem('street', form.value.street);
        localStorage.setItem('number', form.value.number);
        localStorage.setItem('city', form.value.city);
        localStorage.setItem('country', form.value.country);
        localStorage.setItem('zip', form.value.zip);
        //this.router.navigate(['/account_details']);
        window.location.reload();
      },
      error: (error) => {
        this.res = error.error;
      },
    });
  }
}
