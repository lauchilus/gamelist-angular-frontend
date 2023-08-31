import { Component, OnInit } from '@angular/core';
import { CollectionTypes } from 'src/app/common/collection-types';
import { GameService } from 'src/app/services/game-service.service';

@Component({
  selector: 'app-collections-types',
  templateUrl: './collections-types.component.html',
  styleUrls: ['./collections-types.component.css']
})
export class CollectionsTypesComponent implements OnInit{

  categories: CollectionTypes[] = ['collections','played','playing'];


  constructor(private service: GameService){}

  ngOnInit() {
    this.listCategories();
  }

  listCategories() {
  }

}
