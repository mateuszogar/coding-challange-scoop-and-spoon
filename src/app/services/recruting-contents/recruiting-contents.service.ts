import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

    return this.http.get<CompanyResponseModel[]>(endpoint);
  }

  getSingleContent(id: string): Observable<CompanyResponseModel> {
    const endpoint = `${BASE_URL}/contents/${id}`;

    return this.http.get<CompanyResponseModel>(endpoint);
  }
}
