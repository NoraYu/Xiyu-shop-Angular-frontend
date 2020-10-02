import { Component, OnInit } from '@angular/core';
import {ProductCategory} from '../../common/product-category';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories:ProductCategory[]=[];
  constructor(private productService : ProductService, private  route:ActivatedRoute,private  router2: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProductCategories();
      //this.router2.navigate(['/products']);
  })

  }

  listProductCategories(){
    this.productService.getProductCategoriesList().subscribe(data =>{
      console.log('Product Categories= '+JSON.stringify(data))
      this.productCategories=data;})
    //
  }

  updatelistProductCategories(){
    this.route.paramMap.subscribe(()=>{
      this.listProductCategories();
      //this.router2.navigate(['/products']);
    })
  }
}
