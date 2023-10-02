import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { GamesComponent } from './components/games/games.component';
import { SearchComponent } from './components/search/search.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GameListComponent } from './components/game-list/game-list.component';
import { LandingComponent } from './components/landing/landing.component';
import { DisplayCollectionComponent } from './components/display-collection/display-collection.component';
import { CollectionsTypesComponent } from './components/collections-types/collections-types.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCollectionComponent } from './components/add-collection/add-collection.component';
import { SearchGamesComponent } from './components/search-games/search-games.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { DecodeToken } from './helpers/decode-token';
import { DialogPlayedComponent } from './components/dialog-played/dialog-played.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginButtonComponent } from './components/login-button/login-button.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  { path: 'search/:keyword', component: SearchGamesComponent },
  { path: 'AddCollection', component: AddCollectionComponent, canActivate: [authGuard]  },
  { path: 'collection/games/:id', component: GamesComponent, canActivate: [authGuard] },
  { path: 'collection/:id', component: DisplayCollectionComponent, canActivate: [authGuard] },
  { path: 'collections', component: DisplayCollectionComponent, canActivate: [authGuard] },
  { path: 'games/:keyword', component: GameDetailsComponent },
  { path: 'id/:id', component: GameDetailsComponent },
  { path: 'category/:keyword', component: DisplayCollectionComponent, canActivate: [authGuard] },
  { path: 'home', component: GameListComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    SearchComponent,
    GameDetailsComponent,
    GameListComponent,
    LandingComponent,
    DisplayCollectionComponent,
    CollectionsTypesComponent,
    AddCollectionComponent,
    SearchGamesComponent,
    LoginComponent,
    RegisterComponent,
    DialogPlayedComponent,
    LoginButtonComponent

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'), // Ajusta esto según tu lógica de almacenamiento
        allowedDomains: ['http://localhost:8080'], // Ajusta esto según tus necesidades
        disallowedRoutes: ['http://localhost:8080/auth/login'], // Ajusta esto según tus necesidades
      }
    }),
    NoopAnimationsModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }, JwtHelperService,
    DecodeToken],
  bootstrap: [AppComponent]
})
export class AppModule { }
