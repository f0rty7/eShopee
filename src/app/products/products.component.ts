import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  products: any[] = [];
  constructor(productService: ProductService) {
    this.products$ = productService.product$.subscribe( x => this.products = x);
  }

}
