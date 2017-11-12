import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'product-root',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private productService: ProductService) {
  }
  count: number = 0
  pageNumbers: number[][] = []
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
            this.paging(this.productCount, this.maxProductsPerPage)
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

  getLimitedProducts(event) {
    this.productService.getProducts(this.maxProductsPerPage, this.categoryList, <number>event.target.text)
        .subscribe(
          data => {
            this.products = data.products
          },
          err => {},
        )
  } 

   paging(productCount: number, maxPages: number): void {
    this.pageNumbers = [] 
    let nbrOfPages: number = 
    (productCount % maxPages)==0 ? 
    Math.floor(productCount / maxPages) : Math.floor(productCount / maxPages)+1

    let pages: number[] = []
    for(let i=1; i <= nbrOfPages; i++) {
      pages.push(i)
    }

    if(nbrOfPages > 5) {
      while(pages.length >= 5) {
        this.pageNumbers.push(pages.splice(0,5))
      }   
    } 
    this.pageNumbers.push(pages)
    this.count = 0     
  }
}
