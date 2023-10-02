import { Collections } from "./collections";
import { Pagination } from "./pagination";

export class CollectionPage {
   

     constructor(public collections: any[] = [],
        public pagination: Pagination){}

    getCollections(){
        return this.collections;
    }
}
