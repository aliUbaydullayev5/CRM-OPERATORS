import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import Empolyee from '../views/Dashboard/Empolyee/Empolyee.vue'
import Product from '../views/Dashboard/Product/Product.vue'
import Contact from '../views/Dashboard/Contact/Contact.vue'
import Order from '../views/Dashboard/Order/Order.vue'
import Addorder from '../views/Dashboard/AddOrder/Addorder.vue'
import Category from '../views/Dashboard/Category/Category.vue'
import Delivery from "@/views/Dashboard/Delivery/Delivery.vue"
import Tarix from "@/views/Dashboard/Tarix/Tarix.vue"
import NewDeliverys from "@/views/Dashboard/NewDeliverys/NewDeliverys.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,

            children: [
                {
                    path: '/empolyee',
                    name: 'employee',
                    component: Empolyee,
                },
                {
                    path: '/category',
                    name: 'category',
                    component: Category,
                },
                {
                    path: '/categories',
                    name: 'product',
                    component: Product,
                },
                {
                    path: '/contacts',
                    name: 'contact',
                    component: Contact
                },
                {
                    path: '/orders',
                    name: 'orders',
                    component: Order
                },
                {
                    path: '/addorder',
                    name: 'addorder',
                    component: Addorder
                },
                {
                    path: '/delivery',
                    name: 'delivery',
                    component: Delivery
                },
                {
                    path: '/tarix',
                    name: 'tarix',
                    component: Tarix
                },
                {
                    path: '/newDelivery',
                    name: 'newDelivery',
                    component: NewDeliverys
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'error',
            component: () => import ('../views/Dashboard/Error/Error.vue')
        },
        {
            path: '/login',
            component: () => import ('../views/Login/Login.vue'),
            name: 'Login'
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !localStorage.getItem('token')) {
        next({name: 'Login'})
    } else
        next()
})

export default router
