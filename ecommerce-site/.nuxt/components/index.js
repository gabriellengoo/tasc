export { default as ProductCard } from '../../components/ProductCard.vue'
export { default as ThreeModel } from '../../components/ThreeModel.vue'
export { default as LayoutFooter } from '../../components/layout/Footer.vue'
export { default as LayoutHeader } from '../../components/layout/Header.vue'
export { default as LayoutHeaderMin } from '../../components/layout/HeaderMin.vue'
export { default as LayoutMenu } from '../../components/layout/Menu.vue'

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
