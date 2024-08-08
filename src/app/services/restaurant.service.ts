import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Restaurant } from '../models//restaurant/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'assets/data/restaurants.json'; 

  private restaurants: Restaurant[] = []; 

  constructor(private http: HttpClient) {
  }
  ngOnInit(){
    this.loadRestaurants().subscribe();
  }

  private loadRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl).pipe(
      tap(data => this.restaurants = data), // Cache the data
      catchError(this.handleError<Restaurant[]>('loadRestaurants', []))
    );
  }

  getRestaurants(): Observable<Restaurant[]> {
    if (this.restaurants.length === 0) {
      return this.loadRestaurants();
    } else {
      return of(this.restaurants);
    }
  }

  getRestaurant(id: string): Observable<Restaurant | undefined> {
    return this.getRestaurants().pipe(
      map(restaurants => restaurants.find(r => r.id === id))
    );
  }

  addRestaurant(newRestaurant: Restaurant): Observable<Restaurant> {
    return this.getRestaurants().pipe(
      switchMap(restaurants => {
        this.restaurants = [...restaurants, newRestaurant];
        return of(newRestaurant);
      }),
      catchError(this.handleError<Restaurant>('addRestaurant', newRestaurant))
    );
  }

  updateRestaurant(updatedRestaurant: Restaurant): Observable<Restaurant> {
    return this.getRestaurants().pipe(
      map(restaurants => {
        const index = restaurants.findIndex(r => r.id === updatedRestaurant.id);
        if (index !== -1) {
          restaurants[index] = updatedRestaurant;
          return updatedRestaurant;
        }
        throw new Error('Restaurant not found');
      }),
      catchError(this.handleError<Restaurant>('updateRestaurant', updatedRestaurant))
    );
  }

  deleteRestaurant(id: string): Observable<void> {
    return this.getRestaurants().pipe(
      map(restaurants => {
        const index = restaurants.findIndex(r => r.id === id);
        if (index !== -1) {
          restaurants.splice(index, 1);
        }
      }),
      catchError(this.handleError<void>('deleteRestaurant'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
