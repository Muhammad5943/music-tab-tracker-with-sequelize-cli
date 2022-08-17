<template>
     <v-toolbar
          fixed 
          class="cyan"
          style="margin-bottom: 70px"
     >
          <v-toolbar-title class="mr-4 header">
               <router-link 
                    class="song"
                    tag="span"
                    :to="{
                         name: 'songs'
                    }"
               >
                    Tab Tracker
               </router-link>
          </v-toolbar-title>

          <v-toolbar-items>
               <v-btn
                    text
                    outlined
                    color="white"
                    class="color: cyan"
                    @click="navigateTo({name: 'songs'})"
               >
                    Browse
               </v-btn>
          </v-toolbar-items>

          <v-spacer></v-spacer>

          <v-toolbar-items>
               <v-btn
                    v-if="!$store.state.isUserLoggedIn"
                    text
                    outlined
                    color="white"
                    class="color: cyan"
                    @click="navigateTo({name: 'login'})"
               >
                    
                    Login
               </v-btn> 
               <v-btn
                    v-if="!$store.state.isUserLoggedIn"
                    text
                    outlined
                    color="white"
                    class="color: cyan"
                    @click="navigateTo({name: 'register'})"
               >
                    
                    Sign Up
               </v-btn>
               <v-btn
                    v-if="$store.state.isUserLoggedIn"
                    text
                    outlined
                    color="white"
                    class="color: cyan"
                    @click="logout"
               >
                    
                    Sign Out
               </v-btn>
          </v-toolbar-items>
     </v-toolbar>
</template>

<script>
     export default {
          data() {
               return {
                    
               }
          },

          methods: {
               navigateTo (route) {
                    this.$router.push(route)
               },

               logout () {
                    this.$store.dispatch('setToken', null)
                    this.$store.dispatch('setUser', null)
                    this.$router.push({
                         name: 'songs'
                    })
               }
          },
     }
</script>

<style lang="scss" scoped>
     .header {
          color: white;
     }

     .home {
          cursor: pointer;
     }

     .song {
          cursor: pointer;
     }
</style>