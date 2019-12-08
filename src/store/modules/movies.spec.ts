import Movie from '@/models/movie';
import { MutationTree } from 'vuex';
import movies from './movies';
import Axios from 'axios';

const mutations = movies.mutations as MutationTree<{ movies: Movie[], toWatch: Movie[] }>;
let state: { movies: Movie[], toWatch: Movie[], movie: Movie };

describe('movies', () => {
  beforeEach(() => {
    state = {
      movies: [
        { id: 1, name: 'Movie1', iswatch: false, image: '/img/no-image-available.png', popularity: 0.6 },
        { id: 2, name: 'Movie2', iswatch: true, image: '/img/no-image-available.png', popularity: 1.2 },
      ],
      toWatch: [
        { id: 1, name: 'ToWatch1', iswatch: true, image: '/img/no-image-available.png', popularity: 0.8 },
        { id: 2, name: 'ToWatch2', iswatch: false, image: '/img/no-image-available.png', popularity: 1.9 },
      ],
      movie: { id: 1, name: '', iswatch: false, image: '', popularity: 0 },
    };
  });

  it('should add a watched movie', () => {
    mutations.addMovie(state, { movie: {id: 3, name: 'Movie3', iswatch: true, image: '', popularity: 0.2} });

    expect(state.movies.length).toEqual(3);
    expect(typeof state.movies[2].id).toEqual('number');
    expect(typeof state.movies[2].name).toEqual('string');
    expect(typeof state.movies[2].iswatch).toEqual('boolean');
    expect(typeof state.movies[2].image).toEqual('string');
    expect(typeof state.movies[2].popularity).toEqual('number');
    expect(state.movies[2].name).toEqual('Movie3');
    expect(state.movies[2].iswatch).toBe(true);
    expect(state.movies[2].image).toBe('');
    expect(state.movies[2].popularity).toBe(0.2);
  });

  it('should remove a watched movie', () => {
    mutations.removeMovie(
      state,
      { movie: { id: 2, name: 'Movie2', iswatch: true, image: '/img/no-image-available.png', popularity: 1.2 },
      page: 'movies',
    });
    expect(state.movies.length).toEqual(1);
    expect(state.movies[0].id).toEqual(1);
  });

  it('should add a toWatch movie', () => {
    mutations.addMovieToWatch(state, { movie: {id: 3, name: 'ToWatch3', iswatch: false, image: '', popularity: 0.3} });

    expect(state.toWatch.length).toEqual(3);
    expect(typeof state.toWatch[2].id).toEqual('number');
    expect(typeof state.toWatch[2].name).toEqual('string');
    expect(typeof state.toWatch[2].iswatch).toEqual('boolean');
    expect(typeof state.toWatch[2].image).toEqual('string');
    expect(typeof state.toWatch[2].popularity).toEqual('number');
    expect(state.toWatch[2].name).toEqual('ToWatch3');
    expect(state.toWatch[2].iswatch).toBe(false);
    expect(state.toWatch[2].image).toBe('');
    expect(state.toWatch[2].popularity).toBe(0.3);
  });

  it('should remove a toWatch movie', () => {
    mutations.removeMovie(state, { movie: { id: 2, name: 'ToWatch2', iswatch: false, image: '/img/no-image-available.png', popularity: 1.9 }, page: 'toWatch' });
    expect(state.toWatch.length).toEqual(1);
    expect(state.toWatch[0].id).toEqual(1);
  });

  it('should get a new movie', () => {
    Axios.get('https://api.themoviedb.org/3/movie/363132?api_key=37a283d2876f075d46abb94720f8ec77').then((response) => {
        mutations.getNewMovie(state, { 'movie': state.movie, '{response}': response} );
        expect(state.movie.id).toEqual(363132);
        expect(state.movie.name).toEqual('Star Wars Begins: A Filmumentary');
        expect(state.movie.iswatch).toBe(false);
        expect(state.movie.image).toBe('https://image.tmdb.org/t/p/w500/qG6Ckwz1JywBOvyWtyPaKjYw1GZ.jpg');
        expect(state.movie.popularity).toBe(2.09);
    });

  });
});
