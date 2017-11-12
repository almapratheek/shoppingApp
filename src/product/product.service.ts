import { Injectable, ErrorHandler } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/RX';


@Injectable()
export class ProductService {

constructor(public http: Http, public handleError: ErrorHandler) {
}

  getProducts(limit: number, categoryList?: string[], pageIndex?: number): Observable<any> {

    let productURL: string = "http://localhost:8080/getProducts?limit=" + limit

    if(categoryList && categoryList.length) {
      productURL = productURL.concat("&category=" + categoryList.join(','))
    } 
     
    if(pageIndex) {
      productURL = productURL.concat("&pageIndex=" + pageIndex)
    }
     
    return this.http
    .get(productURL)
    .map(res => res.json())
    .catch(err => {
      console.log('UI error handling');
      return Observable.throw(err.json().error) || 'Server Error'});
    }
}