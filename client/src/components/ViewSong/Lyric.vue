<template>
     <panel 
          title="Song Lyric"
     >
          <v-flex
               md="6"
               sm="12"
               xs="12"
          >
               <textarea
                    md="6"
                    sm="12"
                    xs="12"
                    class="lyric"
                    :width = "$vuetify.breakpoint.mdAndDown? '100%':'100%'"
                    style="width:100%"
                    readonly
                    v-model="lyrics"
               ></textarea>
          </v-flex>
     </panel>
</template>

<script>
     export default {
          props: [
               'lyrics'
          ],

          components: {
          }
     }
</script>

<style lang="scss" scoped>
     .lyric {
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