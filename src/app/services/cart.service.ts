import { Injectable } from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';
import {Cart} from '../common/cart';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:CartItem[]=[];
  cart:Cart=new Cart();

  totalPrice: Subject<number>=new Subject<number>();

  totalquantity: Subject<number>=new Subject<number>();

  private cartUrl = 'http://localhost:8080/api/carts';
  private itemsUrl='http://localhost:8080/api/cartItems';

  constructor(private  httpClient:HttpClient) { }

  addToCart(theCartItem:CartItem){
    let alradyExistsInCart: boolean=false;
    let exsitingCartItem:CartItem=undefined;
    if(!this.cart.active){
      this.cart=new Cart();
      this.httpClient.post<Cart>(`${this.cartUrl}`, this.cart);
      console.log(`cart created: ${this.cart.active}`);
    }

    if(this.cartItems.length>0){

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

  conformCart(items:CartItem[]){
    this.httpClient.post(`${this.cartUrl}`, this.cart);
    console.log(`cart created: ${this.cart.active}`);
    for(let item of items){
      this.httpClient.post(`${this.itemsUrl}`,item);
      console.log( `save ${item.name}  item`);
    }
    this.cart.active=false;

    this.httpClient.put(`${this.cartUrl}`, this.cart);

    console.log(`comfirmed ${this.cart.id} cart: ${this.cart.active}`);
    this.cart=new Cart();
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
