import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product$: Observable<any[]>;
  list: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.list = db.list('/products');
    this.product$ = this.list.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
    }));
  }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAllProducts(){  
    console.log(this.product$);  
  }

  getProductID(prodID){
    return this.db.object('/products/' + prodID)
  }
}
