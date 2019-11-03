<template>
 <div>
     <div class="row">
        <h2 class="movieList__h2 col-12 text-left">Films vu <router-link class="movieList__a router1" to="/movies">Tout voir...</router-link></h2>
        <div class="movieItem">
            <movie-item class="col-6" v-for="movie in movies.slice(movies.length - 4, movies.length )" :key="movie.id" :movie="movie"></movie-item>
        </div>
     </div>
     <div class="row">
        <h2 class="movieList__h2 col-12 text-left">Films à voir <router-link class="movieList__a router2" to="/toWatch">Tout voir...</router-link></h2>
        <div class="movieItemToWatch">
            <movie-item class="col-6" v-for="movieToWatch in toWatch.slice(toWatch.length - 4, toWatch.length )" :key="movieToWatch.id" :movie="movieToWatch"></movie-item>
        </div>
     </div>
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
        ...mapState('movies', ['toWatch']),
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