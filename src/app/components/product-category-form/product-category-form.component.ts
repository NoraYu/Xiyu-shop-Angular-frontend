import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit {
  categoryForm=this.fb.group({
    categoryName:['', Validators.required]
  });
  constructor(private fb: FormBuilder, private ps: ProductService,private  router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    const pc:ProductCategory=this.categoryForm.value;
    console.log(pc);
    this.ps.insertProductCategory(pc).subscribe(() => this.updatecategorysidebar());

  }

  updatecategorysidebar() {
    this.router.navigate(['/catesidebar']);
    //this.router.navigate(['/catesidebar']);
  }
}
