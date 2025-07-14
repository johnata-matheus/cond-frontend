import { createRouter, createWebHistory } from 'vue-router'
import api from '@/api/axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/visits',
      name: 'visits',
      component: () => import('../views/VisitView.vue'),
      // meta: { requiresAuth: true },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
      // meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      // meta: { hideHeader: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      // meta: { hideHeader: true },
    },
    {
      path: '/register-resident',
      name: 'register-resident',
      component: () => import('../views/RegisterResidentView.vue'),
      // meta: { hideHeader: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/register',
    }
  ],
})

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//     try {
//       await api.get('/me')
//       next()
//     } catch {
//       next('/register')
//     }
//   } else {
//     next()
//   }
// })


export default router
