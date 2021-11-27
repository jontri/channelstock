import * as $ from 'jquery';
import { Component, ViewChild, ElementRef, ComponentRef, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuItem, Company } from '@models';
import { OverlayService, UtilsService, SearchService } from '@shared/services';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { CompanyService, LoginService } from '@api';
import { Router } from '@angular/router';
import { ScrollStrategyOptions, OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/platform-browser';

type SearchProp = {
  filter: Function;
  sorter: Function;
  placeholder: string;
  hoverText: string;
};

type Options = {
  clearResults: boolean
  offsetWidth: number;
};

@Component({
  selector: 'rom-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent implements OnInit, OnDestroy {
  private static readonly SEARCH_DELAY = 500;
  private static readonly DEF_OPTS: Options = {
    clearResults: false,
    offsetWidth: 0
  };

  @Input() showCCIcon = false;
  @Input() type = 'name';
  @Input() options: Options = SearchBoxComponent.DEF_OPTS;
  @ViewChild('overlayOrigin') searchFormElem: ElementRef;

  private delayedSearch: number;
  private regexp: RegExp;

  searchProps: {[key: string]: SearchProp};
  searchForm: FormGroup;
  menuItems: MenuItem[];
  overlayElem: JQuery;
  overlayRef: OverlayRef;

  constructor(
    private overlayService: OverlayService,
    private companyService: CompanyService,
    private router: Router,
    private scrollStrategyOptions: ScrollStrategyOptions,
    @Inject(DOCUMENT) private document: any,
    private utilsService: UtilsService,
    private searchService: SearchService,
    private loginService: LoginService
  ) {
    this.searchProps = {
      name: {
        filter: this.filterByNameOrSymbol,
        sorter: this.sortByNameOrSymbol,
        placeholder: 'by name or symbol',
        hoverText: ''
      },
      profile: {
        filter: this.filterByProfile,
        sorter: this.sortByProfile,
        placeholder: 'Search Channelchek by keyword',
        hoverText: ''
      },
      name_long: {
        filter: this.filterByNameOrSymbol,
        sorter: this.sortByNameOrSymbol,
        placeholder: 'by company name or symbol',
        hoverText: ''
      },
      profile_long: {
        filter: this.filterByProfile,
        sorter: this.sortByProfile,
        placeholder: 'Search Channelchek by keyword',
        hoverText: 'Example: type \'cannabis\' to preview all companies with that word in their corporate profile.'
        }
      };

    this.searchForm = new FormGroup({
      search: new FormControl()
    });
    this.searchForm.valueChanges.subscribe(this.onFormValueChange.bind(this));
  }

  ngOnInit() {
    this.searchService.add(this);
    this.options = {...SearchBoxComponent.DEF_OPTS, ...this.options};
  }

  ngOnDestroy() {
    this.searchService.remove(this);
  }

  onSubmit() {
    const formVals = this.searchForm.value;
    this.search(formVals.search);
  }

  reset() {
    this.searchForm.setValue({search: null});
  }

  private onFormValueChange(vals): void {
    if (this.onFormValueChange) {
      clearTimeout(this.delayedSearch);
      this.delayedSearch = null;
    }

    this.delayedSearch = setTimeout(this.search.bind(this), SearchBoxComponent.SEARCH_DELAY, vals.search);
  }

  private search(searchTerm: string): void {
    if (searchTerm === '' || searchTerm) {
      this.overlayService.removeAll();
    }
    if (searchTerm) {
      this.searchService.resetOthers(this);
      this.regexp = new RegExp(searchTerm, 'i');
      const menuItems = this.companyService.allCompanies.filter(this.searchProps[this.type].filter.bind(this))
        .sort(this.searchProps[this.type].sorter.bind(this)).map((company: Company) => {
          return {
            action: (evt: MouseEvent) => {
              this.goToCompany(company.symbol);
              if (!this.options.clearResults) {
                evt.stopPropagation();
              }
            },
            label: `${company.symbol} - ${company.companyName}`};
        });
      if (menuItems.length) {
        const positionStrategy = this.overlayService.positionBuilder.flexibleConnectedTo(this.searchFormElem);
        positionStrategy.positions.push({
          originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top',
          offsetX: 0, offsetY: this.searchFormElem.nativeElement.offsetHeight
        });

        this.overlayRef = this.overlayService.create({
          backdropClass: 'rom-clear-overlay',
          hasBackdrop: true,
          positionStrategy,
          scrollStrategy: this.scrollStrategyOptions.block(),
          panelClass: 'rom-search-panel'
        });

        if (!this.overlayElem) {
          this.overlayElem = $(this.overlayService.containerElement);
        }
        this.overlayElem.on('click contextmenu', this.closeOverlay.bind(this));

        const componentRef: ComponentRef<DropdownMenuComponent> =
          this.overlayService.attachComponent(this.overlayRef, DropdownMenuComponent);
        const componentInstance = componentRef.instance;
        componentInstance.data = menuItems;

        const componentElem = $(componentRef.location.nativeElement).find('.dropdown-menu');
        const maxHeight = this.utilsService.pxToVw(
          this.document.documentElement.clientHeight - this.searchFormElem.nativeElement.getBoundingClientRect().bottom -
          this.searchFormElem.nativeElement.offsetHeight
        );
        const maxWidth = this.utilsService.pxToVw(this.searchFormElem.nativeElement.offsetWidth + this.options.offsetWidth);
        componentElem.css({
          maxHeight: `${maxHeight}vw`,
          width: `${maxWidth}vw`,
          overflowY: 'auto'
        });
      }
    }
  }

  private filterByNameOrSymbol(company: Company) {
    return this.regexp.test(company.companyName) || this.regexp.test(company.symbol);
  }

  private filterByProfile(company: Company) {
    return this.regexp.test(company.companyProfile);
  }

  private sortByNameOrSymbol(a: Company, b: Company) {
    return (a.companyName.search(this.regexp) - b.companyName.search(this.regexp)) +
      (a.symbol.search(this.regexp) - b.symbol.search(this.regexp));
  }

  private sortByProfile(a: Company, b: Company) {
    return a.companyProfile.search(this.regexp) - b.companyProfile.search(this.regexp);
  }

  private goToCompany(ticker: string): void {
    this.router.navigate(['company', ticker]);
  }

  private closeOverlay(): void {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.overlayElem.off('click contextmenu');
  }

}
