import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RecruitingContentsService } from 'src/app/services/recruting-contents/recruiting-contents.service';
import { CompanyResponseModel } from 'src/app/services/recruting-contents/recruiting-contents.types';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  constructor(
    private readonly recruitingContentService: RecruitingContentsService
  ) {}

  private subscription = new Subscription();
  private contents: CompanyResponseModel[] = [];
  terms$ = new Subject<string>();
  searchInputValue = '';

  ngOnInit(): void {
    this.getAllContent();

    this.terms$.pipe(
      debounceTime(400), // discard emitted values that take less than the specified time between output
      distinctUntilChanged() // only emit when value has changed
    ).subscribe(term => {
      console.log(term);
      this.allItems = this.allItems.filter(item => item.name.includes(term));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get allItems(): CompanyResponseModel[]{
    return this.contents;
  }

  set allItems(items: CompanyResponseModel[]){
    this.contents = items;
  }

  getAllContent(): void {
    const contentItemsSubscription =  this.recruitingContentService.getAllContent().subscribe(content => {
      this.allItems = content;
    },
    err => {
      alert('Problem with retrieving data from server');
    });

    this.subscription.add(contentItemsSubscription);
  }

  getSingleContent(id: string): void {
    this.recruitingContentService.getSingleContent(id);
  }

  removeFromList(id: string): void {
    this.allItems = this.allItems.filter(item => item.id != id);
  }

  openSeparatePage(item: CompanyResponseModel): void {
    console.log(item);
  }

  handleSearcher(event: any): void {
    console.log(event);
  }
}
