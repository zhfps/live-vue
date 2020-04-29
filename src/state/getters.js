const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  menus: state => state.sideMenu.menus,
  user: state => state.userInfo.user
}
export default getters
