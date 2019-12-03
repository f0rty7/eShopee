import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService,db: AngularFireDatabase) { }

  addToCart(product: Product){
    this.cartService.addToCart(product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    // console.log("heyllo",this.shoppingCart)
    // let item = this.shoppingCart[this.product.key];
    let item = this.shoppingCart[this.product.key]
    // console.log("product is", this.product);
    return item ? item.quantity : 0;
  }

}
