const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  menus: state => state.sideMenu.menus,
  custom: state => state.userInfo.custom
}
export default getters
