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
    // defined in Oninit in admin-product.component.ts 
  }

  getProductID(prodID){
    return this.db.object('/products/' + prodID)
  }

  updateProduct(prodID, product){
    return this.db.object('/products/' + prodID).update(product);
  }

  deleteProduct(prodID){
    return this.db.object('/products/' + prodID).remove();
  }
}
