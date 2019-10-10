<template>
    <div>
        <app-nav></app-nav>
        <div class="container-fluid artwork-container">
            <div class="row">
                <div class="col-5">
                     <div class="input-group mb-3">
                        <input v-on:keyup.enter="searchArts()" v-model="searchArt" name="searchart" type="text" class="form-control" placeholder="Pretrazite Dela.." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span @click="searchArts()" class="input-group-text click-span" id="basic-addon2"><i class="fab fa-searchengin"></i></span>
                        </div>
                    </div>
                    <div class="container chose-container">
                        <div v-for="(art,index) in allArts" :key="index" class="row">
                           <p class="chose-art" @click="viewArt(art)"> {{ art.name }} </p>
                        </div>
                    </div>
                </div>
                <div v-if="showArt" class="col-7">
                    <p class="name"> Ime: {{ chosenArt.name }}</p>
                    <p class="name"> Umetnik: {{ chosenArt.artistname }} {{ chosenArt.artistlastname }}</p>
                    <div class="picture-container">
                        <img class="picture" :src=pictureUrl>
                    </div>
                    <file-upload :url='url' :headers="headers" @change="onFileChange"></file-upload>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from './Nav';
import { mapActions, mapGetters } from 'vuex';
import { SEARCH_ALL_ARTS } from '../store/action.types';
import { Artwork } from '../models/Artwork';

export default {
    components: {
        'app-nav':Nav,
    },
    computed: {
        ...mapGetters([
            'allArts'
        ])
    },
    data() {
        return {
            searchArt: '',
            chosenArt: new Artwork(),
            showArt: false,
            pictureUrl: '',
            url: `http://localhost:63033/Files/UploadPicture`,
            headers: {
                "Content-Type" : "text/plain;charset=UTF-8",
                'Authorizartion': this.$cookie.get('token')
                },
            filesUploaded: []
        }
    },
    methods: {
        ...mapActions({
            'searchArtsAction':SEARCH_ALL_ARTS
        }),
        searchArts() {
            this.searchArtsAction({
                search: `name=${this.searchArt}`,
                token: this.$cookie.get('token')
            });
        },
        viewArt(art) {
            this.showArt = true;
            this.chosenArt = art;
            this.pictureUrl = `http://localhost:63033/Files/GetPicture?id=${this.chosenArt.id}`;
        },
        onFileChange (file) {
            this.fileUploaded = file;
            this.url = `http://localhost:63033/Files/UploadPicture?id=${this.chosenArt.id}`;
        }
    }
}
</script>

<style>
    .click-span {
        color: #0b1015;
        background: yellow;
    }
    .file-upload .input-wrapper {
        background-color: yellow !important;
        font-family: Covered !important;
        width: 60%;
        margin: 20px auto;
        border: 1px solid yellow;
        border-radius: 10px;
    }
    .input-wrapper:hover {
        background: #dada02 !important;
    }
    .file-upload-label {
        color: #0b1015 !important;
    }
    .picture-container {
        margin-top: 10px;
        margin-bottom: 10px;
        height: 500px;
        width: 50%;
        margin: 0 auto;
        background-color: rgba(245, 245, 245, 0.959);
        border:solid 5vmin #eee;
        border-bottom-color:#fff;
        border-left-color:#eee;
        border-radius:2px;
        border-right-color:#eee;
        border-top-color:#ddd;
        box-shadow:0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25);
        box-sizing:border-box;
        display:inline-block;
    }
    .picture {
        height: 100%;
        width: 100%;
    }
    .artwork-container {
        margin-top: 10px;
    }
    .name {
        color: yellow;
    }
    .chose-art {
        background-color: yellow;
        text-align: center;
        width: 100%;
        border: 2px solid yellow;
        border-radius: 10px;
        color: #0b1015;
        padding-top: 5px;
        padding-bottom: 5px;
        cursor: pointer;
        font-family: Covered;
        font-size: 25px;
    }
    .chose-container {
        margin-top: 30px;
    }
    .form-control {
        height: 50px !important;
    }
    .mb-3 {
        height: 50px;
    }
</style>
