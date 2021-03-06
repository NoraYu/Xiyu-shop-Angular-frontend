import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CartService} from './services/cart.service';
import { NewProductFormComponent } from './components/new-product-form/new-product-form.component';
import { ProductCategoryFormComponent } from './components/product-category-form/product-category-form.component';
const routes: Routes = [
  {path:'checkout', component: CheckoutComponent},
  {path:'cart-details', component: CartDetailsComponent},
  {path:'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword',component:ProductListComponent},
  {path: 'category/:id/:name',component:ProductListComponent},
  {path:'category', component:ProductListComponent},
  {path:'products', component:ProductListComponent},
  {path:'newproduct', component: NewProductFormComponent},
  {path:'newcategory', component:ProductCategoryFormComponent},
  {path:'catesidebar', component:ProductCategoryMenuComponent},
  {path:'', redirectTo: '/products',pathMatch:'full'},
  {path:'**', redirectTo: '/products',pathMatch:'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    NewProductFormComponent,
    ProductCategoryFormComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductService,
    CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
