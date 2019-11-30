import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit, OnDestroy {

  product: Product[];
  subscription: Subscription;
  filteredProducts: any[];
  constructor(private productService: ProductService) { }

  filter(query: string){
    // console.log(query);
    this.filteredProducts = (query) ?
    this.product.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.product
  }

  ngOnInit() {
    this.subscription =this.productService.product$
    .subscribe( x => {
      this.filteredProducts = this.product = x;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
