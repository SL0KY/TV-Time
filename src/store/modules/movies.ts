import Movie from '@/models/movie';
import { Module } from 'vuex';
import Axios from 'axios';
import { getRandomId } from '@/utils/utils';
import store from '../store';

function getViewedFromLocalStorage(): Movie[] {
    const savedMovies: string | null = localStorage.getItem('movies');

    return savedMovies ? JSON.parse(savedMovies) : [];
}

function getToWatchFromLocalStorage(): Movie[] {
    const savedMovies: string | null = localStorage.getItem('toWatch');

    return savedMovies ? JSON.parse(savedMovies) : [];
}

const movies: Module<{movies: Movie[], toWatch: Movie[]}, any> = {
    namespaced: true,
    state: {
        movies: getViewedFromLocalStorage(),
        toWatch: getToWatchFromLocalStorage(),
    },
    getters: {

    },
    mutations: {
        addMovie(state, payload: {movie: Movie}) {
            /**
             * Vérification pour ne pas enregistrer de doublons au cas ou getNewMovie aurait une erreur 404
             * Utiliser une fonction qui retourne l'élement permet la compatibilité avec IE
             */
            if (state.movies.filter((e) => { return e.id === payload.movie.id ; }).length === 0) {
                state.movies.push({
                    id: payload.movie.id,
                    name: payload.movie.name,
                    image: payload.movie.image,
                    iswatch: true,
                    popularity: payload.movie.popularity,
                });
            }
        },
        addMovieToWatch(state, payload: {movie: Movie}) {
            /**
             * Vérification pour ne pas enregistrer de doublons au cas ou getNewMovie aurait une erreur 404
             * Utiliser une fonction qui retourne l'élement permet la compatibilité avec IE
             */
            if (state.toWatch.filter(   (e) => { return e.id === payload.movie.id ; }).length === 0) {
                state.toWatch.push({
                    id: payload.movie.id,
                    name: payload.movie.name,
                    image: payload.movie.image,
                    iswatch: false,
                    popularity: payload.movie.popularity,
                });
            }
        },
        getNewMovie(state: any, payload: {movie: Movie, response: any}) {
            payload.movie.id = payload.response.data.id;
            payload.movie.name = payload.response.data.original_title;
            if (payload.response.data.poster_path != null) {
                payload.movie.image = 'https://image.tmdb.org/t/p/w500' + payload.response.data.poster_path;
            } else {
                payload.movie.image = '/img/no-image-available.png';
            }
            payload.movie.popularity = payload.response.data.popularity;
        },
        removeMovie(state, payload: {movie: Movie, page: string}) {
            switch (payload.page) {
                case 'movies' :
                    const pos = state.movies.indexOf(payload.movie);
                    state.movies.splice(pos, 1);
                    break;
                case 'toWatch' :
                    const pos1 = state.toWatch.indexOf(payload.movie);
                    state.toWatch.splice(pos1, 1);
                    break;
            }
        },
    },
    actions: {
        addMovie(context, payload: {movie: Movie}) {
            context.dispatch('getNewMovie', payload);
            context.commit('addMovie', payload);
            context.dispatch('save');
        },
        addMovieToWatch(context, payload: {movie: Movie}) {
            context.dispatch('getNewMovie', payload);
            context.commit('addMovieToWatch', payload);
            context.dispatch('save');
        },
        save(context) {
            localStorage.setItem(
                'movies',
                JSON.stringify(
                context.state.movies.map((movie) => ({ ...movie, iswatch: true })),
                ),
            );
            localStorage.setItem(
                'toWatch',
                JSON.stringify(
                context.state.toWatch.map((movie) => ({ ...movie, iswatch: false })),
                ),
            );
        },
        getNewMovie(context, payload: {movie: Movie}) {
            const url = 'https://api.themoviedb.org/3/movie/' + getRandomId() + '?api_key=37a283d2876f075d46abb94720f8ec77';
            Axios.get(url).then((response) => {
                if (context.state.movies.filter((e) => { return e.id === response.data.id ; }).length === 0 || response.data.adult === false) {
                    const movie = payload.movie;
                    context.commit('getNewMovie', { movie, response });
                } else {
                    context.dispatch('getNewMovie', payload);
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    context.dispatch('getNewMovie', payload);
                }
            });
        },
        clearStorage(context) {
            localStorage.clear();
            location.reload();
        },
        removeMovie(context, payload: {movie: Movie, page: string}) {
            context.commit('removeMovie', payload);
            context.dispatch('save');
        },
    },
};

export default movies;
