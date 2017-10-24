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
  pageNumbers: number[] = [1,2,3,4,5]
  maxProductsPerPage: number = 5;
  products: any[]
  categoryList: string[]=[]

  ngOnInit(): void {
        this.getProducts(this.categoryList)
      }  

  getProducts(categoryList?: string[]): void {
    this.pageNumbers = [1,2,3,4,5]
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

   getNextPageNumbers() {
      this.pageNumbers = this.pageNumbers
                             .filter(page => page < (this.products.length/this.maxProductsPerPage+1)-this.maxProductsPerPage)
                             .map(pageNumber => pageNumber + this.maxProductsPerPage) 
    }

   getPreviousPageNumbers() {
    this.pageNumbers = this.pageNumbers.map(pageNumber => pageNumber-5)
   }
    
}
