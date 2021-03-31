import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../auth/service/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css'],
})
export class MyStoreComponent implements OnInit {
  filter: any;
  data: any;
  pageNo: number;
  myValue: string;
  myValueSub: Subscription;
  sub: Subscription;
  sellerId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/login']);
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
        '/product/seller/products',
        { page_size: 12, page_number: pageNum, sellerId: this.sellerId },
        httpOptions
      )
      .subscribe((res) => {
        {
          if (res === undefined || res == 0) {
            this.previous();
          }
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
}
