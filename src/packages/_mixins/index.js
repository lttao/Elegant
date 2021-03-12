export default {
  methods: {
    getRect(that, selector, all) {
      return new Promise((resolve) => {
        uni
          .createSelectorQuery()
          .in(that)
          [all ? 'selectAll' : 'select'](selector)
          .boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect)
            } else if (!all && rect) {
              resolve(rect)
            }
          })
          .exec()
      })
    }
  }
}
