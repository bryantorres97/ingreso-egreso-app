import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing.module';
import { environment } from 'src/environments/environment';
import { appReducers } from './app.reducer';

import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,    
    AuthModule,   


  ],
  providers: [
    //FireAuthServcice
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
