import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {AuthService} from '../auth/service/auth.service';
import {SpinnerService} from '../spinner-cp/spinner.service'

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  filter: any;
  data: any;
  pageNo: number;
  myValue: string;
  myValueSub: Subscription;
  sub: Subscription;

  constructor(private spinnerService : SpinnerService, private activatedRoute: ActivatedRoute, 
    private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      this.filter = params['filter'] || 0;    // Defaults to 0 if no query param provided.
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.pageNo = 1;
    this.getItemList(this.pageNo);
    this.removeBack();
  }


  getItemList(pageNum: number) {
    this.spinnerService.requestStarted()
    this.data = [];
    let httpOptions = {
      params: new HttpParams().set('page_size', '12').set('page_number', '' + pageNum).set('filter', this.filter),
    };
    this.http.get('/api/easypeasy/v1/product', httpOptions)
      .subscribe((res) => {
        if (res === undefined || res == 0) {
          this.previous();
        }
        this.data = res;
        this.displayNUmber(pageNum);
        this.spinnerService.requestEnded();
      });
  }

  next() {
    this.pageNo = this.pageNo + 1
    this.getItemList(this.pageNo);
  }

  previous() {
    this.pageNo = this.pageNo - 1
    this.getItemList(this.pageNo);
  }

  displayNUmber(pageNum: number) {
    this.removeBack();
    document.getElementById('pageNumber').innerHTML = this.pageNo.toString();
  }

  removeBack() {
    if (this.pageNo == 1) {
      document.getElementById('pre').setAttribute("style", "display:none");
    } else {
      document.getElementById('pre').setAttribute("style", "display:contents");
    }
  }
}
