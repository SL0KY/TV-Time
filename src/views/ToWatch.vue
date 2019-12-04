<template>
 <div>
   <to-watch-list-all></to-watch-list-all>
 </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ToWatchListAll from '@/components/ToWatchListAll.vue';

export default Vue.extend({
  components: {
    ToWatchListAll,
  },
});
</script>

<style lang="scss" scoped>

</style>