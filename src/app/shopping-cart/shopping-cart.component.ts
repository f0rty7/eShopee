import { ShoppingCart } from "./../models/shopping-cart";
import { ShoppingCartService } from "./../shopping-cart.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  totalItemsCount: number = 0;
  productDetails: any[] = [];
  totalPrice: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.valueChanges().subscribe(x => {
      for (let productId in x["items"]) {
        this.totalItemsCount += x["items"][productId].quantity;
      }
      this.getProductIds(x);
    });
  }

  getProductIds(items) {
    for (let product in items["items"]) {
      this.productDetails.push({
        title: items["items"][product].product.title,
        price: items["items"][product].product.price,
        quantity: items["items"][product].quantity,
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
