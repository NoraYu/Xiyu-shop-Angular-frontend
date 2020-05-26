import {Component, Input, OnInit} from '@angular/core';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart.service';
import {Cart} from '../../common/cart';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems:CartItem[]=[];

  totalPrice:number;
  totalQuantity:number;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.showCartItems();
  }

    showCartItems() {
      this.cartItems=this.cartService.cartItems;
      this.cartService.totalquantity.subscribe( data=>this.totalQuantity=data);
      this.cartService.totalPrice.subscribe(data=>this.totalPrice=data)
      this.cartService.computeCartTotalPrice();





  }

  decrementQuantity(item: CartItem) {

    this.cartService.decrementQuantity(item);

  }

  incrementQuantity(item: CartItem) {
    this.cartService.addToCart(item);

  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);

  }

  confirmedCart(items: CartItem[]) {
    this.cartService.conformCart(items);

  }
}
