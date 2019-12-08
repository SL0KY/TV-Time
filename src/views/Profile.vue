<template>
 <div>
     <div class="row">
         <div class="col-6">
             <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-left">Movies watched</h5>
                    <h6 class="card-subtitle mb-2 text-muted text-left"> {{ movies.length }}</h6>
                </div>
            </div>
         </div>
         <div class="col-6">
             <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-left">Movies to watch</h5>
                    <h6 class="card-subtitle mb-2 text-muted text-left"> {{ toWatch.length }}</h6>
                </div>
            </div>
         </div>
         <div class="col-12 pt-4">
             <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-left">Popularity average</h5>
                    <h6 class="card-subtitle mb-2 text-muted text-left"> {{ this.getPopularityAverage() }} / 20</h6>
                </div>
            </div>
         </div>
     </div>
     <div class="row">
        <h2 class="movieList__h2 col-12 text-left">Movies watched <router-link class="movieList__a" to="/movies">Tout voir...</router-link></h2>
        <movie-item class="col-6" v-for="movie in movies.slice(movies.length - 4, movies.length )" :key="movie.id" :movie="movie"></movie-item>
     </div>
     <div class="row">
        <h2 class="movieList__h2 col-12 text-left">Movies to watch <router-link class="movieList__a" to="/toWatch">Tout voir...</router-link></h2>
        <movie-item class="col-6" v-for="movieToWatch in toWatch.slice(toWatch.length - 4, toWatch.length )" :key="movieToWatch.id" :movie="movieToWatch"></movie-item>
     </div>
     <div class="row">
        <form class="col-12 p-3" @submit.prevent="clearStorage()">
            <button class="profile__button">Clear localstorage</button>
        </form>
     </div>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';
import MovieItem from '@/components/MovieItem.vue';
import Movie from '@/models/movie';

export default Vue.extend({
    methods: {
        getPopularityAverage(): number {
            let popularityAverage = 0;
            let moviesTotal = 0;
            moviesTotal += this.movies.length;
            moviesTotal += this.toWatch.length;
            this.movies.forEach((movie: Movie) => {
                popularityAverage += movie.popularity;
            });
            this.toWatch.forEach((movie: Movie) => {
                popularityAverage += movie.popularity;
            });
            return Math.round((popularityAverage / moviesTotal) * 100) / 100;
        },
        clearStorage(): void {
            this.$store.dispatch('movies/clearStorage');
        },
    },
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
    .card-body{
        padding: 10px;
    }
    .card-subtitle{
        font-size: 25px;
    }
    .movieList__h2{
        margin-top: 30px;
    }
    .movieList__a{
        font-size: 18px;
    }
    .profile__button{
        width: 100%;
        padding: 20px 0;
        border: none;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(128,128,128,1);
        -moz-box-shadow: 0px 0px 10px 0px rgba(128,128,128,1);
        box-shadow: 0px 0px 10px 0px rgba(128,128,128,1);
        color: #fff;
        background-image: linear-gradient(to right, #051937, #133861, #1d5a8d, #1f7fbc, #12a7eb);
    }
</style>