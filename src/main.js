import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

// use vue-cookies
import VueCookies from 'vue3-cookies'

import CoachNode from './components/CoachNode.vue'
import ClassNode from './components/ClassNode.vue'
import BreakNode from './components/BreakNode.vue'
import MultiNode from './components/MultiNode.vue'
import Key from './components/Key.vue'
import KeyInline from './components/KeyInline.vue'

const app = createApp(App)

app.use(router)
app.use(VueCookies)
app.use(VueAxios, axios)

app.component('CoachNode', CoachNode)
app.component('ClassNode', ClassNode)
app.component('BreakNode', BreakNode)
app.component('MultiNode', MultiNode)
app.component('KeyInline', KeyInline)
app.component('Key', Key)

app.mount('#app')
