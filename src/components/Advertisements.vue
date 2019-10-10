<template>
    <div>
        <app-nav></app-nav>
        <div class="container ad-container">
            <div class="row">
                <div class="col-7">
                    <h4 class="covered">
                        Pretrazite reklame za koje ste zainteresovani!
                    </h4>
                    <div class="input-group mb-3">
                        <input v-on:keyup.enter="searchAds()" v-model="searchAd" name="searchart" type="text" class="form-control" placeholder="Pretrazite Reklame.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span @click="searchAds()" class="input-group-text click-span" id="basic-addon2"><i class="fab fa-searchengin"></i></span>
                        </div>
                    </div>
                    <div class="container search-for">
                        <div class="row">
                            <div class="col-12 searched-arts" v-for="(ad,index) in searchedAds" :key="index">
                                <p class="searched-p-1">
                                    Ime Dela: {{ ad.artworkname }}
                                    <label v-on:click="viewComments(ad)" class="view-comments">Pogledajte <i class="fas fa-comments"></i></label>
                                </p>
                                <p class="searched-p-2">
                                    Ime Vlasnika: 
                                    <router-link :to="{ name: 'user', params: { userId: ad.creatorid }}" class="btn-link">
                                    {{ ad.creatorname }} {{ ad.creatorlastname }}
                                    </router-link>
                                </p>
                                <p class="searched-p-2">Naslov reklame: {{ ad.title }}</p>
                                <p class="searched-p-2">Opis reklame: {{ ad.description }}</p>
                                <p class="searched-p-2">Cena: {{ ad.price }}</p>
                                <button v-on:click="buy(ad.id)" class="link covered"> Kupite Delo <i class="fas fa-shopping-basket"></i></button>
                                <button v-on:click="openCommentInput(ad)" class="link covered"> Dodajte <i class="fas fa-comment"></i></button>                                
                                <div v-if="openCom && ad.id === chosenAd.id" class="input-group mb-3 col-12">
                                    <input v-on:keyup.enter="addComment(ad)" v-model="comment" name="searchart" type="text" class="form-control" placeholder="Napisite Komentar.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <span @click="addComment(ad)" class="input-group-text click-span" id="basic-addon2"><i class="fas fa-comment"></i></span>
                                    </div>
                                </div>
                                <div class="com-section" v-if="chosenAd.id === ad.id">
                                    <p class="com" v-for="(com,index) in comments" :key="index">
                                        <router-link class="user-link" :to="{ name: 'user', params: { userId: com.posterid }}">
                                            {{ com.postername }} {{ com.posterlastname }}
                                        </router-link>
                                        {{ com.content }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <h4 class="covered">
                        Pretrazite korisnike koje zelite da ocenite!
                    </h4>
                    <div class="input-group mb-3">
                        <input v-on:keyup.enter="searchUsers()" v-model="searchUser" name="searchart" type="text" class="form-control" placeholder="Pretrazite Korisnike.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span @click="searchUsers()" class="input-group-text click-span" id="basic-addon2"><i class="fab fa-searchengin"></i></span>
                        </div>
                    </div>

                    <div class="container search-for">
                        <div class="row">
                            <div class="col-12 searched-arts" v-for="(user,index) in searchedUsers" :key="index">
                                <p class="searched-p-1">
                                    Ime Korisnika: 
                                    <router-link :to="{ name: 'user', params: { userId: user.id }}" class="btn-link">
                                    {{ user.name }} {{ user.lastname }}
                                    </router-link>
                                </p>  
                                <p class="searched-p-2">
                                    Mejl: 
                                    {{ user.email }}
                                </p>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "./Nav.vue";
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { SEARCH_ADVERISEMENTS, BUY_ARTWORK, GET_AD_COMMENTS, ADD_COMMENT, SEARCH_USERS } from '../store/action.types';
import { Advertisement } from '../models/Advertisement';
import { ERROR } from '../store/mutation.types';

export default {
    components: {
        'app-nav': Nav
    },
    computed: {
        ...mapGetters([
            'searchedAds',
            'comments',
            'searchedUsers'
        ])
    },
    data() {
        return {
            searchAd: '',
            searchUser: '',
            chosenAd: new Advertisement(),
            comment: '',
            openCom: false
        }
    },
    methods: {
        ...mapActions({
            'searchAdsAction':SEARCH_ADVERISEMENTS,
            'buyArtAction':BUY_ARTWORK,
            'getCommentsAction':GET_AD_COMMENTS,
            'addCommentAction':ADD_COMMENT,
            'searchUsersAction': SEARCH_USERS
        }),
        ...mapMutations({
            'error': ERROR
        }),
        searchAds() {
            this.searchAdsAction({
                search: `name=${this.searchAd}`
            });
        },
        searchUsers() {
            let names = this.searchUser.split(' ');
            if(names.length == 2)
            {
                this.searchUsersAction({
                    search: `name=${names[0]}&lastname=${names[1]}`
                });
            }
            else if(names.length == 1)
            {
                this.searchUsersAction({
                    search: `name=${names[0]}&lastname=`
                });
            }
        },
        buy(id) {
            this.buyArtAction({
                id: id,
                body: {},
                token: this.$cookie.get('token')
            });
        },
        viewComments(ad) {
            this.chosenAd = ad;
            this.getCommentsAction({
                id: ad.id,
                token: this.$cookie.get('token')
            });
        },
        openCommentInput(ad) {
            this.chosenAd = ad;
            this.openCom = !this.openCom;
        },
        addComment(ad) {
            if(this.comment == "")
            {
                this.error('Niste uneli komentar!');
                return;
            }           
            this.addCommentAction({
                token: this.$cookie.get('token'),
                id: ad.id,
                body: {
                    content: this.comment
                }
            });
            this.content = '';
        }
    }   
}
</script>

<style scoped>
    .ad-container {
        margin-top: 20px;
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
    .searched-arts {
        cursor: pointer;
        border: 2px solid yellow;
        border-radius: 10px;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
    .searched-p-1 {
        background-color: yellow;
        color: #0b1015;
        cursor: pointer;
        width: 100%;
        position: relative;
        border: 2px solid transparent;
        border-radius: 10px 10px 0 0;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .search-for {
        margin-bottom: 20px;
        margin-top: 10px;
    }
    .view-comments {
        position: absolute;
        right: 10px;
        font-style:italic;
        cursor: pointer;
        font-weight: bold;
    }
    .view-comments:hover {
        text-decoration: underline;
    }
    .com {
        border: 1px solid yellow;
        background: yellow;
        color: #0b1015;
        margin-left: 30px;
        margin-right: 30px;
        border-radius: 10px;
        text-align: left;
    }
    .com-section {
        margin-top: 20px;
    }
    .mb-3 {
        margin-top: 20px;
    }
    .user-link {
        padding-left: 10px;
        padding-right: 10px;
        font-style: italic;
    }
</style>
