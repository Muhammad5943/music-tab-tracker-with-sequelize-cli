<template>
     <panel 
          title="Gitar Tab Instrument "
     >
          <textarea
               class="tab"
               readonly
               v-model="tab"
          ></textarea>
     </panel>
</template>

<script>
     export default {
          props: [
               'tab'
          ],

          components: {
          }
     }
</script>

<style lang="scss" scoped>
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