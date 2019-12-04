<template>
 <div>
     <div class="row">
        <h2 class="movieList__h2 col-12 text-left">Movies to watch :</h2>
        <div class="movieitem">
            <movie-item-edit class="col-6" v-for="movieToWatch in toWatch" :key="movieToWatch.id" :movie="movieToWatch"></movie-item-edit>
        </div>
     </div>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MovieItemEdit from '@/components/MovieItemEdit/MovieItemEdit.vue';
import { mapState, mapGetters } from 'vuex';

export default Vue.extend({
    components: {
        MovieItemEdit,
    },
    computed: {
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