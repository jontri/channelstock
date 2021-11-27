import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeSliderComponent } from '../../components/welcome-slider/welcome-slider.component';

@Injectable({
  providedIn: 'root'
})
export class WelcomeSliderService {

  constructor(private modalService: NgbModal) { }

  public welcome(
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(WelcomeSliderComponent,{size: 'lg', backdrop: 'static' , windowClass:'modal-xxl'});
    return modalRef.result;
  }

}
