import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDetailsModel, ItemSellModel } from './model/item.details.model';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditItemComponent implements OnInit {
  url;
  formData = new FormData();
  authData = new Subject<any>();
  msgEr;
  res: any;
  image_msg = '';
  price_msg = '';
  quantity_msg = '';
  number_msg = '';
  zip_msg = '';
  isService = false;
  showContact = false;
  delivery_time;
  image: File = null;
  price;
  quantity;
  number;
  zip;
  minDate: Date;
  maxDate: Date;
  itemDetails: ItemDetailsModel;
  itemSellModel : ItemSellModel;
  delivery_slots_msg: string;
  fileEvent;
  itemId: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {}

  validation() {
    let flag = true;
    if (!this.image) {
      this.image_msg = 'You must select an image';
      flag = false;
    }
    if (this.price < 0.0) {
      this.price_msg = 'the price must be positive ';
      flag = false;
    }
    if (this.number < 0.0) {
      this.number_msg = 'the number must be positive ';
      flag = false;
    }
    if (this.zip && this.zip.length != 5) {
      this.zip_msg = 'the number must be 5 numbers ';
      flag = false;
    }
    if (this.zip < 0) {
      this.zip_msg = 'the number must be positive ';
      flag = false;
    }
    if (this.daysSelected.length < 1) {
      this.delivery_slots_msg = 'Please select atleast 1 delivery slot';
      flag = false;
    }
    return flag;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/login']);
    }
    this.minDate = new Date();
    this.maxDate = new Date(Date.now() + 12096e5);
    this.itemId = this.aRoute.snapshot.params.itemId;
    if (this.itemId) {
      let httpOptions = {
        params: new HttpParams().set('productId',  this.itemId),
      };
      try {
        this.http
          .get<ItemDetailsModel>('/product/detail', httpOptions)
          .subscribe(
            (res) => {
              this.itemDetails = res;
              console.log(this.itemDetails)
            },
            (err: HttpErrorResponse) => {
              if(err.status == 403){
                if (!localStorage.getItem('userName')) {
                  this.router.navigate(['/login']);
                }
              }
            }
          );
      } catch (error: any) {
        console.log('Error in Item Details Component : ', error);
      }
    }
  }

  onSubmit(form: NgForm) {
    this.selProduct(form);
  }

  selProduct(form: NgForm) {
    const httpOptions = {
      withCredentials: true,
    };

    if (this.validation()) {
      this.itemSellModel = {
        username: localStorage.getItem('userName'), //todo have to change it to loged user
        name: form.value.name,
        description: form.value.description,
        price: form.value.price,
        delivery_time: this.daysSelected,
        category: form.value.category,
        is_service: this.itemDetails.data.is_service,
        quantity: 1,
        country: form.value.country,
        city: form.value.city,
        street: form.value.street,
        zip: form.value.zip,
        number: form.value.number,
        showContactInfo: this.itemDetails.data.showContactInfo,
        _id :  this.itemId,
        publication_date : Date.now()
      };
      this.formData.append('image', this.image, this.image.name);
      this.formData.append('productdata', JSON.stringify(this.itemSellModel));
      this.http
        .post<any>(
          '/product/update',
          this.formData,
          httpOptions
        )
        .subscribe({
          next: (data) => {
            data.status = true;
            this.router.navigate(['/item-details', data.data._id]);
          },
          error: (error) => {
            this.res = error.error;
          },
        });
    }
  }

  checkCheckBoxShowInfo(event){
    this.itemDetails.data.showContactInfo = event.checked
    console.log(this.itemDetails.data.showContactInfo)
  }

  checkCheckBoxIsService(event){
    this.itemDetails.data.is_service = event.checked
    console.log(this.itemDetails.data.is_service)
  }

  uploadImage(event) {
    var mimeType = event.target.files[0].type;
    if (mimeType !== 'image/jpeg') {
      this.image_msg = 'Only JPG images are supported';
      event.target.value = null;
      this.image = null;
      this.url = '';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.image_msg = '';
      this.url = reader.result;
    };
    this.image = event.target.files[0];
  }

  daysSelected: any[] = [];
  event: any;

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    return this.daysSelected.find((x) => x == date) ? 'selected' : null;
  };

  select(event: any, calendar: any) {
    this.delivery_slots_msg = null;
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex((x) => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);
    calendar.updateTodaysDate();
  }
}
