<template>
 <div>
   <movie-list-all></movie-list-all>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MovieListAll from '@/components/MovieListAll.vue';

export default Vue.extend({
  components:{
    MovieListAll
  },
});
</script>

<style lang="scss" scoped>

</style>