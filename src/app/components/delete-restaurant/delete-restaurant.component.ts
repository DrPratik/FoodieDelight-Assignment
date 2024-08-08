import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-delete-restaurant',
  templateUrl: './delete-restaurant.component.html',
  styleUrls: ['./delete-restaurant.component.scss']
})
export class DeleteRestaurantComponent implements OnInit {
  restaurantId!: string;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('id')!;
  }

  deleteRestaurant() {
    this.restaurantService.deleteRestaurant(this.restaurantId).subscribe(
      response => {
        this.toasterService.success("Restaurant Deleted")
        this.router.navigate(['/restaurants']);
      },
      error => {
        this.toasterService.error('Error deleting restaurant');
      }
    );
  }
}
