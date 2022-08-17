<template>
     <div>
          <v-row
               justify="center"
          >
               <!-- <v-img
                    class="node-img"
                    :style="{
                         height:$vuetify.breakpoint.mdAndUp?'90vh':'40vh',
                         bottom:$vuetify.breakpoint.mdAndUp?'22vh':'0vh'
                    }"
                    src="https://i.etsystatic.com/18154652/r/il/fc9af4/1641917848/il_1140xN.1641917848_3sp6.jpg"
               /> -->
                    
               <v-col
                    class="register-box"
                    md="8"
                    sm="12"
                    xs="12"
               >
                    <v-flex>
                         <panel title="Register">
                              <form
                                   name="tab-tracker-form"
                                   autocomplete="off"
                              >
                                   <v-text-field
                                        label="Email"
                                        type="email"
                                        :rules="rules"
                                        v-model="email"
                                        hide-details="auto"
                                   ></v-text-field>

                                   <v-text-field
                                        label="Password"
                                        :rules="rules"
                                        :type="showPassword ? 'text' : 'password'"
                                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        v-model="password"
                                        hide-details="auto"
                                        class="pb-5"
                                        autocomplete="new-password"
                                        @click:append="showPassword = !showPassword"
                                   ></v-text-field>
                              </form>
                         
                         
                              <div class="error1" v-html="error" />
                              <br>
                              <v-btn
                                   rounded
                                   class="cyan lighten-2"
                                   dark
                                   @click="register"
                              >
                                   Register
                              </v-btn>
                         </panel>
                    </v-flex>
               </v-col>
          </v-row>
     </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  
  export default {
      data () {
            return {
                rules: [
                      value => !! value || 'Required.'
                ],
                email: "",
                password: "",
                error: null,
                showPassword: false
            }
      },

      methods: {
            async register() {
               try {
                    const response = await AuthenticationService.register({
                         email: this.email,
                         password: this.password
                    })
                    
                    this.$store.dispatch('setToken', response.data.token)
                    this.$store.dispatch('setUser', response.data.user)
                    this.$router.push({
                         name: 'songs'
                    })
               } catch (error) {
                    this.error = error.response.data.error
               }
            }
      },

      components: {
      }
  }
</script>

<style scoped>
     .error1 {
          color: red;
     }

     .node-img {
          position: relative;
          scale: .5;
     }

     .register-box {
          position: absolute;
     }
</style>