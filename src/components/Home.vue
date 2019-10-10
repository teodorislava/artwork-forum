<template>
  <div>
    <app-nav></app-nav>
    <div class="home-container">
        <div class="container-fluid home">
            <h2 class="covered">Reklamirajte se upravo ovde! <i class="fas fa-ad"></i></h2>
            <div v-if="!advertise" class="row">
                <div class="col-1">
                </div> 
                <div class="col-10">
                    <h5>Dodajte ili nadjite delo koje posedujete i kreirajte Vasu reklamu! <i class="fas fa-paint-brush"></i> </h5>
                    <div class="input-group mb-3">
                        <input v-on:keyup.enter="searchArts()"  v-model="art" name="searchart" type="text" class="form-control" placeholder="Pretrazite dela.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span @click="searchArts()" class="input-group-text click-span" id="basic-addon2"><i class="fab fa-searchengin"></i></span>
                        </div>
                    </div>
                    <div class="container search-for">
                        <div class="row">
                            <div class="col-3 searched-arts" v-for="(art,index) in artworks" :key="index">
                                <p v-on:click="choseArt(art)" class="searched-p-1">Ime Dela: {{ art.name }}</p>
                                <p class="searched-p-2">Tip Dela: {{ art.type }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="container">
                        <div class="row">
                            <div class="col-2"></div>
                            <div class="col-8">
                                <h5>Unesite podatke neophodne za delo, a zatim odaberite umetnika.</h5>
                                <div class="input-group mb-3">
                                    <input v-model="artwork.name" name="artname" type="text" class="form-control" placeholder="Ime Dela.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-signature"></i></span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input v-model="artwork.type" name="arttype" type="text" class="form-control" placeholder="Tip Dela.." aria-label="Tip dela" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-music"></i></span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input v-model="artwork.createddate" name="artcreated" type="text" class="form-control" placeholder="Datum kreiranja - d/M/yyyy" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-calendar-alt"></i></span>
                                    </div>
                                </div>
                                <div class="input-group">
                                    <textarea v-model="artwork.description" placeholder="Opis Dela.." name="artdescription" class="form-control" aria-label="With textarea"></textarea>
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span"><i class="fas fa-camera-retro"></i></span>
                                    </div>
                                </div>
                                <p class="chosen-title">Umetnik: 
                                    <label class="chosen-dir">{{ chosenArtist.name }}</label>
                                    <i @click="clearArtist()" v-if="chosenArtist.name !== ''" class="fas fa-times del"></i>
                                </p>
                                <button v-on:click="addArtwork()" class="link add covered">Dodajte Delo</button>
                            </div>
                            <div class="col-2"></div>
                            <div class="col-6">
                                <h5>Odaberite Umetnika</h5>
                                <div class="input-group mb-3">
                                    <input v-on:keyup.enter="searchArtists()"  v-model="searchArtist" name="artistsearch" type="text" class="form-control" placeholder="Pretrazite Umetnike.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span v-on:click="searchArtists()" class="input-group-text click-span" id="basic-addon2"><i class="fas fa-search"></i></span>
                                    </div>
                                </div>
                                <p>
                                    Niste nasli umetnika?? Dodajte sami!
                                </p>
                                <div class="container search-for">
                                    <div class="row">
                                        <div class="col-6 searched-arts" v-for="(artist,index) in artists" :key="index">
                                            <p v-on:click="choseArtist(artist)" class="searched-p-1">Ime Umetnika: {{ artist.name }}</p>
                                            <p class="searched-p-2">Biografija: {{ artist.biography }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input v-model="artist.name" name="artistname" type="text" class="form-control" placeholder="Ime Umetnika.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-signature"></i></span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input v-model="artist.lastname" name="artlastname" type="text" class="form-control" placeholder="Prezime Umetnika.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-signature"></i></span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input v-model="artist.country" name="countryartist" type="text" class="form-control" placeholder="Zemlja Porekla.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-globe-europe"></i></span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input v-model="artist.periodstart" name="periodstart" type="text" class="form-control" placeholder="Datum Pocetka Karijere - d/M/yyyy" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-calendar-alt"></i></span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input v-model="artist.periodend" name="periodend" type="text" class="form-control" placeholder="Datum Kraja Karijere - d/M/yyyy" aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon2"><i class="far fa-calendar-alt"></i></span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input v-model="artist.numberofworks" name="artname" type="text" class="form-control" placeholder="Broj Dela.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-palette"></i></span>
                                    </div>
                                </div>
                                <div class="input-group">
                                    <textarea v-model="artist.biography" placeholder="Biografija Umetnika.." name="artdescription" class="form-control" aria-label="With textarea"></textarea>
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span"><i class="fas fa-camera-retro"></i></span>
                                    </div>
                                </div>
                                <p class="chosen-title">Pravac: 
                                    <label class="chosen-dir">{{ chosenDirection.name }}</label>
                                    <i @click="clearDirection()" v-if="chosenDirection.name !== ''" class="fas fa-times del"></i>
                                </p>
                                <button @click="addArtist()" class="link add covered">Dodajte Umetnika</button>
                            </div>
                            <div class="col-6">
                                <h5>Odaberite Pravac Umetnika</h5>
                                <div class="input-group mb-3">
                                    <input v-on:keyup.enter="searchDirections()"  v-model="searchDirection" name="directionsearch" type="text" class="form-control" placeholder="Pretrazite Pravce u umetnosti.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span v-on:click="searchDirections()" class="input-group-text click-span" id="basic-addon2"><i class="fas fa-search"></i></span>
                                    </div>
                                </div>
                                <p>
                                    Niste nasli pravac?? Dodajte sami!
                                </p>
                                <div class="container search-for">
                                    <div class="row">
                                        <div class="col-6 searched-arts" v-for="(dir,index) in directions" :key="index">
                                            <p v-on:click="choseDirection(dir)" class="searched-p-1">Ime Pravca: {{ dir.name }}</p>
                                            <p class="searched-p-2">Pocetak: {{ dir.started }}, Kraj: {{ dir.ended }}</p>
                                        </div>
                                    </div>
                                </div>
                                <h5> Dodajte pravac </h5>
                                <div class="input-group mb-3">
                                    <input name="name" v-model="direction.name" type="text" class="form-control" placeholder="Ime.." aria-label="Username" aria-describedby="basic-addon1">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon1"><i class="fas fa-dice-d6"></i></span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input name="started" v-model="direction.started" type="text" class="form-control" placeholder="Pocetak.." aria-label="Username" aria-describedby="basic-addon1">
                                     <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon1"><i class="far fa-calendar-alt"></i></span>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input name="ended" v-model="direction.ended" type="text" class="form-control" placeholder="Kraj.." aria-label="Username" aria-describedby="basic-addon1">
                                    <div class="input-group-append">
                                        <span class="input-group-text click-span" id="basic-addon1"><i class="far fa-calendar-alt"></i></span>
                                    </div>
                                </div>
                                <button v-on:click="addDirection()" class="link covered">Dodajte Pravac</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-1">
                </div>
            </div>
            <div v-if="advertise" class="row">
                <h5 class="col-12">Unesite podatke neophodne za reklamu. <i class="fas fa-ad"></i></h5>
                <div class="col-12 input-group mb-3">
                    <input v-model="advertisement.title" name="adtitle" type="text" class="form-control" placeholder="Naslov Reklame.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-signature"></i></span>
                    </div>
                </div>
                <div class="col-12 input-group mb-3">
                    <input v-model="advertisement.price" name="adprice" type="text" class="form-control" placeholder="Cena Dela.." aria-label="Tip dela" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-dollar-sign"></i></span>
                    </div>
                </div>
                <div class="col-12 input-group">
                    <textarea v-model="advertisement.description" placeholder="Opis Reklame.." name="artdescription" class="form-control" aria-label="With textarea"></textarea>
                    <div class="input-group-append">
                        <span class="input-group-text click-span"><i class="fas fa-camera-retro"></i></span>
                    </div>
                </div>
                <div class="col-3"></div>
                <div class="col-3"><button v-on:click="addAd()" class="link add covered ad">Kreirajte Reklamu <i class="fas fa-ad"></i> </button></div>
                <div class="col-3"><button v-on:click="goBack()" class="link add covered ad">Nazad <i class="fas fa-chevron-left"></i> </button></div>
                <div class="col-3"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import NavVue from './Nav.vue';
import { SEARCH_ARTWORKS, ADD_DIRECTION, SEARCH_ARTISTS, SEARCH_DIRECTIONS, ADD_ARTIST, ADD_ARTWORK, ADD_ADVERTISEMENT } from '../store/action.types';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { Direction } from '../models/Direction.js';
import { Artwork } from '../models/Artwork.js';
import { Artist } from '../models/Artist.js';
import { Advertisement } from '../models/Advertisement.js';
import { ERROR } from '../store/mutation.types';

export default {
  computed: {
      ...mapGetters([
          'artworks',
          'artists',
          'directions'
      ])
  },
  components: {
    'app-nav': NavVue
  },
  data() {
    return {
      art: '',
      direction: new Direction(),
      artwork: new Artwork(),
      searchArtist: '',
      artist: new Artist(),
      searchDirection: '',
      chosenDirection: {
        name: '', 
        id: 0
      },
      chosenArtist: {
        name: '',
        id: 0
      },
      chosenArt: {
        name: '',
        id: 0
      },
      advertise: false,
      advertisement: new Advertisement()
    }  
  },
  methods: {
    ...mapActions({
        'searchArtsAction':SEARCH_ARTWORKS,
        'addDirectionAction':ADD_DIRECTION,
        'searchArtistsAction':SEARCH_ARTISTS,
        'searchDirectionsAction':SEARCH_DIRECTIONS,
        'addArtistAction':ADD_ARTIST,
        'addArtworkAction':ADD_ARTWORK,
        'addAdvertisementAction':ADD_ADVERTISEMENT
    }),
    ...mapMutations({
        'error': ERROR
    }),
    choseDirection(dir) {
        this.chosenDirection = dir;
    },
    choseArtist(artist) {
        this.chosenArtist = artist;
    },
    choseArt(art) {
        this.chosenArt = art;
        this.advertise = true;
    },
    searchDirections() {
        this.searchDirectionsAction({
            token: this.$cookie.get('token'),
            search: `name=${this.searchDirection}` 
        })
    },
    searchArts() {
        this.searchArtsAction({
            token: this.$cookie.get('token'),
            search: `name=${this.art}`
        });
    },
    addDirection() {

        if(this.direction.name == '')
        {
            this.error('Unesite ime pravca!');
            return;
        }

        let date = this.direction.started.split('/');

        if(date.length != 3)
        {
            this.error('Unesite pun datum pocetka pravca!');
            return;
        }
        else {
            if(!(date[0].length == 1 || date[0].length == 2))
            {
                this.error('Unesite ispravan dan pocetka pravca!');
                return;
            }
            if(Number(date[0]) < 1 || Number(date[0]) > 31)
            {
                this.error('Unesite ispravan dan pocetka pravca!');
                return;
            }

            if(!(date[1].length == 1 || date[1].length == 2))
            {
                this.error('Unesite ispravan mesec pocetka pravca!');
                return;
            }
            if(Number(date[1]) < 1 || Number(date[1]) > 12)
            {
                this.error('Unesite ispravan mesec pocetka pravca!');
                return;
            }

            if(!(date[2].length == 1 || date[2].length == 2 || date[2].length == 3 || date[2].length == 4))
            {
                this.error('Unesite ispravnu godinu pocetka pravca!');
                return;
            }
            if(Number(date[2]) > 2019)
            {
                this.error('Unesite ispravnu godinu pocetka pravca!');
                return;
            }            
        }

        date = this.direction.ended.split('/');

        if(date.length != 3)
        {
            this.error('Unesite pun datum kraja pravca!');
            return;
        }
        else {
            if(!(date[0].length == 1 || date[0].length == 2))
            {
                this.error('Unesite ispravan dan kraja pravca!');
                return;
            }
            if(Number(date[0]) < 1 || Number(date[0]) > 31)
            {
                this.error('Unesite ispravan dan kraja pravca!');
                return;
            }

            if(!(date[1].length == 1 || date[1].length == 2))
            {
                this.error('Unesite ispravan mesec kraja pravca!');
                return;
            }
            if(Number(date[1]) < 1 || Number(date[1]) > 12)
            {
                this.error('Unesite ispravan mesec kraja pravca!');
                return;
            }

            if(!(date[2].length == 1 || date[2].length == 2 || date[2].length == 3 || date[2].length == 4))
            {
                this.error('Unesite ispravnu godinu kraja pravca!');
                return;
            }
            if(Number(date[2]) > 2019)
            {
                this.error('Unesite ispravnu godinu kraja pravca!');
                return;
            }            
        }

        this.addDirectionAction({
            token: this.$cookie.get('token'),
            body: this.direction
        })
    },
    searchArtists() {
        this.searchArtistsAction({
            token: this.$cookie.get('token'),
            search: `name=${this.searchArtist}`                             
        });
    },
    clearDirection() {
        this.chosenDirection = {
            name: '',
            id: 0
        };
    },
    clearArtist() {
        this.chosenArtist = {
            name: '',
            id: 0
        };
    },
    addArtist() {
         if(this.chosenDirection.id == 0)
        {
            this.error('Odaberite pravac kome umetnik pripada!');
            return;
        }

        if(this.artist.name == '')
        {
            this.error('Unesite ime umetnika!');
            return;
        }
        if(this.artist.lastname == '')
        {
            this.error('Unesite prezime umetnika!');
            return;
        }
        if(this.artist.country == '')
        {
            this.error('Unesite drzavu umetnika!');
            return;
        }
        if(this.artist.biography == '')
        {
            this.error('Unesite biografiju umetnika!');
            return;
        }
        if(this.artist.numberofworks == '')
        {
            this.error('Unesite broj dela umetnika!');
            return;
        }
        if(this.artist.periodstart == '')
        {
            this.error('Unesite datum pocetka karijere umetnika!');
            return;
        }
        if(this.artist.periodend == '')
        {
            this.error('Unesite datum kraja karijere umetnika!');
            return;
        }
        
        let date = this.artist.periodstart.split('/');

        if(date.length != 3)
        {
            this.error('Unesite pun datum pocetka karijere umetnika!');
            return;
        }
        else {
            if(!(date[0].length == 1 || date[0].length == 2))
            {
                this.error('Unesite ispravan dan pocetka karijere umetnika!');
                return;
            }
            if(Number(date[0]) < 1 || Number(date[0]) > 31)
            {
                this.error('Unesite ispravan dan pocetka karijere umetnika!');
                return;
            }

            if(!(date[1].length == 1 || date[1].length == 2))
            {
                this.error('Unesite ispravan mesec pocetka karijere umetnika!');
                return;
            }
            if(Number(date[1]) < 1 || Number(date[1]) > 12)
            {
                this.error('Unesite ispravan mesec pocetka karijere umetnika!');
                return;
            }

            if(!(date[2].length == 1 || date[2].length == 2 || date[2].length == 3 || date[2].length == 4))
            {
                this.error('Unesite ispravnu godinu pocetka karijere umetnika!');
                return;
            }
            if(Number(date[2]) > 2019)
            {
                this.error('Unesite ispravnu godinu pocetka karijere umetnika!');
                return;
            }            
        }

        date = this.artist.periodend.split('/');

        if(date.length != 3)
        {
            this.error('Unesite pun datum kraja karijere umetnika!');
            return;
        }
        else {
            if(!(date[0].length == 1 || date[0].length == 2))
            {
                this.error('Unesite ispravan dan kraja karijere umetnika!');
                return;
            }
            if(Number(date[0]) < 1 || Number(date[0]) > 31)
            {
                this.error('Unesite ispravan dan kraja karijere umetnika!');
                return;
            }

            if(!(date[1].length == 1 || date[1].length == 2))
            {
                this.error('Unesite ispravan mesec kraja karijere umetnika!');
                return;
            }
            if(Number(date[1]) < 1 || Number(date[1]) > 12)
            {
                this.error('Unesite ispravan mesec kraja karijere umetnika!');
                return;
            }

            if(!(date[2].length == 1 || date[2].length == 2 || date[2].length == 3 || date[2].length == 4))
            {
                this.error('Unesite ispravnu godinu kraja karijere umetnika!');
                return;
            }
            if(Number(date[2]) > 2019)
            {
                this.error('Unesite ispravnu godinu kraja karijere umetnika!');
                return;
            }            
        }

        this.artist.directionid = this.chosenDirection.id;
        this.addArtistAction({
            token: this.$cookie.get('token'),
            body: this.artist
        });
    },
    addArtwork() {
        
        if(this.chosenArtist.id == 0)
        {
            this.error('Odaberite umetnika koji je napravio ovo delo!');
            return;
        }

        if(this.artwork.name == '')
        {
            this.error('Unesite ime dela!');
            return;
        }
        if(this.artwork.description == '')
        {
            this.error('Unesite opis dela!');
            return;
        }
        if(this.artwork.type == '')
        {
            this.error('Unesite tip dela!');
            return;
        }
        if(this.artwork.createddate == '')
        {
            this.error('Unesite datum kreiranja dela!');
            return;
        }
        
        let date = this.artwork.createddate.split('/');

        if(date.length != 3)
        {
            this.error('Unesite pun datum kreiranja dela!');
            return;
        }
        else {
            if(!(date[0].length == 1 || date[0].length == 2))
            {
                this.error('Unesite ispravan dan kreiranja dela!');
                return;
            }
            if(Number(date[0]) < 1 || Number(date[0]) > 31)
            {
                this.error('Unesite ispravan dan kreiranja dela!');
                return;
            }

            if(!(date[1].length == 1 || date[1].length == 2))
            {
                this.error('Unesite ispravan mesec kreiranja dela!');
                return;
            }
            if(Number(date[1]) < 1 || Number(date[1]) > 12)
            {
                this.error('Unesite ispravan mesec kreiranja dela!');
                return;
            }

            if(!(date[2].length == 1 || date[2].length == 2 || date[2].length == 3 || date[2].length == 4))
            {
                this.error('Unesite ispravnu godinu kreiranja dela!');
                return;
            }
            if(Number(date[2]) > 2019)
            {
                this.error('Unesite ispravnu godinu kreiranja dela!');
                return;
            }            
        }
        
        this.addArtworkAction({
            token: this.$cookie.get('token'),
            body: this.artwork,
            id: this.chosenArtist.id
        });

    },
    addAd() {
        if(this.chosenArt.id == 0)
        {
            this.error('Vratite se i odaberite delo koje zelite da reklamirate!');
            return;
        }
        if(this.advertisement.title == '')
        {
            this.error('Unesite naslov reklame!');
            return;
        }if(this.advertisement.description == '')
        {
            this.error('Unesite opis reklame!');
            return;
        }
        if(this.advertisement.price == '')
        {
            this.error('Unesite cenu dela!');
            return;
        }
        this.advertisement.artworkid = this.chosenArt.id;
        this.addAdvertisementAction({
            token: this.$cookie.get('token'),
            body: this.advertisement
        })
    },
    goBack() {
        this.chosenArt = {
            name: '',
            id: 0
        };
        this.advertise = false;
    }
  }
}
</script>

<style scoped>
    .home-container {
        margin-top: 30px;
    }
    .home {
        border: 1px solid yellow;
        border-radius: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .click-span {
        cursor: pointer;
        background-color: yellow;
        color: #0b1015;
        font-size: 20px;
        border: 2px solid yellow;
    }
        .link {
        cursor: pointer;
        color: #0b1015;
        background-color: yellow;
        display: inline-block;
        text-decoration: none;
        box-sizing: border-box;
        padding: .6rem 1rem;
        font-size: 1.25rem;
        line-height: 1.5;
        border-radius: .3rem;
        border-color: yellow;
        font-weight: 400;
        text-align: center;
        vertical-align: middle; 
        margin-right: 10px;
        margin-left: 10px;
        margin-bottom: 5px;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
    .link:hover {
        text-decoration: none;
        color: #0b1015;
        border-color: #dada02;
        background-color: #dada02;
        box-shadow: 0 0 36px rgba(0,0,0,.4), 0 4px 24px rgba(0,0,0,.33);

    }
    .add {
        margin-bottom: 10px;
        margin-top: 20px;
        font-size: 25px !important;
    }
    .searched-arts {
        cursor: pointer;
        border: 2px solid yellow;
        border-radius: 10px;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
    .chosen-title {
        margin-top: 15px;
        text-align: left;
        border: 2px solid yellow;
        border-radius: 10px;
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        color: yellow;
        font-size: 20px;
    }
    .point  {
        cursor: pointer;
    }

    .chosen-dir {
        margin-bottom: 0;
        color: white;
    }
    .del {
        float:right;
        margin-right: 15px;
        margin-top: 3px; 
        font-size: 20px;
        cursor: pointer;
    }
    .searched-p-1 {
        background-color: yellow;
        color: #0b1015;
        cursor: pointer;
        width: 100%;
        border: 2px solid transparent;
        border-radius: 10px 10px 0 0;
    }
    .ad {
        width: 100%;
    }
    .search-for {
        margin-bottom: 20px;
        margin-top: 10px;
    }
    textarea {
        height: 80px !important;
    }
</style>