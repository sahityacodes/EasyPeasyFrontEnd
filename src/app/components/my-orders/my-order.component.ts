import {
  HttpClient, HttpErrorResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../auth/service/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  filter: any;
  data: any;
  pageNo: number;
  myValue: string;
  myValueSub: Subscription;
  sub: Subscription;
  sellerId: any;
  subtm: any;
  headElements = ['#', 'Order ID', 'Product Name', 'Buyer', ''];
  authSubscription: Subscription;
  dataOnComplete: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe((params) => {
      this.filter = params['filter'] || 0; // Defaults to 0 if no query param provided.
    });
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/login'])
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.pageNo = 1;
    this.getItemList(this.pageNo);
    this.removeBack();
  }

  getItemList(pageNum: number) {
    this.data = [];
    this.sellerId = localStorage.getItem('userid');
    let httpOptions = {
      withCredentials: true,
    };

    this.http
      .post(
        '/product/seller/orders',
        { page_size: 10, page_number: pageNum, sellerId: this.sellerId },
        httpOptions
      )
      .subscribe((res) => {
        if (res === undefined || res == 0) {
          this.previous();
        }
        this.data = res;
        this.displayNUmber(pageNum);
      });
  }

  next() {
    this.pageNo = this.pageNo + 1;
    this.getItemList(this.pageNo);
  }

  previous() {
    this.pageNo = this.pageNo - 1;
    this.getItemList(this.pageNo);
  }

  displayNUmber(pageNum: number) {
    this.removeBack();
    document.getElementById('pageNumber').innerHTML = this.pageNo.toString();
  }

  removeBack() {
    if (this.pageNo == 1) {
      document.getElementById('pre').setAttribute('style', 'display:none');
    } else {
      document.getElementById('pre').setAttribute('style', 'display:contents');
    }
  }

  submitOTP(_id: any) {
    let httpOptions = {
      withCredentials: true,
    };
    this.http
      .post(
        '/order/otp/get',
        { order_id: _id },
        httpOptions
      )
      .subscribe((res) => {
        if (res) {
          Swal.fire({
            title: 'Enter OTP CODE',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,

            preConfirm: (otpcode) => {
              try {
                this.http
                  .post(
                    '/order/otp/confirm',
                    { order_id: _id, otp_code: otpcode },
                    httpOptions
                  )
                  .subscribe((res) => {
                    this.dataOnComplete = res
                      Swal.fire({
                        icon: 'success',
                        title: 'Order Delivered Successfully',
                        showConfirmButton: true,
                          allowOutsideClick: false,
                      }
                      );
                      this.getItemList(this.pageNo);
                      // this.authService.getWallet(this.dataOnComplete.data.seller_info.wallet["$numberDecimal"], '/my_order/'+localStorage.getItem('userName'));
                        this.authService.getWalletBalance(localStorage.getItem('walletAddress'));
                    },  (err: HttpErrorResponse) => {
                    if(err.status == 404){
                      Swal.fire({
                        icon: 'error',
                        title: 'Invalid OTP',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        showCloseButton: true,
                      });
                    }
                  });
              } catch (error: any) {
                console.log('Error in Order Component : ', error);
              }
            },
          });
        }
      });
  }
}
