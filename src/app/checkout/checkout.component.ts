import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { OrdersService } from './../orders.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  shipping= {};
  cart: any;
  cartItems: any = [];
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrdersService,
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.valueChanges().subscribe( cart => {
    for(let c in cart['items']) {
      this.cartItems.push({
        title: cart['items'][c].product.title,
        price: cart['items'][c].product.price,
        imageUrl: cart['items'][c].product.imageUrl,
        quantity: cart['items'][c].quantity,
      })
    }
  });
  this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder(){
    //console.log(this.cartItems)
    // let orders = new Order(this.userId, this.shipping, this.cart)

    let orders = {
      userId: this.userId,
      datePlaced: new Date(),
      shipping: this.shipping,
      items: this.cartItems.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          itemQuantity: i.quantity,
          totalPrice: i.quantity * i.price
        }
      })
    }
    //console.log(orders)
    let result = await this.orderService.saveOrders(orders);
    this.router.navigate(['/order-success', result.key])
  }
}
