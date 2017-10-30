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
  pageNumbers: number[][] = []
  maxProductsPerPage: number = 5
  products: any[] = []
  categoryList: string[] = []

  ngOnInit(): void {
        this.getProducts(this.categoryList)
        this.paging(this.products, this.maxProductsPerPage)
      }  

  getProducts(categoryList?: string[]) {
    this.productService.getProducts(categoryList)
        .subscribe(
          data => {
            this.products = data.products
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
    productsList.length % maxPages ? 
    productsList.length / maxPages : productsList.length / maxPages+1

    let pages: number[]
    for(let i=1; i <= nbrOfPages; i++) {
      pages.push(i)
    }

    if(nbrOfPages > 5) {
      while(pages.length >= 5) {
        this.pageNumbers.push(pages.splice(1,5))
      }   
    } 
    this.pageNumbers.push(pages)     
  }

}
