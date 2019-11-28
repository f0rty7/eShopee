import { AngularFireDatabase } from '@angular/fire/database';
import { CategoryService } from './../../category.service';
import { Component, OnInit, DoBootstrap } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product;

  constructor(categoryService: CategoryService, db: AngularFireDatabase) {
    this.categories$ = categoryService.getCategories();
    this.product = db.list('categories').valueChanges();
  }

  save(product){
    console.log(product);
  }

  ngOnInit() {
  }

}
