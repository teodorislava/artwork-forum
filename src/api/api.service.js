import Vue from 'vue';
import { API_URL } from '../config/utilities';


export const UserService = {
    getUser(data) {
        return Vue.http.get(`${API_URL}/Users/${data.id}`);
    },
    getUserWorks(data) {
        return Vue.http.get(`${API_URL}/Users/${data.id}/Artworks`);
    },
    getUserAds(data) {
        return Vue.http.get(`${API_URL}/Users/${data.id}/Advertisements`);
    },
    getUserAdsSold(data) {
        return Vue.http.get(`${API_URL}/Users/${data.id}/Advertisements/Sold`);
    },
    getUserAdsBought(data) {
        return Vue.http.get(`${API_URL}/Users/${data.id}/Advertisements/Bought`);
    },
    registerUser(data) {
        return Vue.http.post(`${API_URL}/Register`, data.body);
    },
    searchUsers(data) {
        return Vue.http.get(`${API_URL}/Users/Search?${data.search}`);
    },
    login(data) {
        return Vue.http.post(`${API_URL}/Login`, data.body);
    }
}

export const ArtistService = {
    addArtist(data) {
        return Vue.http.post(`${API_URL}/Artists`, data.body, {
            headers: {
                'Authorization':data.token
            }
        });
    },
    searchArtists(data) {
        return Vue.http.get(`${API_URL}/Artists/Search?${data.search}`, {
            headers: {
                'Authorization':data.token
            }
        });
    }
}

export const ArtworkService = {
    addArtwork(data) {
        return Vue.http.post(`${API_URL}/Artists/${data.id}/Artworks`, data.body, {
            headers: {
                'Authorization':data.token
            }
        });
    },
    searchArtworks(data) {
        return Vue.http.get(`${API_URL}/Artworks/Search?${data.search}`, {
            headers: {
                'Authorization':data.token
            }
        });
    },
    searchAllArtworks(data) {
        return Vue.http.get(`${API_URL}/Artworks/SearchAll?${data.search}`, {
            headers: {
                'Authorization':data.token
            }
        });
    },
    buyArtwork(data) {
        return Vue.http.post(`${API_URL}/Advertisements/${data.id}/Buy`, data.body, {
            headers: {
                'Authorization':data.token
            }
        });
    }
}

export const DirectionService = {
    addDirection(data) {
        return Vue.http.post(`${API_URL}/Directions`, data.body, {
            headers: {
                'Authorization':data.token
            }
        });
    },
    searchDirections(data) {
        return Vue.http.get(`${API_URL}/Directions/Search?${data.search}`, {
            headers: {
                'Authorization':data.token
            }
        });
    }
}

export const AdvertisementService = {
    searchAds(data) {
        return Vue.http.get(`${API_URL}/Advertisements/Search?${data.search}`);
    },
    addAd(data) {
        return Vue.http.post(`${API_URL}/Advertisements`, data.body, {
            headers: {
                'Authorization':data.token
            }
        });
    },
    editAd(data) {
        return Vue.http.put(`${API_URL}/Advertisements/${data.id}`, data.body, {
            headers: {
                'Authorization':data.token
            }
        });
    },
    deleteAd(data) {
        return Vue.http.delete(`${API_URL}/Advertisements/${data.id}`, {
            headers: {
                'Authorization':data.token
            }
        });
    },
    getAdComments(data) {
        return Vue.http.get(`${API_URL}/Advertisements/${data.id}/Comments`, {
            headers: {
                'Authorization':data.token
            }
        });
    },
    postAdComment(data) {
        return Vue.http.post(`${API_URL}/Advertisements/${data.id}/Comments`, data.body, {
            headers: {
                'Authorization':data.token
            }
        });
    }
}

export const ReviewService = {
    addReview(data) {
        return Vue.http.post(`${API_URL}/Users/${data.id}/Reviews`, data.body, {
            headers: {
                'Authorization':data.token
            }
        });
    },
    getUserReviews(data) {
        return Vue.http.get(`${API_URL}/Users/${data.id}/Reviews`);
    }
}