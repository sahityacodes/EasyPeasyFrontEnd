import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemModel } from './model/item.model';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
  providers: [AuthService]
})
export class CheckoutPageComponent implements OnInit {
  itemID: any;
  item: ItemModel;
  formData = new FormData();
  authSubscription: Subscription;
  isAuth = false;
  authInfo: any;
  wallet: number;

  constructor(private authService: AuthService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.itemID = this.route.snapshot.params.itemId;
  }

  ngOnInit(): void {
    this.getCheckoutInfo();
  }


  getCheckoutInfo() {
    console.log(this.itemID)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('productId', this.itemID),
      withCredentials: true,
    };
    try {
      return this.http
        .get<ItemModel>('/api/easypeasy/v1/product/detail', httpOptions)
        .subscribe(
          (res) => {
            if (res.result === 'success') {
              this.item = res;
              this.item.servicecharge  = Number(this.item.data.total_price) - Number(this.item.data.price);
              this.item.buyerEmail = localStorage.getItem('email');
              this.item.codiceFiscale = localStorage.getItem('codiceFiscale');
              if(!this.item.data.showContactInfo){
                this.item.data.seller.email = "No email provided";
                this.item.data.seller.mobile = "No contact provided";
              }
            }
          },
          (err: HttpErrorResponse) => {
            throw err;
          }
        );
    } catch (error: any) {
      console.log('Error in Item Details Component : ', error);
    }
  }

  submitOrder() {
    let httpOptions = {
      withCredentials: true
    };
    this.formData.append("productdata", JSON.stringify({'productId' : this.itemID}));
    try {
      return this.http
        .post<any>(
          '/api/easypeasy/v1/user/checkout',
          this.formData,
          httpOptions
        )
        .subscribe(
          (res) => {
            if (res.result === 'success') {
              Swal.fire({
                icon: 'success',
                title: 'Order Placed! Your Order ID:'+res.data.order_id,
                showConfirmButton: true,
                timer: 6000,
              }).then(() => {
                this.authService.getWalletBalance(localStorage.getItem('walletAddress'));
                console.log(res.data.wallet);
                window.location.reload();
              });
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err.message);
            if(err.status == 403){
              Swal.fire({
                title: 'Please Login to continue',
                showConfirmButton: true,
                confirmButtonText: 'LOGIN',
                confirmButtonColor : 'rgb(104, 172, 2)',
                showCloseButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/login']);
                }
              });
            } else if(err.status == 400){
              Swal.fire({
                title: 'Not Enough Wallet Balance',
                showConfirmButton: true,
                confirmButtonText: 'Add Peas',
                confirmButtonColor : 'rgb(104, 172, 2)',
                showCloseButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/creditcard']);
                }
              });
            }
          });
    } catch (error: any) {
      console.log('Error in Checkout Page Component : ', error);
    }
    return false;
  }
}
