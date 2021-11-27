import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { RoadShowService } from '@api';
import { RoadShow } from '@models';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'rom-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  selectedRoadshow: RoadShow;
  reservationForm: FormGroup;
  reservation: any = {
    seats: 0
  };
  max: any = 0;
  username: string;
  isSuccessful: boolean;

  @Input() roadShow: RoadShow;
  @Output() roadShowChange: EventEmitter<RoadShow> = new EventEmitter<RoadShow>();

  private postsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private roadshowService: RoadShowService

  ) {

    this.roadshowService.selectedRoadShow.subscribe(
      res => {
        const data: any = res;
        this.selectedRoadshow = data;
        this.max = Number(this.selectedRoadshow.seats);
        console.log(res);
        this.formInit();
      }
    );

    this.username = sessionStorage.getItem('LOGGED_USER');
  }

  ngOnInit() {
    this.formInit();
  }

  public ngOnDestroy(): void {
    if (this.postsSubscription) {
        this.postsSubscription.unsubscribe();
    }
  }

  formInit() {
    this.reservationForm = new FormGroup({
      'seats': new FormControl(this.reservation.seats, [
        Validators.required,
        Validators.max(this.max),
        Validators.min(1),
      ]),
    });
  }

  onReserve(form: FormGroup) {
    // if(this.reservationForm.valid){
      console.log('RESERVE ON SELECTED ROADSHOW: ' + this.selectedRoadshow.id);

      this.roadshowService.reserveUserForRoadshow(this.selectedRoadshow.id.toString(), this.username)
        .subscribe(
          result => {
            console.log('RESULT: ' + result['result'].messageDesc);
            this.isSuccessful = true;
            this.roadshowService.getRoadShow(`${this.roadShow.id}`).subscribe(roadShow => {
              this.roadShowChange.emit(roadShow['Roadshow']);
            });
          },
          error => {
            console.log('ERROR: ' + error['result'].messageDesc);
            this.isSuccessful = false;
          }
        );

        // if( this.isSuccessful){
         // location.reload();
        // }

        // this.router.navigate(['roadshowdetail', this.selectedRoadshow.id.toString()]);
        // this.refreshData(this.selectedRoadshow.id.toString());

        // this.roadshowService.selectedRoadShow.next(this.selectedRoadshow);

    // }
  }

  onCancelReserve(form: NgForm) {
    console.log('CANCEL RESERVATION ON ROADSHOW: ' + this.selectedRoadshow.id);
    // if(this.reservationForm.valid){
      this.roadshowService.cancelUserForRoadshow(this.selectedRoadshow.id.toString(), this.username).subscribe();
    // }
  }

  get seats() { return this.reservationForm.get('seats'); }

  private refreshData(id): void {
     this.roadshowService.getRoadShow(id).subscribe(
        selectedRoadshow => {
          this.selectedRoadshow = selectedRoadshow['Roadshow'];
        });
  }
}
