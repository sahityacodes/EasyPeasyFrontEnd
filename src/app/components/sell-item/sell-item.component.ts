import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from '@angular/router';
import {ItemModel} from "./model/item.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.css']
})
export class SellItemComponent implements OnInit {
  url;
  formData = new FormData();
  authData = new Subject<any>();
  msgEr
  res: any;
  image_msg = "";
  price_msg = "";
  quantity_msg = "";
  number_msg = "";
  zip_msg = "";
  isService = false;
  showContact = false;
  delivery_time;
  image: File = null;
  price;
  quantity;
  number;
  zip;

  private ItemData: ItemModel

  constructor(private http: HttpClient, private router: Router) {
  }

  validation() {
    let flag = true
    if (!this.image) {
      this.image_msg = 'You must select an image';
      flag = false
    }
    if (this.price < 0.0) {
      this.price_msg = 'the price must be positive ';
      flag = false
    }
    if (this.number < 0.0) {
      this.number_msg = 'the number must be positive ';
      flag = false
    }
    if (this.zip && this.zip.length != 5) {
      this.zip_msg = 'the number must be 5 numbers ';
      flag = false
    }
    if (this.zip < 0) {
      this.zip_msg = 'the number must be positive ';
      flag = false
    }
    return flag
  }

  ngOnInit(): void {
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/login'])
    }
  }

  onSubmit(form: NgForm) {
    this.selProduct(form)
  }


  selProduct(form: NgForm) {

    const httpOptions = {
      withCredentials: true,
    };

    if(this.validation()){
    this.ItemData = {
      username: localStorage.getItem('userName'),//todo have to change it to loged user
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      delivery_time: this.delivery_time,
      category: form.value.category,
      is_service: this.isService,
      quantity : 1,
      country: form.value.country,
      city: form.value.city,
      street: form.value.street,
      zip: form.value.zip,
      number: form.value.number,
      showContactInfo: this.showContact
    }
    this.formData.append("image", this.image, this.image.name);
    this.formData.append("productdata", JSON.stringify(this.ItemData));
    this.http.post<any>("/api/easypeasy/v1/product/add", this.formData
    ,httpOptions).subscribe({
      next: data => {
        data.status = true
        this.router.navigate(['/item-details', data.data._id]);
      },
      error: error => {
        this.res = error.error
      }
    })
  }
  }

  uploadImage(event) {
    var mimeType = event.target.files[0].type;
    if (mimeType !== 'image/jpeg') {
      this.image_msg = "Only JPG images are supported";
      event.target.value = null
      this.image = null
      this.url = ""
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.image_msg = "";
      this.url = reader.result;

    }
    this.image = event.target.files[0];


  }


}
