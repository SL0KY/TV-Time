<template>
 <div>
   <movie-proposal></movie-proposal>
   <movie-list></movie-list>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MovieProposal from '@/components/MovieProposal.vue';
import MovieList from '@/components/MovieList.vue';

export default Vue.extend({
  components: {
    MovieProposal,
    MovieList,
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>

</style>