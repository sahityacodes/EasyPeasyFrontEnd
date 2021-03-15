import {Component, OnInit} from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-help_desk',
  templateUrl: './help-Desk.component.html',
  styleUrls: ['./help-Desk.component.css']
})
export class HelpDeskComponent implements OnInit {
  errorMsg: any;
  imageSrc = '../../../assets/image/icon.png'
  imageAlt = 'Image not found'

  constructor(private router: Router,private http: HttpClient) {
  }

  ngOnInit(): void {

    if(!localStorage.getItem('userName'))
    {
      this.router.navigate(['/login']).then();
    }
  }

}
