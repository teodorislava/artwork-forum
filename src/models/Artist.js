export class Artist {
    constructor(
        id = 0, name = '', lastname = '', country = '',
        periodstart = '', periodend = '', biography = '', numberofworks = '', directionid = 0)
     {
         this.id = id;
         this.name = name;
         this.lastname = lastname;
         this.country = country;
         this.periodstart = periodstart;
         this.periodend = periodend;
         this.biography = biography;
         this.numberofworks = numberofworks;
         this.directionid = directionid;
     }
}
