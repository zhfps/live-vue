<script>
import './_Menu.scss'
import { mapGetters } from 'vuex'
export default {
  name: 'Menu',
  props: {
    isCollapse: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'menus'
    ])
  },
  methods: {
    handleMenuItemClick(name) {
      this.$emit('active', name)
    }
  },
  render(createElement) {
    const getMenus = (data, path = '/') => {
      return data.map(item => {
        if (item.children) {
          return createElement('el-submenu', {
            attrs: { index: item.path }
          }, [
            createElement('template', {
              slot: 'title'
            }, [
              createElement('svg-icon', {
                attrs: { class: 'el-icon-location', color: item.meta.color, name: item.meta.icon }
              }),
              createElement('span', {
                attrs: { slot: 'title' }
              }, [item.name])
            ]),
            getMenus(item.children, path + item.path + '/')
          ])
        } else {
          return createElement('el-menu-item', {
            attrs: { index: item.path, route: path + item.path },
            on: { click: () => {
              this.handleMenuItemClick(item.name)
            } }
          }, [
            createElement('svg-icon', {
              attrs: { class: 'el-icon-location', color: item.meta.color, name: item.meta.icon }
            }),
            createElement('span', {
              attrs: { slot: 'title' }
            }, [item.name])
          ])
        }
      })
    }
    const data = this.menus === undefined ? [] : this.menus
    const vNode = createElement('el-menu', {
      attrs: {
        router: true,
        collapse: this.isCollapse
      }
    }, [getMenus(data)])
    return vNode
  }
}
</script>

