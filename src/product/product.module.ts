import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ProductComponent } from './product.component';
import { ProductService } from './product.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ProductService],
  bootstrap: [ProductComponent]
})
export class ProductModule { }
