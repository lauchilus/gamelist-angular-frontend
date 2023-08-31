export class Playing {

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public image: string,
        public startDate: Date,
        public finishDate: Date,
        public game_id: number,
        public base64Image: string
        ){

    }
}
