import { shallowMount } from '@vue/test-utils';
import MovieItemEdit from './MovieItemEdit.vue';

const $store = { dispatch: () => undefined };
const wrapper = shallowMount(MovieItemEdit, {
  mocks: { $store },
  propsData: { movie: { id: 1, name: 'Movie1', iswatch: true, image: '', popularity: 2.06 } },
});

describe('MovieItemEdit', () => {
  it('should remove a movie', () => {
    const spy = spyOn($store, 'dispatch');
    wrapper.find('.movieItemEdit__divRemove').trigger('click');
    //obligé de laisser la page vide car la variable est générée dynamiquement dans le component et ne peut donc être générée dans le cli
    expect(spy).toHaveBeenCalledWith('movies/removeMovie', { movie: { id: 1, name: 'Movie1', iswatch: true, image: '', popularity: 2.06 }, page: ''});
  });
});