import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CompanyResponseModel } from './recruiting-contents.types';

const BASE_URL = 'https://scoopandspoon.marketing/recruiting-api';

@Injectable({
  providedIn: 'root'
})
export class RecruitingContentsService {

  constructor(private readonly http: HttpClient) {
  }

  getAllContent(): Observable<CompanyResponseModel[]> {
    const endpoint = `${BASE_URL}/contents`;

    return this.http
      .get<CompanyResponseModel[]>(endpoint)
      .pipe(
        catchError(err => {
          alert(err.error.message);
          return throwError(err);
        }
      )
    )
  }

  getSingleContent(id: string): Observable<CompanyResponseModel> {
    const endpoint = `${BASE_URL}/contents/${id}`;

    return this.http
      .get<CompanyResponseModel>(endpoint)
      .pipe(
        catchError(err => {
          alert(err.error.message);
          return throwError(err);
        })
      )
    ;
  }
}
