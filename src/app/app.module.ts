import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InviteListComponent } from './invite-list/invite-list.component';
import { InviteComponent } from './invite/invite.component';
import {InviteListResolve} from './invite-list/invite-list.resolver';
import {InviteService} from './service/invite.service';

@NgModule({
  declarations: [AppComponent, InviteComponent, InviteListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [InviteListResolve, InviteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
