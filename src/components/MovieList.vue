<template>
 <div>
     <movie-item v-for="movie in movies" :key="movie.id" :movie="movie"></movie-item>
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
});
</script>

<style lang="scss" scoped>

</style>