import { Injectable } from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:CartItem[]=[];

  totalPrice: Subject<number>=new Subject<number>();

  totalquantity: Subject<number>=new Subject<number>();

  constructor() { }

  addToCart(theCartItem:CartItem){
    let alradyExistsInCart: boolean=false;
    let exsitingCartItem:CartItem=undefined;

    if(this.cartItems.length>0){
      // for(let item of this.cartItems){
      //   if(item.id===theCartItem.id){
      //     exsitingCartItem=item;
      //     //alradyExistsInCart=true;
      //     break;
      //   }
      // }
      exsitingCartItem=this.cartItems.find(item=>item.id===theCartItem.id)
    }
    alradyExistsInCart=(exsitingCartItem!=undefined);
    if(alradyExistsInCart){
      exsitingCartItem.quantity++;
    }
    else{
      theCartItem.quantity=1;
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotalPrice();
  }

   computeCartTotalPrice() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;
    for(let item of this.cartItems){
      totalPriceValue+=item.unitPrice*item.quantity;
      totalQuantityValue+=item.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalquantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue,totalQuantityValue)
  }


  removeItem(cartItem:CartItem){
    for(let i=0;i<this.cartItems.length;i++){
      if(this.cartItems[i].id===cartItem.id){
        this.cartItems.splice(i, 1);
        this.computeCartTotalPrice()
      }
    }
  }


  decrementQuantity(cartItem:CartItem){
    cartItem.quantity--;
    if(cartItem.quantity===0){
      this.removeItem(cartItem);
    }
    else{
      this.computeCartTotalPrice();
    }
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }



}
