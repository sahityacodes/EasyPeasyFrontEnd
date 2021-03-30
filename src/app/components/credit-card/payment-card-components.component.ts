import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CardValidator } from './validator/card-validator';
import { ICardDetails } from './domain/i-card-details';
import { CardDetails } from './domain/card-details';
import { PaymentCardServices } from './service/payment-card-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/service/auth.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { peasmodel } from './model/peas.model';
import { convertmodel } from './model/money.model';
@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card-components.component.html',
  styleUrls: ['./payment-card-components.component.scss'],
})
export class PaymentCardComponents implements OnInit {
  public peas: number;
  public money: number;
  public username: string;
  public convert_country: string;
  public convert_city: string;
  public convert_street: string;
  public convert_number: number;
  public convert_zip: number;
  public wallet: any;
  url;
  formData = new FormData();
  authData = new Subject<any>();
  number_msg = '';
  zip_msg = '';
  peas_msg = '';
  number_msg_real = '';
  zip_msg_real = '';
  peas_msg_real = '';
  number;
  zip;
  res: any;
  private peasData: peasmodel;
  private convertData: convertmodel;

  public ccForm: FormGroup;
  public months: Array<string> = [];
  public amountPase: string;
  public billAdress: string;
  public years: Array<number> = [];
  data: any;
  @Input()
  public validateCCNum? = true;
  @Input()
  public validateCardHolder? = true;
  @Input()
  public validateExpirationMonth? = true;
  @Input()
  public validateExpirationYear? = true;
  @Input()
  public validateCardExpiration? = true;
  @Input()
  public validateCCV? = true;
  credit = '../../../assets/image/credit.png';
  pay = '../../../assets/image/pay.png';
  imageAlt = 'Image not found';
  @Output()
  public formSaved: EventEmitter<ICardDetails> = new EventEmitter<CardDetails>();
  public showPaymethod: boolean;
  public showcreditcard: boolean;
  public showfom: boolean;
  public showdetail1: boolean;
  public showdetail2: boolean;
  constructor(
    private _ccService: PaymentCardServices,
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/login']);
    }
    this.wallet =
      String(localStorage.getItem('walletBalance')).substring(
        0,
        String(localStorage.getItem('walletBalance')).length - 2
      ) +
      '.' +
      String(localStorage.getItem('walletBalance')).slice(-2);

