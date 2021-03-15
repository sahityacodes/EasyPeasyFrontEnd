import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.component.html',
  styleUrls: ['./pay-method.component.css']
})
export class PayMethodComponent implements OnInit {

  errorMsg: any;
  credit = '../../../assets/image/credit.png'
  pay = '../../../assets/image/pay.png'
  imageAlt = 'Image not found'

  constructor(private router: Router,private http: HttpClient) {
  }

  ngOnInit(): void {

    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/login'])
    }
  }
}
