import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private db: AngularFireDatabase) { }

  saveOrders(order) {
    return this.db.list('/orders').push(order);
  }
}
