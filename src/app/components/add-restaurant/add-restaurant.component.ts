import { Component, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent {
  restaurantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router,
    private toastrService:ToastrService
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z\s]+$')]],
      description: ['', Validators.required],
      location: ['', Validators.required],
      additionalInfo: ['']
    });
  }
  restaurantId:string | undefined;
ngOnInit(){
  this.restaurantId = this.route.snapshot.paramMap.get('id')!;
  if(this.restaurantId){
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      const restaurant = restaurants.find(r => r.id === this.restaurantId);
      if (restaurant) {
        this.restaurantForm = this.fb.group({
          id: [restaurant.id],
          name: [restaurant.name, Validators.required],
          description: [restaurant.description, Validators.required],
          location: [restaurant.location, Validators.required],
          additionalInfo: [restaurant.additionalInfo]
        });
      }
   });
  }
}
  onSubmit() {
    if (this.restaurantForm.valid) {
      if(this.restaurantId){
        this.restaurantService.updateRestaurant(this.restaurantForm.value).subscribe(
          response => {
            this.router.navigate(['/restaurants']);
            this.toastrService.success("Restaurant Updated");
          },
          error => {
            this.toastrService.error('Error in updating restaurant');
          },
        )
      }
      else{
      this.restaurantService.addRestaurant(this.restaurantForm.value).subscribe(
        response => {
          this.router.navigate(['/restaurants']);
          this.toastrService.success("Restaurant Added")
        },
        error => {
          this.toastrService.error('Error in adding restaurant');
        }
      );
    }
    }
  }
}
