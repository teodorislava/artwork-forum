import MainPage from './components/MainPage';
import Home from './components/Home';
import Advertisements from './components/Advertisements';
import UserDetails from './components/UserDetails';
import Profile from './components/Profile';
import Artworks from './components/Artworks';

export  default [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/ads', 
        component: Advertisements
    },
    { 
        name:'user',
        path: '/user/:userId',
        component: UserDetails
    },
    { 
        name:'profile',
        path: '/profile/:userId',
        component: Profile
    },
    {
        path: '/artworks', 
        component: Artworks
    }
]