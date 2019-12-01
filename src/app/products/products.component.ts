import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  //products: any[] = [];
  filteredProducts: Product[] = [];
  category$;
  productCategories: any = [];
  category: string;
  //cat: string;
  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {
    productService.product$.subscribe( products => { 
      this.products = products;

      route.queryParamMap.subscribe(params => {
        this.category =params.get('category');
        
        this.filteredProducts = (this.category) ?
          this.products.filter( p => p.category === this.category ) : this.products
      });
    });
    categoryService.courses$.subscribe( y => this.productCategories = y);
  }

}
