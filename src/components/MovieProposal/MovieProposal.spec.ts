import { shallowMount } from '@vue/test-utils';
import MovieProposal from './MovieProposal.vue';

const $store = { dispatch: () => undefined };
const wrapper = shallowMount(MovieProposal, {
  mocks: { $store },
  propsData: { movie: { id: 1, name: 'Movie1', iswatch: true, image: '', popularity: 2.06 } },
});

describe('MovieProposal', () => {
    it('should add a viewed movie', () => {
        const spy = spyOn($store, 'dispatch');
        wrapper.find('.movie_proposal__btn1').trigger('click');
        expect(spy).toHaveBeenCalledWith(
            'movies/addMovie',
            { movie: { id: 1, name: 'Movie1', iswatch: true, image: '', popularity: 2.06 },
            page: '',
        });
    });

    it('should add a to wtach movie', () => {
        const spy = spyOn($store, 'dispatch');
        wrapper.find('.movie_proposal__btn2').trigger('click');
        expect(spy).toHaveBeenCalledWith(
            'movies/addMovieToWatch',
            { movie: { id: 1, name: 'Movie1', iswatch: true, image: '', popularity: 2.06 },
            page: '',
        });
    });

    it('should get a new movie', () => {
        const spy = spyOn($store, 'dispatch');
        wrapper.find('.movie_proposal__btn_newmovie').trigger('click');
        expect(spy).toHaveBeenCalledWith('movieproposal/getNewMovie');
    });
});
