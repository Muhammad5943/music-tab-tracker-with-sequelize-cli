import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterUser from '../views/Register.vue'
import LoginUser from '../views/Login.vue'
import Songs from '../views/Songs.vue'
import CreateSong from '../views/CreateSong.vue'
import ViewSong from '../views/ViewSong/ViewSong.vue'
import EditSong from '../views/EditSong.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterUser
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser
  },
  {
    path: '/songs',
    name: 'songs',
    component: Songs
  },
  {
    path: '/songs/create',
    name: 'songs-create',
    component: CreateSong
  },
  {
    path: '/songs/:songId',
    name: 'song',
    component: ViewSong
  },
  {
    path: '/songs/:songId/edit',
    name: 'song-edit',
    component: EditSong
  },
  {
    path: '*',
    redirect: 'songs'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
