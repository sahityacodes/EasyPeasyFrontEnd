import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { SpinnerService } from '../spinner-cp/spinner.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  itemTypefilter: any;
  data: any;
  pageNo: number = 1;
  myValue: string;
  myValueSub: Subscription;
  sub: Subscription;
  priceFilter: any;
  filter: any;
  priceOrder: any;
  dateOrder: any;
  minPeas: number = 0;
  maxPeas: number = 0;

  disableSelect = new FormControl(false);
  constructor(
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe((params) => {
      this.itemTypefilter = atob(params['filter']); // Defaults to 0 if no query param provided.
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getItemList(this.pageNo);
    this.removeBack();
  }

  formatLabel(value: number) {
    return value + ' Peas';
  }

  onPriceFilter(min: number, max: number): void {
    this.priceFilter = null;
    if (max != 0) {
      this.priceFilter =  {'$and': [{price: { $gte: min}}, { price: { $lte: max }}] };
      this.getItemList(this.pageNo);
    }
  }

  resetFilters(): void {
    this.priceFilter = null;
    this.getItemList(this.pageNo);
    this.minPeas = 0;
    this.maxPeas = 0;
  }

  getOrder(orderBy: any) {
    this.priceOrder = null;
    if (orderBy.target.value == 'hightolow') {
      this.priceOrder = -1;
    } else if (orderBy.target.value == 'lowtohigh') {
      this.priceOrder = 1;
    } else if (orderBy.target.value == 'newfirst') {
      this.dateOrder = -1;
    }
    this.getItemList(this.pageNo);
  }

  getItemList(pageNum: number) {
    this.filter = this.itemTypefilter;
    if (this.priceFilter) {
      this.filter = JSON.stringify({
        $and: [JSON.parse(this.itemTypefilter), this.priceFilter],
      });
    }

    let httpOptions = {
      params: new HttpParams()
        .set('page_size', '12')
        .set('page_number', '' + pageNum)
        .set('filter', btoa(this.filter)),
    };
    if (this.priceOrder) {
      httpOptions = {
        params: new HttpParams()
          .set('page_size', '12')
          .set('page_number', '' + pageNum)
          .set('filter', btoa(this.filter))
          .set('sort_field', 'price')
          .set('sort_order', this.priceOrder),
      };
    } else if (this.dateOrder) {
      httpOptions = {
        params: new HttpParams()
          .set('page_size', '12')
          .set('page_number', '' + pageNum)
          .set('filter', btoa(this.filter))
          .set('sort_field', 'publication_date')
          .set('sort_order', this.dateOrder),
      };
    }
    this.spinnerService.requestStarted();
    this.data = [];
    this.http
      .get('/product', httpOptions)
      .subscribe((res) => {
        if (res === undefined || res == 0) {
          this.previous();
        }
        this.data = res;
        this.displayNUmber(pageNum);
        this.spinnerService.requestEnded();
      },(err: any)=>{
        this.spinnerService.requestEnded();
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
    document.getElementById('pageNumber').innerHTML = String(pageNum);
  }

  removeBack() {
    if (this.pageNo == 1) {
      document.getElementById('pre').setAttribute('style', 'display:none');
    } else {
      document.getElementById('pre').setAttribute('style', 'display:contents');
    }
  }
}