    this.buildForm();
    this.assignDateValues();
    this.showdetail1 = false;
    this.showdetail2 = false;
    this.showfom = true;
    this.showPaymethod = false;
    this.showcreditcard = false;
  }

  validation() {
    let flag = true;
    if (this.peas < 5.0) {
      this.peas_msg = 'The minimum amount of peas is 5 ';
      flag = false;
    }
    if (this.number < 0.0) {
      this.number_msg = 'the number must be positive ';
      flag = false;
    }
    if (this.zip && this.zip.length != 5) {
      this.zip_msg = 'the number must be 5 numbers ';
      flag = false;
    }
    if (this.zip < 0) {
      this.zip_msg = 'the number must be positive ';
      flag = false;
    }
    return flag;
  }

  onSubmit(form: NgForm) {
    this.addPeas(form);
    console.log(form.value);
  }

  addPeas(form: NgForm) {
    if (this.validation()) {
      this.peasData = {
        username: localStorage.getItem('userName'), //todo have to change it to loged user
        peas: form.value.peas,
        country: form.value.country,
        city: form.value.city,
        street: form.value.street,
        zip: form.value.zip,
        number: form.value.number,
      };
      this.showdetail1 = true;
      this.showdetail2 = false;
      this.showfom = false;
      this.showPaymethod = true;
      // this.showcreditcard=false;
    }
  }

  validationBank() {
    let flag = true;
    if (this.money > Number(this.wallet)) {
      this.peas_msg_real = 'Entered Amount is higher than the wallet balance';
      flag = false;
    }
    if (this.money < 5.0) {
      this.peas_msg_real = 'The minimum amount of peas is 5 ';
      flag = false;
    }
    if (this.convert_number < 0.0) {
      this.number_msg_real = 'the number must be positive ';
      flag = false;
    }
    if (this.convert_zip && String(this.convert_zip).length != 5) {
      this.zip_msg_real = 'Please enter a valid zip ';
      flag = false;
    }
    if (this.convert_zip < 0) {
      this.zip_msg_real = 'the number must be positive ';
      flag = false;
    }
    return flag;
  }

  onSubmitMoney(f: NgForm) {
    this.convertPeas(f);
    console.log(f.value);
  }

  convertPeas(f: NgForm) {
    if (this.validationBank()) {
      this.convertData = {
        username: localStorage.getItem('userName'), //todo have to change it to loged user
        money: f.value.money,
        convert_country: f.value.convert_country,
        convert_city: f.value.convert_city,
        convert_street: f.value.convert_street,
        convert_zip: f.value.convert_zip,
        convert_number: f.value.convert_number,
      };

      this.showdetail1 = false;
      this.showdetail2 = true;
      this.showfom = false;
      this.showPaymethod = true;
    }
  }

  hide() {}

  //------------------------------

  //show creditcard form
  changeState() {
    this.showPaymethod = false;
    this.showcreditcard = true;
  }

  openPayPal() {
    var myWindowProperties =
      'location=yes,height=570,width=520,scrollbars=yes,status=yes';
    var myWindowName = 'ONE';
    var openWindow;
    setTimeout(function () {
      openWindow = window.open(
        'https://www.paypal.com/us/signin',
        myWindowName,
        myWindowProperties
      );
    }, 0);
    setTimeout(function () {
      openWindow.close();
    }, 3000);
    this.emitSavedCard()
  }

  /**
   * Returns payment card type based on payment card number
   */
  public getCardType(ccNum: string): string | null {
    return PaymentCardServices.getCardType(ccNum);
  }

  /**
   * Callback function that emits payment card details after user clicks submit, or press enter
   */

  public emitSavedCard(): void {
    const cardDetails: ICardDetails = <CardDetails>this.ccForm.value;

    this.formSaved.emit(cardDetails);
    let httpOptions = {
      withCredentials: true,
    };

    if (this.peasData !== undefined) {
      this.http
        .post(
          '/api/easypeasy/v1/wallet/transfer',
          {
            address: localStorage.getItem('walletAddress'),
            amount: this.peasData.peas * 100,
            isFromServer: 'true'
          },
          httpOptions
        )
        .subscribe((res) => {
          this.data = res;
          if (this.data.result == 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Your Peas will be deposited shortly.',
              showConfirmButton: true,
              confirmButtonColor: 'rgb(104, 172, 2)',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/']);
              }
            });
          }
        });
    } else {
      this.http
        .post(
          '/api/easypeasy/v1/wallet/transfer',
          {
            address: localStorage.getItem('walletAddress'),
            amount: this.convertData.money * 100,
            isFromServer: 'false'
          },
          httpOptions
        )
        .subscribe((res) => {
          this.data = res;
          if (this.data.result == 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Money is credited to your bank account. Please check your wallet balance after awhile.',
              showConfirmButton: true,
              confirmButtonColor: 'rgb(104, 172, 2)',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/']);
              }
            });
          }
        });
    }
  }

  getCardNumberValidation() {
    return this.validateCCNum &&
      this.ccForm.get('cardNumber').touched &&
      this.ccForm.get('cardNumber').hasError('required')
      ? 'Card number is required'
      : this.validateCCNum &&
        this.ccForm.get('cardNumber').touched &&
        this.ccForm.get('cardNumber').hasError('minlength')
      ? 'Card number is too short'
      : this.validateCCNum &&
        this.ccForm.get('cardNumber').touched &&
        this.ccForm.get('cardNumber').hasError('maxlength')
      ? 'Card number is too long'
      : this.validateCCNum &&
        this.ccForm.get('cardNumber').touched &&
        this.ccForm.get('cardNumber').hasError('numbersOnly')
      ? 'Card number can contain digits only'
      : this.validateCCNum &&
        this.ccForm.get('cardNumber').touched &&
        this.ccForm.get('cardNumber').hasError('checksum')
      ? 'Provided card number is invalid'
      : '';
  }

  getCardHolderValidation() {
    return this.validateCardHolder &&
      this.ccForm.get('cardHolder').touched &&
      this.ccForm.get('cardHolder').hasError('required')
      ? 'Card holder name is required'
      : this.validateCardHolder &&
        this.ccForm.get('cardHolder').touched &&
        this.ccForm.get('cardHolder').hasError('maxlength')
      ? 'Card holder name is too long'
      : '';
  }

  getExpirationValidation() {
    return this.validateExpirationMonth &&
      this.ccForm.get('expirationMonth').touched &&
      this.ccForm.get('expirationMonth').hasError('required')
      ? 'Expiration month is required'
      : this.validateExpirationMonth &&
        this.ccForm.get('expirationYear').touched &&
        this.ccForm.get('expirationYear').hasError('required')
      ? 'Expiration year is required'
      : this.validateCardExpiration &&
        this.ccForm.get('expirationMonth').touched &&
        this.ccForm.get('expirationYear').touched &&
        this.ccForm.hasError('expiration')
      ? 'Card has expired'
      : '';
  }

  getCCVValidation() {
    return this.validateCCV &&
      this.ccForm.get('ccv').touched &&
      this.ccForm.get('ccv').hasError('required')
      ? 'CCV number is required'
      : this.validateCCV &&
        this.ccForm.get('ccv').touched &&
        this.ccForm.get('ccv').hasError('minlength')
      ? 'CCV number is too short'
      : this.validateCCV &&
        this.ccForm.get('ccv').touched &&
        this.ccForm.get('ccv').hasError('maxlength')
      ? 'CCV number is too long'
      : this.validateCCV &&
        this.ccForm.get('ccv').touched &&
        this.ccForm.get('ccv').hasError('numbersOnly')
      ? 'CCV number can contain digits only'
      : '';
  }

  /**
   * Populate months and years
   */
  private assignDateValues(): void {
    this.months = PaymentCardServices.getMonths();
    this.years = PaymentCardServices.getYears();
  }

  /**
   * Build reactive form
   */
  private buildForm(): void {
    this.ccForm = this._fb.group(
      {
        cardNumber: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(19),
            CardValidator.numbersOnly,
            CardValidator.checksum,
          ]),
        ],
        cardHolder: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(22)]),
        ],
        expirationMonth: ['', Validators.required],
        expirationYear: ['', Validators.required],
        ccv: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
            CardValidator.numbersOnly,
          ]),
        ],
      },
      {
        validator: CardValidator.expiration,
      }
    );
  }
}
