<template>
 <div>
     <p>{{ movie.name }}</p>
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

</style>