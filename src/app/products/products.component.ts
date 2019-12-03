import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  //products: any[] = [];
  filteredProducts: Product[] = [];
  category$;
  category: string;
  cart: any;
  subscription: Subscription;
  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartSerive: ShoppingCartService,) {
          
      productService.product$.pipe(switchMap( products => { 
      this.products = products;
      return route.queryParamMap
    }))
    .subscribe(params => {
        this.category =params.get('category');
        
        this.filteredProducts = (this.category) ?
          this.products.filter( p => p.category === this.category ) : this.products
      });
  }

  async ngOnInit(){
    this.subscription = (await this.shoppingCartSerive.getCart()).valueChanges().subscribe(cart => {this.cart = cart;
    console.log("cart value is ",cart)});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
