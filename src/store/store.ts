import Vue from 'vue';
import Vuex from 'vuex';
import movies from '@/store/modules/movies';
import movieproposal from '@/store/modules/movieproposal';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    movies,
    movieproposal,
  },
});
