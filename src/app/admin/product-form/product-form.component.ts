import { ProductService } from './../../product.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: any[] = [];

  constructor(private categoryService: CategoryService, db: AngularFireDatabase, private productService: ProductService) {
  }

  save(product){
    this.productService.create(product);
  }

  ngOnInit() {
  this.categoryService.courses$.subscribe(x => {
    this.categories = x;
    })
  }
}
