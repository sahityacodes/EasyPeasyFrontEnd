import {RouterModule, Routes} from "@angular/router";
import {SignupComponent} from "./components/auth/signup/signup.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {SellItemComponent} from "./components/sell-item/sell-item.component";
import {HomepageComponent} from './components/homepage/homepage.component';
import {ItemsListComponent} from './components/items-list/items-list.component';
import {ItemDetailsComponent} from './components/item-details/item-details.component';
import {HelpDeskComponent} from './components/help-desk/help-Desk.component';
import {UserVerificationComponent} from './components/help-desk/user_verification/user_verification.component';
import {ForgetPasswordComponent} from './components/auth/forgetpassword/forgetpassword.component';
import {ResetpasswordComponent} from './components/auth/resetpassword/resetpassword.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import {MyStoreComponent} from './components/my-store/my-store.component';
import {MyOrderComponent} from './components/my-orders/my-order.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { PaymentCardComponents } from './components/credit-card/payment-card-components.component';
import { PayMethodComponent } from './components/pay-method/pay-method.component';
import { EditItemComponent } from "./components/edit-tem/edit-item.component";
import {NgModule} from "@angular/core";
import { AccountDetailsComponent } from "./components/account-details/account-details.component";

import { SearchResultsComponent } from "./components/search-result/search-result.component";
import { DropdownComponent } from "./components/drop-down/drop-down.component";



const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: HomepageComponent},
  {path: 'items_list', pathMatch: 'full', component: ItemsListComponent},
  {path: 'sell_item', component: SellItemComponent},
  {path: 'edit_item/:itemId', component: EditItemComponent},
  {path: 'item-details/:itemId', component: ItemDetailsComponent},
  {path: 'help_desk', component: HelpDeskComponent},
  {path: 'user/verify', component: UserVerificationComponent} ,
  {path: 'forgotpassword', component: ForgetPasswordComponent},
  {path: 'resetpassword/:token', component: ResetpasswordComponent},
  {path: 'pay', component: PayMethodComponent},
  {path: 'checkout/:itemId', component: CheckoutPageComponent},
  {path: 'my_store/:userId', component: MyStoreComponent},
  {path: 'my_order/:userId', component: MyOrderComponent},
  {path: 'creditcard', component: PaymentCardComponents},
  {path: 'account_details', component: AccountDetailsComponent},
  {path: 'searchResult',pathMatch: 'full', component: SearchResultsComponent},
  {path: 'drop_down_demo', component: DropdownComponent},
  {path: '**', component: PageNotFoundComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {

}
