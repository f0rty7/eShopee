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
  items1: ShoppingCart;
  productDetails: any[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.valueChanges().subscribe(x => {
      console.log({ x });
      for (let productId in x["items"]) {
        this.totalItemsCount += x["items"][productId].quantity;
      }
      this.getProductIds(x);
    });
  }

  getProductIds(items) {
    console.log("ghggh", items);
    // return Object.keys(this.items1);
    for (let product in items["items"]) {
      this.productDetails.push({
        title: items["items"][product].product.title,
        quantity: items["items"][product].quantity
      });
    }
    console.log(this.productDetails);
  }
}
