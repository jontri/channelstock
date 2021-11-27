import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { CompanyService } from '@api';

@Component({
  selector: 'rom-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Output() prev: EventEmitter<void>;
  @Output() next: EventEmitter<void>;
  @Output() submit: EventEmitter<number>;
  @Input() pages: number;
  @Input() currPage: number;

  paginationForm: FormGroup;

  pager: any = {};
  private _pages: number;

  constructor() {
    this.prev = new EventEmitter<void>();
    this.next = new EventEmitter<void>();
    this.submit = new EventEmitter<number>();
    this.paginationForm = new FormGroup({
      pageNum: new FormControl()
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pages) {
      const numOfPages = changes.pages.currentValue;
      this.paginationForm.controls.pageNum.setValidators(
        [Validators.min(1), Validators.max(numOfPages), Validators.pattern('[0-9]*')]
      );
      this._pages = numOfPages;
      this.setPage(1);
    }
    if (changes.currPage) {
      this.paginationForm.controls.pageNum.setValue(changes.currPage.currentValue);
      this.setPage(changes.currPage.currentValue);
    }
  }

  goPrev() {
    this.prev.emit();
  }

  goNext() {
    this.next.emit();
  }

  goFirst() {
    this.submit.emit(1);
  }

  goLast() {
    this.submit.emit(this.pages);
  }

  goCurrent(pageNumber: number) {
    this.submit.emit(pageNumber);
  }
  onSubmit(event: KeyboardEvent) {
    if (this.paginationForm.valid) {
      this.submit.emit(this.paginationForm.controls.pageNum.value);
    }
    event.stopPropagation();
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.getPager(this._pages, page);
  }
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    const totalPages = totalItems; // Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    const prevPage: number = Number(currentPage - 2);
    const nextPage: number = Number(endPage + 1);
    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages,
        prevPage: prevPage,
        nextPage: nextPage
    };
  }
}
