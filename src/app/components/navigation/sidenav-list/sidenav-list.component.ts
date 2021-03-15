import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/service/auth.service";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() drawerCloser = new EventEmitter();
  authSubscription: Subscription;
  isAuth = false;
  authInfo;
  wallet: any

  constructor(private authService: AuthService,private router: Router) {
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authData.subscribe(data => {

      if (!data) {
        this.isAuth = false
        this.router.navigate(['/login']);
      } else {
        this.isAuth = true;
        // this.authInfo = data;
        // this.wallet = parseFloat(this.authInfo.wallet["$numberDecimal"])
        this.wallet=localStorage.getItem('wallet')
      }

    })
  }
  closeDrawer() {
    this.drawerCloser.emit();
  }

  logOut() {
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  products() {
    this.closeDrawer();
    this.router.navigate(['/items_list'], {queryParams: {filter: 'IHsiaXNfc2VydmljZSI6ICJmYWxzZSJ9'}});
  }

  services() {
    this.closeDrawer();
    this.router.navigate(['/items_list'], {queryParams: {filter: 'IHsiaXNfc2VydmljZSI6ICJ0cnVlIn0='}});
  }
}
