import { Component, OnInit } from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {FormBuilder, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductCategory} from '../../common/product-category';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.css']
})
export class NewProductFormComponent implements OnInit {
  product: Product = new Product();
  category:ProductCategory;
  url:string;
  constructor(private formBuilder: FormBuilder,
              private productService:ProductService,
              private route: ActivatedRoute,
              private  router: Router) { }

  ngOnInit(): void {
  }
  gotoList() {
    this.router.navigate(['/products']);
  }
  create(form: NgForm){
    this.productService.save(form).subscribe(() => this.gotoList());
  }
}
