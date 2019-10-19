import Movie from '@/models/Movie';
import { Module } from 'vuex';
import Axios from 'axios';
import { getRandomId } from '@/utils/utils';
import store from '../store';

function getViewedFromLocalStorage(): Movie[] {
    const savedMovies: string | null = localStorage.getItem('movies');

    return savedMovies ? JSON.parse(savedMovies) : [];
}

const movies: Module<{movies: Movie[]}, any> = {
    namespaced: true,
    state: {
        movies: getViewedFromLocalStorage(),
    },
    getters: {

    },
    mutations: {
        addMovie(state, payload: {movie : Movie}){
            /**
             * Vérification pour ne pas enregistrer de doublons au cas ou getNewMovie aurait une erreur 404
             * Utiliser une fonction qui retourne l'élement permet la compatibilité avec IE
             */
            if (state.movies.filter(function(e) { return e.id === payload.movie.id ; }).length == 0) {
                state.movies.push({
                    id: payload.movie.id,
                    name: payload.movie.name,
                    image: payload.movie.image,
                    iswatch: true,
                });
            }
        },
        getNewMovie(state, payload: {movie : Movie}) {
            Axios.get('https://api.themoviedb.org/3/movie/' + getRandomId() +'?api_key=37a283d2876f075d46abb94720f8ec77').then(response => {
                if (state.movies.filter(function(e) { return e.id === response.data.id ; }).length == 0 || response.data.adult == false) {
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
        },
        removeMovie(state, payload: {movie : Movie}) {
            var pos = state.movies.indexOf(payload.movie);
            state.movies.splice(pos, 1);
        }
    },
    actions: {
        addMovie(context, payload: {movie: Movie}){
            context.dispatch('getNewMovie', payload);
            context.commit('addMovie', payload);
            context.dispatch('save');
        },
        save(context) {
            localStorage.setItem(
                'movies',
                JSON.stringify(
                context.state.movies.map((movie) => ({ ...movie, iswatch: true })),
                ),
            );
        },
        getNewMovie(context, payload: {movie : Movie}) {
            context.commit('getNewMovie', payload);
        },
        clearStorage(context) {
            localStorage.clear();
            location.reload();
        },
        removeMovie(context, payload: {movie : Movie}) {
            context.commit('removeMovie', payload);
            context.dispatch('save');
        },
    },
}

export default movies;