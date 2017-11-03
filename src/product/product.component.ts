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
  maxProductsPerPage: number = 5
  products: any[] = []
  categoryList: string[] = []

  ngOnInit(): void {
        this.getProducts(this.categoryList)
      }  

  getProducts(categoryList?: string[]) {
    this.productService.getProducts(categoryList)
        .subscribe(
          data => {
            this.products = data.products
          },
          err => {},
          () => {
            this.paging(this.products, this.maxProductsPerPage)
          })
  }

  getFilteredProducts(event) {
    if(event.target.checked){
      this.categoryList.push(<string>event.target.id)    
      this.getProducts(this.categoryList)

    }   
    else {
      this.categoryList.splice(this.categoryList.indexOf(<string>event.target.id), 1)
      this.getProducts(this.categoryList)
    } 
   }

   paging(productsList: any[], maxPages: number): void {
    let nbrOfPages: number = 
    (productsList.length % maxPages)==0 ? 
    Math.floor(productsList.length / maxPages) : Math.floor(productsList.length / maxPages)+1

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
