import { Product } from './product';
export interface ShoppingCartItem{
    product: Product;
    quantity: number;
    
    // getTotalPrice(){
    //     return this.product.price * this.quantity;
    // }
}