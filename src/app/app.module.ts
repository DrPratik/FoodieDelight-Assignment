import { NgModule } from '@angular/core';
import { Form } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { DeleteRestaurantComponent } from './components/delete-restaurant/delete-restaurant.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { BidiModule } from '@angular/cdk/bidi';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { RestaurantService } from './services/restaurant.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    AddRestaurantComponent,
    DeleteRestaurantComponent,
    RestaurantListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', 
      timeOut: 3000, 
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
