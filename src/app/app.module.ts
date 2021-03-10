import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { RecruitingContentsService } from './services/recruting-contents/recruiting-contents.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemDetailsComponent,
    ItemsListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    RecruitingContentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
