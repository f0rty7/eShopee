import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit, OnDestroy {
  cart$;
  totalItemsCount: number = 0;
  productDetails: any[] = [];
  totalPrice: number = 0;
  cartSubscription: Subscription;


  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = this.cart$.valueChanges().subscribe(x => {
      for (let productId in x["items"]) {
        this.totalItemsCount += x["items"][productId].quantity;
      }
      this.getProductIds(x);
    });
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

  getProductIds(items) {
    for (let product in items["items"]) {
      this.productDetails.push({
        title: items["items"][product].product.title,
        price: items["items"][product].product.price,
        quantity: items["items"][product].quantity,
        imageUrl: items["items"][product].product.imageUrl,
        itemTotalPrice: items["items"][product].product.price * items["items"][product].quantity,
      });
    }

    this.productDetails.forEach((product, i) => {
      this.totalPrice += product.itemTotalPrice;
      if(product.quantity === 0) {
        this.productDetails.splice(i, 1);
      }
    })
  }

}
