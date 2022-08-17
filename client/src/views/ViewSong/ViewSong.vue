<template>
     <div>
          <v-row>
               <v-col
                    class="SongMetadata"
                    md="6"
                    sm="12"
                    xs="12"
               >
                    <song-metadata :song="song" />
               </v-col>

               <v-col
                    
                    class="YoutubeVideo"
                    lg="6"
                    md="12"
                    sm="12"
                    xs="12"
               >
                    <you-tube-video :youtubeId="song.youtubeId"/>
               </v-col>
          </v-row>

          <v-row
               md="12"
               sm="12"          
               xs="12"
          >
               <v-col
                    class="Lyric"
                    md="6"
                    sm="12"
                    xs="12"
               >
                    <lyric :lyrics="song.lyrics"></lyric>
               </v-col>
               <v-col
                    class="Tab"
                    md="6"
                    sm="12"
                    xs="12"
               >
                    <tab :tab="song.tab"></tab>
               </v-col>
          </v-row>
     </div>
</template>

<script>
     import SongsService from '@/services/SongsService'
     import SongMetadata from '@/components//ViewSong/SongMetadata.vue'
     import Tab from '@/components/ViewSong/Tab.vue'
     import Lyric from '../../components/ViewSong/Lyric.vue'
     import YouTubeVideo from '../../components/ViewSong/YouTubeVideo.vue'
     import SongHistoryService from '@/services/SongHistoryService';
     import { mapState } from 'vuex'
     
     export default {
          data() {
               return {
                    song: {}
               }
          },

          computed: {
               ...mapState([
                    'isUserLoggedIn',
                    'user',
                    'route'
               ])
          },

          async mounted () {
               const songId = this.route.params.songId
               this.song = (await SongsService.show(songId)).data
          
               if (this.isUserLoggedIn) {
                    SongHistoryService.post({
                         songId: songId,
                         userId: this.user.id
                    })
               }
          },

          components: {
               SongMetadata,
               Tab,
               Lyric,
               YouTubeVideo
          }
          
     }
</script>

<style lang="scss" scoped>
     @media screen and (max-width: 600px) {
          .leftSide {
               display: none;
          }
     }

     @media screen and (min-width: 601px) {
          .min-device {
               display: none;
          }
     }

     .tab {
          width: 100%;
          font-size: 12px;
          font-family: 'Courier New', Courier, monospace;
          border: none;
          height: 329px;
          border-style: none;
          border-color: transparent;
          overflow: auto;
          padding: 40px;
     }
</style>