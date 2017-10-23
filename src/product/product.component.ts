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
  pages: number[] = [1,2,3,4,5]
  products: any[]
  categoryList: string[]=[]

  ngOnInit(): void {
        this.getProducts(this.categoryList)
      }  

  getProducts(categoryList?: string[]): void {
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

   getPageNumbers(clickCount: number) {
     let pages: number[] = []
     for(var i=(5*clickCount)+1; i<=5*(clickCount+1); i++){
        pages.push(i)
     }
     this.pages = pages
   }
    
}
