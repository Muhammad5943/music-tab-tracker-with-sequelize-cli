<template>
  <v-app>
    <v-main>
      <page-header/>
      
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    PageHeader
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  .danger-alert {
    color: red;
  }
</style>
