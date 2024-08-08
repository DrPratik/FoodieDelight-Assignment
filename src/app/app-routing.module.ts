import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { DeleteRestaurantComponent } from './components/delete-restaurant/delete-restaurant.component';

const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'add/:id', component: AddRestaurantComponent },
  { path: 'delete/:id', component: DeleteRestaurantComponent },
  { path: 'add', component: AddRestaurantComponent },
  { path: '**', redirectTo: '/restaurants' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
