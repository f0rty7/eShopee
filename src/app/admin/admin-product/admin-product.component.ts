import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  product;
  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.product$
    .subscribe( x => {
      this.product = x;
    })
  }

}
