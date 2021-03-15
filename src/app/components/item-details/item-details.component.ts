import { Component, OnInit, Output } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { ItemModel } from './model/item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  item: ItemModel;
  itemID: any;
  errorMsg: any;
  deliveryDate: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    console.log(route.snapshot)
    this.itemID = this.route.snapshot.params.itemId;
  }

  ngOnInit(): void {
    this.getItemDetails();
  }

  getItemDetails() {
    let httpOptions = {
      params: new HttpParams().set('productId', this.itemID),
    };
    try {
      return this.http
        .get<ItemModel>('/api/easypeasy/v1/product/detail', httpOptions)
        .subscribe(
          (res) => {
            if (res.result === 'success') {
              this.item = res.data;
              if(!this.item.showContactInfo){
                this.item.seller.email = "No email provided";
                this.item.seller.mobile = "No contact provided";
              }
            }
          },
          (err: HttpErrorResponse) => {
            this.errorMsg = err;
            throw err;
          }
        );
    } catch (error: any) {
      console.log('Error in Item Details Component : ', error);
    }
  }
}
