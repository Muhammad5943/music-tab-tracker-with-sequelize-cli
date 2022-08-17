<template>
    <div>
      <panel title="Recently Viewed song">
        <v-data-table
          :headers="headers"
          :options.sync="options"
          :items="histories">
          <template 
            slot="items" 
            slot-scope="props"
          >
            <td class="text-md-right text-xs-right text-sm-right">
              {{ props.item.Song }}
            </td>
            <td class="text-md-right text-xs-right text-sm-right">
              {{ props.item.Song }}
            </td>
          </template>
        </v-data-table>
      </panel>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import SongHistoryService from '@/services/SongHistoryService'

  export default {
    data () {
      return {
        headers: [
          {
            text: 'Title',
            align: 'end',
            sortable: false,
            value: 'Song.title'
          },
          {
            text: 'Artits',
            align: 'end',
            sortable: false,
            value: 'Song.artist'
          }
        ],

        options: {},

        histories: []
      }
    },

    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user'
      ])
    },

    async mounted() {
      if(this.isUserLoggedIn){
        this.histories = (await SongHistoryService.index(/* {
          userId: this.user.id // used before have userId from passport authentication
        } */)).data

        // console.log('histories ', this.histories);
      }
    },
  }
</script>

<style lang="scss" scoped>
    
</style>