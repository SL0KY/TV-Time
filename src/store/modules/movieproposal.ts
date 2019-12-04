import Movie from '@/models/movie';
import { Module } from 'vuex';
import Axios from 'axios';
import { getRandomId } from '@/utils/utils';

const movieproposal: Module<{movie: Movie}, any> = {
    namespaced: true,
    getters: {

    },
    mutations: {
        getNewMovie(state : any, payload: {movie : Movie, response : any}) {
            payload.movie.id = payload.response.data.id;
            payload.movie.name = payload.response.data.original_title;
            if(payload.response.data.poster_path != null)
            {
                payload.movie.image = 'https://image.tmdb.org/t/p/w500' + payload.response.data.poster_path;
            }
            else
            {
                payload.movie.image = '/img/no-image-available.png';
            }
            payload.movie.popularity = payload.response.data.popularity; 
        }
    },
    actions: {
        getNewMovie(context, payload: {movie : Movie}) {
            var url = 'https://api.themoviedb.org/3/movie/' + getRandomId() +'?api_key=37a283d2876f075d46abb94720f8ec77'
            Axios.get(url).then(response => {   
            if (response.data.adult == false) {
                    var movie = payload.movie; 
                    context.commit('getNewMovie', { movie, response });
                 }
                 else
                 {
                    context.dispatch('getNewMovie', payload);
                 }
            }).catch(error => {
                if(error.response.status == 404)
                {
                    context.dispatch('getNewMovie', payload);
                }
            });
        },
    },
}

export default movieproposal;