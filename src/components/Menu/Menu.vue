<script>
import { Test } from '@/router'
export default {
  name: 'Menu',
  functional: true,
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
                attrs: { class: 'el-icon-location', color: '#DCDFE6', name: item.meta.icon }
              }),
              createElement('span', {
                attrs: { slot: 'title' }
              }, [item.name])
            ]),
            getMenus(item.children, path + item.path + '/')
          ])
        } else {
          return createElement('el-menu-item', {
            attrs: { index: item.path, route: path + item.path }
          }, [
            createElement('svg-icon', {
              attrs: { class: 'el-icon-location', color: '#DCDFE6', name: item.meta.icon }
            }),
            createElement('span', {
              attrs: { slot: 'title' },
              on: { click: () => {
                console.log(item.name)
              } }
            }, [item.name])
          ])
        }
      })
    }
    const data = Test[0].children
    const vNode = getMenus(data)
    return vNode
  }
}
</script>

