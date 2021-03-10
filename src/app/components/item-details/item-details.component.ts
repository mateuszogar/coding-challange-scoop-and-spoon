import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecruitingContentsService } from 'src/app/services/recruting-contents/recruiting-contents.service';
import { CompanyResponseModel } from 'src/app/services/recruting-contents/recruiting-contents.types';

import { Location } from '@angular/common'

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  companyDetails: CompanyResponseModel = {id: '', name: '', company: '', description: '', latitude: 0, longitude: 0, imageUrl: '', tags: []};
  subscription: Subscription = new Subscription();

  constructor(
    private recruitingContentService: RecruitingContentsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('company');

    this.route.params.subscribe(param => {
      this.recruitingContentService.getSingleContent(param.companyId)
        .subscribe(response => this.companyDetails = response)
    });
  }

  goBack(): void {
    this.location.back();
}
}
