import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product = new Product();
  constructor(private route:ActivatedRoute,private productService:ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.showProductDetails();
    })

  }
  showProductDetails(){

    //const theProductId: number = +this.route.snapshot.paramMap.get('is');
    //{path:'products/:is', component: ProductDetailsComponent},
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    //这个id对应的是path：这个路径后的标签 path variable
    console.log(theProductId);
    this.productService.getProduct(theProductId).subscribe(
      data=>{
        this.product=data;
      }
    );
  }
}
