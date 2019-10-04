<template>
  <div class="home">
    <movie></movie>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Movie from '@/components/Movie.vue';

export default Vue.extend({
  name: 'home',
  components: {
    Movie,
  },
});
</script>
