import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant/restaurant.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  page:number = 1;
  maxItems:number = 6;
  constructor(private restaurantService: RestaurantService,
    private toasterService: ToastrService
  ) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(
      response => {
        this.restaurants = response;
      },
      error => {
        this.toasterService.error('Error fetching restaurants');
      }
    );
  }
}
