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

  products: any[]

  ngOnInit(): void {
        this.productService.getProducts()
        .subscribe(
          data => {
            this.products = data.products
          })
      }
}
