import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RecruitingContentsService } from 'src/app/services/recruting-contents/recruiting-contents.service';
import { CompanyResponseModel } from 'src/app/services/recruting-contents/recruiting-contents.types';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  constructor(
    private readonly recruitingContentService: RecruitingContentsService,
    public router: Router
  ) {}

  private subscription = new Subscription();
  private contents: CompanyResponseModel[] = [];
  searcherInput$ = new Subject<string>();
  searchInputValue = '';

  ngOnInit(): void {
    this.getAllContent();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get allItems(): CompanyResponseModel[] {
    return this.contents;
  }

  set allItems(items: CompanyResponseModel[]) {
    this.contents = items;
  }

  getAllContent(): void {
    const contentItemsSubscription =  this.recruitingContentService.getAllContent().subscribe(content => {
      this.allItems = content;
      this.handleSearch();
     });

    this.subscription.add(contentItemsSubscription);
  }

  getSingleContent(id: string): void {
    this.recruitingContentService.getSingleContent(id);
  }

  removeFromList(id: string): void {
    this.allItems = this.allItems.filter(item => item.id != id);
  }

  openSeparatePage(companyId: string): void {
    this.router.navigate(['company', companyId]);
  }

  onSearchChange(inputValue: string): void {
    this.searcherInput$.next(inputValue);
  }

  handleSearch(): void {
    const fullList = [...this.allItems];

    const searchValueSubscription = this.searcherInput$.pipe(
      debounceTime(400),
    ).subscribe(term => {
      this.allItems = fullList.filter(item => {
        return item.company.toLowerCase().match(term.toLocaleLowerCase())
      });
    });

    this.subscription.add(searchValueSubscription);
  }
}
