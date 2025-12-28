import { createApp } from 'vue'
import store from './store'
import './assets/styles/global.css'
import App from './App.vue'

createApp(App).use(store).mount('#app')
