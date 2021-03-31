import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  authSubscription: Subscription;
  isAuth = false;
  isHD = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    this.authSubscription = this.authService.authData.subscribe(data => {
      if (data.error) {
        this.isAuth = false
      } else {
        this.isAuth = true;
        this.isHD=data.data.role_helpdesk
      }
    })
  }

}
