import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupVueQuery } from './plugins/vueQuery'

const app = createApp(App)

setupVueQuery(app);
app.use(router)

router.isReady().then(() => {
    app.mount('#app')
})