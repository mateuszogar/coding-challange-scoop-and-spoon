import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { SpyLocation } from '@angular/common/testing';
import { of } from 'rxjs';

import { RecruitingContentsService } from 'src/app/services/recruting-contents/recruiting-contents.service';
import { RecruitingContentsServiceMock } from 'src/app/services/recruting-contents/recruiting-contents.service.mock';

import { ItemDetailsComponent } from './item-details.component';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RecruitingContentsService, useClass: RecruitingContentsServiceMock },
        { provide: Router, useValue: {
          navigate(): void {
            // placeholder
            }
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({companyId: '60426c655e7106eb1842792a'})
          }
        },
        {
          provide: Location,
          useClass: SpyLocation
        }
      ],
      declarations: [
        ItemDetailsComponent
      ]
    });

    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should render component', () => {
    expect(component).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it("should have as header 'KIGGLE'", () => {
    expect(component.companyDetails.company).toEqual('KIGGLE');

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('KIGGLE');
  });

  it("when click on 'go back' then should call location service", () => {
    spyOn(component.location, 'back');
    expect(component.goBack).toBeDefined;

    const compiled = fixture.nativeElement;
    const btnEl = compiled.querySelector('.go-back-button');
    btnEl.click();
    expect(component.location.back).toHaveBeenCalled();
  });
});
