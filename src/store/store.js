import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookie';
import * as Actions from './action.types';
import * as Mutations from './mutation.types';
import { UserService, ReviewService, AdvertisementService, ArtworkService, ArtistService, DirectionService } from '../api/api.service';

Vue.use(Vuex);

export const store = new Vuex.Store({

    strict:true,

    state: {
        user: {
            log: VueCookies.get('userid') || false,
            id: VueCookies.get('userid') || '',
            token: VueCookies.get('token') || ''
        },
        success: '',
        fail: '',
        userDetails: {},
        userWorks: [],
        searchedUsers: [],
        userAds: [],
        userSold: [], 
        userBought: [],
        searchedAds: [],
        reviews: [],
        directions: [],
        artists: [],
        artworks: [],
        comments: [],
        allArts: []
    },
    actions: {
        [Actions.GET_USER] (context, payload) {
            return UserService.getUser(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_USER, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.GET_USER_WORKS] (context, payload) {
            return UserService.getUserWorks(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_USER_WORKS, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.GET_USER_ADVERTISEMENTS] (context, payload) {
            return UserService.getUserAds(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_USER_ADS, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.SEARCH_USERS] (context, payload) {
            return UserService.searchUsers(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_SEARCH_USERS, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.GET_USER_SOLD] (context, payload) {
            return UserService.getUserAdsSold(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_USER_SOLD, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.GET_USER_BOUGHT] (context, payload) {
            return UserService.getUserAdsBought(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_USER_BOUGHT, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.SEARCH_ADVERISEMENTS] (context, payload) {
            return AdvertisementService.searchAds(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_SEARCHED_ADS, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.REGISTER_USER] (context, payload) {
            return UserService.registerUser(payload)
              .then(({ data }) => {
                context.commit(Mutations.REGISTER_USER_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.ADD_REVIEW] (context, payload) {
            return ReviewService.addReview(payload)
              .then(({ data }) => {
                context.commit(Mutations.ADD_REVIEW_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.ADD_DIRECTION] (context, payload) {
            return DirectionService.addDirection(payload)
              .then(({ data }) => {
                context.commit(Mutations.ADD_DIRECTION_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.SEARCH_DIRECTIONS] (context, payload) {
            return DirectionService.searchDirections(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_SEARCHED_DIRECTIONS, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.ADD_ARTIST] (context, payload) {
            return ArtistService.addArtist(payload)
              .then(({ data }) => {
                context.commit(Mutations.ADD_ARTISTS_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.SEARCH_ARTISTS] (context, payload) {
            return ArtistService.searchArtists(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_SEARCHED_ARTISTS, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.ADD_ARTWORK] (context, payload) {
            return ArtworkService.addArtwork(payload)
              .then(({ data }) => {
                context.commit(Mutations.ADD_ARTWORK_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.BUY_ARTWORK] (context, payload) {
            return ArtworkService.buyArtwork(payload)
              .then(({ data }) => {
                context.commit(Mutations.BUY_ARTWORK_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.SEARCH_ARTWORKS] (context, payload) {
            return ArtworkService.searchArtworks(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_SEARCHED_ARTWORKS, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.SEARCH_ALL_ARTS] (context, payload) {
            return ArtworkService.searchAllArtworks(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_ALL_ARTS, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.ADD_ADVERTISEMENT] (context, payload) {
            return AdvertisementService.addAd(payload)
              .then(({ data }) => {
                context.commit(Mutations.ADD_AD_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.EDIT_ADVERTISEMENT] (context, payload) {
            return AdvertisementService.editAd(payload)
              .then(({ data }) => {
                context.commit(Mutations.EDIT_AD_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.DELETE_ADVERTISEMENT] (context, payload) {
            return AdvertisementService.deleteAd(payload)
              .then(({ data }) => {
                context.commit(Mutations.DELETE_AD_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.GET_AD_COMMENTS] (context, payload) {
            return AdvertisementService.getAdComments(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_AD_COMMENTS, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.ADD_COMMENT] (context, payload) {
            return AdvertisementService.postAdComment(payload)
              .then(({ data }) => {
                context.commit(Mutations.ADD_COMMENT_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.LOGIN] (context, payload) {
            return UserService.login(payload)
              .then(({ data }) => {
                context.commit(Mutations.LOGIN_RESPONSE, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        },
        [Actions.GET_REVIEWS] (context, payload) {
            return ReviewService.getUserReviews(payload)
              .then(({ data }) => {
                context.commit(Mutations.RETURN_REVIEWS, data);
                return data;
            })
            .catch(er => context.commit(Mutations.ERROR, er.body));
        }
    },
    mutations: {
        [Mutations.LOGOUT]: (state) => {
            state.user = { 
                log:  false,
                id: 0,
                token: 0
            };
            state.success = '';
            state.fail = '';
            state.userDetails = {};
            state.userWorks = [];
            state.searchedUsers = [];
            state.userAds = [];
            state.userSold = []; 
            state.userBought = [];
            state.searchedAds = [];
            state.reviews = [];
            state.directions = [];
            state.artists = [];
            state.artworks = [];
            state.comments = [];
            state.allArts = [];
        },
        [Mutations.RETURN_USER]: (state, data) => {
            state.userDetails = data;
        },
        [Mutations.RETURN_USER_WORKS]: (state, data) => {
            state.userWorks = data;
        },
        [Mutations.RETURN_USER_ADS]: (state, data) => {
            state.userAds = data;
        },
        [Mutations.RETURN_USER_SOLD]: (state, data) => {
            state.userSold = data;
        },
        [Mutations.RETURN_USER_BOUGHT]: (state, data) => {
            state.userBought = data;
        },
        [Mutations.RETURN_SEARCHED_ADS]: (state, data) => {
            state.searchedAds = data;
        },
        [Mutations.REGISTER_USER_RESPONSE]: (state, data) => {
            state.success = `Uspesno ste se registrovali kao korisnik ${data.name} ${data.lastname}!`;
            state.fail = '';
        },
        [Mutations.ADD_REVIEW_RESPONSE]: (state, data) => {
            state.reviews.push(data);
            state.reviews.reverse();
        },
        [Mutations.ADD_DIRECTION_RESPONSE]: (state, data) => {
            state.success = `Uspesno ste dodali novi pravac - ${data.name}!`;
            state.fail='';
        },
        [Mutations.RETURN_SEARCHED_DIRECTIONS]: (state, data) => {
            state.directions = data;
        },
        [Mutations.ADD_ARTISTS_RESPONSE]: (state, data) => {
            state.success = `Uspesno ste dodali umetnika ${data.name}!`;
            state.fail='';
        },
        [Mutations.RETURN_SEARCHED_ARTISTS]: (state, data) => {
            state.artists = data;
        },
        [Mutations.ADD_ARTWORK_RESPONSE]: (state, data) => {
            state.success = `Uspesno ste dodali delo ${data.name}!`;
            state.fail='';
        },
        [Mutations.RETURN_ALL_ARTS]: (state, data) => {
            state.allArts = data;
        },
        [Mutations.RETURN_SEARCHED_ARTWORKS]: (state, data) => {
            state.artworks = data;
        },
        [Mutations.RETURN_SEARCH_USERS]: (state, data) => {
            state.searchedUsers = data;
        },
        [Mutations.BUY_ARTWORK_RESPONSE]: (state, data) => {
            state.searchedAds = state.searchedAds.filter(ad => (ad.id != data.id));
            state.success = `Uspesno ste kupili delo ${data.artworkname}!`;
        },
        [Mutations.ADD_AD_RESPONSE]: (state, data) => {
            state.success = `Uspesno ste dodali reklamu za ${data.artworkname}!`;
            state.fail='';
        },
        [Mutations.EDIT_AD_RESPONSE]: (state, data) => {
            state.userAds = state.userAds.map(ad => {
                if(ad.id === data.id)
                    return data;
                else
                    return ad;
            });
        },
        [Mutations.DELETE_AD_RESPONSE]: (state, data) => {
            state.userAds = state.userAds.filter(ad => (ad.id !== data.id));
        },
        [Mutations.RETURN_AD_COMMENTS]: (state, data) => {
            state.comments = data;
        },
        [Mutations.ADD_COMMENT_RESPONSE]: (state, data) => {
            state.comments.push(data);
            state.comments.reverse();
        },
        [Mutations.LOGIN_RESPONSE]: (state, data) => {
            state.user = {
                log:true,
                token: data.id,
                id: data.userid
            }
        },
        [Mutations.ERROR]: (state, data) => {
            state.fail = data;
            state.success = '';
        },
        [Mutations.CLEAR_FAIL]: (state) => {
            state.fail = '';
        },
        [Mutations.CLEAR_SUCCESS]: (state) => {
            state.success = '';
        },
        [Mutations.RETURN_REVIEWS]: (state, data) => {
            state.reviews = data;
        }
    },
    getters: {
        logUser: state => {
            return state.user;
        },
        success: state => {
            return state.success;
        },
        fail: state => {
            return state.fail;
        },
        userDetails: state => {
            return state.userDetails;
        },    
        userWorks: state => {
            return state.userWorks;
        },     
        userAds: state => {
            return state.userAds;
        },
        userBought: state => {
            return state.userBought;
        },       
        userSold: state => {
            return state.userSold;
        },     
        searchedAds: state => {
            return state.searchedAds;
        },
        reviews: state => {
            return state.reviews;
        },       
        directions: state => {
            return state.directions;
        },       
        artists: state => {
            return state.artists;
        },
        artworks: state => {
            return state.artworks;
        },
        comments: state => {
            return state.comments;
        },
        searchedUsers: state => {
            return state.searchedUsers;
        },
        allArts: state => {
            return state.allArts;
        }
    }
});