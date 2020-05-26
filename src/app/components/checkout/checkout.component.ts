import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalPrice: number=0;
  totalQuantity: number=0;
  cartItems:CartItem[]=[];
  constructor(private formBuilder: FormBuilder,
              private cartService: CartService) { }

  ngOnInit(): void {

    this.checkoutFormGroup=this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),

    })
      this.cartItems=this.cartService.cartItems;
      console.log('cart size'+this.cartItems.length);
//先进行注册订阅，subject.subscribe 订阅
      this.cartService.totalquantity.subscribe(data=>this.totalQuantity=data);
      this.cartService.totalPrice.subscribe(data=>this.totalPrice=data)
    //之后再计算一遍总价与总量，之后在service里面subject.next进行推送。上面的两条信息才能收到并进行数据绑定
      this.cartService.computeCartTotalPrice()
  }
  onSubmit(){
    console.log("Handling the checkout submit ");
    console.log(this.checkoutFormGroup.get('customer').value);
  }

  copyShippingAddressToBillingAddress(event) {
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value)
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }

  }
}
