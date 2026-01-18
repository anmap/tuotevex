import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        refetchOnWindowFocus: false, // Don't refetch when window regains focus (preventing unnecessary API calls)
      },
    },
  },
})

app.mount('#app')
