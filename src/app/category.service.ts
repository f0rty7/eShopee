import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<any>{
    return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
  }
}
