import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgToastModule } from 'ng-angular-popup';
import { SearchComponent } from './search/search.component';
import { ContentComponent } from './content/content.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemsByCategoryComponent } from './items-by-category/items-by-category.component';
import { CartComponent } from './cart/cart.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { registerLocaleData } from '@angular/common';
import localeSr from '@angular/common/locales/sr';
import { ContactComponent } from './contact/contact.component';
import { PromotionComponent } from './promotion/promotion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewItemComponent } from './new-item/new-item.component';
registerLocaleData(localeSr);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    SearchComponent,
    ContentComponent,
    ItemDetailsComponent,
    ItemsByCategoryComponent,
    CartComponent,
    ContactComponent,
    PromotionComponent,
    DashboardComponent,
    NewItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    NgToastModule,
    GoogleMapsModule,
    NgxChartsModule
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
