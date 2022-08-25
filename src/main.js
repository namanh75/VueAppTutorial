import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory } from 'vue-router'

import ThietBi from './views/ThietBi.vue'
import OverViewPage from './views/OverViewPage.vue'
import MuonTra from './views/MuonTra.vue'
import BaoCao from './views/BaoCao.vue'
import HeThong from './views/HeThong.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

const routes = [
    { path: '/overview', component: OverViewPage },
    { path: '/thiet-bi', component: ThietBi },
    { path: '/muon-tra', component: MuonTra },
    { path: '/bao-cao', component: BaoCao },
    { path: '/he-thong', component: HeThong },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router, VueAxios, axios).mount('#app')
