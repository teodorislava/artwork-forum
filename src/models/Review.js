export class Review {
    constructor(
        id = 0, score = 0, name_reviewer = '', lastname_reviewer = '', text = '')
     {
        this.id = id;
        this.score = score;
        this.name_reviewer = name_reviewer;
        this.lastname_reviewer = lastname_reviewer;
        this.text = text;
     }
}
