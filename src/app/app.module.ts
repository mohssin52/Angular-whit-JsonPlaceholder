import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { PostComponent } from './coomponent/post/post.component';
import { PostService } from './services/post.service';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
@NgModule({
  declarations: [
    AppComponent,
    PostComponent
  ],
  imports: [


  BrowserModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [PostService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
