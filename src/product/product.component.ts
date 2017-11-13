import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './product.service';
import { PagingComponent } from '../paging/paging.component';

@Component({
  selector: 'product-root',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private productService: ProductService) {
  }

  @ViewChild(PagingComponent)
  private paging: PagingComponent
  maxProductsPerPage: number = 10
  products: any[] = []
  categoryList: string[] = []
  productCount: number = 0

  ngOnInit(): void {
        this.getProducts(this.maxProductsPerPage)
      }  

  getProducts(limit: number, categoryList?: string[], pageIndex?: number) {
    this.productService.getProducts(limit, categoryList, pageIndex)
        .subscribe(
          data => {
            this.products = data.products
            this.productCount = data.total
          },
          err => {},
          () => {
            this.paging.paging(this.productCount, this.maxProductsPerPage)
          })
  }

  getFilteredProducts(event) {
    if(event.target.checked){
      this.categoryList.push(<string>event.target.id)    
      this.getProducts(this.maxProductsPerPage, this.categoryList)

    }   
    else {
      this.categoryList.splice(this.categoryList.indexOf(<string>event.target.id), 1)
      this.getProducts(this.maxProductsPerPage, this.categoryList)
    } 
   }

  onPageClick(pageIndex: number) {
    this.productService.getProducts(this.maxProductsPerPage, this.categoryList, pageIndex)
        .subscribe(
          data => {
            this.products = data.products
          },
          err => {},
        )
  }
}
