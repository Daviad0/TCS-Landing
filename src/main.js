import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import CoachNode from './components/CoachNode.vue'
import ClassNode from './components/ClassNode.vue'
import BreakNode from './components/BreakNode.vue'

const app = createApp(App)

app.use(router)
app.component('CoachNode', CoachNode)
app.component('ClassNode', ClassNode)
app.component('BreakNode', BreakNode)

app.mount('#app')
