export const ProductCard = () => import('../../components/ProductCard.vue' /* webpackChunkName: "components/product-card" */).then(c => wrapFunctional(c.default || c))
export const ThreeModel = () => import('../../components/ThreeModel.vue' /* webpackChunkName: "components/three-model" */).then(c => wrapFunctional(c.default || c))
export const LayoutFooter = () => import('../../components/layout/Footer.vue' /* webpackChunkName: "components/layout-footer" */).then(c => wrapFunctional(c.default || c))
export const LayoutHeader = () => import('../../components/layout/Header.vue' /* webpackChunkName: "components/layout-header" */).then(c => wrapFunctional(c.default || c))
export const LayoutHeaderMin = () => import('../../components/layout/HeaderMin.vue' /* webpackChunkName: "components/layout-header-min" */).then(c => wrapFunctional(c.default || c))
export const LayoutMenu = () => import('../../components/layout/Menu.vue' /* webpackChunkName: "components/layout-menu" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
