import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private productService:ProductService,
              private  router:Router) { }

  ngOnInit():void {
  }

  doSearch(searchInput:string){
    console.log(`value=${searchInput}`);
    this.router.navigateByUrl(`/search/${searchInput}`);
  }

}
