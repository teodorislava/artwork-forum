<template>
    <div>
    <nav class="navbar navbar-light bg-2">
    <a class="navbar-brand covered-contrast"> VintageGram <i class="fas fa-camera-retro"></i></a>
        <p v-if="logUser.log"><router-link :to="{ name: 'profile', params: {userId: id}}" class="link-profile"><i class="fas fa-user circle"></i></router-link></p>
        <i v-on:click="logout()" v-if="logUser.log" class="fas fa-sign-out-alt circle link-logout"></i>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    <div class="collapse navbar-collapse icons" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link :to="{ path:'/home' }" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ path:'/ads' }" class="nav-link">Reklame</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ path:'/artworks' }" class="nav-link">Dela</router-link>
            </li>
        </ul>
      </div>
    </nav>
    <div class="alerts">
        <div v-if="success !== ''" class="alert alert-primary alert-dismissible fade show" role="alert">
            <p>Bravo!</p>
            <hr>
            <strong>Holy guacamole!</strong> {{ success }}
            <button v-on:click="clearSuccess()" type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
    <div class="alerts">
        <div v-if="fail !== ''" class="alert alert-warning alert-dismissible fade show" role="alert">
            <p>Greska!</p>
            <hr>
            <strong>Holy guacamole!</strong> {{ fail }}
            <button v-on:click="clearFail()" type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { GET_USER } from '../store/action.types';
import { LOGOUT, CLEAR_SUCCESS, CLEAR_FAIL } from '../store/mutation.types';

export default {
    computed: {
        ...mapGetters([
            'logUser',
            'success',
            'fail'
        ])
    },
    data() {
        return {
            id: this.$cookie.get('userid') || 0
        }
    },
    methods: {
        ...mapActions({
            'getUserAction': GET_USER,
        }),
        ...mapMutations({
            'logoutMutation': LOGOUT,
            'clearSuccessMutaion' :CLEAR_SUCCESS,
            'clearFailMutation':CLEAR_FAIL
        }),
        logout() {
            this.$cookie.delete('userid');
            this.$cookie.delete('token');
            this.logoutMutation();
            this.$router.push('/');
        },
        clearSuccess() {
            this.clearSuccessMutaion();
        },
        clearFail() {
            this.clearFailMutation();
        }
    }
}
</script>

<style scoped>
    .bg-2 {
        background-color: #FFFF00 !important;
    }
    .link-profile {
        color: #0b1015 !important;
        font-size: 20px;
        cursor:pointer;
        position: absolute;
        top: 10px;
        right: 220px;
    }
    .link-logout {
        color: #0b1015 !important;
        font-size: 20px;
        cursor:pointer;
        position: absolute;
        top: 10px;
        right: 150px;
    }
    .covered-contrast {
        padding: 0 !important;
    }
    .circle {
        border: 2px solid #0b1015;
        border-radius: 50%;
        padding: 7px;
    }
    .nav-link {
        color: #0b1015 !important;
    }
    .icons {
        position: relative;
    }
    .alerts {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .alert {
        position: fixed;
        z-index: 10000;
        bottom: 10px;
        right: 70px;
        height: 100px;
        text-align: center;
    }
    p {
        font-weight: bold;
    }
</style>

