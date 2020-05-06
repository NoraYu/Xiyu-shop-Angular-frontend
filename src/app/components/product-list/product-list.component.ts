import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[] =[];



  currentCategoryId:number=1;
  previousCategoryId:number=1;
  currentCategoryName:string=null;
  previousCategoryName:string=null;
  searchMode:boolean =false;
  previousKeyWord:string=null;

  thePageNumber:number=1;
  thePageSize:number=8;
  theTotalElements:number=100;

  constructor(private productService:ProductService,
              private  route:ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProduct();
    })
  }

  listProduct(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();

    }
    else{
    this.handleListProducts();}

  }

  handleListProducts(){
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
      this.currentCategoryName=this.route.snapshot.paramMap.get('name');}
    else {
      this.currentCategoryId=1;
      this.currentCategoryName='Books'
    }
    //改变商品类别是，点击的不是改变页面，直接把第一页传进去
    if(this.previousCategoryId!=this.currentCategoryId) {
      this.thePageNumber=1;
    }
    //重置之前的种类与现种类同步，好为下次点击是否改变页面值和比较种类值作准备。
    this.previousCategoryId=this.currentCategoryId;
    //从html改变页面值currentPage设定了新的值，这个前提是不改变种类的
    console.log(`currentCategoryId=${this.currentCategoryId},thePageNumber=${this.thePageNumber}`);


    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   data =>{
    //     this.products=data;// rest json到angular arrey
    //   });

    this.productService.getProductListPaginateByCategoryId(this.thePageNumber-1,this.thePageSize,this.currentCategoryId).subscribe(
      this.processResult()
    )
  }
  processResult(){
    return data=>{this.products=data._embedded.products;
    //传回来的json，变成网页版
    this.thePageNumber=data.page.number+1;
    this.thePageSize=data.page.size;
    this.theTotalElements=data.page.totalElements;}
  }

  updatePageSize(pageSize:number){
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.listProduct();
  }


  handleSearchProducts(){


    const keyWord:string=this.route.snapshot.paramMap.get('keyword');
    // this.productService.getSearchedProducts(keyWord).subscribe(
    //   data=>{
    //     this.products=data;
    //   }
    // );
    if(this.previousKeyWord!=keyWord){
      this.thePageNumber=1;
    }
    this.previousKeyWord=keyWord;
    console.log(`keyword=${keyWord}, thePageNumber=${this.thePageNumber}`)
    this.productService.getSearchedProductsPaginate(this.thePageNumber-1,this.thePageSize,keyWord).subscribe(
      this.processResult()
    )
  }
  addToCart(theProduct:Product){
    console.log(`adding to cart: ${theProduct.name},${theProduct.unitPrice}`);



  }
}
