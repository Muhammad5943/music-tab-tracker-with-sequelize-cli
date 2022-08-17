<template>
     <div>
          <v-row
               justify="center"
          >
               <v-col
                    md="6"
                    xs="12"
                    sm="12"
                    v-if="isUserLoggedIn"
               >
                    <v-flex>
                         <songs-bookmarks />
                         <songs-histories class="mt-5" />
                    </v-flex>
               </v-col>

               <v-col
                    md="6"
                    xs="12"
                    sm="12"
               >
                    <v-flex>
                         <songs-search-panel />
                         <songs-panel class="mt-5" />          
                    </v-flex>
               </v-col>
          </v-row>
     </div>
</template>

<script>
     import SongsService from '@/services/SongsService'
     import SongsPanel from '@/views/SongsPanel.vue'
     import SongsBookmarks from '@/views/SongsBookmarks.vue'
     import SongsHistories from '@/views/SongsHistories.vue'
     import SongsSearchPanel from '@/components/SongsSearchPanel.vue'
     import { mapState } from 'vuex'
     
     export default {
          components: {
               // Panel,
               SongsPanel,
               SongsSearchPanel,
               SongsBookmarks,
               SongsHistories
          },

          data() {
               return {
                    songs: null     
               }
          },

          computed: {
               ...mapState([
               'isUserLoggedIn'
               ])
          },

          methods: {
               navigateTo(route){
                    this.$router.push(route)
               }
          },

          async mounted() {
               // do all request from the backend
               this.songs = (await SongsService.index()).data
          },
     }
</script>

<style lang="scss" scoped>
     .album-image {
          width: 70%;
          margin: 0 auto;
     }

     .song {
          padding: 20px;
          height: 100%;
          overflow: hidden;
     }
</style>