<template>
 <div>
     <div class="row">
        <h2 class="movieList__h2 col-12 text-left">Films vu <router-link class="movieList__a" to="/movies">Tout voir...</router-link></h2>
        <movie-item class="col-6" v-for="movie in movies.slice(movies.length - 4, movies.length )" :key="movie.id" :movie="movie"></movie-item>
     </div>
     <form @submit.prevent="clearStorage()">
        <button>Clear localstorage</button>
     </form>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MovieItem from '@/components/MovieItem.vue';
import { mapState, mapGetters } from 'vuex';

export default Vue.extend({
    components: {
        MovieItem,
    },
    computed: {
        ...mapState('movies', ['movies']),
    },
    methods: {
        clearStorage() : void {
            this.$store.dispatch('movies/clearStorage');
        }
    },
});
</script>

<style lang="scss" scoped>
    .movieList__h2{
        margin-top: 30px;
    }
    .movieList__a{
        font-size: 18px;
    }
</style>