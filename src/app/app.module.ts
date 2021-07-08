import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthBarComponent } from './components/auth/signup/password-strength-bar/password-strength-bar.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './components/auth/service/auth.service';
import { SellItemComponent } from './components/sell-item/sell-item.component';
import { EditItemComponent } from './components/edit-tem/edit-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { DatePipe } from '@angular/common';
import { HelpDeskComponent } from './components/help-desk/help-Desk.component';
import { UserVerificationComponent } from './components/help-desk/user_verification/user_verification.component';
import { SpinnerComponent } from './components/spinner-cp/spinner.component';
import { ForgetPasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/auth/resetpassword/resetpassword.component';
import { ResetPasswordStrengthBarComponent } from './components/auth/resetpassword/resetpassword-strength-bar/resetpassword-strength-bar.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { MyStoreComponent } from './components/my-store/my-store.component';
import { MyOrderComponent } from './components/my-orders/my-order.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// import { PaymentCardServices } from './components/credit-card/service/payment-card.service';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaymentCardServices } from './components/credit-card/service/payment-card-services.service';
import { PaymentCardNumberPipe } from './components/credit-card/pipe/payment-card-number/payment-card-number.pipe';
import { ValidThruPipe } from './components/credit-card/pipe/valid-thru/valid-thru.pipe';
import { PaymentCardComponents } from './components/credit-card/payment-card-components.component';
import { PayMethodComponent } from './components/pay-method/pay-method.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SearchResultsComponent } from './components/search-result/search-result.component';
import { FilterPipe } from './components/navigation/header/filter.pipe';
import {DropdownComponent} from './components/drop-down/drop-down.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PasswordStrengthBarComponent,
    HeaderComponent,
    SidenavListComponent,
    SellItemComponent,
    EditItemComponent,
    FooterComponent,
    HomepageComponent,
    HelpDeskComponent,
    ItemsListComponent,
    ItemDetailsComponent,
    UserVerificationComponent,
    SpinnerComponent,
    ForgetPasswordComponent,
    ResetpasswordComponent,
    ResetPasswordStrengthBarComponent,
    CheckoutPageComponent,
    MyStoreComponent,
    MyOrderComponent,
    PageNotFoundComponent,
    PaymentCardComponents,
    PaymentCardNumberPipe,
    ValidThruPipe,
    PayMethodComponent,
    AccountDetailsComponent,
    SearchResultsComponent,
    DropdownComponent,
    FilterPipe,
  ],
  imports: [
    FormsModule,                              
    ReactiveFormsModule, 
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatTooltipModule,
    MatTabsModule,
  ],
  providers: [
    AuthService,
    NgbModule,
    DatePipe,
    PaymentCardServices
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
