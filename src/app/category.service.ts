import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit{
  category: any;
  categoryService: CategoryService

  constructor(private db: AngularFireDatabase, ) { 
    // this.category = db.list('/categories').valueChanges();
    // this.category = db.list('categories').valueChanges();
  }
  ngOnInit(){
    //this.getCategories();
  }

  getCategories(): Observable<any>{
    return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
    // this.db.list('/categories').valueChanges().subscribe(val => console.log(val))
    
  }
  // getCategories(){
  //   return this.getCategories().pipe(map((changes : any) =>
  //     changes.map(c =>
  //       ({ key: c.payload.key()})
  //     )
  //   )
  // ).subscribe(category => {
  //   this.category = category;
  // });
    // this.db.list('/categories').valueChanges().subscribe(val => console.log(val))
    
  }

  // ngOnInit(){
  //   this.db.list('/categories').valueChanges().subscribe(val => console.log(val))
  // }

