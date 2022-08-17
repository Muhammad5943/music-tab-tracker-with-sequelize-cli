<template>
    <div>
      <panel title="Bookmarks">
        <v-data-table
          :headers="headers"
          :options.sync="options"
          :items="bookmarks">
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
import BookmarksService from '@/services/BookmarksService'

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

        bookmarks: []
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
        this.bookmarks = (await BookmarksService.index(/* {
          userId: this.user.id
        } */)).data

        // console.log('bookmarks ', this.bookmarks);
      }
    },
  }
</script>

<style lang="scss" scoped>
    
</style>