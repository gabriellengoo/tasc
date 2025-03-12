import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c9c81e5e = () => interopDefault(import('../pages/model-viewer/[id].vue' /* webpackChunkName: "pages/model-viewer/[id]" */))
const _126d6883 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _35f84805 = () => interopDefault(import('../pages/model/_id.vue' /* webpackChunkName: "pages/model/_id" */))
const _40970524 = () => interopDefault(import('../pages/products/_id.vue' /* webpackChunkName: "pages/products/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/model-viewer/%5Bid%5D",
    component: _c9c81e5e,
    name: "model-viewer-[id]"
  }, {
    path: "/",
    component: _126d6883,
    name: "index"
  }, {
    path: "/model/:id?",
    component: _35f84805,
    name: "model-id"
  }, {
    path: "/products/:id?",
    component: _40970524,
    name: "products-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
