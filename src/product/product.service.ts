import { Injectable, ErrorHandler } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/RX';


@Injectable()
export class ProductService {

constructor(public http: Http, public handleError: ErrorHandler) {
}

  getProducts(): Observable<any> {
    return this.http.get("http://localhost:8080/getProducts")
    .map(res => res.json())
    .catch(err => {
      console.log('UI error handling');
      return Observable.throw(err.json().error) || 'Server Error'});
    }
}