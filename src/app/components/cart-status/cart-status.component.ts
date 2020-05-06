import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../common/product';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  @Input() product:Product;

  constructor() { }

  ngOnInit(): void {
  }

}
