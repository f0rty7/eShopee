import { AngularFireDatabase } from '@angular/fire/database';
import { CategoryService } from './../../category.service';
import { Component, OnInit, DoBootstrap } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: any[] = [];

  constructor(private categoryService: CategoryService, db: AngularFireDatabase) {
    // categoryService.getCategories();
  }

  save(product){
    console.log(product);
  }

  ngOnInit() {
  this.categoryService.courses$.subscribe(x => {
    this.categories = x;
})
    // this.categories$.subscribe(x => {
    //   console.log({x})
    //   this.categories = x;
    // })
  }

}
