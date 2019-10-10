<template>
    <div>
        <app-nav></app-nav>
        <div class="container-fluid">
            <div class="row">
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-link covered" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Detalji
                            </button>
                        </h2>
                        </div>
                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-6">
                                            <label class="covered label">Ime: </label> <label class="yellow"> {{ userDetails.name }} </label>
                                        </div>
                                        <div class="col-6">
                                            <label class="covered label">Prezime: </label> <label class="yellow"> {{ userDetails.lastname }} </label>                       
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <label class="covered label">Drzava: </label> <label class="yellow">{{ userDetails.country }} </label>
                                        </div>
                                        <div class="col-6">
                                            <label class="covered label">Mejl: </label> <label class="yellow">{{ userDetails.email }} </label>                                            
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <label class="covered label">Rodjendan: </label> <label class="yellow">{{ userDetails.birthday }} </label>
                                        </div>
                                        <div class="col-6">
                                            <label class="covered label">Grad: </label> <label class="yellow">{{ userDetails.city }} </label>
                                        </div>
                                    </div>
                                     <div class="row">
                                        <div class="col-12">
                                            <label class="covered label">Datum registracije: </label> <label class="yellow">{{ userDetails.registeredon }} </label>                                            
                                        </div>
                                    </div>
                                </div>          
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                            <button class="btn btn-link covered collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Utisci
                            </button>
                        </h2>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                            <div v-for="(review,index) in reviews" :key="index" class="card">
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-6 leva">
                                                <label class="lab label">Ocenio: </label> {{ review.name_reviewer }} {{ review.lastname_reviewer }}
                                            </div>
                                            <div class="col-6 desna">
                                                <label class="lab label">Ocena: </label> {{ review.score }} <i class="fas fa-star"></i>
                                            </div>
                                            <div class="col-12 utisak">
                                                <p class="lab label"> Utisak: </p>  <p>{{ review.text }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                            <button class="btn btn-link covered collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Reklame
                            </button>
                        </h2>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                            <div v-for="(ad,index) in userAds" :key="index" class="card back">
                                <div class="card-body content">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-6 leva">
                                                <label class="lab">Reklama: </label>
                                                {{ ad.title }}
                                            </div>
                                            <div class="col-6 desna">
                                                <label class="lab">Cena: </label>
                                                {{ ad.price }}
                                            </div>
                                            <div class="col-12">
                                                <label class="lab">Opis: </label>
                                                {{ ad.description }}
                                            </div>
                                            <div class="col-6 leva">
                                                <button v-on:click="editAd(ad)" class="link add covered">Izmena <i class="fas fa-ad"></i></button>                                  
                                            </div>
                                            <div class="col-6 desna">
                                                <button v-on:click="deleteAd(ad)" class="link add covered">Obrisite <i class="fas fa-ad"></i></button>                                  
                                            </div>
                                            <div class="col-3"></div>
                                            <div class="col-6">
                                                 <div v-if="edit.active && edit.id == ad.id" class="input-group mb-3">
                                                    <input v-model="edit.price" name="price" type="text" class="form-control" placeholder="Odaberite novu cenu.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                                                    <div class="input-group-append">
                                                        <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-dollar-sign"></i></span>
                                                    </div>
                                                </div>
                                                <button v-if="edit.active && edit.id == ad.id" v-on:click="editAdA()" class="link add covered">Izmenite <i class="fas fa-ad"></i></button>                                  
                                            </div>
                                            <div class="col-3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingFour">
                        <h2 class="mb-0">
                            <button class="btn btn-link covered collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Prodata Dela
                            </button>
                        </h2>
                        </div>
                        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                        <div class="card-body">
                            <div v-for="(ad,index) in userSold" :key="index" class="card back">
                                <div class="card-body content">
                                    <p> <label class="lab"> Delo: </label> {{ ad.artworkname }}</p>
                                    <p> <label class="lab"> Vlasnik: </label> {{ ad.creatorname }} {{ ad.creatorlastname }} &nbsp; &nbsp; <label class="lab"> Cena: </label> {{ ad.price }} </p>
                                    <p> <label class="lab"> Naslov reklame: </label> {{ ad.title }} </p>                                    
                                    <p> <label class="lab"> Opis: </label> {{ ad.description }} </p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingFive">
                        <h2 class="mb-0">
                            <button class="btn btn-link covered collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Kupljena Dela
                            </button>
                        </h2>
                        </div>
                        <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                        <div class="card-body">
                            <div v-for="(ad,index) in userBought" :key="index" class="card back">
                                <div class="card-body content">
                                    <p> <label class="lab"> Delo: </label> {{ ad.artworkname }}</p>
                                    <p> <label class="lab"> Vlasnik: </label> {{ ad.creatorname }} {{ ad.creatorlastname }} &nbsp; &nbsp; <label class="lab"> Cena: </label> {{ ad.price }} </p>
                                    <p> <label class="lab"> Naslov reklame: </label> {{ ad.title }} </p>                                    
                                    <p> <label class="lab"> Opis: </label> {{ ad.description }} </p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingSix">
                        <h2 class="mb-0">
                            <button class="btn btn-link covered collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                            Vasa Dela
                            </button>
                        </h2>
                        </div>
                        <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                        <div class="card-body">
                            <div v-for="(art,index) in userWorks" :key="index" class="card back">
                                <div class="card-body content">
                                    <p> <label class="lab"> Delo: </label> {{ art.name }}</p>
                                    <p> <label class="lab"> Vlasnik: </label> {{ art.ownername }} {{ art.ownerlastname }} </p>
                                    <p> <label class="lab"> Umetnik: </label> {{ art.artistname }} {{ art.artistlastname }} </p>                                    
                                    <p> <label class="lab"> Opis: </label> {{ art.description }} </p>
                                    <p> <label class="lab"> Datum Kreiranja: </label> {{ art.createddate }} </p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from './Nav.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { GET_USER, GET_REVIEWS, GET_USER_WORKS, GET_USER_ADVERTISEMENTS, GET_USER_SOLD, GET_USER_BOUGHT, EDIT_ADVERTISEMENT, DELETE_ADVERTISEMENT } from '../store/action.types';
import { ERROR } from '../store/mutation.types';

export default {
    components: {
        'app-nav': Nav
    },
    computed: {
        ...mapGetters([
            'userDetails',
            'reviews',
            'userWorks',
            'userAds',
            'userBought',
            'userSold'
        ])
    },
    data() {
        return {
            edit: {
                id: 0,
                active: false,
                price: ''
            }
        }
    },
    methods: {
        ...mapActions({
            'getUserDetailsAction':GET_USER,
            'getUserReviewsAction':GET_REVIEWS,
            'getUserWorksAction':GET_USER_WORKS,
            'getUserAdsAction':GET_USER_ADVERTISEMENTS,
            'getUserSoldAction':GET_USER_SOLD,
            'getUserBoughtAction':GET_USER_BOUGHT,
            'editAdAction': EDIT_ADVERTISEMENT,
            'deleteAdAction':DELETE_ADVERTISEMENT
        }),
        ...mapMutations({
            'error': ERROR
        }),
        editAd(ad) {
            this.edit.id = ad.id;
            this.edit.active = !this.edit.active;
        },
        editAdA() {
            if(this.edit.price == '')
            {
                this.error('Niste uneli novu cenu za reklamu!');
                return;
            }
            this.editAdAction({
                id: this.edit.id,
                body: {
                    price: this.edit.price
                },
                token: this.$cookie.get('token')
            });
            this.edit.active = false;
        },
        deleteAd(ad) {
            this.edit.active = false;
            this.deleteAdAction({
                id: ad.id,
                token: this.$cookie.get('token')
            });
        }
    },
    created() {
        this.getUserDetailsAction({
            id: this.$route.params.userId
        });
        this.getUserReviewsAction({
            id: this.$route.params.userId
        });
        this.getUserAdsAction({
            id: this.$route.params.userId
        });
        this.getUserSoldAction({
            id: this.$route.params.userId
        });
        this.getUserBoughtAction({
            id: this.$route.params.userId
        });
        this.getUserWorksAction({
            id: this.$route.params.userId
        });
    }
}
</script>

<style scoped>
    .accordion {
        width: 100% !important;
        margin-top: 20px;
    }
    .card {
        background: white;
        margin-bottom: 5px;
    }
    .card-header {
        background: #0b1015;
        color: #0b1015 !important;
    }
    .btn-link {
        color: yellow;
    }
    .label {
        font-family: Rambla;
        font-size: 20px;
        color: yellow;
        font-weight: bold;
        font-style: italic;
    }
    .yellow {
        font-size: 20px;
        padding-left: 20px;
    }
    .leva {
        text-align: right;
    }
    .desna {
        text-align: left;
    }
    .utisak {
        margin-top: 15px;
    }
    .lab {
        font-style: italic;
        font-weight: bold;
        padding-right: 10px;
    }
    .mb-3 {
        margin-top: 15px;
    }
    .card-body {
        background: #0b1015;
        color: white;
    }
    .content {
        background: white !important;
        color: #0b1015;
        border: 10px solid yellow;
        border-top-style: inset;
        border-bottom-style: outset;
        width: 70%;
        margin: 0 auto;
    }
    .back {
        background: #0b1015;
    }
    .card-header {
        border-bottom: 1.7px solid lightgrey !important;
    }
</style>
