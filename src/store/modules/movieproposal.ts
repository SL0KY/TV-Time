import Movie from '@/models/Movie';
import { Module } from 'vuex';
import Axios from 'axios';
import { getRandomId } from '@/utils/utils';

const movieproposal: Module<{movie: Movie}, any> = {
    namespaced: true,
    getters: {

    },
    mutations: {
        getNewMovie(state, payload: {movie : Movie}) {
            Axios.get('https://api.themoviedb.org/3/movie/' + getRandomId() +'?api_key=37a283d2876f075d46abb94720f8ec77').then(response => {
                if (response.data.adult == false) {
                    payload.movie.id = response.data.id;
                    payload.movie.name = response.data.original_title;
                    if(response.data.poster_path != null)
                    {
                        payload.movie.image = 'https://image.tmdb.org/t/p/w500' + response.data.poster_path;
                    }
                    else
                    {
                        payload.movie.image = '/img/no-image-available.png';
                    }
                 }
                 else
                 {
                     this.getNewMovie(state, payload);
                 }
            }).catch(error => {
                if(error.response.status == 404)
                {
                    this.getNewMovie(state, payload);
                }
            });
        }
    },
    actions: {
        getNewMovie(context, payload: {movie : Movie}) {
            context.commit('getNewMovie', payload);
        },
    },
}

export default movieproposal;