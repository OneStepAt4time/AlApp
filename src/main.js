import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui' 
import 'vuestic-ui/dist/vuestic-ui.css' 
import VuePapaParse from 'vue-papa-parse'

const app = createApp(App)

app.use(VuesticPlugin, {
    colors: {
        // Default colors
        primary: '#2336e0',
        secondary: '#002c85',
        success: '#40e583',
        info: '#2c82e0',
        danger: '#e34b4a',
        warning: '#ffc200',
        gray: '#babfc2',
        dark: '#34495e',
    
        // Custom colors
        yourCustomColor: '#d0f55d',
      },    
})
app.use(VuePapaParse)
app.mount('#app')

