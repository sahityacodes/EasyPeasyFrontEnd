import {NgModule} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule,
    MatNativeDateModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule,
    MatCheckboxModule, MatGridListModule, MatCardModule, MatRadioModule, MatCheckboxModule, MatCardModule,
     MatTabsModule, MatProgressSpinnerModule, MatSliderModule, MatMenuModule, MatRippleModule],
  exports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule,
    MatNativeDateModule, MatToolbarModule, MatIconModule, MatSidenavModule,
    MatListModule, MatCheckboxModule, MatGridListModule, MatGridListModule, MatCardModule,
    MatRadioModule, MatCheckboxModule, MatCardModule, MatProgressSpinnerModule, MatTabsModule, MatSliderModule,
      MatMenuModule, MatRippleModule
  ]
})

export class MaterialModule {

}
