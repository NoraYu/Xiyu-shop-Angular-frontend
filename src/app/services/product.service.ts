import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../common/product';
import {ProductCategory} from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {//这个Service有2个fields：baseUrl和 HttpClient

  //private baseUrl = 'http://localhost:8080/api/products?size=100';

  private baseUrl = 'http://localhost:8080/api/products';
  private categoriesUrl = 'http://localhost:8080/api/product-category';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  headers= new HttpHeaders()
    .set('content-type', 'application/json');


  constructor(private  httpClient:HttpClient) { }

  getProductList(theCategoryId:number):Observable<Product[]>{

    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategoriesList():Observable<ProductCategory[]>{

    return this.httpClient.get<GetCategoryResponse>(this.categoriesUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }


  getSearchedProducts(keyWord: string):Observable<Product[]> {
    const searchUrl= `${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${keyWord}`;
    return this.getProducts(searchUrl);
  }


  getProduct(theProductId: number):Observable<Product> {
    const searchUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(searchUrl);
  }

  getProductListPaginateByCategoryId(thePage:number,thePageSize:number,theCategoryId:number):Observable<GetProductResponse>
  {
    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+
          `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetProductResponse>(searchUrl);
  }

  getSearchedProductsPaginate(thePage:number,thePageSize:number,keyWord: string):Observable<GetProductResponse> {
    const searchUrl= `${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${keyWord}`+
      `&page=${thePage}&size=${thePageSize}`;;
    return this.httpClient.get<GetProductResponse>(searchUrl);
  }


  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetProductResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  save(product: any) :Observable<any>{
    let result: Observable<any>;

    result = this.httpClient.post(this.baseUrl, product);
    return  result;
  }

  insertProductCategory(pc:ProductCategory):Observable<any>{
    let result: Observable<any>;
    const url='http://localhost:8080/api/product-category';
    const jsonPC=JSON.stringify(pc);
    console.log(jsonPC);
    //console.log({'headers':JSON.stringify(this.headers)})
    result =this.httpClient.post(url,jsonPC,this.httpOptions);
    console.log(2);
    return  result;
  }

}



interface GetProductResponse {
  _embedded: {           //必须是embedded 不然不能用
    products: Product[];
  },
  page:{
    size:number;
    totalElements:number,
    totalPages:number,
    number:number
  }


}
interface GetCategoryResponse {
  _embedded: {           //必须是embedded 不然不能用
    productCategory: ProductCategory[];
  }}


