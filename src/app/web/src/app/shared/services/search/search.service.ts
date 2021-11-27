import { Injectable } from '@angular/core';
import { SearchBoxComponent } from '@shared/components';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchBoxes: SearchBoxComponent[];

  constructor() {
    this.searchBoxes = [];
  }

  add(searchBox: SearchBoxComponent) {
    this.searchBoxes.push(searchBox);
  }

  remove(searchBox: SearchBoxComponent) {
    this.searchBoxes.splice(this.searchBoxes.findIndex((component) => searchBox === component), 1);
  }

  resetOthers(searchBox: SearchBoxComponent) {
    this.searchBoxes.forEach((component) => {
      if (searchBox !== component) {
        component.reset();
      }
    });
  }
}
