import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminsService } from '../services/admins.service';
import { Statistics } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})
export class ItemsSoldByCategoryResolver implements Resolve<Statistics> {
  constructor(private adminsService: AdminsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.adminsService.getSoldItemsByCategory()
  }
}
