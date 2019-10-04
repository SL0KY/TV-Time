import Movie from '@/models/Movie';
import { Module } from 'vuex';
import Axios from 'axios';
import { getRandomId } from '@/utils/utils';

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
            state.movies.push({
                id: payload.movie.id,
                name: payload.movie.name,
                image: payload.movie.image,
                iswatch: true,
            });
        },
        getNewMovie(state, payload: {movie : Movie}) {
            Axios.get('https://api.themoviedb.org/3/movie/' + getRandomId() +'?api_key=37a283d2876f075d46abb94720f8ec77').then(response => {
                console.log(response);
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
        addMovie(context, payload: {movie: Movie}){
            context.commit('addMovie', payload);
            context.dispatch('save');
            context.dispatch('getNewMovie', payload);
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
    },
}

export default movies;