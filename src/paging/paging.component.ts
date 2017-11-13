import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paging-shared',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent {
  count: number = 0
  pageNumbers: number[][] = []
  @Output() onPageClick = new EventEmitter<number>();

  pageIndexClick(event) {
    this.onPageClick.emit(<number>event.target.text)
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