import { UserModel } from '../model/user.model';
import { Router } from '@angular/router';
import { AuthModel } from '../model/auth.model';
import { ResetpasswordModel } from '../model/resetpassword.model';
import { Subject } from 'rxjs';
import { ForgetpasswordModel } from '../model/forgetpassword.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from '../../spinner-cp/spinner.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const httpOptions = {
  // headers: new HttpHeaders({
  //   'Content-Type': 'multipart/form-data',
  // }),
  withCredentials: true,
};

@Injectable()
export class AuthService {
  authData = new Subject<any>();
  walletBalance = new Subject<any>();
  private user: UserModel;
  private authModel: AuthModel;

  constructor(
    private router: Router,
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  forgetPassword(forgetPasswordmodel: ForgetpasswordModel) {
    let Res;
    this.http
      .put<any>(
        '/api/easypeasy/v1/foget_password',
        forgetPasswordmodel,
        httpOptions
      )
      .subscribe({
        next: (data) => {
          Res = data;
          Res.status = false; // change after session
          this.authData.next(Res);
        },
        error: (error) => {
          Res = error.error;
          Res.status = false;
          this.authData.next(Res);
        },
      });
  }

  resetPassword(resetPasswordmodel: ResetpasswordModel) {
    let Res;
    this.http
      .put<any>(
        '/api/easypeasy/v1/reset_password',
        resetPasswordmodel,
        httpOptions
      )
      .subscribe({
        next: (data) => {
          Res = data;
          Res.status = true;
          this.authData.next(Res);
          this.router.navigate(['/login']).then();
        },
        error: (error) => {
          Res = error.error;
          Res.status = false;
          this.authData.next(Res);
        },
      });
  }

  registeredSuccessfully() {
    Swal.fire({
      icon: 'success',
      title:
        'Registered Successfully. Please go to your nearest helpdesk to get verified.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#8ec741',
    });
  }

  registerUser(userModel: UserModel) {
    this.spinnerService.requestStarted();
    this.user = userModel;
    console.log(JSON.stringify(this.user));
    let registerRes;

    this.http
      .post<any>(
        '/api/easypeasy/v1/register',
        { usersdata: JSON.stringify(this.user) },
        httpOptions
      )
      .subscribe({
        next: (data) => {
          registerRes = data.data;
          registerRes.status = true;
          //  this.authData.next(registerRes);
          this.registeredSuccessfully();
          this.router.navigate(['/']).then();
          this.spinnerService.requestEnded();
          return registerRes;
        },
        error: (data) => {
          registerRes = data.error;
          registerRes.status = false;
          this.authData.next(registerRes);
          this.spinnerService.resetSpinner();
          this.router.navigate(['/signup']).then();
        },
      });
  }

  // loginUser(authModel: AuthModel) {
  //   this.spinnerService.requestStarted();
  //   if(this.authenticateUser(authModel)){
  //     this.router.navigate(['/'])
  //     this.spinnerService.requestEnded();
  //   }else{
  //     this.spinnerService.resetSpinner();
  //     this.router.navigate(['/login'])
  //   }
  // }

  authenticateUser(authModel: AuthModel) {
    let loginRes;
    this.http
      .post(
        '/api/easypeasy/v1/login',
        {
          username: authModel.username,
          password: authModel.password,
        },
        httpOptions
      )
      .subscribe({
        next: (data) => {
          loginRes = data
          console.log(loginRes)
          this.authData.next(loginRes);
          localStorage.setItem('userName', loginRes.data.userName);
          localStorage.setItem('password', authModel.password);
          localStorage.setItem('email', loginRes.data.email);
          localStorage.setItem('codiceFiscale', loginRes.data.codiceFiscale);
          localStorage.setItem('userid', loginRes.data._id);
          localStorage.setItem('roleHD', JSON.stringify(loginRes.data.role_helpdesk));
          localStorage.setItem('walletAddress', loginRes.data.wallet.address);
          localStorage.setItem('private_key', loginRes.data.wallet.privateKey);
          localStorage.setItem('name', loginRes.data.name);
          localStorage.setItem('mobile', loginRes.data.mobile);
          localStorage.setItem('sureName', loginRes.data.sureName);
          localStorage.setItem('birthDay', loginRes.data.birthDay);
          localStorage.setItem('city', loginRes.data.city ? loginRes.data.city : '');
          localStorage.setItem(
            'country',
            loginRes.data.country ? loginRes.data.country : ''
          );
          localStorage.setItem(
            'number',
            loginRes.data.number ? loginRes.data.number : ''
          );
          localStorage.setItem(
            'street',
            loginRes.data.street ? loginRes.data.street : ''
          );
          localStorage.setItem('zip', loginRes.data.zip ? loginRes.data.zip : '');
          this.authData.next(loginRes);
        },
        error: (data) => {
          loginRes = data;
          this.authData.next(loginRes);
        },
      });
  }

  // getWallet(walletMoney: number, page: string) {
  //   localStorage.getItem('wallet')
  //   this.spinnerService.requestStarted();
  //   this.walletData.next(walletMoney);
  //   this.spinnerService.requestEnded();
  //   localStorage.setItem('wallet', walletMoney.toString());
  //   console.log(localStorage.getItem('wallet'));
  //   this.router.navigate([page])
  // .then(() => {​​
  //   window.location.reload();
  // }​​);
  // }

  getWalletBalance(walletAddress: string) {
    let walletRes;
    let httpOptionwallet = {
      params: new HttpParams().set('address', walletAddress),
      withCredentials: true,
    };
    this.http
      .get('/api/easypeasy/v1/wallet/balance', httpOptionwallet)
      .subscribe({
        next: (res) => {
          walletRes = res;
          this.walletBalance.next(walletRes.data);
          if (walletRes.data == 0) {
            localStorage.setItem('walletBalance', '000');
          } else {
            localStorage.setItem('walletBalance', walletRes.data);
          }
        },
        error: () => {
          console.log('error in getWalletBalance');
        },
      });
    return this.walletBalance;
  }

  logoutUser() {
    let logoutRes;
    localStorage.clear();
    this.http.get('/api/easypeasy/v1/logout', httpOptions).subscribe({
      next: () => {
        this.authData.next(null);
        this.router.navigate(['/']).then();
      },
      error: (data) => {
        logoutRes = data.error;
        this.authData.next(logoutRes);
      },
    });
  }
}
