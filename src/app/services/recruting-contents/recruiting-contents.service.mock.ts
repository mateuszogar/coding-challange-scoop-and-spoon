import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import * as mockResponse from "./mocks/contents-list-mock.json";
import { CompanyResponseModel } from './recruiting-contents.types';

@Injectable()
export class RecruitingContentsServiceMock {

  getAllContent(): Observable<CompanyResponseModel[]> {
    return of(mockResponse);
  }

  getSingleContent(id: string): Observable<CompanyResponseModel> {
    return of(mockResponse[1]);
  }
}
