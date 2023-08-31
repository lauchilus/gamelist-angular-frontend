export class Game {
    constructor(
        public id: number,
        public rating: number,
        public category: string,
        public collection: string,
        public cover: Uint8Array,
        public name: string,
        public summary: string
    ){
    
    }
}
