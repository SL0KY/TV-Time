<template>
 <div>
     <h1>{{ this.movie.name }}</h1>
     <div v-if="this.movie.image != ''" class="movie_proposal row">
         <div class="col-12 p-0">
            <img v-bind:src="this.movie.image" />  
         </div>
         <div class="col-6 pl-0 movie_proposal__col61">
            <button @click.prevent="addMovie()" class="movie_proposal__btn1">Je l'ai vu</button>             
         </div>
         <div class="col-6 pr-0 movie_proposal__col62">
            <button @click.prevent="addMovieToWatch()" class="movie_proposal__btn2">Je veux le voir</button>             
         </div>          
     </div>

     <form v-if="this.movie.image == ''" @submit.prevent="getNewMovie()">
        <button class="movie_proposal__btn_newmovie">Get movie</button>
    </form>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Movie from '@/models/movie';

export default Vue.extend({
    data(): {movie: Movie} {
        return {
            movie: {
                id: 1,
                name: '',
                iswatch: false,
                image: '',
                popularity: 0,
            },
        };
    },
    methods: {
        getNewMovie(): void {
            this.$store.dispatch('movieproposal/getNewMovie', {movie: this.movie});
        },
        addMovie(): void {
            this.$store.dispatch('movies/addMovie', {movie: this.movie});
        },
        addMovieToWatch(): void {
            this.$store.dispatch('movies/addMovieToWatch', {movie: this.movie});
        },
    },
});
</script>

<style lang="scss" scoped>
    .movie_proposal button{
        width: 100%;
        padding: 20px 0;
        border: none;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(128,128,128,1);
        -moz-box-shadow: 0px 0px 10px 0px rgba(128,128,128,1);
        box-shadow: 0px 0px 10px 0px rgba(128,128,128,1);
        color: #fff;
    } 
    .movie_proposal__btn1{
        background-image: linear-gradient(to right, #051937, #133861, #1d5a8d, #1f7fbc, #12a7eb);
    }
    .movie_proposal__btn2{
        background-image: linear-gradient(to left, #051937, #133861, #1d5a8d, #1f7fbc, #12a7eb);
    }
    .movie_proposal img{
        width: 100%;
    }
    .movie_proposal__col61{
        padding-right: 5px;
    }  
    .movie_proposal__col62{
        padding-left: 5px;
    } 
</style>