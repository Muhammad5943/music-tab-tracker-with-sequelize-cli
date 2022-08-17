<template>
     <panel 
          title="YouTube Video"
     >
          <div>
               <youtube 
                    :video-id="youtubeId"
                    :player-width="$vuetify.breakpoint.mdAndDown? '100%':'100%'"
                    :player-height="325"
               ></youtube>
          </div>
     </panel>
</template>

<script>
     export default {
          props: [
               'youtubeId'
          ],

          components: {
          }
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

     .vLayout {
          margin: 0;
     }
</style>