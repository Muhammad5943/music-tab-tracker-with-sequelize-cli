<template>
     <panel 
          title="Song Metadata"
          :width = "$vuetify.breakpoint.mdAndDown? '100%':'100%'"
     >
          <v-layout>
               <v-flex
                    class="leftSide"
                    md="6"
                    sm="12"
                    xs="12"
               >
                    <div 
                         class="song-title text-md-h4 text-md-h4 text-sm-h4 text-xs-h4"
                    >
                         {{ song.title }}
                    </div>
                    <div 
                         class="song-artist text-md-h5 text-sm-h4 text-xs-h4"
                    >
                         {{ song.artist }}
                    </div>
                    <div 
                         class="song-genre text-md-h6 text-sm-h4 text-xs-h4"
                    >
                         {{ song.genre }}
                    </div>

                    <div class="mt-3">
                         <!-- Edit button -->
                         <v-btn
                              rounded
                              class="cyan lighten-2"
                              dark
                              @click="navigateTo({
                                   name: 'song-edit',
                                   params: {
                                        songId: song.id
                                   }
                              })"
                         >
                              Edit
                         </v-btn>

                         <!-- Bookmark button -->
                         <v-btn
                              v-if="isUserLoggedIn && !bookmark"
                              rounded
                              class="cyan lighten-2 ml-3"
                              dark
                              @click="setAsBookmark"
                         >
                              Set As Bookmark
                         </v-btn>

                         <v-btn
                              v-if="isUserLoggedIn && bookmark"
                              rounded
                              class="cyan lighten-2 ml-3"
                              dark
                              @click="unsetAsBookmark"
                         >
                              Unset As Bookmark
                         </v-btn>
                    </div>
               </v-flex>
               <v-flex
                    md="6"
                    sm="12"
                    xs="12"
               >
                    <div class="min-device">
                         <h4>{{ song.title }} | {{ song.artist }}</h4>
                    </div>
                    <img 
                         class="album-image"
                         :src="song.albumImageUrl" 
                         :alt="song.album"
                    />           
                    <br>
                    {{ song.album }}                        
               </v-flex>
          </v-layout>
     </panel>
</template>

<script>
     // mapState used to make shorted the vuex called function on ui like "$store.state.isUserLoggedIn" then you can called just "isUserLoggedIn"
     import { mapState } from 'vuex'
     import BookmarksService from '@/services/BookmarksService'

     export default {
          props: [
               'song'
          ],

          data() {
               return {
                    bookmark: null
               }
          },

          computed: {
               ...mapState([
                    'isUserLoggedIn'
               ])
          },

          watch: {
               async song () {
                    if (!this.isUserLoggedIn) {
                         return
                    }

                    try {
                         const bookmarks = (await BookmarksService.index({
                                   songId: this.song.id
                                   // userId: this.$store.state.user.id /* we do not need this one when wi were used passport/ jwt */
                              })
                         ).data

                         // console.log(this.bookmark);
          
                         if (bookmarks.length) {
                              this.bookmark = bookmarks[0]
                         }
                         // this.bookmark = !!bookmark
                    } catch (error) {
                         console.log('Error: ', error);
                    }
               }
          },

          async mounted() {
               // if (!this.isUserLoggedIn) {
               //      return
               // }

               // try {
               //      const bookmarkSong = (await BookmarksService.index({
               //                songId: this.song.id,
               //                userId: this.$store.state.user.id
               //           })
               //      ).data

               //      this.bookmark = bookmarkSong[0]
               //      // console.log(this.bookmark);
     
               //      // if (bookmarks.length) {
               //      //      this.bookmark = bookmarks[0]
               //      // }
               //      // this.bookmark = !!bookmark
               // } catch (error) {
               //      console.log('Error: ', error);
               // }
          },

          methods: {
               navigateTo (route) {
                    this.$router.push(route)
               },

               async setAsBookmark () {
                    try {
                         this.bookmark = (await BookmarksService.post({
                              songId: this.song.id,
                              // userId: this.$store.state.user.id /* we do not need this one when wi were used passport/ jwt */
                         })).data

                         // console.log(this.bookmark);
                    } catch (error) {
                         console.log('Error', error);                         
                    }
               },

               async unsetAsBookmark () {
                    try {
                         await BookmarksService.delete(this.bookmark.id)
                         this.bookmark = null
                         // console.log(this.bookmark)
                    } catch (error) {
                         console.log('Error: ', error);
                    }
               },
          },
     }
</script>

<style lang="scss" scoped>
     @media screen and (max-width: 600px) {
          .leftSide {
               display: none;
               height: 329px;
          }
     }

     @media screen and (min-width: 601px) {
          .min-device {
               display: none;
               height: 329px;
          }
     }

     .album-image {
          max-height: 50.5vh;
          max-width: 50.5vw;
     }
</style>