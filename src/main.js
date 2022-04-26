import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui' 
import 'vuestic-ui/dist/vuestic-ui.css' 
import VuePapaParse from 'vue-papa-parse'

const app = createApp(App)

app.use(VuesticPlugin)
app.use(VuePapaParse)
app.mount('#app')