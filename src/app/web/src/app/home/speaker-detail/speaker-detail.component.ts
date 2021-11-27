import { Component, OnInit } from '@angular/core';
import { SpeakerService } from '../../api/speaker/speaker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Speaker, RoadShow } from '@models';
import { Location } from '@angular/common';

@Component({
  selector: 'rom-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.scss']
})
export class SpeakerDetailComponent implements OnInit {
  speaker: Speaker = {
    id: Number(''),
    presenterName: '',
    presenterBio: '',
    presenterMugshotURL: '',
    companyName: '',
    companyOverview: ''
  };

  constructor(
    private speakerService: SpeakerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) {
    this.activeRoute.params.subscribe(
      params => {
        console.log(params);
        this.getSpeaker(params.id);
      }
    );
  }

  ngOnInit() {
  }

  getSpeaker(id) {
      this.speakerService.getSpeakerDetails(id).subscribe(
        res => {
          this.speaker = res['Roadshow'];
          console.log(this.speaker);
        }
      );
  }

  back() {
    this.location.back();
  }

}
