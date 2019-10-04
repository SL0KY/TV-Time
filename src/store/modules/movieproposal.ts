import Movie from '@/models/Movie';
import { Module } from 'vuex';
import Axios from 'axios';

const movieproposal: Module<{movie: Movie}, any> = {
    namespaced: true,
    getters: {

    },
    mutations: {
        getNewMovie(state, payload: {movie : Movie, id: number}) {
            Axios.get('https://api.themoviedb.org/3/movie/' + payload.id +'?api_key=37a283d2876f075d46abb94720f8ec77').then(response => {
                console.log(response);
                console.log(payload.id);
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
            });
        }
    },
    actions: {
        getNewMovie(context, payload: {movie : Movie, id: number}) {
            context.commit('getNewMovie', payload);
        },
    },
}

export default movieproposal;