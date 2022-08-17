<template>
     <v-layout>
          <v-row
               sm="12"
               xs="12"
          >
               <v-col
                    md="5"
               >
                    <panel 
                         title="Song Metadata"
                    >
                         <v-text-field
                              label="Title*"
                              :rules="rules"
                              v-model="song.title"
                              type="text"
                              hide-details="auto"
                         ></v-text-field>
                         <v-text-field
                              label="Artist*"
                              :rules="rules"
                              v-model="song.artist"
                              type="text"
                              hide-details="auto"
                         ></v-text-field>
                         <v-text-field
                              label="Genre*"
                              :rules="rules"
                              v-model="song.genre"
                              type="text"
                              hide-details="auto"
                         ></v-text-field>
                         <v-text-field
                              label="Album*"
                              :rules="rules"
                              v-model="song.album"
                              type="text"
                              hide-details="auto"
                         ></v-text-field>
                         <v-text-field
                              label="Album Image URL*"
                              :rules="rules"
                              v-model="song.albumImageUrl"
                              type="text"
                              hide-details="auto"
                         ></v-text-field>
                         <v-text-field
                              label="YouTube ID*"
                              :rules="rules"
                              v-model="song.youtubeId"
                              type="text"
                              hide-details="auto"
                         ></v-text-field>
                    </panel>
               </v-col>
               <v-col
                    md="7"
                    class="text-center"
               >
                    <panel 
                         title="Song Structure"
                    >
                         <v-textarea
                              label="Tab*"
                              multi-line
                              :rules="rules"
                              v-model="song.tab"
                         ></v-textarea>
                         <v-textarea
                              label="Lyrics*"
                              multi-line
                              :rules="rules"
                              v-model="song.lyrics"
                         ></v-textarea>
                    </panel>

                    <div
                         class="danger-alert"
                         v-if="error"
                    >
                         {{ error }}
                    </div>

                    <v-btn
                         rounded
                         class="cyan lighten-2 mt-5"
                         dark
                         @click="create"
                    >
                         Create Song
                    </v-btn>
               </v-col>
          </v-row>
     </v-layout>
</template>

<script>
     import SongService from '@/services/SongsService'

     export default {
          data() {
               return {
                    song: {
                         title: null,
                         artist: null,
                         genre: null,
                         album: null,
                         albumImageUrl: null,
                         youtubeId: null,
                         lyrics: null,
                         tab: null,
                    },
                    error: null,
                    rules: [
                         (value) => !! value || 'Required'
                    ]
               }
          },

          methods: {
               async create () {
                    this.error = null
                    const areAllFieldFilledIn = Object
                         .keys(this.song)
                         .every(key => !! this.song[key])
                    
                    if (!areAllFieldFilledIn) {
                         this.error = 'Please fill the required fields'
                         return
                    }

                    try {
                         /* const songS =  */await SongService.post(this.song)
                         // console.log(songS)
                         this.$router.push({
                              name: 'songs'
                         })
                    } catch (error) {
                         console.log(error)
                    }
               }
          },

          components: {
          }
     }
</script>

<style lang="scss" scoped>

</style>