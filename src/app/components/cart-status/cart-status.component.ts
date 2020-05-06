import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../common/product';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  //@Input() cartItems:CartItem[];
  totalPrice:number=0.00;
  totalQuantity:number=0;

  constructor(private cartService:CartService) { }




  ngOnInit(): void {
    this.handleCartInfo()
  }
  handleCartInfo(){
    this.cartService.totalquantity.subscribe(data=>this.totalQuantity=data);
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data)
  }
}
