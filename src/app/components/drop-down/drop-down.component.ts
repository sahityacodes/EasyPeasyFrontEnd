import { Component, OnInit, Output } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-drop-down-details',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
})
export class DropdownComponent implements OnInit {
  errorMsg: any;
  nameList : [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    try {
      this.http
        .get<any>('http://universities.hipolabs.com/search?country=United+States')
        .subscribe(
          (res) => {
            this.nameList = res.slice(0,5);
            console.log(this.nameList);
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
