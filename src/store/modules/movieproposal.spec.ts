import Movie from '@/models/movie';
import { MutationTree } from 'vuex';
import movieproposal from './movieproposal';
import Axios from 'axios';

const mutations = movieproposal.mutations as MutationTree<{ movie: Movie }>;
let state: { movie: Movie };

describe('movies', () => {
  beforeEach(() => {
    state = {
      movie: { id: 1, name: '', iswatch: false, image: '', popularity: 0 },
    };
  });

  it('should get a new movie', () => {
    Axios.get('https://api.themoviedb.org/3/movie/363132?api_key=37a283d2876f075d46abb94720f8ec77').then(response => {
        mutations.getNewMovie(state, { movie: state.movie, response: response} );
        expect(state.movie.id).toEqual(363132);
        expect(state.movie.name).toEqual('Star Wars Begins: A Filmumentary');
        expect(state.movie.iswatch).toBe(false);
        expect(state.movie.image).toBe('https://image.tmdb.org/t/p/w500/qG6Ckwz1JywBOvyWtyPaKjYw1GZ.jpg');
        expect(state.movie.popularity).toBe(2.09);
    })

  });
});