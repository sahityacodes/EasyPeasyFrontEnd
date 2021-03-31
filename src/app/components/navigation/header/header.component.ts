import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() drawerOnToggle = new EventEmitter();
  authSubscription: Subscription;
  isAuth = false;
  authInfo: any;
  wallet: string;
  userName: string;
  walletAdress: string;
  searchText = '';
  data: any = {};
  searchKeyword: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authData.subscribe((data) => {
      if (data.result == 'fail') {
        this.isAuth = false;
        this.authInfo = data;
      } else {
        this.isAuth = true;
        this.authInfo = data;
        this.userName = data.data.userName;
        this.walletAdress = data.data.wallet.address;
      }
    });

    if (localStorage.getItem('userName')) {
      this.authService.authenticateUser({
        username: localStorage.getItem('userName'),
        password: localStorage.getItem('password'),
      });
    }

    this.authSubscription = this.authService.walletBalance.subscribe((data) => {
      if (data == '0') {
        localStorage.setItem('walletBalance', String(0));
      } else {
        this.wallet =
          String(data).substring(0, String(data).length - 2) +
          '.' +
          String(data).slice(-2);
        localStorage.setItem('walletBalance', String(this.wallet));
      }
    });

    this.wallet = String(
      this.authService.getWalletBalance(localStorage.getItem('walletAddress'))
    );
    this.wallet = localStorage.getItem('walletBalance')
      ? String(localStorage.getItem('walletBalance')).substring(
          0,
          String(localStorage.getItem('walletBalance')).length - 2
        ) +
        '.' +
        String(localStorage.getItem('walletBalance')).slice(-2)
      : '0.00';
    this.isAuth = localStorage.getItem('isLogged') == 'true';
    this.userName = localStorage.getItem('userName');
    this.searchResults(this.searchText);
  }

  drawerToggle() {
    this.drawerOnToggle.emit();
  }

  products() {
    this.router.navigate(['/items_list'], {
      queryParams: { filter: 'IHsiaXNfc2VydmljZSI6ICJmYWxzZSJ9' },
    });
  }

  services() {
    this.router.navigate(['/items_list'], {
      queryParams: { filter: 'IHsiaXNfc2VydmljZSI6ICJ0cnVlIn0=' },
    });
  }

  logOut() {
    this.authService.logoutUser();
    this.authInfo = null;
    this.isAuth = false;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  searchResults(searchText: string) {
    this.searchKeyword = JSON.stringify({ name: { $regex: searchText } });
    let httpOptions = {
      params: new HttpParams().set('filter', btoa(this.searchKeyword)),
    };
    this.http
      .get('/product', httpOptions)
      .subscribe((res) => {
        this.data = res;
      });
  }

  goToSearch(keyword: any) {
    if (keyword) {
      this.router.navigate(['/searchResult'], {
        queryParams: {
          search: btoa(
            JSON.stringify({ name: { $regex: '' + keyword, $options: 'i' } })
          ),
        },
      });
    }
  }
}
