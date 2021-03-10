import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { Subscription } from 'rxjs';

import { RecruitingContentsService } from 'src/app/services/recruting-contents/recruiting-contents.service';
import { CompanyResponseModel } from 'src/app/services/recruting-contents/recruiting-contents.types';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  companyDetails?: CompanyResponseModel;
  subscription: Subscription = new Subscription();

  constructor(
    private recruitingContentService: RecruitingContentsService,
    private route: ActivatedRoute,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.recruitingContentService.getSingleContent(param.companyId)
        .subscribe(response => this.companyDetails = response)
    });
  }

  goBack(): void {
    this.location.back();
}
}
