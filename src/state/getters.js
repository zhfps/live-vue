const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  menus: state => state.sideMenu.menus,
  Access_Token: state => state.userInfo.Access_Token
}
export default getters
