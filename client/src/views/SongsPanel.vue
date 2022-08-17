<template>
     <panel title="Songs">
          <v-btn
               @click="navigateTo({name: 'songs-create'})"
               class="cyan accent-2"
               slot="action"
               light
               medium
               right
               middle
               absolute
               fab
          >
               <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
          <div 
               v-for="song in songs"
               :key="song.id"
               class="song"
          >
          <v-layout>
               <v-flex
                    md6
                    sm6
                    xs6
               >
                    <div 
                         class="song-title text-md-h4 text-sm-h4 text-xs-h4"
                    >
                         {{ song.title }}
                    </div>
                    <div 
                         class="song-artist text-md-h5 text-sm-h4 text-xs-h4"
                    >
                         {{ song.artist }}
                    </div>
                    <div 
                         class="song-album text-md-h6 text-sm-h4 text-xs-h4"
                    >
                         {{ song.album }}
                    </div>

                    <v-btn
                         rounded
                         class="cyan lighten-2 mt-5"
                         dark
                         @click="navigateTo({
                              name: 'song', 
                              params: {songId: song.id}
                         })"
                    >
                         View
                    </v-btn>
               </v-flex>
               <v-flex
                    md6
                    sm6
                    xs6
               >
                    <img 
                         class="album-image" 
                         :src="song.albumImageUrl" 
                         :alt="song.album"
                    >
               </v-flex>
          </v-layout>
          </div>
     </panel>               
</template>

<script>
     import SongsService from '@/services/SongsService'

     export default {
          components: {
          },

          data() {
               return {
                    songs: null     
               }
          },

          methods: {
               navigateTo(route){
                    this.$router.push(route)
               }
          },

          watch: {
               '$route.query.search': {
                    immediate: true,
                    async handler (value) {
                         this.songs = (await SongsService.index(value)).data
                    }
               }
          }

          /* immediate can do same with mounted */
          // async mounted() {
          //      // do all request from the backend
          //      this.songs = (await SongsService.index()).data
          //      console.log('songs', this.songs)
          // },
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