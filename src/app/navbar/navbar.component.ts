import { ShoppingCartItem } from './../models/shopping-cart-item';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component,OnInit } from '@angular/core';
import { count } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  appUser: AppUser;
  shoppingCartItemCount: number;
  // items: ShoppingCart<ShoppingCartItem[]>;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { 

  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe( cart => {
      console.log(cart)
      this.shoppingCartItemCount = 0;
      const items = cart['items'];
      for ( let productId in items)
        this.shoppingCartItemCount += items[productId].quantity;
    });
  }

  logout(){
    this.auth.logout();
  }
}
