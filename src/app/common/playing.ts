export class Playing {

    constructor(
        public id: number,
        public name: string,
        public summary: string,
        public image: string,
        public startDate: Date,
        public finishDate: Date,
        public game_id: number,
        public base64Image: string
        ){

    }
}
