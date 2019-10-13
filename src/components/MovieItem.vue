<template>
 <div class="movieItem">
     <div class="movieItem__div">
         <img class="movieItem__img" v-bind:src="this.movie.image" /> 
         <h3 class="movieItem__h3 text-center">{{ movie.name }}</h3>
     </div>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Movie from '@/models/movie';

export default Vue.extend({
    props: {
        movie: Object as () => Movie,
    },
});
</script>

<style lang="scss" scoped>
    .movieItem{
        padding: 10px;
    }
    .movieItem__div{
        height: 100%;
        -webkit-box-shadow: 0px 0px 8px 1px rgba(143,143,143,1);
        -moz-box-shadow: 0px 0px 8px 1px rgba(143,143,143,1);
        box-shadow: 0px 0px 8px 1px rgba(143,143,143,1);
    }
    .movieItem__img{
        width: 100%;
    }
    .movieItem__h3{
        font-size: 15px;
        padding: 5px 0;
    }
</style>