<template>
    <div>
        <app-nav></app-nav>
        <div class="container">
            <div class="row">
                <div class="col-5 short-profile">
                    <div class="container">
                        <h5 class="covered">Profil Korisnika</h5>
                        <p class="row">
                            <label class="col-5 covered label">Ime:</label> <label class="yellow"> {{ userDetails.name }} </label>
                        </p>
                        <p class="row">
                            <label class="col-5 covered label">Prezime:</label> <label class="yellow"> {{ userDetails.lastname }} </label>
                        </p>
                        <p class="row">
                            <label class="col-5 covered label">Datum registracije:</label> <label class="yellow">{{ userDetails.registeredon }} </label>
                        </p>
                        <p class="row">
                            <label class="col-5 covered label">Mejl:</label> <label class="yellow">{{ userDetails.email }} </label>
                        </p>
                        <p class="row">
                            <label class="col-5 covered label">Rodjendan:</label> <label class="yellow">{{ userDetails.birthday }} </label>
                        </p>
                        <p class="row">
                            <label class="col-5 covered label">Grad:</label> <label class="yellow">{{ userDetails.city }} </label>
                        </p>
                        <p class="row">
                            <label class="col-5 covered label">Drzava:</label> <label class="yellow">{{ userDetails.country }} </label>
                        </p>
                    </div>
                </div>
                <div class="col-1"></div>
                <div class="col-5 short-profile">
                    <h5 class="covered"> Ocenite Korisnika </h5>
                   <div class="input-group mb-3 text2">
                        <textarea v-model="review.text" placeholder="Utisak o Korisniku.." name="artdescription" class="form-control text" aria-label="With textarea" rows="7"></textarea>
                        <div class="input-group-append">
                            <span class="input-group-text click-span"><i class="fas fa-user-check"></i></span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <select v-model="review.score" class="custom-select" id="inputGroupSelect02">
                            <option value="0" selected>Odaberite ocenu...</option>
                            <option value="1"> Jedan
                                <i class="fas fa-star"></i>
                            </option>
                            <option value="2"> Dva
                                <i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </option>
                            <option value="3"> Tri
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </option>
                            <option value="4"> Cetiri
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </option>
                            <option value="5"> Pet
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </option>
                        </select>
                        <div class="input-group-append">
                            <label class="input-group-text click-span" for="inputGroupSelect02"><i class="fas fa-star-half-alt"></i></label>
                        </div>
                    </div>
                    <p class="add-rev-cont"><button @click="addReview()" class="link add covered">Dodajte Utisak <i class="fas fa-grin-stars"></i></button></p>
                </div>
                <div class="col-1"></div>
            </div>
        </div>
        <h4 class="covered reviews-title">Utisci!</h4>
        <div class="container reviews">
            <div v-for="(review,index) in reviews" :key="index" class="row">
                <div class="col-2"></div>
                <div class="col-8 single-review">
                    <p>Kreator: {{ review.name_reviewer }} {{ review.lastname_reviewer }}</p>
                    <p>Utisak: {{ review.text }}</p>
                    <p>Ocena: {{ review.score }} <i class="fas fa-star"></i></p>
                </div>
                <div class="col-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from './Nav.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { GET_USER, GET_REVIEWS, ADD_REVIEW } from '../store/action.types';
import { Review } from '../models/Review.js';
import { ERROR } from '../store/mutation.types';

export default {
    components: {
        'app-nav': Nav
    },
    data() {
        return {
            review: new Review()
        }
    },
    computed: {
        ...mapGetters([
            'reviews',
            'userDetails'
        ])
    },
    methods: {
        ...mapActions({
            'getUserDetails':GET_USER,
            'getUserReviewsAction':GET_REVIEWS,
            'postReviewAction':ADD_REVIEW
        }),
        ...mapMutations({
            'error':ERROR
        }),
        addReview() {
            if(this.review.text == "")
            {
                this.error('Unesite sadrzaj utiska!');
                return;
            }
            if(this.review.score == 0)
            {
                this.error('Odaberite ocenu za korisnika!');
                return;
            }
            this.postReviewAction({
                id: this.$route.params.userId,
                body: this.review,
                token: this.$cookie.get('token')
            })
        }
    },
    created() {
        this.getUserDetails({
            id: this.$route.params.userId
        });
        this.getUserReviewsAction({
            id: this.$route.params.userId
        });
    }
}
</script>

<style scoped>
    .short-profile {
        border: 2px solid yellow;
        text-align: left;
        padding-top: 10px;
        border-radius: 10px;
        margin-top: 10px;
    }
    h5 {
        text-align: center;
    }
    .add-rev-cont {
        text-align: center;
    }
    .click-span {
        color: #0b1015;
        background-color: yellow;
    }
    .label {
        font-size:20px;
    }
    .yellow {
        font-size: 20px;
    }
    option {
        color: #0b1015 !important;
    }
    .reviews {
        margin-top: 20px;
    }
    .single-review {
        border: 10px solid yellow;
        margin-bottom: 15px;
        padding-top: 10px;
        border-top-style: inset;
        border-bottom-style: outset;
        color: #0b1015;
        background-color: white;
    }
    .reviews-title {
        margin-top: 30px;
    }
    .custom-select {
        height: 50px;
    }
    .fa-star {
        color: rgb(228, 228, 40);
    }
    .text {
        height: 180px !important;
    }
    .text2 {
        height: 180px !important;
    }
</style>
