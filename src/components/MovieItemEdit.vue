<template>
 <div class="movieItemEdit">
     <div class="movieItemEdit__div">
         <img class="movieItemEdit__img" v-bind:src="this.movie.image" /> 
         <h3 class="movieItemEdit__h3 text-center">{{ movie.name }}</h3>
         <div @click="removeMovie()" class="movieItemEdit__divRemove">
             <i class="fas fa-trash-alt"></i>
         </div>
     </div>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Movie from '@/models/movie';

export default Vue.extend({
    data(): {page: String} {
        return {
            page: document.location.href.substring(document.location.href.lastIndexOf( "/" ) +1),  
        }
    },
    props: {
        movie: Object as () => Movie,
    },
    methods:{
        removeMovie() : void{       
            this.$store.dispatch('movies/removeMovie', {movie : this.movie, page: this.page})
        }
    },
});
</script>

<style lang="scss" scoped>
    .movieItemEdit{
        padding: 10px;
    }
    .movieItemEdit__div{
        height: 100%;
        -webkit-box-shadow: 0px 0px 8px 1px rgba(143,143,143,1);
        -moz-box-shadow: 0px 0px 8px 1px rgba(143,143,143,1);
        box-shadow: 0px 0px 8px 1px rgba(143,143,143,1);
    }
    .movieItemEdit__img{
        width: 100%;
    }
    .movieItemEdit__h3{
        font-size: 15px;
        padding: 5px 0;
    }
    .movieItemEdit__divRemove{
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        background: #fff;
        padding-top: 2px;
        cursor: pointer;
    }
    .movieItemEdit__divRemove i{
        color: #e60000;
    }
</style>