<template>
    <div class="container feed-main">
        <div class="row">
            <div v-if="!logUser.log" class="col-12"> 
                <div v-if="!log && !reg" class="jumbotron">
                    <h1 class="display-4">Dobrodosli u VintageGram! <i class="fas fa-camera-retro"></i></h1>
                    <p class="lead">VintageGram je stranica koja omogucava trgovinu umetninama.</p>
                    <hr class="my-4">
                    <p>Prijavite se! A ukoliko niste deo nase zajednice vreme je da to postanete! </p>
                    <button v-on:click="openLog()" class="link covered-contrast">Prijavi Se <i class="fas fa-smile"></i></button>
                    <button v-on:click="openReg()" class="link covered-contrast">Napravi Nalog <i class="far fa-registered"></i></button>
                </div>
                <div v-if="log" class="jumbotron">
                    <h1 class="display-4">Prijavite Se! <i class="fas fa-camera-retro"></i></h1>
                    <hr class="my-4">
                    <div class="input-group mb-3">
                        <input name="username" v-model="username" type="text" class="form-control" placeholder="Korisnicko Ime" aria-label="Username" aria-describedby="basic-addon1">
                        <div class="input-group-append">
                            <span class="input-group-text click-span" id="basic-addon1"><i class="fas fa-user-tie"></i></span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input name="pass" v-model="password" type="password" class="form-control" placeholder="Sifra" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-key"></i></span>
                        </div>
                    </div>
                    <button v-on:click="login()" class="link covered-contrast">Prijavi Se <i class="fas fa-smile"></i></button>
                    <button v-on:click="back()" class="link covered-contrast">Nazad <i class="fas fa-chevron-left"></i></button>
                </div>
                <div v-if="reg" class="jumbotron">
                    <h1 class="display-4">Kreirajte Nalog! <i class="fas fa-camera-retro"></i></h1>
                    <hr class="my-4">
                    <div class="input-group mb-3">
                        <input name="username" v-model="user.username" type="text" class="form-control" placeholder="Korisnicko Ime.." aria-label="Username" aria-describedby="basic-addon1">
                        <div class="input-group-append">
                            <span class="input-group-text click-span" id="basic-addon1"><i class="fas fa-user-tie"></i></span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input name="pass" v-model="user.password" type="password" class="form-control" placeholder="Sifra.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-key"></i></span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input name="name" v-model="user.name" type="text" class="form-control" placeholder="Ime.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-signature"></i></span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input name="lastname" v-model="user.lastname" type="text" class="form-control" placeholder="Prezime.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-signature"></i></span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input name="birthday" v-model="user.birthday" type="text" class="form-control" placeholder="Datum Rodjenja - d/M/yyyy" aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-birthday-cake"></i></span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input name="city" v-model="user.city" type="text" class="form-control" placeholder="Grad.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                         <div class="input-group-append">
                            <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-city"></i></span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input name="conutry" v-model="user.country" type="text" class="form-control" placeholder="Drzava.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-globe-europe"></i></span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input name="email" v-model="user.email" type="email" class="form-control" placeholder="Mejl.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span class="input-group-text click-span" id="basic-addon2"><i class="fas fa-envelope-open"></i></span>
                        </div>
                    </div>
                    <button v-on:click="register()" class="link covered-contrast">Kreirajte Nalog <i class="fas fa-smile"></i></button>
                    <button v-on:click="back()" class="link covered-contrast">Nazad <i class="fas fa-chevron-left"></i></button>
                </div>
            </div>
        </div>      
    </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex';
import { LOGIN, REGISTER_USER } from '../store/action.types';
import { User } from '../models/User.js';
import { ERROR } from '../store/mutation.types';

export default {
    computed: {
        ...mapGetters([
            'logUser'
        ])
    },
    data() {
        return {
            log: false, 
            reg: false,
            username: '',
            password: '',
            user: new User()
        }
    },
    methods: {
        ...mapActions({
            'tryLogin': LOGIN,
            'registerAction': REGISTER_USER
        }),
        ...mapMutations({
            'error': ERROR
        }),
        login() {
            this.tryLogin({
                body: {
                    username: this.username, 
                    password: this.password
                }
            })
            .then(res => {
                this.$cookie.set('token', res.id);
                this.$cookie.set('userid', res.userid);
                this.$router.push('/home');
            });
        },
        register() {
            if(this.user.name == '')
            {   
                this.error('Unesite Vase ime!');
                return;
            }
            if(this.user.lastname == '')
            {   
                this.error('Unesite Vase prezime!');
                return;
            }
            if(this.user.birthday == '')
            {   
                this.error('Unesite Vas rodjendan!');
                return;
            }
            if(this.user.country == '')
            {   
                this.error('Unesite Vasu drzavu!');
                return;
            }
            if(this.user.city == '')
            {   
                this.error('Unesite Vas grad!');
                return;
            }
            if(this.user.email == '')
            {   
                this.error('Unesite Vas mejl!');
                return;
            }
            
            if(this.user.username == '')
            {   
                this.error('Unesite Vase korisnicko ime!');
                return;
            }
            if(this.user.password == '')
            {   
                this.error('Unesite Vasu sifru!');
                return;
            }

            this.registerAction({
                body: this.user
            })
        },
        openLog() {
            this.log = !this.log;
            this.reg = false;
        },
        openReg() {
            this.reg = !this.reg;
            this.log = false;
        },
        back() {
            this.log = false;
            this.reg = false;
        }
    }
}
</script>

<style>
    .feed-main {
        margin-top: 20px;
        color: #0b1015;
    }
    .jumbotron {
        background-color: white !important;
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
</style>
