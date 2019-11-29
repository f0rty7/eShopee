import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  courses$: Observable<any[]>;
  list:  AngularFireList<any>;
constructor(private db: AngularFireDatabase, ) { 
  this.list = db.list('/categories');
  this.courses$ = this.list.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))
  }));
}

getCategories(){
  console.log(this.courses$)
  }    

}
