import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './components/games/games.component';
import { SearchComponent } from './components/search/search.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import {HttpClientModule} from '@angular/common/http';
import { GameListComponent } from './components/game-list/game-list.component';
import { LandingComponent } from './components/landing/landing.component';
import { DisplayCollectionComponent } from './components/display-collection/display-collection.component';
import { CollectionsTypesComponent } from './components/collections-types/collections-types.component'

const routes: Routes = [
  {path : 'search/:keyword',component: GameDetailsComponent},
  {path : 'collection/games/:id',component: GamesComponent},
  {path : 'collection/:id',component: DisplayCollectionComponent},
  {path : 'collections',component: DisplayCollectionComponent},
  {path: 'games/:keyword', component: GameDetailsComponent},
  {path: 'id/:id', component: GameDetailsComponent },
  {path: 'category/:keyword', component: DisplayCollectionComponent},
  {path : 'home',component: GameListComponent},  
  {path : '',redirectTo: '/home',pathMatch: 'full'},
  {path : '**',redirectTo: '/home',pathMatch: 'full'},
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
    CollectionsTypesComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
