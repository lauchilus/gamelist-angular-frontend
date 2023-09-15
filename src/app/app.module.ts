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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'search/:keyword', component: SearchGamesComponent },
  { path: 'AddCollection', component: AddCollectionComponent },
  { path: 'collection/games/:id', component: GamesComponent },
  { path: 'collection/:id', component: DisplayCollectionComponent },
  { path: 'collections', component: DisplayCollectionComponent },
  { path: 'games/:keyword', component: GameDetailsComponent },
  { path: 'id/:id', component: GameDetailsComponent },
  { path: 'category/:keyword', component: DisplayCollectionComponent },
  { path: 'home', component: GameListComponent, canActivate: [authGuard] },
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
    LoginComponent

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
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
    })
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
